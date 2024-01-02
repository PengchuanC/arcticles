const t=JSON.parse('{"key":"v-82289b88","path":"/posts/consul.html","title":"Python利用Consul实现服务发现","lang":"zh-CN","frontmatter":{"title":"Python利用Consul实现服务发现","date":"2021-04-23T06:17:25.000Z","tag":["consul","服务发现","微服务"],"description":"1.背景 由于基金筛选系统和组合管理系统间存在一些互相需要使用到的基础数据，但又不想重复创建数据库表单和同步数据，因此在两个项目中使用了grpc来实现数据调用；早期实现的grpc版本中直接使用对方的IP和端口，每次调整或部署到其他地方都需要修改代码，因此考虑使用服务注册和发现来解决这个问题。 对比了etcd和consul两个方案，由于后端使用的语言是python，而etcd的版本比较多，导致相关的库也需要对应版本，使用起来比较麻烦，因此最终使用consul和对应的库python-consul。","head":[["meta",{"property":"og:url","content":"https://arc.cpolar.cn/posts/consul.html"}],["meta",{"property":"og:site_name","content":"Maverick"}],["meta",{"property":"og:title","content":"Python利用Consul实现服务发现"}],["meta",{"property":"og:description","content":"1.背景 由于基金筛选系统和组合管理系统间存在一些互相需要使用到的基础数据，但又不想重复创建数据库表单和同步数据，因此在两个项目中使用了grpc来实现数据调用；早期实现的grpc版本中直接使用对方的IP和端口，每次调整或部署到其他地方都需要修改代码，因此考虑使用服务注册和发现来解决这个问题。 对比了etcd和consul两个方案，由于后端使用的语言是python，而etcd的版本比较多，导致相关的库也需要对应版本，使用起来比较麻烦，因此最终使用consul和对应的库python-consul。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-02T11:07:09.000Z"}],["meta",{"property":"article:author","content":"Chuanchao.peng"}],["meta",{"property":"article:tag","content":"consul"}],["meta",{"property":"article:tag","content":"服务发现"}],["meta",{"property":"article:tag","content":"微服务"}],["meta",{"property":"article:published_time","content":"2021-04-23T06:17:25.000Z"}],["meta",{"property":"article:modified_time","content":"2024-01-02T11:07:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Python利用Consul实现服务发现\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-04-23T06:17:25.000Z\\",\\"dateModified\\":\\"2024-01-02T11:07:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Chuanchao.peng\\",\\"url\\":\\"https://github.com/PengchuanC\\"}]}"]]},"headers":[{"level":2,"title":"2.1安装","slug":"_2-1安装","link":"#_2-1安装","children":[]},{"level":2,"title":"2.2启动","slug":"_2-2启动","link":"#_2-2启动","children":[]}],"git":{"createdTime":1704193629000,"updatedTime":1704193629000,"contributors":[{"name":"PengchuanC","email":"gameboynes@gmail.com","commits":1}]},"readingTime":{"minutes":1.67,"words":502},"filePathRelative":"posts/consul.md","localizedDate":"2021年4月23日","excerpt":"<h1> 1.背景</h1>\\n<p>由于基金筛选系统和组合管理系统间存在一些互相需要使用到的基础数据，但又不想重复创建数据库表单和同步数据，因此在两个项目中使用了grpc来实现数据调用；早期实现的grpc版本中直接使用对方的IP和端口，每次调整或部署到其他地方都需要修改代码，因此考虑使用服务注册和发现来解决这个问题。</p>\\n<p>对比了<strong>etcd</strong>和<strong>consul</strong>两个方案，由于后端使用的语言是python，而etcd的版本比较多，导致相关的库也需要对应版本，使用起来比较麻烦，因此最终使用consul和对应的库<code>python-consul</code>。</p>","autoDesc":true}');export{t as data};