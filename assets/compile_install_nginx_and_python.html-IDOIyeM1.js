import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as n,e as a}from"./app-0D1gluiy.js";const i={},t=a(`<h1 id="一、起因" tabindex="-1"><a class="header-anchor" href="#一、起因" aria-hidden="true">#</a> 一、起因</h1><p>由于生产网段与测试网段隔离，但测试网段也需要数据来进行开发，于是考虑用GRPC来中转数据，并用Nginx来代理端口，需要用到Nginx的ssl相关插件，刚好Python-3.10发布，也需要升级openssl-1.1.1及以上，所以不妨将Nginx和Python都升级了。</p><h1 id="二、安装" tabindex="-1"><a class="header-anchor" href="#二、安装" aria-hidden="true">#</a> 二、安装</h1><h2 id="_1-安装openssl-1-1-1l" tabindex="-1"><a class="header-anchor" href="#_1-安装openssl-1-1-1l" aria-hidden="true">#</a> 1.安装openssl-1.1.1l</h2><h3 id="_1-1-安装依赖" tabindex="-1"><a class="header-anchor" href="#_1-1-安装依赖" aria-hidden="true">#</a> 1.1 安装依赖</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># yum install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-2-下载并安装" tabindex="-1"><a class="header-anchor" href="#_1-2-下载并安装" aria-hidden="true">#</a> 1.2 下载并安装</h3><p>下载并解压</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># cd ~/Downloads</span>
<span class="token comment"># wget https://www.openssl.org/source/openssl-1.1.1l.tar.gz --no-check-certificate</span>
<span class="token comment"># tar -xf openssl-1.1.1l.tar.gz &amp;&amp; cd openssl-1.1.1l</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>开始编译安装</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># ./config --prefix=/usr/local/openssl --openssldir=/usr/local/openssl shared zlib</span>
<span class="token comment"># make</span>
<span class="token comment"># make test</span>
<span class="token comment"># make install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-软链" tabindex="-1"><a class="header-anchor" href="#_1-3-软链" aria-hidden="true">#</a> 1.3 软链</h3><p>备份</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># mv /usr/bin/openssl /usr/bin/openssl.old</span>
<span class="token comment"># mv /usr/lib64/openssl /usr/lib64/openssl.old</span>
<span class="token comment"># mv /usr/lib64/libssl.so /usr/lib64/libssl.so.old</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重新软链</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># ln -s /usr/local/openssl/bin/openssl /usr/bin/openssl</span>
<span class="token comment"># ln -s /usr/local/openssl/include/openssl /usr/include/openssl</span>
<span class="token comment"># ln -s /usr/local/openssl/lib/libssl.so /usr/lib64/libssl.so</span>
<span class="token comment"># echo &quot;/usr/local/openssl/lib&quot; &gt;&gt; /etc/ld.so.conf</span>
<span class="token comment"># ldconfig -v </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-安装python-3-10" tabindex="-1"><a class="header-anchor" href="#_2-安装python-3-10" aria-hidden="true">#</a> 2.安装Python 3.10</h2><h3 id="_2-1-下载并解压" tabindex="-1"><a class="header-anchor" href="#_2-1-下载并解压" aria-hidden="true">#</a> 2.1 下载并解压</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># cd ~/Downloads</span>
<span class="token comment"># wget https://www.python.org/ftp/python/3.10.0/Python-3.10.0.tgz</span>
<span class="token comment"># tar -xf Python-3.10.0.tgz &amp;&amp; cd Python-3.10.0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-编译安装" tabindex="-1"><a class="header-anchor" href="#_2-2-编译安装" aria-hidden="true">#</a> 2.2 编译安装</h3><p>这里遇到了个大坑，由于Python 3.10刚出，安装资料也比较少，用了很久才把ssl模块编译进去，后来根据编译提示才知道，主要是在编译时没加<code>--with-openssl-rpath=auto</code>命令，导致ssl模块编译不进去。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># ./configure --prefix=/usr/local/python3 --with-ssl-default-suites=openssl  --with-openssl=/usr/local/openssl --with-openssl-rpath=auto</span>
<span class="token comment"># make</span>
<span class="token comment"># make install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重新链接</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># mv mv /usr/bin/python3 /usr/bin/python3.old</span>
<span class="token comment"># ln -s /usr/local/python3/bin/python3 /usr/bin/python3 </span>
<span class="token comment"># ln -s /usr/local/python3/bin/pip3 /usr/bin/pip3 </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-安装nginx-1-21-3" tabindex="-1"><a class="header-anchor" href="#_3-安装nginx-1-21-3" aria-hidden="true">#</a> 3.安装Nginx 1.21.3</h2><h3 id="_3-1-下载并解压" tabindex="-1"><a class="header-anchor" href="#_3-1-下载并解压" aria-hidden="true">#</a> 3.1 下载并解压</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># wget http://nginx.org/download/nginx-1.21.3.tar.gz --no-check-certificate</span>
<span class="token comment"># tar -xf nginx-1.21.3.tar.gz &amp;&amp; cd nginx-1.21.3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-编译安装" tabindex="-1"><a class="header-anchor" href="#_3-2-编译安装" aria-hidden="true">#</a> 3.2 编译安装</h3><p>这里在编译时又遇到问题，指定的ssl位置老是报出缺失文件错误，需要把之前安装的openssl拷贝到指定位置才行。</p><p>拷贝openssl</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># cp -r /usr/local/openssl /usr/local/.openssl</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>编译安装</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># ./configure --prefix=/etc/nginx --sbin-path=/usr/sbin/nginx --modules-path=/usr/lib64/nginx/modules --conf-path=/etc/nginx/nginx.conf --error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log --pid-path=/var/run/nginx.pid --lock-path=/var/run/nginx.lock --http-client-body-temp-path=/var/cache/nginx/client_temp --http-proxy-temp-path=/var/cache/nginx/proxy_temp --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp --http-scgi-temp-path=/var/cache/nginx/scgi_temp --user=nginx --group=nginx --with-compat --with-file-aio --with-threads --with-http_addition_module --with-http_auth_request_module --with-http_dav_module --with-http_flv_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_mp4_module --with-http_random_index_module --with-http_realip_module --with-http_secure_link_module --with-http_slice_module --with-http_ssl_module --with-http_stub_status_module --with-http_sub_module --with-http_v2_module --with-mail --with-mail_ssl_module --with-stream --with-stream_realip_module --with-stream_ssl_module --with-stream_ssl_preread_module --with-cc-opt=&#39;-O2 -g -pipe -Wall -Wp,-D_FORTIFY_SOURCE=2 -fexceptions -fstack-protector-strong --param=ssp-buffer-size=4 -grecord-gcc-switches -m64 -mtune=generic -fPIC&#39; --with-ld-opt=&#39;-Wl,-z,relro -Wl,-z,now -pie&#39; --with-openssl=/usr/local</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述指令中部分内容可自行更改，比如log位置，启动用户，pid位置，二进制文件位置等，但要代理grpc，<code>--with-http_v2_module</code>和<code>--with-http_ssl_module</code>指令是必须的。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># make</span>
<span class="token comment"># make install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>查看安装结果</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># nginx -V</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>结果应当如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>nginx version: nginx/1.21.3
built by gcc 9.3.0 (GCC) 
built with OpenSSL 1.1.1l  24 Aug 2021
TLS SNI support enabled
configure arguments: --prefix=/etc/nginx --sbin-path=/usr/sbin/nginx --modules-path=/usr/lib64/nginx/modules --conf-path=/etc/nginx/nginx.conf --error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log --pid-path=/var/run/nginx.pid --lock-path=/var/run/nginx.lock --http-client-body-temp-path=/var/cache/nginx/client_temp --http-proxy-temp-path=/var/cache/nginx/proxy_temp --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp --http-scgi-temp-path=/var/cache/nginx/scgi_temp --user=nginx --group=nginx --with-compat --with-file-aio --with-threads --with-http_addition_module --with-http_auth_request_module --with-http_dav_module --with-http_flv_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_mp4_module --with-http_random_index_module --with-http_realip_module --with-http_secure_link_module --with-http_slice_module --with-http_ssl_module --with-http_stub_status_module --with-http_sub_module --with-http_v2_module --with-mail --with-mail_ssl_module --with-stream --with-stream_realip_module --with-stream_ssl_module --with-stream_ssl_preread_module --with-cc-opt=&#39;-O2 -g -pipe -Wall -Wp,-D_FORTIFY_SOURCE=2 -fexceptions -fstack-protector-strong --param=ssp-buffer-size=4 -grecord-gcc-switches -m64 -mtune=generic -fPIC&#39; --with-ld-opt=&#39;-Wl,-z,relro -Wl,-z,now -pie&#39; --with-openssl=/usr/local
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,39),l=[t];function d(o,r){return s(),n("div",null,l)}const h=e(i,[["render",d],["__file","compile_install_nginx_and_python.html.vue"]]);export{h as default};
