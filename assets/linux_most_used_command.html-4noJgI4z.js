const e=JSON.parse('{"key":"v-71c75914","path":"/posts/linux_most_used_command.html","title":"常用Linux命令","lang":"zh-CN","frontmatter":{"title":"常用Linux命令","date":"2021-01-06T07:22:11.000Z","category":["运维"],"tag":["Linux"],"description":"任务中止 1.中止多进程任务 假设任务名为 qcluster image-20210106152455606 ps aux|grep qcluster|grep -v grep|cut -c 9-15|xargs kill -9","head":[["meta",{"property":"og:url","content":"https://arc.cpolar.cn/posts/linux_most_used_command.html"}],["meta",{"property":"og:site_name","content":"Maverick"}],["meta",{"property":"og:title","content":"常用Linux命令"}],["meta",{"property":"og:description","content":"任务中止 1.中止多进程任务 假设任务名为 qcluster image-20210106152455606 ps aux|grep qcluster|grep -v grep|cut -c 9-15|xargs kill -9"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-01-02T11:07:09.000Z"}],["meta",{"property":"article:author","content":"Chuanchao.peng"}],["meta",{"property":"article:tag","content":"Linux"}],["meta",{"property":"article:published_time","content":"2021-01-06T07:22:11.000Z"}],["meta",{"property":"article:modified_time","content":"2024-01-02T11:07:09.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"常用Linux命令\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-01-06T07:22:11.000Z\\",\\"dateModified\\":\\"2024-01-02T11:07:09.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Chuanchao.peng\\",\\"url\\":\\"https://github.com/PengchuanC\\"}]}"]]},"headers":[{"level":2,"title":"1.中止多进程任务","slug":"_1-中止多进程任务","link":"#_1-中止多进程任务","children":[]}],"git":{"createdTime":1704193629000,"updatedTime":1704193629000,"contributors":[{"name":"PengchuanC","email":"gameboynes@gmail.com","commits":1}]},"readingTime":{"minutes":0.19,"words":57},"filePathRelative":"posts/linux_most_used_command.md","localizedDate":"2021年1月6日","excerpt":"<h1> 任务中止</h1>\\n<h2> 1.中止多进程任务</h2>\\n<p>假设任务名为 <code>qcluster</code></p>\\n<figure><img src=\\"/images/linux-ps.png\\" alt=\\"image-20210106152455606\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>image-20210106152455606</figcaption></figure>\\n<div class=\\"language-bash line-numbers-mode\\" data-ext=\\"sh\\"><pre class=\\"language-bash\\"><code><span class=\\"token function\\">ps</span> aux<span class=\\"token operator\\">|</span><span class=\\"token function\\">grep</span> qcluster<span class=\\"token operator\\">|</span><span class=\\"token function\\">grep</span> <span class=\\"token parameter variable\\">-v</span> <span class=\\"token function\\">grep</span><span class=\\"token operator\\">|</span><span class=\\"token function\\">cut</span> <span class=\\"token parameter variable\\">-c</span> <span class=\\"token number\\">9</span>-15<span class=\\"token operator\\">|</span><span class=\\"token function\\">xargs</span> <span class=\\"token function\\">kill</span> <span class=\\"token parameter variable\\">-9</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};
