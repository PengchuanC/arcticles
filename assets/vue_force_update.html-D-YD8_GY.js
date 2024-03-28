import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as a,c as s,e}from"./app-H1lq-Ewb.js";const t={},c=e(`<h3 id="解决方法" tabindex="-1"><a class="header-anchor" href="#解决方法" aria-hidden="true">#</a> 解决方法</h3><p>在使用vue3或vue2时，时常遇到数组或对象更新，但在列表渲染的UI却没有随数据改变而刷新，这是由于 JavaScript 的限制，Vue 不能检测数组的变动，如果要更新数组，可以采用<code>push</code>、<code>splice</code>、<code>concat</code>等方法，对象可以使用<code>assign</code>方法，如果以上方法不生效，可以强制刷新页面，主要是通过修改列表渲染的<code>key</code>来实现，vue在修改<code>key</code>时，会强制刷新页面。</p><h4 id="_1-简单解决" tabindex="-1"><a class="header-anchor" href="#_1-简单解决" aria-hidden="true">#</a> 1.简单解决</h4><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>state.updateKey<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
            ...
    	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>javascript</span><span class="token punctuation">&gt;</span></span>
    import ...
    
	export default({
    	setup(){
    		const state = reactive({
    			updateKey: 0
    		})
    	}
    
    	const updateArray = ()=&gt;{
    		...
    		state.updateKey ++
    	}
    	return { state }
    })
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>javascript</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-复杂方式" tabindex="-1"><a class="header-anchor" href="#_2-复杂方式" aria-hidden="true">#</a> 2.复杂方式</h4><p>在列表渲染时保证每一个tag的<code>key</code>是唯一的，也就是不要直接使用<code>index</code>作为<code>key</code>，这样array变化后，<code>key</code>也会变动，页面自然就刷新了。</p>`,6),i=[c];function l(p,d){return a(),s("div",null,i)}const r=n(t,[["render",l],["__file","vue_force_update.html.vue"]]);export{r as default};
