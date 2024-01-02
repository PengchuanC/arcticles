import{_ as t}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as i,o,c as p,f as c,a as s,b as n,d as l,e as a}from"./app-0D1gluiy.js";const d={},r=s("p",null,"Django在3.0正式引入asgi，部署方式与2.x略有不同",-1),u=a(`<h2 id="仅部署http网站" tabindex="-1"><a class="header-anchor" href="#仅部署http网站" aria-hidden="true">#</a> 仅部署http网站</h2><p>如果仅部署http网站，可采用uvicorn来进行部署，然后通过nginx代理地址即可</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> <span class="token builtin class-name">cd</span> <span class="token punctuation">[</span>your_project<span class="token punctuation">]</span>
<span class="token operator">&gt;</span> <span class="token function">nohup</span> uvicorn <span class="token punctuation">[</span>your_project<span class="token punctuation">]</span>.asgi:application <span class="token parameter variable">--host</span> <span class="token number">0.0</span>.0.0 <span class="token parameter variable">--port</span> <span class="token number">5000</span> <span class="token operator">&gt;</span> asgi.log <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>server {
  location / {
    proxy_pass http://0.0.0.0:5000;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="部署http和websocket" tabindex="-1"><a class="header-anchor" href="#部署http和websocket" aria-hidden="true">#</a> 部署http和websocket</h2>`,5),v={href:"https://channels.readthedocs.io/en/stable/",target:"_blank",rel:"noopener noreferrer"},m=a(`<p>官方推荐使用daphne部署</p><p>以我当前的<code>sma_management</code>项目为例，django3.x版本中，在 <code>sma_management/sma_management/</code>目录下应当有<code>asgi.py</code>文件，引入channels后，应当如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> os
<span class="token keyword">import</span> django
<span class="token keyword">from</span> django<span class="token punctuation">.</span>core<span class="token punctuation">.</span>asgi <span class="token keyword">import</span> get_asgi_application


os<span class="token punctuation">.</span>environ<span class="token punctuation">.</span>setdefault<span class="token punctuation">(</span><span class="token string">&quot;DJANGO_SETTINGS_MODULE&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;sma_management.settings&quot;</span><span class="token punctuation">)</span>
django<span class="token punctuation">.</span>setup<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">from</span> channels<span class="token punctuation">.</span>auth <span class="token keyword">import</span> AuthMiddlewareStack
<span class="token keyword">from</span> channels<span class="token punctuation">.</span>routing <span class="token keyword">import</span> ProtocolTypeRouter<span class="token punctuation">,</span> URLRouter
<span class="token keyword">import</span> investment<span class="token punctuation">.</span>routing


application <span class="token operator">=</span> ProtocolTypeRouter<span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token string">&quot;http&quot;</span><span class="token punctuation">:</span> get_asgi_application<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token string">&quot;websocket&quot;</span><span class="token punctuation">:</span> AuthMiddlewareStack<span class="token punctuation">(</span>
        URLRouter<span class="token punctuation">(</span>
            investment<span class="token punctuation">.</span>routing<span class="token punctuation">.</span>websocket_urlpatterns
        <span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中<code>django.setup()</code>命令必须在channels相关业务前引入，不然daphne启动服务会抛出错误</p><p>配置好<code>asgi.py</code>后，仅需在项目目录中启动shell，输入：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&gt;</span> <span class="token function">nohup</span> daphne <span class="token parameter variable">-p</span> <span class="token number">8000</span> sma_management.asgi:application <span class="token operator">&gt;</span> daphne.log <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>http和ws服务均使用8000端口，使用Nginx代理的话，配置如下：</p><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>
upstream channels-backend {
    server localhost:8000;
}

server {
  location /management {
      proxy_pass http://0.0.0.0:8000;
  }

  location /ws {
      proxy_pass http://channels-backend;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection &quot;upgrade&quot;;

      proxy_redirect off;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Host $server_name;
  }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样便可以使用 http://0.0.0.0/management/ 访问http服务，使用 ws://0.0.0.0/ws/ 访问ws服务</p>`,9);function b(k,h){const e=i("ExternalLinkIcon");return o(),p("div",null,[r,c(" more "),u,s("p",null,[n("Django中websocket功能主要通过"),s("a",v,[n("django-channels"),l(e)]),n("组件实现，由于引入了ws，部署方式略有不同")]),m])}const y=t(d,[["render",b],["__file","django-channels-deploy.html.vue"]]);export{y as default};
