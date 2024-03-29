---
title: 通过grpc服务上传下载大型文件
date: 2020-12-09T15:49:54+08:00
category:
  - 技术
  - python
tag: 
  - grpc
  - python
---

传统文件的下载方式主要使用tcp服务，这种功能同样可以使用grpc的stream来实现，通过使用流(streaming)，可以向服务器或者客户端持续发送数据，来达到上传和下载文件的目的。

Python中使用stream的要点在于灵活运用generator，发送数据使用yield，数据传输完成使用return而非break。

## 1.创建项目

整个项目位于desktop目录下，首先新建必要的目录及文件。

```powershell
desktop> mkdir file_server
desktop> mkdir file_server/proto
desktop> mkdir file_server/send
desktop> mkdir file_server/download
```

在`file_server`目录下添加`__init__.py`文件，保证`file_sever`为一个python package

在`file_server/send`目录下新建`send.xlsx`文件，测试下载文件，可以在文件中写入一些数据方便检查是否下载成功。

在`file_server/download`目录下新建文件`download.docx`文件，测试上传文件，同样可以写入一些内容来测试是否上传成功。

## 2.创建proto文件

在`file_server`目录下创建`fileserver.proto`文件来定义grpc服务，文件内容如下：

```protobuf
syntax = "proto3";

package file_server;


// 文件传输服务
service FileTransfer {
  // 上传文件
  rpc SendFile(stream RequestSend) returns (ResponseStatus);

  // 下载文件
  rpc DownloadFile(RequestFile) returns (stream ResponseStream);
}

// 文件上传数据流
message RequestSend {
  bytes data = 1;
}

// 上传结果状态
message ResponseStatus {
  bool ok = 1;
}

// 文件下载请求
message RequestFile {
  string name = 1;
}

// 文件下载数据流
message ResponseStream {
  bytes data = 1;
}
```

然后编译`fileserver.proto`文件为python文件

```powershell
python -m grpc_tools.protoc --python_out=./file_server --grpc_python_out=./file_server -I ./file_server/proto fileserver.proto
```

相关参数解释：

- --python-out: `fileserver_pb.py`文件的输出目录
- --grpc_python_out：`fileserver_pb_grpc.py`文件输出目录
- -I: protobuf源文件所在目录



修改生成的`filesever_pb_grpc.py`的`import`部分代码:

```pyth
# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

import file_server.fileserver_pb2 as fileserver__pb2
```

修改原因是package方式组织的python代码引入模块的方式与单文件脚本的引入方式不同，直接引入`fileserver__pb2`模块的话会提示无法找到该模块。

## 3.创建server端

在`file_server`目录下新建`server.py`文件，内容如下:

```python
import time

import grpc
from concurrent import futures
from pathlib import Path

import file_server.fileserver_pb2 as fp
import file_server.fileserver_pb2_grpc as fpg


base_path = Path(__file__).parent


def file_read(name: str):
    """读取待发送的文件的内容

    由于是测试脚本，直接读取待下载的文件，即 ./file_server/send.xlsx
    模拟大文件需要分块读取，持续发送
    Args:
        name: 文件名
    Returns:

    """
    send_file_path = base_path / 'send' / name
    size = 1024
    with open(send_file_path, 'rb') as file:
        start = 0
        while True:
            file.seek(start)
            read = file.read(size)
            if not read:
                return
            yield fp.ResponseStream(data=read)
            start += size


class FileTransferServer(fpg.FileTransferServicer):
    """文件传输服务"""

    def SendFile(self, request_iterator, context):
        """文件发送服务

        继承定义好的文件发送服务
        Args:
            request_iterator: 上传的文件流 : Generator[byte]
            context: 上下文

        Returns:
            文件上传的状态 :ResponseStatus
        """
        print('接受到文件上传请求')
        send_file = base_path / 'send' / 'download.docx'
        try:
            with open(send_file, 'wb') as f:
                for r in request_iterator:
                    f.write(r.data)
            return fp.ResponseStatus(ok=True)
        except Exception as e:
            print(e)
            return fp.ResponseStatus(ok=False)

    def DownloadFile(self, request, context):
        """文件下载服务

        继承定义好的文件下载服务
        Args:
            request: 请求需要下载的文件名 :RequestFile
            context: 上下文管理

        Returns:
            文件下载的数据流 :ResponseStream
        """
        print(request.name)
        file_name = request.name
        file = file_read(name=file_name)
        for response in file:
            yield response

    @staticmethod
    def serve():
        """启动服务

        Returns:

        """
        server = grpc.server(futures.ThreadPoolExecutor(max_workers=4))
        fpg.add_FileTransferServicer_to_server(FileTransferServer(), server)
        server.add_insecure_port("[::]:50051")
        server.start()
        try:
            while True:
                print("start server")
                time.sleep(60*60*24)
        except KeyboardInterrupt:
            server.stop(0)


if __name__ == '__main__':
    FileTransferServer.serve()

```

## 4.创建client端

在`file_server`目录下新建`client.py`文件，内容如下：

```python
import grpc

from pathlib import Path

from file_server import fileserver_pb2 as fp, fileserver_pb2_grpc as fpg


base_path = Path(__file__).parent


def send_file():
    """上传文件

    模拟大文件，分块发送
    Returns:

    """
    file_path = base_path / 'download' / 'download.docx'
    # 模拟大文件，分块读取发送
    size = 1024
    with open(file_path, 'rb') as f:
        start = 0
        while True:
            f.seek(start)
            read = f.read(size)
            if not read:
                return
            request = fp.RequestSend(data=read)
            yield request
            start += size


class Client(object):
    stub: fpg.FileTransferStub = None

    def __init__(self, port=50051):
        self.channel = grpc.insecure_channel(f'127.0.0.1:{port}')

    def connect(self):
        self.stub = fpg.FileTransferStub(self.channel)

    def close(self):
        self.channel.close()

    def download(self, name: str = 'send.xlsx'):
        """文件下载

        会将send.xlsx文件下载到 ./file_sever/download目录
        Args:
            name: 下载文件名，默认为 send.xlsx

        Returns:

        """
        r = fp.RequestFile(name=name)
        response = self.stub.DownloadFile(r)
        download = base_path / 'download' / name
        with open(download, 'wb') as f:
            for r in response:
                f.write(r.data)

    def send(self):
        """上传文件

        默认将上传 ./file_server/download/download.docx
        Returns:

        """
        file = send_file()
        resp = self.stub.SendFile(file)
        return resp

    def __enter__(self):
        self.connect()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.close()


if __name__ == '__main__':
    with Client() as client:
        # 上传文件
        resp_status = client.send()
        print(resp_status)

        # 下载文件
        client.download()

```

## 5.运行服务

打开两个控制台窗口，cd到`desktop`目录下，分别运行

```pow
desktop> python -m file_server.server
```

```powershell
desktop> python -m file_server.client
```

可以看到`send.xlsx`文件下载到了`file_server/download`目录，`download.docx`文件上传到了`file_server/send`目录。

