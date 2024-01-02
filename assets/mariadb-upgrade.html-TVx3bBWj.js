const e=JSON.parse('{"key":"v-1b5095eb","path":"/posts/mariadb-upgrade.html","title":"MariaDB 升级后无法运行","lang":"zh-CN","frontmatter":{"title":"MariaDB 升级后无法运行","date":"2021-02-24T02:15:21.000Z","category":["运维"],"tag":["MariaDB升级报错","MySQL"],"description":"1.事情起因 在redhat每次执行完yun update后，MariaDB也会升级，但我之前更换过MariaDB的数据存储目录，将数据保存在了/home/mysql目录下，导致每次升级完MariaDB后，无法启动server。 2.解决方案 2.1 更换目录 更换目录后，需要对目录重新授权，因为默认情况下，MariaDB的用户和用户组为mysql:mysql，授权代码为： ~ chown -R mysql:mysql /home/mysql ~ chown 775 /home/mysql","head":[["meta",{"property":"og:url","content":"https://arc.cpolar.cn/posts/mariadb-upgrade.html"}],["meta",{"property":"og:site_name","content":"Maverick"}],["meta",{"property":"og:title","content":"MariaDB 升级后无法运行"}],["meta",{"property":"og:description","content":"1.事情起因 在redhat每次执行完yun update后，MariaDB也会升级，但我之前更换过MariaDB的数据存储目录，将数据保存在了/home/mysql目录下，导致每次升级完MariaDB后，无法启动server。 2.解决方案 2.1 更换目录 更换目录后，需要对目录重新授权，因为默认情况下，MariaDB的用户和用户组为mysql:mysql，授权代码为： ~ chown -R mysql:mysql /home/mysql ~ chown 775 /home/mysql"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-02T11:07:09.000Z"}],["meta",{"property":"article:author","content":"Chuanchao.peng"}],["meta",{"property":"article:tag","content":"MariaDB升级报错"}],["meta",{"property":"article:tag","content":"MySQL"}],["meta",{"property":"article:published_time","content":"2021-02-24T02:15:21.000Z"}],["meta",{"property":"article:modified_time","content":"2024-01-02T11:07:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MariaDB 升级后无法运行\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-02-24T02:15:21.000Z\\",\\"dateModified\\":\\"2024-01-02T11:07:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Chuanchao.peng\\",\\"url\\":\\"https://github.com/PengchuanC\\"}]}"]]},"headers":[{"level":2,"title":"2.1 更换目录","slug":"_2-1-更换目录","link":"#_2-1-更换目录","children":[]},{"level":2,"title":"2.2 关闭selinux","slug":"_2-2-关闭selinux","link":"#_2-2-关闭selinux","children":[]},{"level":2,"title":"2.3 修改mariadb.service","slug":"_2-3-修改mariadb-service","link":"#_2-3-修改mariadb-service","children":[]}],"git":{"createdTime":1704193629000,"updatedTime":1704193629000,"contributors":[{"name":"PengchuanC","email":"gameboynes@gmail.com","commits":1}]},"readingTime":{"minutes":1.46,"words":438},"filePathRelative":"posts/mariadb-upgrade.md","localizedDate":"2021年2月24日","excerpt":"<h1> 1.事情起因</h1>\\n<p>在redhat每次执行完<code>yun update</code>后，MariaDB也会升级，但我之前更换过MariaDB的数据存储目录，将数据保存在了<code>/home/mysql</code>目录下，导致每次升级完MariaDB后，无法启动server。</p>\\n<h1> 2.解决方案</h1>\\n<h2> 2.1 更换目录</h2>\\n<p>更换目录后，需要对目录重新授权，因为默认情况下，MariaDB的用户和用户组为<code>mysql:mysql</code>，授权代码为：</p>\\n<div class=\\"language-bash line-numbers-mode\\" data-ext=\\"sh\\"><pre class=\\"language-bash\\"><code>~ <span class=\\"token function\\">chown</span> <span class=\\"token parameter variable\\">-R</span> mysql:mysql /home/mysql\\n~ <span class=\\"token function\\">chown</span> <span class=\\"token number\\">775</span> /home/mysql\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};