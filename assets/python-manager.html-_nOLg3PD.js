import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,e}from"./app-0P0B6JVZ.js";const t={},i=e(`<p>在具有亲缘的多进程程序中，通常可用使用<code>queue</code>、<code>pipe</code>等数据结构来进行数据共享和传递消息，但在分布式进程中，进程间的通信还需要依靠网络来进行传输。</p><p>在之前的文章中，我们通过grpc服务来传输数据，实际上在Python标准库<code>multiprocessing</code>的<code>managers</code>模块已经包含了分布式进程通信的功能，主要使用<code>BaseManager</code>对象。</p><h2 id="_1-basemanager对象" tabindex="-1"><a class="header-anchor" href="#_1-basemanager对象" aria-hidden="true">#</a> 1.BaseManager对象</h2><p>官网文档对BaseManager的描述：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">multiprocessing</span><span class="token punctuation">.</span>managers<span class="token punctuation">.</span>BaseManager<span class="token punctuation">(</span><span class="token punctuation">[</span>address<span class="token punctuation">[</span><span class="token punctuation">,</span> authkey<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token triple-quoted-string string">&quot;&quot;&quot;
	创建一个 BaseManager 对象。
	一旦创建，应该及时调用 start() 或者 get_server().serve_forever() 以确保管理器对象对应的管理进程已经启动。

	address 是管理器服务进程监听的地址。如果 address 是 None ,则允许和任意主机的请求建立连接。

	authkey 是认证标识，用于检查连接服务进程的请求合法性。如果 authkey 是 None, 则会使用 current_process().authkey , 否则，就使用 authkey , 需要保证它必须是 byte 类型的字符串。

	start([initializer[, initargs]])
		为管理器开启一个子进程，如果 initializer 不是 None , 子进程在启动时将会调用initializer(*initargs) 。

    get_server()
    	返回一个 Server对象，它是管理器在后台控制的真实的服务。 Server对象拥有serve_forever() 方法。

        &gt;&gt;&gt;
        &gt;&gt;&gt; from multiprocessing.managers import BaseManager
        &gt;&gt;&gt; manager = BaseManager(address=(&#39;&#39;, 50000), authkey=b&#39;abc&#39;)
        &gt;&gt;&gt; server = manager.get_server()
        &gt;&gt;&gt; server.serve_forever()
        Server 额外拥有一个 address 属性。

    connect()
    	将本地管理器对象连接到一个远程管理器进程:

        &gt;&gt;&gt;
        &gt;&gt;&gt; from multiprocessing.managers import BaseManager
        &gt;&gt;&gt; m = BaseManager(address=(&#39;127.0.0.1&#39;, 50000), authkey=b&#39;abc&#39;)
        &gt;&gt;&gt; m.connect()
        
    shutdown()
        停止管理器的进程。这个方法只能用于已经使用 start() 启动的服务进程。

        它可以被多次调用。

    register(typeid[, callable[, proxytype[, exposed[, method_to_typeid[, create_method]]]]])
    	一个 classmethod，可以将一个类型或者可调用对象注册到管理器类。

    	typeid 是一种 &quot;类型标识符&quot;，用于唯一表示某种共享对象类型，必须是一个字符串。

        callable 是一个用来为此类型标识符创建对象的可调用对象。如果一个管理器实例将使用 connect() 方法连接到服务器，或者 create_method 参数为 False，那么这里可留下 None。

        proxytype 是 BaseProxy  的子类，可以根据 typeid 为共享对象创建一个代理，如果是 None , 则会自动创建一个代理类。

        exposed 是一个函数名组成的序列，用来指明只有这些方法可以使用 BaseProxy._callmethod() 代理。(如果 exposed 是 None, 则会在 proxytype._exposed_ 存在的情况下转而使用它) 当暴露的方法列表没有指定的时候，共享对象的所有 “公共方法” 都会被代理。（这里的“公共方法”是指所有拥有 __call__() 方法并且不是以 &#39;_&#39; 开头的属性）

        method_to_typeid 是一个映射，用来指定那些应该返回代理对象的暴露方法所返回的类型。（如果 method_to_typeid 是 None, 则 proxytype._method_to_typeid_ 会在存在的情况下被使用）如果方法名称不在这个映射中或者映射是 None ,则方法返回的对象会是一个值拷贝。

        create_method 指明，是否要创建一个以 typeid 命名并返回一个代理对象的方法，这个函数会被服务进程用于创建共享对象，默认为 True 。

    BaseManager 实例也有一个只读属性。

    address
    	管理器所用的地址。
    &quot;&quot;&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来尝试使用<code>BaseManager</code>来进行分布式进程间的通信，由于是在本机多个<code>cmd</code>窗口下模拟分布式，故ip地址均使用<code>127.0.0.1:5000</code>。</p><h2 id="_2-server端" tabindex="-1"><a class="header-anchor" href="#_2-server端" aria-hidden="true">#</a> 2.Server端</h2><p>代码如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># server.py</span>
<span class="token keyword">import</span> random
<span class="token keyword">import</span> queue
<span class="token keyword">import</span> time
<span class="token keyword">from</span> multiprocessing<span class="token punctuation">.</span>managers <span class="token keyword">import</span> BaseManager


<span class="token comment"># 全局变量，存放产生的数据</span>
products <span class="token operator">=</span> queue<span class="token punctuation">.</span>Queue<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">task_queue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;获取任务队列

    用于注册到BaseManager的任务队列
    Returns:
        queue.Queue: 获取进程安全的任务队列

    &quot;&quot;&quot;</span>
    <span class="token keyword">return</span> products


<span class="token keyword">def</span> <span class="token function">producer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;模拟生产者，生产数据

    Returns:
        int: 将产生的随机数当作产品

    &quot;&quot;&quot;</span>
    p <span class="token operator">=</span> random<span class="token punctuation">.</span>randint<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> p


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    BaseManager<span class="token punctuation">.</span>register<span class="token punctuation">(</span><span class="token string">&#39;task_queue&#39;</span><span class="token punctuation">,</span> task_queue<span class="token punctuation">)</span>
    manager <span class="token operator">=</span> BaseManager<span class="token punctuation">(</span>address<span class="token operator">=</span><span class="token punctuation">(</span><span class="token string">&#39;127.0.0.1&#39;</span><span class="token punctuation">,</span> <span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">,</span> authkey<span class="token operator">=</span><span class="token string">b&#39;producer&#39;</span><span class="token punctuation">)</span>
    manager<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
    tasks <span class="token operator">=</span> manager<span class="token punctuation">.</span>task_queue<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        tasks<span class="token punctuation">.</span>put<span class="token punctuation">(</span>producer<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先创建一个全局的<code>queue</code>来存放数据(注意<code>queue</code>的特点是先进先出(FIFO)，当从一个空的<code>queue</code>获取数据时会发生堵塞)，模拟实际业务中产生的数据的容器，如存放爬虫获取到的媒体文件的url，供其他进程获取。</p><p>然后为创建的数据容器提供一个获取方法，然后注册到<code>BaseManager</code>，注册后其他进程便可以注册相同的名字来获取到这个方法，然后获取到数据容器。</p><p>在服务端实例化<code>BaseManager</code>对象，传入服务器地址，并调用<code>start</code>对象开启服务。</p><p>最后在循环事件中模拟生产过程。</p><h2 id="_3-client端" tabindex="-1"><a class="header-anchor" href="#_3-client端" aria-hidden="true">#</a> 3.Client端</h2><p>client端模拟消费过程，代码如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># client.py</span>
<span class="token keyword">from</span> multiprocessing<span class="token punctuation">.</span>managers <span class="token keyword">import</span> BaseManager


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    BaseManager<span class="token punctuation">.</span>register<span class="token punctuation">(</span><span class="token string">&#39;task_queue&#39;</span><span class="token punctuation">)</span>
    manager <span class="token operator">=</span> BaseManager<span class="token punctuation">(</span>address<span class="token operator">=</span><span class="token punctuation">(</span><span class="token string">&#39;127.0.0.1&#39;</span><span class="token punctuation">,</span> <span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">,</span> authkey<span class="token operator">=</span><span class="token string">b&#39;producer&#39;</span><span class="token punctuation">)</span>
    manager<span class="token punctuation">.</span>connect<span class="token punctuation">(</span><span class="token punctuation">)</span>
    tasks <span class="token operator">=</span> manager<span class="token punctuation">.</span>task_queue<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>tasks<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样便实现了分布式进程间的通信和数据共享。</p><h2 id="_4-进一步拆分" tabindex="-1"><a class="header-anchor" href="#_4-进一步拆分" aria-hidden="true">#</a> 4.进一步拆分</h2><p>在实际业务中，可能会有多个生产者和多个消费者，这种情况下需要把负责通信的模块剥离出来，只作为通信的管理部分，即生产者向管理者写入数据，消费者从管理者读取数据。</p><h3 id="_4-1-manager" tabindex="-1"><a class="header-anchor" href="#_4-1-manager" aria-hidden="true">#</a> 4.1 Manager</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># manager.py</span>
<span class="token keyword">import</span> random
<span class="token keyword">import</span> queue
<span class="token keyword">from</span> multiprocessing<span class="token punctuation">.</span>managers <span class="token keyword">import</span> BaseManager


<span class="token comment"># 全局变量，存放产生的数据</span>
products <span class="token operator">=</span> queue<span class="token punctuation">.</span>Queue<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">task_queue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;获取任务队列

    用于注册到BaseManager的任务队列
    Returns:
        queue.Queue: 获取进程安全的任务队列

    &quot;&quot;&quot;</span>
    <span class="token keyword">return</span> products


<span class="token keyword">def</span> <span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;收到请求，结束进程&#39;</span><span class="token punctuation">)</span>
    exit<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    BaseManager<span class="token punctuation">.</span>register<span class="token punctuation">(</span><span class="token string">&#39;task_queue&#39;</span><span class="token punctuation">,</span> task_queue<span class="token punctuation">)</span>
    BaseManager<span class="token punctuation">.</span>register<span class="token punctuation">(</span><span class="token string">&#39;close&#39;</span><span class="token punctuation">,</span> close<span class="token punctuation">)</span>
    manager <span class="token operator">=</span> BaseManager<span class="token punctuation">(</span>address<span class="token operator">=</span><span class="token punctuation">(</span><span class="token string">&#39;127.0.0.1&#39;</span><span class="token punctuation">,</span> <span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">,</span> authkey<span class="token operator">=</span><span class="token string">b&#39;producer&#39;</span><span class="token punctuation">)</span>
    manager<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
    tasks <span class="token operator">=</span> manager<span class="token punctuation">.</span>task_queue<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        <span class="token keyword">continue</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-server" tabindex="-1"><a class="header-anchor" href="#_4-2-server" aria-hidden="true">#</a> 4.2 Server</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># server.py</span>
<span class="token keyword">import</span> random
<span class="token keyword">import</span> time
<span class="token keyword">from</span> multiprocessing<span class="token punctuation">.</span>managers <span class="token keyword">import</span> BaseManager


<span class="token keyword">def</span> <span class="token function">producer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;模拟生产者，生产数据

    Returns:
        int: 将产生的随机数当作产品

    &quot;&quot;&quot;</span>
    p <span class="token operator">=</span> random<span class="token punctuation">.</span>randint<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> p


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    BaseManager<span class="token punctuation">.</span>register<span class="token punctuation">(</span><span class="token string">&#39;task_queue&#39;</span><span class="token punctuation">)</span>
    manager <span class="token operator">=</span> BaseManager<span class="token punctuation">(</span>address<span class="token operator">=</span><span class="token punctuation">(</span><span class="token string">&#39;127.0.0.1&#39;</span><span class="token punctuation">,</span> <span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">,</span> authkey<span class="token operator">=</span><span class="token string">b&#39;producer&#39;</span><span class="token punctuation">)</span>
    manager<span class="token punctuation">.</span>connect<span class="token punctuation">(</span><span class="token punctuation">)</span>
    tasks <span class="token operator">=</span> manager<span class="token punctuation">.</span>task_queue<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        tasks<span class="token punctuation">.</span>put<span class="token punctuation">(</span>producer<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-client" tabindex="-1"><a class="header-anchor" href="#_4-3-client" aria-hidden="true">#</a> 4.3 Client</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># client.py</span>
<span class="token keyword">from</span> multiprocessing<span class="token punctuation">.</span>managers <span class="token keyword">import</span> BaseManager


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    BaseManager<span class="token punctuation">.</span>register<span class="token punctuation">(</span><span class="token string">&#39;task_queue&#39;</span><span class="token punctuation">)</span>
    manager <span class="token operator">=</span> BaseManager<span class="token punctuation">(</span>address<span class="token operator">=</span><span class="token punctuation">(</span><span class="token string">&#39;127.0.0.1&#39;</span><span class="token punctuation">,</span> <span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">,</span> authkey<span class="token operator">=</span><span class="token string">b&#39;producer&#39;</span><span class="token punctuation">)</span>
    manager<span class="token punctuation">.</span>connect<span class="token punctuation">(</span><span class="token punctuation">)</span>
    tasks <span class="token operator">=</span> manager<span class="token punctuation">.</span>task_queue<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>tasks<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样<code>Manager</code>便可以只用于管理通信，与业务剥离。</p>`,26),p=[i];function c(o,l){return s(),a("div",null,p)}const d=n(t,[["render",c],["__file","python-manager.html.vue"]]);export{d as default};
