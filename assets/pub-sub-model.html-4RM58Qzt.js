import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as n,c as e,e as s}from"./app-P62tAaUj.js";const l={},d=s(`<p>发布订阅模式比较常用，近期使用grpc也涉及到连接管理简单记录一下发布订阅模式的实现，主要使用chan来传输数据</p><p>也可以考虑使用回调函数来处理publish的内容</p><h2 id="定义publisher" tabindex="-1"><a class="header-anchor" href="#定义publisher" aria-hidden="true">#</a> 定义Publisher</h2><p>首先定义一个Publish的struct，主要包含Subscribers属性来管理订阅者，订阅者必须使用指针来保证数据传递</p><div class="language-golang line-numbers-mode" data-ext="golang"><pre class="language-golang"><code>// Publisher 发布者
// 管理订阅者
// 发布内容
type Publisher struct {
	sync.RWMutex
	Subscribers map[string]*Subscriber
	waitGroup sync.WaitGroup
}

func NewPublisher() *Publisher {
	return &amp;Publisher{
		Subscribers: make(map[string]*Subscriber),
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来实现Publisher的基础功能</p><div class="language-golang line-numbers-mode" data-ext="golang"><pre class="language-golang"><code>
// 发布者的功能
// 添加订阅者
func (p *Publisher) AddSubscriber(s *Subscriber) {
	p.Lock()
	p.Subscribers[s.Name] = s
	p.Unlock()
	fmt.Printf(&quot;添加订阅者%s成功\\n&quot;, s.Name)
}

// 删除订阅者
func (p *Publisher) RemoveSubscriber(name string) {
	p.Lock()
	if _, ok := p.Subscribers[name]; ok {
		delete(p.Subscribers, name)
	}
	p.Unlock()
	fmt.Printf(&quot;移除订阅者%s成功\\n&quot;, name)
}

// 发布内容
func (p *Publisher) Publish(msg string) {
	p.RLock()
	defer p.RUnlock()
	p.waitGroup.Add(len(p.Subscribers))
	for _, s := range p.Subscribers {
		d_ := msg
		s_ := s
		go func() {
			s_.Run(d_)
			p.waitGroup.Done()
		}()
	}
	p.waitGroup.Wait()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="定义subscriber" tabindex="-1"><a class="header-anchor" href="#定义subscriber" aria-hidden="true">#</a> 定义Subscriber</h2><p>订阅者主要是接受发布者推送的数据，当然也应该包含一个唯一的标识符，可采用uuid，本文简单采用一个name(string)</p><div class="language-golang line-numbers-mode" data-ext="golang"><pre class="language-golang"><code>type Subscriber struct {
	sync.RWMutex
	Name string
	Data chan string
}

func NewSubscriber(name string) *Subscriber {
	return &amp;Subscriber{Name: name, Data: make(chan string)}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>订阅者应当实现的功能</p><div class="language-golang line-numbers-mode" data-ext="golang"><pre class="language-golang"><code>// 订阅者功能
// 订阅内容
func (s *Subscriber) Subscribe(p *Publisher) {
	p.AddSubscriber(s)
}

// 取消订阅
func (s *Subscriber) UnSubscribe(p *Publisher) {
	p.RemoveSubscriber(s.Name)
}

// 处理发布的内容
func (s *Subscriber) Run(msg string) {
	s.Lock()
	go func() {
		s.Data &lt;- msg
		s.Unlock()
	}()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完整代码</p><div class="language-golang line-numbers-mode" data-ext="golang"><pre class="language-golang"><code>// demo/subscribe/publisher.go
package subscribe

import (
	&quot;fmt&quot;
	&quot;sync&quot;
)

// Publisher 发布者
// 管理订阅者
// 发布内容
type Publisher struct {
	sync.RWMutex
	Subscribers map[string]*Subscriber
	waitGroup sync.WaitGroup
}

func NewPublisher() *Publisher {
	return &amp;Publisher{
		Subscribers: make(map[string]*Subscriber),
	}
}

// 发布者的功能
// 添加订阅者
func (p *Publisher) AddSubscriber(s *Subscriber) {
	p.Lock()
	p.Subscribers[s.Name] = s
	p.Unlock()
	fmt.Printf(&quot;添加订阅者%s成功\\n&quot;, s.Name)
}

// 删除订阅者
func (p *Publisher) RemoveSubscriber(name string) {
	p.Lock()
	if _, ok := p.Subscribers[name]; ok {
		delete(p.Subscribers, name)
	}
	p.Unlock()
	fmt.Printf(&quot;移除订阅者%s成功\\n&quot;, name)
}

// 发布者事件处理 - 产生数据
func (p *Publisher) Update(){

}

// 发布内容
func (p *Publisher) Publish(msg string) {
	p.RLock()
	defer p.RUnlock()
	p.waitGroup.Add(len(p.Subscribers))
	for _, s := range p.Subscribers {
		d_ := msg
		s_ := s
		go func() {
			s_.Run(d_)
			p.waitGroup.Done()
		}()
	}
	p.waitGroup.Wait()
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-golang line-numbers-mode" data-ext="golang"><pre class="language-golang"><code>// demo/subscribe/subscriber.go
package subscribe

import (
	&quot;sync&quot;
)

// Subscriber 订阅者
// 订阅内容，等待发布者发布内容
type Subscriber struct {
	sync.RWMutex
	Name string
	Data chan string
}

func NewSubscriber(name string) *Subscriber {
	return &amp;Subscriber{Name: name, Data: make(chan string)}
}


// 订阅者功能
// 订阅内容
func (s *Subscriber) Subscribe(p *Publisher) {
	p.AddSubscriber(s)
}

// 取消订阅
func (s *Subscriber) UnSubscribe(p *Publisher) {
	p.RemoveSubscriber(s.Name)
}

// 处理发布的内容
func (s *Subscriber) Run(msg string) {
	s.Lock()
	go func() {
		s.Data &lt;- string
		s.Unlock()
	}()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-golang line-numbers-mode" data-ext="golang"><pre class="language-golang"><code>// demo/main.go
package main

import (
  &quot;fmt&quot;
  &quot;time&quot;
  &quot;demo/subscribe&quot;
  &quot;strconv&quot;
)

func main(){
  var (
    pub *subscribe.Publiser
    sub1 *subscribe.Subscriber
    sub2 *subscribe.Subscriber
  )

  pub = subscibe.NewPublisher()

  sub1 = subscribe.NewSubscriber(&quot;pub1&quot;)
  sub2 = subscribe.NewSubscriber(&quot;pub2&quot;)
  sub1.Subscribe(pub)
  sub2.Subscribe(pub)

  go func(){
    i := 0
    for {
      if i &lt; 100 {
        break
      }
      pub.Publish(strconv.Itoa(i))
      i ++
    }
  }()

  go func(){
    for{
      d1, ok := &lt;- sub1.Data
      if !ok {
        continue
      }
      fmt.Print(d1)
    }
  }()

    go func(){
    for{
      d2, ok := &lt;- sub2.Data
      if !ok {
        continue
      }
      fmt.Print(d2)
    }
  }()

  time.Sleep(10*time.Second)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),r=[d];function v(u,a){return n(),e("div",null,r)}const m=i(l,[["render",v],["__file","pub-sub-model.html.vue"]]);export{m as default};
