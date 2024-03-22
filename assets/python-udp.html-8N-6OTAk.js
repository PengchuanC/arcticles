import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,e as t}from"./app-FWawSowT.js";const e={},p=t(`<h2 id="_1-udp简介" tabindex="-1"><a class="header-anchor" href="#_1-udp简介" aria-hidden="true">#</a> 1.UDP简介</h2><p>UDP协议（User Datagram Protocol）中文名称是用户数据报协议，是OSI（Open System Interconnection，开放式系统互联）参考模型中一种无连接的传输层协议，不需要建立连接就能直接进行数据发送和接收，属于不可靠的、没有时序的通信，但是UDP协议的实时性比较好，通常用于视频直播相关领域。</p><p>使用UDP推送数据时，不会考虑客户端是否会接受到数据，因此并不能保证它们能到达目的地。但由于UDP在传输数据报前不用在客户和服务器之间建立一个连接，且没有超时重发等机制，故而传输速度很快。</p><p>接下来简单写个demo来尝试写一个推送服务。</p><h2 id="_2-服务端" tabindex="-1"><a class="header-anchor" href="#_2-服务端" aria-hidden="true">#</a> 2.服务端</h2><p>服务端代码如下</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># server.py</span>
<span class="token keyword">import</span> socket
<span class="token keyword">import</span> time
<span class="token keyword">import</span> datetime

<span class="token keyword">from</span> concurrent<span class="token punctuation">.</span>futures <span class="token keyword">import</span> ThreadPoolExecutor


pool <span class="token operator">=</span> ThreadPoolExecutor<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>


<span class="token keyword">class</span> <span class="token class-name">Manager</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;客户端管理

    Attributes:
        address: 地址
        port: 端口
    &quot;&quot;&quot;</span>
    _clients <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    server<span class="token punctuation">:</span> socket<span class="token punctuation">.</span>socket

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> address<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span> port<span class="token punctuation">:</span> <span class="token builtin">int</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;Inits manager&quot;&quot;&quot;</span>
        server_socket <span class="token operator">=</span> socket<span class="token punctuation">.</span>socket<span class="token punctuation">(</span>socket<span class="token punctuation">.</span>AF_INET<span class="token punctuation">,</span> socket<span class="token punctuation">.</span>SOCK_DGRAM<span class="token punctuation">)</span>
        address <span class="token operator">=</span> <span class="token punctuation">(</span>address<span class="token punctuation">,</span> port<span class="token punctuation">)</span>
        server_socket<span class="token punctuation">.</span>bind<span class="token punctuation">(</span>address<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>server <span class="token operator">=</span> server_socket

    <span class="token keyword">def</span> <span class="token function">register</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> name<span class="token punctuation">,</span> client<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;注册客户端

        Args:
            name: 客户端名称
            client: 客户端ip
        &quot;&quot;&quot;</span>
        self<span class="token punctuation">.</span>_clients<span class="token punctuation">.</span>update<span class="token punctuation">(</span><span class="token punctuation">{</span>name<span class="token punctuation">:</span> client<span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;用户 </span><span class="token interpolation"><span class="token punctuation">{</span>name<span class="token punctuation">}</span></span><span class="token string"> 成功注册&#39;</span></span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">unregister</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;取消注册

        Args:
            name: 客户端名称
        &quot;&quot;&quot;</span>
        <span class="token keyword">if</span> name <span class="token keyword">in</span> self<span class="token punctuation">.</span>_clients<span class="token punctuation">.</span>keys<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>_clients<span class="token punctuation">.</span>pop<span class="token punctuation">(</span>name<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">broadcast</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> msg<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;为每一个注册的客户端推送消息

        Args:
            msg: 消息内容
        &quot;&quot;&quot;</span>
        <span class="token keyword">for</span> client <span class="token keyword">in</span> self<span class="token punctuation">.</span>_clients<span class="token punctuation">.</span>values<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>server<span class="token punctuation">.</span>sendto<span class="token punctuation">(</span>msg<span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> client<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">check_register</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;监听注册事件&quot;&quot;&quot;</span>
        <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
            name<span class="token punctuation">,</span> client_address <span class="token operator">=</span> self<span class="token punctuation">.</span>server<span class="token punctuation">.</span>recvfrom<span class="token punctuation">(</span><span class="token number">1024</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> name<span class="token punctuation">:</span>
                self<span class="token punctuation">.</span>register<span class="token punctuation">(</span>name<span class="token punctuation">.</span>decode<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> client_address<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">do</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;模拟推送业务&quot;&quot;&quot;</span>
        <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
            date <span class="token operator">=</span> datetime<span class="token punctuation">.</span>datetime<span class="token punctuation">.</span>now<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>strftime<span class="token punctuation">(</span><span class="token string">&#39;%Y-%m-%d %H:%M:%S&#39;</span><span class="token punctuation">)</span>
            self<span class="token punctuation">.</span>broadcast<span class="token punctuation">(</span>date<span class="token punctuation">)</span>
            time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>

    <span class="token decorator annotation punctuation">@staticmethod</span>
    <span class="token keyword">def</span> <span class="token function">serve</span><span class="token punctuation">(</span>address<span class="token punctuation">,</span> port<span class="token punctuation">)</span><span class="token punctuation">:</span>
        manager <span class="token operator">=</span> Manager<span class="token punctuation">(</span>address<span class="token punctuation">,</span> port<span class="token punctuation">)</span>
        pool<span class="token punctuation">.</span>submit<span class="token punctuation">(</span>manager<span class="token punctuation">.</span>check_register<span class="token punctuation">)</span>
        pool<span class="token punctuation">.</span>submit<span class="token punctuation">(</span>manager<span class="token punctuation">.</span>do<span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    Manager<span class="token punctuation">.</span>serve<span class="token punctuation">(</span><span class="token string">&#39;0.0.0.0&#39;</span><span class="token punctuation">,</span> <span class="token number">9000</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>server端每隔10秒会向订阅的客户端推送一次数据，数据内容用当前时间模拟。发现订阅和推送数据放入线程池中处理，避免堵塞。</p><h2 id="_3-客户端" tabindex="-1"><a class="header-anchor" href="#_3-客户端" aria-hidden="true">#</a> 3.客户端</h2><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># client.py</span>
<span class="token keyword">import</span> socket
<span class="token keyword">from</span> concurrent<span class="token punctuation">.</span>futures <span class="token keyword">import</span> ThreadPoolExecutor


pool <span class="token operator">=</span> ThreadPoolExecutor<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>


<span class="token keyword">class</span> <span class="token class-name">Client</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;客户端

    Attributes:
        name: 用于注册的唯一标识，通常使用uuid
        address: 远程服务器地址
        port: 远程服务器端口
    &quot;&quot;&quot;</span>

    _server<span class="token punctuation">:</span> socket<span class="token punctuation">.</span>socket
    _address<span class="token punctuation">:</span> <span class="token builtin">tuple</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> name<span class="token punctuation">,</span> address<span class="token punctuation">,</span> port<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;Inits client&quot;&quot;&quot;</span>
        self<span class="token punctuation">.</span>name <span class="token operator">=</span> name
        self<span class="token punctuation">.</span>_address <span class="token operator">=</span> <span class="token punctuation">(</span>address<span class="token punctuation">,</span> port<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>_server <span class="token operator">=</span> socket<span class="token punctuation">.</span>socket<span class="token punctuation">(</span>socket<span class="token punctuation">.</span>AF_INET<span class="token punctuation">,</span> socket<span class="token punctuation">.</span>SOCK_DGRAM<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">register</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>_server<span class="token punctuation">.</span>sendto<span class="token punctuation">(</span>self<span class="token punctuation">.</span>name<span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> self<span class="token punctuation">.</span>_address<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">receive</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
            receive<span class="token punctuation">,</span> sender <span class="token operator">=</span> self<span class="token punctuation">.</span>_server<span class="token punctuation">.</span>recvfrom<span class="token punctuation">(</span><span class="token number">1024</span><span class="token punctuation">)</span>
            receive <span class="token operator">=</span> receive<span class="token punctuation">.</span>decode<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;</span><span class="token interpolation"><span class="token punctuation">{</span>self<span class="token punctuation">.</span>name<span class="token punctuation">}</span></span><span class="token string"> 收到数据 </span><span class="token interpolation"><span class="token punctuation">{</span>receive<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    addr <span class="token operator">=</span> <span class="token string">&#39;127.0.0.1&#39;</span>
    p <span class="token operator">=</span> <span class="token number">9000</span>
    users <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;A&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;B&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;C&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;D&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;E&#39;</span><span class="token punctuation">]</span>

    <span class="token comment"># 模拟5个用户去订阅数据</span>
    <span class="token keyword">for</span> user <span class="token keyword">in</span> users<span class="token punctuation">:</span>
        client <span class="token operator">=</span> Client<span class="token punctuation">(</span>user<span class="token punctuation">,</span> addr<span class="token punctuation">,</span> p<span class="token punctuation">)</span>
        client<span class="token punctuation">.</span>register<span class="token punctuation">(</span><span class="token punctuation">)</span>
        pool<span class="token punctuation">.</span>submit<span class="token punctuation">(</span>client<span class="token punctuation">.</span>receive<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>客户端模拟5个用户去订阅数据，订阅后会持续收到服务端推送的数据。取消注册的方法暂未实现，原理类似，通常会使用tcp协议来确认客户端身份，进行订阅和取消订阅操作，数据推送使用udp。</p>`,11),o=[p];function i(c,l){return s(),a("div",null,o)}const d=n(e,[["render",i],["__file","python-udp.html.vue"]]);export{d as default};
