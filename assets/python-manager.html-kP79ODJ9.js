const e=JSON.parse('{"key":"v-6f9b1aba","path":"/python/python-manager.html","title":"Python利用Manager在分布式进程间进行通信","lang":"zh-CN","frontmatter":{"title":"Python利用Manager在分布式进程间进行通信","date":"2020-12-17T03:01:25.000Z","category":["技术","python"],"tag":["python","manager","分布式","多进程通信"],"description":"在具有亲缘的多进程程序中，通常可用使用queue、pipe等数据结构来进行数据共享和传递消息，但在分布式进程中，进程间的通信还需要依靠网络来进行传输。 在之前的文章中，我们通过grpc服务来传输数据，实际上在Python标准库multiprocessing的managers模块已经包含了分布式进程通信的功能，主要使用BaseManager对象。 1.BaseManager对象 官网文档对BaseManager的描述：","head":[["meta",{"property":"og:url","content":"https://arc.cpolar.cn/python/python-manager.html"}],["meta",{"property":"og:site_name","content":"Maverick"}],["meta",{"property":"og:title","content":"Python利用Manager在分布式进程间进行通信"}],["meta",{"property":"og:description","content":"在具有亲缘的多进程程序中，通常可用使用queue、pipe等数据结构来进行数据共享和传递消息，但在分布式进程中，进程间的通信还需要依靠网络来进行传输。 在之前的文章中，我们通过grpc服务来传输数据，实际上在Python标准库multiprocessing的managers模块已经包含了分布式进程通信的功能，主要使用BaseManager对象。 1.BaseManager对象 官网文档对BaseManager的描述："}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-02T11:07:09.000Z"}],["meta",{"property":"article:author","content":"Chuanchao.peng"}],["meta",{"property":"article:tag","content":"python"}],["meta",{"property":"article:tag","content":"manager"}],["meta",{"property":"article:tag","content":"分布式"}],["meta",{"property":"article:tag","content":"多进程通信"}],["meta",{"property":"article:published_time","content":"2020-12-17T03:01:25.000Z"}],["meta",{"property":"article:modified_time","content":"2024-01-02T11:07:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Python利用Manager在分布式进程间进行通信\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-12-17T03:01:25.000Z\\",\\"dateModified\\":\\"2024-01-02T11:07:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Chuanchao.peng\\",\\"url\\":\\"https://github.com/PengchuanC\\"}]}"]]},"headers":[{"level":2,"title":"1.BaseManager对象","slug":"_1-basemanager对象","link":"#_1-basemanager对象","children":[]},{"level":2,"title":"2.Server端","slug":"_2-server端","link":"#_2-server端","children":[]},{"level":2,"title":"3.Client端","slug":"_3-client端","link":"#_3-client端","children":[]},{"level":2,"title":"4.进一步拆分","slug":"_4-进一步拆分","link":"#_4-进一步拆分","children":[{"level":3,"title":"4.1 Manager","slug":"_4-1-manager","link":"#_4-1-manager","children":[]},{"level":3,"title":"4.2 Server","slug":"_4-2-server","link":"#_4-2-server","children":[]},{"level":3,"title":"4.3 Client","slug":"_4-3-client","link":"#_4-3-client","children":[]}]}],"git":{"createdTime":1704193629000,"updatedTime":1704193629000,"contributors":[{"name":"PengchuanC","email":"gameboynes@gmail.com","commits":1}]},"readingTime":{"minutes":5.22,"words":1565},"filePathRelative":"python/python-manager.md","localizedDate":"2020年12月17日","excerpt":"<p>在具有亲缘的多进程程序中，通常可用使用<code>queue</code>、<code>pipe</code>等数据结构来进行数据共享和传递消息，但在分布式进程中，进程间的通信还需要依靠网络来进行传输。</p>\\n<p>在之前的文章中，我们通过grpc服务来传输数据，实际上在Python标准库<code>multiprocessing</code>的<code>managers</code>模块已经包含了分布式进程通信的功能，主要使用<code>BaseManager</code>对象。</p>\\n<h2> 1.BaseManager对象</h2>\\n<p>官网文档对BaseManager的描述：</p>","autoDesc":true}');export{e as data};
