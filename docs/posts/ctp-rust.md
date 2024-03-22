---
title: 使用Rust实现CTP柜台系统接口
date: 2024-03-22T15:33:00+08:00
tag: 
  - rust
  - c++
  - ctp
  - 期货
---

# CTP

## 官方介绍

上期技术综合交易平台（Comprehensive Transaction Platform，简称CTP）系列产品为期货经纪公司提供国内期货与证券及衍生品的交易、风控、结算等业务的解决方案。

## CTP接入

CTP的接入需要使用官方提供的API接口，基于C++开发，第三方实现了基于CPython的接口，本文试图实现基于C语言FFI的接口，来探索Rust语言的接入方式。

# 原理

Rust和C语言能够互相调用的关键在于它们在底层系统接口、内存模型、函数调用约定等方面的高度兼容性。Rust的FFI机制则提供了一个友好的编程接口,使得开发人员可以无缝地在两种语言之间切换。
概括来讲，实现以下特性就可以保证Rust和C语言的代码安全调用：

 - Rust提供了一个专门的FFI机制,允许Rust代码直接调用C语言编写的函数。反之,C语言也可以通过FFI调用Rust函数。
 - Rust和C语言的基本数据类型(如整型、浮点型等)在内存布局上是兼容的。Rust的FFI机制能够自动进行这些类型之间的转换。
 - Rust的所有权和借用规则确保了内存安全。当Rust调用C函数时,会自动处理好内存的所有权转移。C调用Rust时,Rust也能正确地管理内存。

CTP开发使用的是C++语言,而Rust是基于C语言的FFI机制来实现的。因此Rust是无法直接调用CTP的相关接口，需要使用C语言来对CTP接口进行一定的封装，来保证内存布局一致、数据类型相同。

# Rust接入CTP

## 用C封装CTP

CTP为行情和交易分别提供了两个类,一个叫做`Api`,一个叫做`Spi`,此处以行情接口为例。

`CThostFtdcMdApi`类由CTP官方实现，主要控制请求操作，诸如连接柜台、登录、订阅行情、取消订阅等。
`CThostFtdcMdSpi`类CTP只提供了一个基类,用于实现回调函数,具体接口由用户实现,来响应各种用户请求的回调事件。

C语言没有类这个概念,因此我们需要将这两个类包装为指针,并提供一个结构体来封装这两个指针,方便Rust调用。

### 实现API

通过以下代码,我们就能将Api包装为一个C的结构体。

```c
#ifndef __BRIDGE_H__
#define __BRIDGE_H__

#include "lib/ThostFtdcMdApi.h"
#include "ThostFtdcUserApiStruct.h"

#ifdef __cplusplus
extern "C"
{
#endif

    struct CMarketApi
    {
        CThostFtdcMdApi *api;
    };

#ifdef __cplusplus
}
#endif

#endif
```

但这只是个基础的结构体,我们还需要将CThostFtdcMdApi的功能实现到Rust中,本次我们举例如何创建api和进行柜台连接请求。
伪代码如下:

```c
#ifndef __BRIDGE_H__
#define __BRIDGE_H__

#include "lib/ThostFtdcMdApi.h"
#include "ThostFtdcUserApiStruct.h"

#ifdef __cplusplus
extern "C"
{
#endif

    struct CMarketApi
    {
        CThostFtdcMdApi *api;
    };

    void create_api(CMarketApi *cmapi) {
        cmapi->api = CThostFtdcMdApi::CreateFtdcMdApi();
    };

    int connect(CMarketApi *cmapi, char *broker, char *user, char *pwd) {
        // 此处实际需要先注册spi
        CThostFtdcReqUserLoginField field = {0};
        std::strcpy(field.BrokerID, broker);
        std::strcpy(field.UserID, user);
        std::strcpy(field.Password, pwd);
        auto ret = api->ReqUserLogin(&field, requestID++);
        return ret;
    }

#ifdef __cplusplus
}
#endif

#endif
```

### SPI实现

spi的实现相比api会复杂很多,毕竟api只需要调用,spi需要自己实现回调函数。
思路是实现一个spi的继承类`A`,用来从rust中注册一些回调函数到`A`中,
当ctp调用回调函数时，我们在ctp定义的回调函数中调用`A`上面注册的相应函数,
伪代码如下:

```c
// spi extend
#ifndef __SPI_H__
#define __SPI_H__

#include <iostream>
#include <functional>
#include "lib/ThostFtdcMdApi.h"

using FrontConnectedCallback = std::function<void()>;
using LoggedInCallBack = std::function<void(int)>;
using DepthMarketCallBack = std::function<void(CThostFtdcDepthMarketDataField *)>;

class Spi : public CThostFtdcMdSpi
{
private:
    FrontConnectedCallback onFrontConnected;
    LoggedInCallBack onLoggedIn;
    DepthMarketCallBack onDepthMarketData;

    void OnRspError(CThostFtdcRspInfoField *pRspInfo, int nRequestID, bool bIsLast);
    void OnFrontConnected();
    void OnFrontDisconnected(int nReason);
    void OnRspUserLogin(CThostFtdcRspUserLoginField *pRspUserLogin, CThostFtdcRspInfoField *pRspInfo, int nRequestID, bool bIsLast);
    void OnRspSubMarketData(CThostFtdcSpecificInstrumentField *pSpecificInstrument, CThostFtdcRspInfoField *pRspInfo, int nRequestID, bool bIsLast);
    void OnMarketData(CThostFtdcMarketDataField *pMarketData);
    void OnRtnDepthMarketData(CThostFtdcDepthMarketDataField *pDepthMarketData);

public:
    Spi() = default;
    ~Spi() = default;

    void registerOnFrontConnected(const FrontConnectedCallback &callback);
    void registerOnLoggedIn(const LoggedInCallBack &callback);
    void registerOnDepthMarketData(const DepthMarketCallBack &callback);
};

inline void Spi::OnRspError(CThostFtdcRspInfoField *pRspInfo, int nRequestID, bool bIsLast)
{
    std::cout << "Spi::OnError: " << pRspInfo->ErrorMsg << std::endl;
}

inline void Spi::OnFrontConnected()
{
    onFrontConnected();
}

inline void Spi::OnFrontDisconnected(int reason)
{
    std::cout << "OnFrontDisconnected: " << reason << std::endl;
}

inline void Spi::OnRspUserLogin(CThostFtdcRspUserLoginField *pRspUserLogin, CThostFtdcRspInfoField *pRspInfo, int nRequestID, bool bIsLast)
{
    onLoggedIn((int)pRspInfo->ErrorID);
}

inline void Spi::OnRspSubMarketData(CThostFtdcSpecificInstrumentField *pSpecificInstrument, CThostFtdcRspInfoField *pRspInfo, int nRequestID, bool bIsLast)
{
    std::cout << "OnRspSubMarketData: " << pSpecificInstrument->InstrumentID << std::endl;
}

inline void Spi::OnMarketData(CThostFtdcMarketDataField *pMarketData)
{
    std::cout << "OnMarketData: " << std::endl;
}

inline void Spi::OnRtnDepthMarketData(CThostFtdcDepthMarketDataField *data)
{
    CThostFtdcDepthMarketDataField *dataCopy = new CThostFtdcDepthMarketDataField;
    *dataCopy = *data;
    onDepthMarketData(dataCopy);
}

inline void Spi::registerOnFrontConnected(const FrontConnectedCallback &callback)
{
    this->onFrontConnected = callback;
}

inline void Spi::registerOnLoggedIn(const LoggedInCallBack &callback)
{
    this->onLoggedIn = callback;
}

inline void Spi::registerOnDepthMarketData(const DepthMarketCallBack &callback)
{
    this->onDepthMarketData = callback;
}

#endif

```

然后封装这些c++代码,伪代码如下:
```c

#ifndef __BRIDGE_H__
#define __BRIDGE_H__

#include "lib/ThostFtdcMdApi.h"
#include "ThostFtdcUserApiStruct.h"

#ifdef __cplusplus
extern "C"
{
#endif

    struct CGateway
    {
        CThostFtdcMdApi *api;
        Spi *spi;
    };

    typedef void (*on_front_connectd)(CGateway *);

    void create_api(Cgateway *gw) {
        /// 在创建api后注册上spi
        gw->api = CThostFtdcMdApi::CreateFtdcMdApi();
        gw->spi = new Spi();
        gw->api->RegisterSpi(gw->spi);
    };

    void gateway_reg_on_front_conneted(CGateway *gw, on_front_connectd func) {
        // gw->spi->registerOnFrontConnected(func); 要点
        gw->spi->registerOnFrontConnected([=]()
                                                { func(gw); });
    }

#ifdef __cplusplus
}
#endif

#endif

```

上面就是本文的要点之一,回调函数不能直接注册到c++中,需要通过lambda函数来注册,来保证Cgateway的指针可以顺利传递到spi中。


## Rust与C交互

做好了c++的桥接,接下来就是rust与c的桥接了,要点就是内存布局要完全一致，不然会出现数据从c++到rust出现空指针或者内存访问错误等问题。

### 类的封装

先将c中实现的接口封装到rust中,伪代码如下:

```rust
use std::ffi::c_void;

repr(C)
pub struct CGateway {
    api: *mut c_void,
    spi: *mut c_void,
}

extern "C" {
    fn create_api(gw: *mut CGateway);

    fn gateway_reg_on_front_conneted(gw: *mut CGateway, func: extern "C" fn(*mut CGateway));
}
```

可以看到在CGateway中,api和spi都是指针,这就是在rust中访问c++中的对象的方式,api和spi的任何方法都没法通过定义的指针来直接访问,
需要在桥接的c中去访问,所以此处只定义了相关函数的声明。


### 回调函数的封装

```rust
#[no_mangle]
extern "C" fn on_front_connectd(gw: *mut CGateway) {
    println!("on_front_connectd");
}

fn main() {
    let mut gw = CGateway { api: std::ptr::null_mut(), spi: std::ptr::null_mut() };
    let ptr = &mut gw as *mut CGateway;
    unsafe {
        let ptr = &mut gw as *mut CGateway;
        create_api(ptr);
        gateway_reg_on_front_conneted(ptr, on_front_connectd);
    };
}
```

### 返回数据的内存对齐

这也是本文的要点之一,之前遇到过很多次c++返回数据出现大量空指针或者内存不可访问的问题,
总结下来由如下几点:

  - rust定义结构体时顺序没有严格按照ctp定义
  - 字符串使用`*const c_char`来表示c中的`char[n]`,这是错误的,必须使用`[u8; n]`
  - c++中没有对需要回调函数访问的数据进行深拷贝,原始数据被c++清理了

```rust
use std::ffi::{c_double, c_int, CStr};

#[derive(Debug)]
#[allow(non_snake_case)]
#[repr(C)]
pub struct CThostFtdcDepthMarketDataField {
    pub TradingDay: [u8; 9],
    pub reserve1: [u8; 31],
    pub ExchangeID: [u8; 9],
    pub reserve2: [u8; 31],
    pub LastPrice: c_double,
    pub PreSettlementPrice: c_double,
    pub PreClosePrice: c_double,
    pub PreOpenInterest: c_double,
    pub OpenPrice: c_double,
    pub HighestPrice: c_double,
    pub LowestPrice: c_double,
    pub Volume: c_int,
    pub Turnover: c_double,
    pub OpenInterest: c_double,
    pub ClosePrice: c_double,
    pub SettlementPrice: c_double,
    pub UpperLimitPrice: c_double,
    pub LowerLimitPrice: c_double,
    pub PreDelta: c_double,
    pub CurrDelta: c_double,
    pub UpdateTime: [u8; 9],
    pub UpdateMillisec: c_int,
    pub BidPrice1: c_double,
    pub BidVolume1: c_int,
    pub AskPrice1: c_double,
    pub AskVolume1: c_int,
    pub BidPrice2: c_double,
    pub BidVolume2: c_int,
    pub AskPrice2: c_double,
    pub AskVolume2: c_int,
    pub BidPrice3: c_double,
    pub BidVolume3: c_int,
    pub AskPrice3: c_double,
    pub AskVolume3: c_int,
    pub BidPrice4: c_double,
    pub BidVolume4: c_int,
    pub AskPrice4: c_double,
    pub AskVolume4: c_int,
    pub BidPrice5: c_double,
    pub BidVolume5: c_int,
    pub AskPrice5: c_double,
    pub AskVolume5: c_int,
    pub AveragePrice: c_double,
    pub ActionDay: [u8; 9],
    pub InstrumentID: [u8; 81],
    pub ExchangeInstID: [u8; 81],
    pub BandingUpperPrice: c_double,
    pub BandingLowerPrice: c_double,
}

#[derive(Debug)]
pub struct MarketData {
    pub trading_day: String,
    pub reserve1: String,
    pub exchange_id: String,
    pub reserve2: String,
    pub last_price: f64,
    pub pre_settlement_price: f64,
    pub pre_close_price: f64,
    pub pre_open_interest: f64,
    pub open_price: f64,
    pub highest_price: f64,
    pub lowest_price: f64,
    pub volume: c_int,
    pub turnover: f64,
    pub open_interest: f64,
    pub close_price: f64,
    pub settlement_price: f64,
    pub upper_limit_price: f64,
    pub lower_limit_price: f64,
    pub pre_delta: f64,
    pub curr_delta: f64,
    pub update_time: String,
    pub update_millisec: i32,
    pub bid_price1: f64,
    pub bid_volume1: i32,
    pub ask_price1: f64,
    pub ask_volume1: i32,
    pub bid_price2: f64,
    pub bid_volume2: i32,
    pub ask_price2: f64,
    pub ask_volume2: i32,
    pub bid_price3: f64,
    pub bid_volume3: i32,
    pub ask_price3: f64,
    pub ask_volume3: i32,
    pub bid_price4: f64,
    pub bid_volume4: i32,
    pub ask_price4: f64,
    pub ask_volume4: i32,
    pub bid_price5: f64,
    pub bid_volume5: i32,
    pub ask_price5: f64,
    pub ask_volume5: c_int,
    pub average_price: f64,
    pub action_day: String,
    pub instrument_id: String,
    pub exchange_inst_id: String,
    pub banding_upper_price: f64,
    pub banding_lower_price: f64,
}

fn bytes_2_string(b: &[u8]) -> String {
    CStr::from_bytes_until_nul(b)
        .unwrap()
        .to_str()
        .unwrap()
        .to_string()
}

impl Into<MarketData> for CThostFtdcDepthMarketDataField {
    fn into(self) -> MarketData {
        MarketData {
            trading_day: bytes_2_string(&self.TradingDay),
            reserve1: bytes_2_string(&self.reserve1),
            exchange_id: bytes_2_string(&self.ExchangeID),
            reserve2: bytes_2_string(&self.reserve2),
            last_price: self.LastPrice,
            pre_settlement_price: self.PreSettlementPrice,
            pre_close_price: self.PreClosePrice,
            pre_open_interest: self.PreOpenInterest,
            open_price: self.OpenPrice,
            highest_price: self.HighestPrice,
            lowest_price: self.LowestPrice,
            volume: self.Volume,
            turnover: self.Turnover,
            open_interest: self.OpenInterest,
            close_price: self.ClosePrice,
            settlement_price: self.SettlementPrice,
            upper_limit_price: self.UpperLimitPrice,
            lower_limit_price: self.LowerLimitPrice,
            pre_delta: self.PreDelta,
            curr_delta: self.CurrDelta,
            update_time: bytes_2_string(&self.UpdateTime),
            update_millisec: self.UpdateMillisec,
            bid_price1: self.BidPrice1,
            bid_volume1: self.BidVolume1,
            ask_price1: self.AskPrice1,
            ask_volume1: self.AskVolume1,
            bid_price2: self.BidPrice2,
            bid_volume2: self.BidVolume2,
            ask_price2: self.AskPrice2,
            ask_volume2: self.AskVolume2,
            bid_price3: self.BidPrice3,
            bid_volume3: self.BidVolume3,
            ask_price3: self.AskPrice3,
            ask_volume3: self.AskVolume3,
            bid_price4: self.BidPrice4,
            bid_volume4: self.BidVolume4,
            ask_price4: self.AskPrice4,
            ask_volume4: self.AskVolume4,
            bid_price5: self.BidPrice5,
            bid_volume5: self.BidVolume5,
            ask_price5: self.AskPrice5,
            ask_volume5: self.AskVolume5,
            average_price: self.AveragePrice,
            action_day: bytes_2_string(&self.ActionDay),
            instrument_id: bytes_2_string(&self.InstrumentID),
            exchange_inst_id: bytes_2_string(&self.ExchangeInstID),
            banding_upper_price: self.BandingUpperPrice,
            banding_lower_price: self.BandingLowerPrice,
        }
    }
}
```

### 如何在c++中访问rust中的不安全数据

我们使用回调函数,目的就是将c++中产生的数据在rust中进行处理,如果rust中不能处理这些数据,回调函数功能将大打折扣

伪代码
```rust
extern "C" fn on_marketdata(data: *mut CThostFtdcDepthMarketDataField) {}
```

我们的目标当然是在`on_marketdata`函数中对数据进行操作,这个过程不可避免要使用到rust中的其它对象,那我们要怎么办？答案还是`*mut`。

伪代码
```rust

pub struct Handler;

impl Handler {
    // some handlers
    fn handle_marketdata(&self, data: *mut CThostFtdcDepthMarketDataField) {}
}

repr(C)
pub struct CGateway {
    api: *mut c_void,
    spi: *mut c_void,
    handler: *mut c_void,
}

extern "C" fn on_marketdata(cgw: &CGateway, data: *mut CThostFtdcDepthMarketDataField) {
    unsafe {
        cgw.handler.handle_marketdata(data);
    }
}
```

# 总结

总结来说,在rust中使用ctp主要有以下技巧:
 - 结构体自动完全对齐
 - 字符串不要盲目使用`*const c_char`
 - rust对象传入c中可以借用指针来实现`*mut MyStruct`
 - c++中的回调函数需要使用Lamda表达式封装下
