import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as e,c as s,e as t}from"./app-H1lq-Ewb.js";const a={},i=t(`<p>在编程语言中，string类型往往是通过int数组来实现的，在python中，str和int[]同样可以转换</p><h3 id="_1-str转bytes" tabindex="-1"><a class="header-anchor" href="#_1-str转bytes" aria-hidden="true">#</a> 1.str转bytes</h3><p>将字符串转化为bytes类型，即int数组</p><div class="language-pow line-numbers-mode" data-ext="pow"><pre class="language-pow"><code>&gt;&gt;&gt; a = &#39;abc&#39;

&gt;&gt;&gt; # 将a转为bytes类型
&gt;&gt;&gt; a.encode()
b&#39;abc&#39;

&gt;&gt;&gt; # 转为List[int]
&gt;&gt;&gt; list(a)
[97, 98, 99]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-将int数组转化为str" tabindex="-1"><a class="header-anchor" href="#_2-将int数组转化为str" aria-hidden="true">#</a> 2.将int数组转化为str</h3><div class="language-po line-numbers-mode" data-ext="po"><pre class="language-po"><code>&gt;&gt;&gt; a = <span class="token punctuation">[</span><span class="token number">97</span>, <span class="token number">98</span>, <span class="token number">99</span><span class="token punctuation">]</span>

&gt;&gt;&gt; <span class="token comment translator-comment"># 先转为bytes</span>
&gt;&gt;&gt; bytes(a)
b&#39;abc&#39;
&gt;&gt;&gt; bytes(a).decode()
&#39;abc&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),d=[i];function r(l,c){return e(),s("div",null,d)}const b=n(a,[["render",r],["__file","python-bytes-str.html.vue"]]);export{b as default};
