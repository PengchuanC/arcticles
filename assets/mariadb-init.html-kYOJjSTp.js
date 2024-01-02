const e=JSON.parse('{"key":"v-7031d24a","path":"/posts/mariadb-init.html","title":"Mariadb(MySQL)初始配置","lang":"zh-CN","frontmatter":{"title":"Mariadb(MySQL)初始配置","date":"2021-02-04T09:05:55.000Z","category":["运维"],"tag":["MariaDB","MySQL"],"description":"数据库各项配置主要在/etc/my.cnf文件中修改。 1.数据库存放位置 安装完MariaDB后，数据资源一般默认存放在/var/lib/mysql目录下，该目录空间一般不大，可修改datadir项目来更改数据保存位置，对于开启SELinux的发行版来说，修改数据保存位置可能导致数据库启动失败，可以通过setenforce 0来关闭SELinux。 一般建议移动整个/var/lib/mysql目录，如果这样操作，记得修改socket条目的位置。","head":[["meta",{"property":"og:url","content":"https://arc.cpolar.cn/posts/mariadb-init.html"}],["meta",{"property":"og:site_name","content":"Maverick"}],["meta",{"property":"og:title","content":"Mariadb(MySQL)初始配置"}],["meta",{"property":"og:description","content":"数据库各项配置主要在/etc/my.cnf文件中修改。 1.数据库存放位置 安装完MariaDB后，数据资源一般默认存放在/var/lib/mysql目录下，该目录空间一般不大，可修改datadir项目来更改数据保存位置，对于开启SELinux的发行版来说，修改数据保存位置可能导致数据库启动失败，可以通过setenforce 0来关闭SELinux。 一般建议移动整个/var/lib/mysql目录，如果这样操作，记得修改socket条目的位置。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-02T11:07:09.000Z"}],["meta",{"property":"article:author","content":"Chuanchao.peng"}],["meta",{"property":"article:tag","content":"MariaDB"}],["meta",{"property":"article:tag","content":"MySQL"}],["meta",{"property":"article:published_time","content":"2021-02-04T09:05:55.000Z"}],["meta",{"property":"article:modified_time","content":"2024-01-02T11:07:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Mariadb(MySQL)初始配置\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-02-04T09:05:55.000Z\\",\\"dateModified\\":\\"2024-01-02T11:07:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Chuanchao.peng\\",\\"url\\":\\"https://github.com/PengchuanC\\"}]}"]]},"headers":[],"git":{"createdTime":1704193629000,"updatedTime":1704193629000,"contributors":[{"name":"PengchuanC","email":"gameboynes@gmail.com","commits":1}]},"readingTime":{"minutes":1.11,"words":334},"filePathRelative":"posts/mariadb-init.md","localizedDate":"2021年2月4日","excerpt":"<p>数据库各项配置主要在<code>/etc/my.cnf</code>文件中修改。</p>\\n<h1> 1.数据库存放位置</h1>\\n<p>安装完MariaDB后，数据资源一般默认存放在<code>/var/lib/mysql</code>目录下，该目录空间一般不大，可修改<code>datadir</code>项目来更改数据保存位置，对于开启<strong>SELinux</strong>的发行版来说，修改数据保存位置可能导致数据库启动失败，可以通过<code>setenforce 0</code>来关闭SELinux。</p>\\n<p>一般建议移动整个<code>/var/lib/mysql</code>目录，如果这样操作，记得修改<code>socket</code>条目的位置。</p>","autoDesc":true}');export{e as data};
