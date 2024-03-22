import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as n,c as i,e as a}from"./app-FWawSowT.js";const s={},d=a(`<p>数据库各项配置主要在<code>/etc/my.cnf</code>文件中修改。</p><h1 id="_1-数据库存放位置" tabindex="-1"><a class="header-anchor" href="#_1-数据库存放位置" aria-hidden="true">#</a> 1.数据库存放位置</h1><p>安装完MariaDB后，数据资源一般默认存放在<code>/var/lib/mysql</code>目录下，该目录空间一般不大，可修改<code>datadir</code>项目来更改数据保存位置，对于开启<strong>SELinux</strong>的发行版来说，修改数据保存位置可能导致数据库启动失败，可以通过<code>setenforce 0</code>来关闭SELinux。</p><p>一般建议移动整个<code>/var/lib/mysql</code>目录，如果这样操作，记得修改<code>socket</code>条目的位置。</p><div class="language-plain line-numbers-mode" data-ext="plain"><pre class="language-plain"><code># 初始配置
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock

# 修改后
datadir=/root/mysql
socket=/root/mysql/mysql.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_2-影响到数据库超时的设置" tabindex="-1"><a class="header-anchor" href="#_2-影响到数据库超时的设置" aria-hidden="true">#</a> 2.影响到数据库超时的设置</h1><div class="language-cnf line-numbers-mode" data-ext="cnf"><pre class="language-cnf"><code># 服务器关闭非交互连接之前等待活动的秒数
wait_timeout=28800

# 服务器关闭交互式连接之前等待活动的秒数
interactive_timeout=28800
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_3-缓冲区大小" tabindex="-1"><a class="header-anchor" href="#_3-缓冲区大小" aria-hidden="true">#</a> 3.缓冲区大小</h1><div class="language-cnf line-numbers-mode" data-ext="cnf"><pre class="language-cnf"><code># 索引的缓冲区大小，增加它可得到更好的索引处理性能
key_buffer_size=256M

# 单次连接最大数据量
max_allowed_packet=768M

# 排序、读查询、join操作所能使用的缓冲区大小，每一个连接独享
read_buffer_size=4M
sort_buffer_size=4M
join_buffer_size=8M
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_4-连接数量管理" tabindex="-1"><a class="header-anchor" href="#_4-连接数量管理" aria-hidden="true">#</a> 4.连接数量管理</h1><div class="language-cnf line-numbers-mode" data-ext="cnf"><pre class="language-cnf"><code># 最大连接进程数
max_connections=768
max_connect_errors=1000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_5-重启" tabindex="-1"><a class="header-anchor" href="#_5-重启" aria-hidden="true">#</a> 5.重启</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># centos6 redhat6</span>
<span class="token function">service</span> restart mariadb.service

<span class="token comment"># centos7+ redhat7+</span>
systemctl restart mariadb.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),r=[d];function l(c,v){return n(),i("div",null,r)}const m=e(s,[["render",l],["__file","mariadb-init.html.vue"]]);export{m as default};
