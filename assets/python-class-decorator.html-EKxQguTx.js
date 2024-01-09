import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,e}from"./app-P62tAaUj.js";const t={},p=e(`<p>在之前使用grpc的项目中偶尔会遇到连接时间过久，tcp连接断掉的情况，于是尝试写一个装饰器来实现自动重连3次，即最大尝试4次连接。</p><p>主要使用了python中class的魔术方法<code>__call__</code>和递归函数。</p><h2 id="_1-python中的-call-方法" tabindex="-1"><a class="header-anchor" href="#_1-python中的-call-方法" aria-hidden="true">#</a> 1.Python中的<code>__call__</code>方法</h2><p><code>__call__</code>函数的作用是将一个类变为<code>callable</code>对象，即可用用<code>()</code>来调用一个已经实例化的对象，这也是将<code>class</code>作为装饰器的关键。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Test</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;调用init&#39;</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__new__</span><span class="token punctuation">(</span>cls<span class="token punctuation">,</span> <span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;调用new&#39;</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token builtin">object</span><span class="token punctuation">.</span>__new__<span class="token punctuation">(</span>cls<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__call__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> <span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;调用call&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>python中对象实例化时，会一次调用<code>__new__</code>和<code>__init__</code>函数，然后调用实例化后的对象，会调用<code>__call__</code>函数，比如：</p><div class="language-pow line-numbers-mode" data-ext="pow"><pre class="language-pow"><code>&gt;&gt;&gt; t = Test()
调用new
调用init

&gt;&gt; t()
调用call
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-实现装饰器" tabindex="-1"><a class="header-anchor" href="#_2-实现装饰器" aria-hidden="true">#</a> 2.实现装饰器</h2><p>了解<code>__call__</code>运行的机制后，便可以利用它的特性来实现装饰器了。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Reconnect</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;网络访问自动重连

    Attributes:
        func: 被装饰的函数
        calls: 函数被调用的次数
    &quot;&quot;&quot;</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> func<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>func <span class="token operator">=</span> func
        self<span class="token punctuation">.</span>calls <span class="token operator">=</span> <span class="token number">0</span>

    <span class="token keyword">def</span> <span class="token function">reconnect</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> <span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;重新连接

        当次数达到第四次时，直接返回函数，不论是否成功，不再进行重连
        当次数小于四次时，如果是ConnectionError则递归调用重连函数
        如果是其他错误，则直接抛出错误
        &quot;&quot;&quot;</span>
        self<span class="token punctuation">.</span>calls <span class="token operator">+=</span> <span class="token number">1</span>
        <span class="token keyword">if</span> self<span class="token punctuation">.</span>calls <span class="token operator">&gt;</span> <span class="token number">3</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> self<span class="token punctuation">.</span>func<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> self<span class="token punctuation">.</span>func<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
        <span class="token keyword">except</span> ConnectionError <span class="token keyword">as</span> e<span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
            <span class="token keyword">return</span> self<span class="token punctuation">.</span>reconnect<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
        <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
            <span class="token keyword">raise</span> e

    <span class="token keyword">def</span> <span class="token function">__repr__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;尝试还原函数本身签名&quot;&quot;&quot;</span>
        <span class="token keyword">return</span> <span class="token builtin">repr</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>func<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__call__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> <span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>reconnect<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>初始化装饰器时，会需要传入一个被装饰的函数和生成一个内部用来记录重试次数的变量<code>calls</code>，重试的逻辑主要在<code>reconnect</code>函数中实现，重试逻辑中只捕获<code>ConnectionError</code>并进行重试，接下来模拟网络连接中会发生的错误。</p><h2 id="_3-模拟网络访问中的错误" tabindex="-1"><a class="header-anchor" href="#_3-模拟网络访问中的错误" aria-hidden="true">#</a> 3.模拟网络访问中的错误</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Reconnect
def add(a, b):
    # 模拟不稳定的网络
    net_state = random.randint(0, 10)
    if net_state &gt; 9:
        raise ConnectionRefusedError(f&#39;connection refuse, net state {net_state}&#39;)
    elif net_state &gt; 5:
        raise ConnectionError(f&#39;connection error, net state {net_state}&#39;)
    return a+b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>利用<code>random</code>库产生的随机数来模拟网络环境，调用<code>add</code>检验装饰器是否生效：</p><div class="language-pow line-numbers-mode" data-ext="pow"><pre class="language-pow"><code>&gt;&gt;&gt; add(5, 2)
7

&gt;&gt;&gt; add(5, 2)
connection error, net state 6
connection error, net state 8
connection refuse, net state 10
7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可用看到，装饰器已经生效。</p><h2 id="_4-关于函数签名" tabindex="-1"><a class="header-anchor" href="#_4-关于函数签名" aria-hidden="true">#</a> 4.关于函数签名</h2><p>在定义装饰器时，使用到了<code>__repr__</code>方法，该方法主要定义对象的输出内容，当函数经过装饰器的装饰，其实际签名信息已经被覆盖，在日志中已经无法定位到具体函数的信息，如果在上例中，注释掉<code>__repr__</code>相关内容，我们可以看到：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt;&gt;&gt; add
&lt;Reconnect object at 0x000001A80CE48FD0&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>实际上<code>add</code>函数自身信息已经丢失，如果使用了<code>__repr__</code>后，则可用看到：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&gt;&gt;&gt; add
&lt;function add at 0x0000021862BAE040&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在函数型装饰器中，可用使用<code>collections</code>模块下的<code>wraps</code>对象来实现函数的反签名，在装饰器类中尚未尝试，可以作为后续研究内容。</p><h2 id="_5-完整代码" tabindex="-1"><a class="header-anchor" href="#_5-完整代码" aria-hidden="true">#</a> 5.完整代码</h2><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># demo.py</span>
<span class="token keyword">import</span> random


<span class="token keyword">class</span> <span class="token class-name">Reconnect</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;网络访问自动重连

    Attributes:
        func: 被装饰的函数
        calls: 函数被调用的次数
    &quot;&quot;&quot;</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> func<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>func <span class="token operator">=</span> func
        self<span class="token punctuation">.</span>calls <span class="token operator">=</span> <span class="token number">0</span>

    <span class="token keyword">def</span> <span class="token function">reconnect</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> <span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;重新连接

        当次数达到第四次时，直接返回函数，不论是否成功，不再进行重连
        当次数小于四次时，如果是ConnectionError则递归调用重连函数
        如果是其他错误，则直接抛出错误
        &quot;&quot;&quot;</span>
        self<span class="token punctuation">.</span>calls <span class="token operator">+=</span> <span class="token number">1</span>
        <span class="token keyword">if</span> self<span class="token punctuation">.</span>calls <span class="token operator">&gt;</span> <span class="token number">3</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> self<span class="token punctuation">.</span>func<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> self<span class="token punctuation">.</span>func<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
        <span class="token keyword">except</span> ConnectionError <span class="token keyword">as</span> e<span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
            <span class="token keyword">return</span> self<span class="token punctuation">.</span>reconnect<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
        <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
            <span class="token keyword">raise</span> e

    <span class="token keyword">def</span> <span class="token function">__repr__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;尝试还原函数本身签名&quot;&quot;&quot;</span>
        <span class="token keyword">return</span> <span class="token builtin">repr</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>func<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__call__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> <span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>reconnect<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@Reconnect</span>
<span class="token keyword">def</span> <span class="token function">add</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 模拟不稳定的网络</span>
    net_state <span class="token operator">=</span> random<span class="token punctuation">.</span>randint<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> net_state <span class="token operator">&gt;</span> <span class="token number">9</span><span class="token punctuation">:</span>
        <span class="token keyword">raise</span> ConnectionRefusedError<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;connection refuse, net state </span><span class="token interpolation"><span class="token punctuation">{</span>net_state<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">elif</span> net_state <span class="token operator">&gt;</span> <span class="token number">5</span><span class="token punctuation">:</span>
        <span class="token keyword">raise</span> ConnectionError<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;connection error, net state </span><span class="token interpolation"><span class="token punctuation">{</span>net_state<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> a<span class="token operator">+</span>b


<span class="token keyword">def</span> <span class="token function">minus</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> a<span class="token operator">-</span>b


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>add<span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>minus<span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>add<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,24),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(t,[["render",c],["__file","python-class-decorator.html.vue"]]);export{d as default};
