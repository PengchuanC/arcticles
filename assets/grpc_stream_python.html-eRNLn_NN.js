import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,e}from"./app-FWawSowT.js";const p={},t=e(`<p>传统文件的下载方式主要使用tcp服务，这种功能同样可以使用grpc的stream来实现，通过使用流(streaming)，可以向服务器或者客户端持续发送数据，来达到上传和下载文件的目的。</p><p>Python中使用stream的要点在于灵活运用generator，发送数据使用yield，数据传输完成使用return而非break。</p><h2 id="_1-创建项目" tabindex="-1"><a class="header-anchor" href="#_1-创建项目" aria-hidden="true">#</a> 1.创建项目</h2><p>整个项目位于desktop目录下，首先新建必要的目录及文件。</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>desktop&gt; mkdir file_server
desktop&gt; mkdir file_server/proto
desktop&gt; mkdir file_server/send
desktop&gt; mkdir file_server/download
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code>file_server</code>目录下添加<code>__init__.py</code>文件，保证<code>file_sever</code>为一个python package</p><p>在<code>file_server/send</code>目录下新建<code>send.xlsx</code>文件，测试下载文件，可以在文件中写入一些数据方便检查是否下载成功。</p><p>在<code>file_server/download</code>目录下新建文件<code>download.docx</code>文件，测试上传文件，同样可以写入一些内容来测试是否上传成功。</p><h2 id="_2-创建proto文件" tabindex="-1"><a class="header-anchor" href="#_2-创建proto文件" aria-hidden="true">#</a> 2.创建proto文件</h2><p>在<code>file_server</code>目录下创建<code>fileserver.proto</code>文件来定义grpc服务，文件内容如下：</p><div class="language-protobuf line-numbers-mode" data-ext="protobuf"><pre class="language-protobuf"><code><span class="token keyword">syntax</span> <span class="token operator">=</span> <span class="token string">&quot;proto3&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">package</span> file_server<span class="token punctuation">;</span>


<span class="token comment">// 文件传输服务</span>
<span class="token keyword">service</span> <span class="token class-name">FileTransfer</span> <span class="token punctuation">{</span>
  <span class="token comment">// 上传文件</span>
  <span class="token keyword">rpc</span> <span class="token function">SendFile</span><span class="token punctuation">(</span><span class="token keyword">stream</span> <span class="token class-name">RequestSend</span><span class="token punctuation">)</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token class-name">ResponseStatus</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 下载文件</span>
  <span class="token keyword">rpc</span> <span class="token function">DownloadFile</span><span class="token punctuation">(</span><span class="token class-name">RequestFile</span><span class="token punctuation">)</span> <span class="token keyword">returns</span> <span class="token punctuation">(</span><span class="token keyword">stream</span> <span class="token class-name">ResponseStream</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 文件上传数据流</span>
<span class="token keyword">message</span> <span class="token class-name">RequestSend</span> <span class="token punctuation">{</span>
  <span class="token builtin">bytes</span> data <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 上传结果状态</span>
<span class="token keyword">message</span> <span class="token class-name">ResponseStatus</span> <span class="token punctuation">{</span>
  <span class="token builtin">bool</span> ok <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 文件下载请求</span>
<span class="token keyword">message</span> <span class="token class-name">RequestFile</span> <span class="token punctuation">{</span>
  <span class="token builtin">string</span> name <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 文件下载数据流</span>
<span class="token keyword">message</span> <span class="token class-name">ResponseStream</span> <span class="token punctuation">{</span>
  <span class="token builtin">bytes</span> data <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后编译<code>fileserver.proto</code>文件为python文件</p><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>python <span class="token operator">-</span>m grpc_tools<span class="token punctuation">.</span>protoc <span class="token operator">--</span>python_out=<span class="token punctuation">.</span><span class="token operator">/</span>file_server <span class="token operator">--</span>grpc_python_out=<span class="token punctuation">.</span><span class="token operator">/</span>file_server <span class="token operator">-</span>I <span class="token punctuation">.</span><span class="token operator">/</span>file_server/proto fileserver<span class="token punctuation">.</span>proto
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>相关参数解释：</p><ul><li>--python-out: <code>fileserver_pb.py</code>文件的输出目录</li><li>--grpc_python_out：<code>fileserver_pb_grpc.py</code>文件输出目录</li><li>-I: protobuf源文件所在目录</li></ul><p>修改生成的<code>filesever_pb_grpc.py</code>的<code>import</code>部分代码:</p><div class="language-pyth line-numbers-mode" data-ext="pyth"><pre class="language-pyth"><code># Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
&quot;&quot;&quot;Client and server classes corresponding to protobuf-defined services.&quot;&quot;&quot;
import grpc

import file_server.fileserver_pb2 as fileserver__pb2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改原因是package方式组织的python代码引入模块的方式与单文件脚本的引入方式不同，直接引入<code>fileserver__pb2</code>模块的话会提示无法找到该模块。</p><h2 id="_3-创建server端" tabindex="-1"><a class="header-anchor" href="#_3-创建server端" aria-hidden="true">#</a> 3.创建server端</h2><p>在<code>file_server</code>目录下新建<code>server.py</code>文件，内容如下:</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> time

<span class="token keyword">import</span> grpc
<span class="token keyword">from</span> concurrent <span class="token keyword">import</span> futures
<span class="token keyword">from</span> pathlib <span class="token keyword">import</span> Path

<span class="token keyword">import</span> file_server<span class="token punctuation">.</span>fileserver_pb2 <span class="token keyword">as</span> fp
<span class="token keyword">import</span> file_server<span class="token punctuation">.</span>fileserver_pb2_grpc <span class="token keyword">as</span> fpg


base_path <span class="token operator">=</span> Path<span class="token punctuation">(</span>__file__<span class="token punctuation">)</span><span class="token punctuation">.</span>parent


<span class="token keyword">def</span> <span class="token function">file_read</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;读取待发送的文件的内容

    由于是测试脚本，直接读取待下载的文件，即 ./file_server/send.xlsx
    模拟大文件需要分块读取，持续发送
    Args:
        name: 文件名
    Returns:

    &quot;&quot;&quot;</span>
    send_file_path <span class="token operator">=</span> base_path <span class="token operator">/</span> <span class="token string">&#39;send&#39;</span> <span class="token operator">/</span> name
    size <span class="token operator">=</span> <span class="token number">1024</span>
    <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>send_file_path<span class="token punctuation">,</span> <span class="token string">&#39;rb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token builtin">file</span><span class="token punctuation">:</span>
        start <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
            <span class="token builtin">file</span><span class="token punctuation">.</span>seek<span class="token punctuation">(</span>start<span class="token punctuation">)</span>
            read <span class="token operator">=</span> <span class="token builtin">file</span><span class="token punctuation">.</span>read<span class="token punctuation">(</span>size<span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token keyword">not</span> read<span class="token punctuation">:</span>
                <span class="token keyword">return</span>
            <span class="token keyword">yield</span> fp<span class="token punctuation">.</span>ResponseStream<span class="token punctuation">(</span>data<span class="token operator">=</span>read<span class="token punctuation">)</span>
            start <span class="token operator">+=</span> size


<span class="token keyword">class</span> <span class="token class-name">FileTransferServer</span><span class="token punctuation">(</span>fpg<span class="token punctuation">.</span>FileTransferServicer<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;文件传输服务&quot;&quot;&quot;</span>

    <span class="token keyword">def</span> <span class="token function">SendFile</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> request_iterator<span class="token punctuation">,</span> context<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;文件发送服务

        继承定义好的文件发送服务
        Args:
            request_iterator: 上传的文件流 : Generator[byte]
            context: 上下文

        Returns:
            文件上传的状态 :ResponseStatus
        &quot;&quot;&quot;</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;接受到文件上传请求&#39;</span><span class="token punctuation">)</span>
        send_file <span class="token operator">=</span> base_path <span class="token operator">/</span> <span class="token string">&#39;send&#39;</span> <span class="token operator">/</span> <span class="token string">&#39;download.docx&#39;</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>send_file<span class="token punctuation">,</span> <span class="token string">&#39;wb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
                <span class="token keyword">for</span> r <span class="token keyword">in</span> request_iterator<span class="token punctuation">:</span>
                    f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>r<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
            <span class="token keyword">return</span> fp<span class="token punctuation">.</span>ResponseStatus<span class="token punctuation">(</span>ok<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
        <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
            <span class="token keyword">return</span> fp<span class="token punctuation">.</span>ResponseStatus<span class="token punctuation">(</span>ok<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">DownloadFile</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> request<span class="token punctuation">,</span> context<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;文件下载服务

        继承定义好的文件下载服务
        Args:
            request: 请求需要下载的文件名 :RequestFile
            context: 上下文管理

        Returns:
            文件下载的数据流 :ResponseStream
        &quot;&quot;&quot;</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
        file_name <span class="token operator">=</span> request<span class="token punctuation">.</span>name
        <span class="token builtin">file</span> <span class="token operator">=</span> file_read<span class="token punctuation">(</span>name<span class="token operator">=</span>file_name<span class="token punctuation">)</span>
        <span class="token keyword">for</span> response <span class="token keyword">in</span> <span class="token builtin">file</span><span class="token punctuation">:</span>
            <span class="token keyword">yield</span> response

    <span class="token decorator annotation punctuation">@staticmethod</span>
    <span class="token keyword">def</span> <span class="token function">serve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;启动服务

        Returns:

        &quot;&quot;&quot;</span>
        server <span class="token operator">=</span> grpc<span class="token punctuation">.</span>server<span class="token punctuation">(</span>futures<span class="token punctuation">.</span>ThreadPoolExecutor<span class="token punctuation">(</span>max_workers<span class="token operator">=</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        fpg<span class="token punctuation">.</span>add_FileTransferServicer_to_server<span class="token punctuation">(</span>FileTransferServer<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> server<span class="token punctuation">)</span>
        server<span class="token punctuation">.</span>add_insecure_port<span class="token punctuation">(</span><span class="token string">&quot;[::]:50051&quot;</span><span class="token punctuation">)</span>
        server<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
                <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;start server&quot;</span><span class="token punctuation">)</span>
                time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">60</span><span class="token operator">*</span><span class="token number">60</span><span class="token operator">*</span><span class="token number">24</span><span class="token punctuation">)</span>
        <span class="token keyword">except</span> KeyboardInterrupt<span class="token punctuation">:</span>
            server<span class="token punctuation">.</span>stop<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    FileTransferServer<span class="token punctuation">.</span>serve<span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-创建client端" tabindex="-1"><a class="header-anchor" href="#_4-创建client端" aria-hidden="true">#</a> 4.创建client端</h2><p>在<code>file_server</code>目录下新建<code>client.py</code>文件，内容如下：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> grpc

<span class="token keyword">from</span> pathlib <span class="token keyword">import</span> Path

<span class="token keyword">from</span> file_server <span class="token keyword">import</span> fileserver_pb2 <span class="token keyword">as</span> fp<span class="token punctuation">,</span> fileserver_pb2_grpc <span class="token keyword">as</span> fpg


base_path <span class="token operator">=</span> Path<span class="token punctuation">(</span>__file__<span class="token punctuation">)</span><span class="token punctuation">.</span>parent


<span class="token keyword">def</span> <span class="token function">send_file</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;上传文件

    模拟大文件，分块发送
    Returns:

    &quot;&quot;&quot;</span>
    file_path <span class="token operator">=</span> base_path <span class="token operator">/</span> <span class="token string">&#39;download&#39;</span> <span class="token operator">/</span> <span class="token string">&#39;download.docx&#39;</span>
    <span class="token comment"># 模拟大文件，分块读取发送</span>
    size <span class="token operator">=</span> <span class="token number">1024</span>
    <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>file_path<span class="token punctuation">,</span> <span class="token string">&#39;rb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
        start <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
            f<span class="token punctuation">.</span>seek<span class="token punctuation">(</span>start<span class="token punctuation">)</span>
            read <span class="token operator">=</span> f<span class="token punctuation">.</span>read<span class="token punctuation">(</span>size<span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token keyword">not</span> read<span class="token punctuation">:</span>
                <span class="token keyword">return</span>
            request <span class="token operator">=</span> fp<span class="token punctuation">.</span>RequestSend<span class="token punctuation">(</span>data<span class="token operator">=</span>read<span class="token punctuation">)</span>
            <span class="token keyword">yield</span> request
            start <span class="token operator">+=</span> size


<span class="token keyword">class</span> <span class="token class-name">Client</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    stub<span class="token punctuation">:</span> fpg<span class="token punctuation">.</span>FileTransferStub <span class="token operator">=</span> <span class="token boolean">None</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> port<span class="token operator">=</span><span class="token number">50051</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>channel <span class="token operator">=</span> grpc<span class="token punctuation">.</span>insecure_channel<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;127.0.0.1:</span><span class="token interpolation"><span class="token punctuation">{</span>port<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">connect</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>stub <span class="token operator">=</span> fpg<span class="token punctuation">.</span>FileTransferStub<span class="token punctuation">(</span>self<span class="token punctuation">.</span>channel<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">close</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>channel<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">download</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> <span class="token string">&#39;send.xlsx&#39;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;文件下载

        会将send.xlsx文件下载到 ./file_sever/download目录
        Args:
            name: 下载文件名，默认为 send.xlsx

        Returns:

        &quot;&quot;&quot;</span>
        r <span class="token operator">=</span> fp<span class="token punctuation">.</span>RequestFile<span class="token punctuation">(</span>name<span class="token operator">=</span>name<span class="token punctuation">)</span>
        response <span class="token operator">=</span> self<span class="token punctuation">.</span>stub<span class="token punctuation">.</span>DownloadFile<span class="token punctuation">(</span>r<span class="token punctuation">)</span>
        download <span class="token operator">=</span> base_path <span class="token operator">/</span> <span class="token string">&#39;download&#39;</span> <span class="token operator">/</span> name
        <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>download<span class="token punctuation">,</span> <span class="token string">&#39;wb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
            <span class="token keyword">for</span> r <span class="token keyword">in</span> response<span class="token punctuation">:</span>
                f<span class="token punctuation">.</span>write<span class="token punctuation">(</span>r<span class="token punctuation">.</span>data<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">send</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;上传文件

        默认将上传 ./file_server/download/download.docx
        Returns:

        &quot;&quot;&quot;</span>
        <span class="token builtin">file</span> <span class="token operator">=</span> send_file<span class="token punctuation">(</span><span class="token punctuation">)</span>
        resp <span class="token operator">=</span> self<span class="token punctuation">.</span>stub<span class="token punctuation">.</span>SendFile<span class="token punctuation">(</span><span class="token builtin">file</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> resp

    <span class="token keyword">def</span> <span class="token function">__enter__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>connect<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> self

    <span class="token keyword">def</span> <span class="token function">__exit__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> exc_type<span class="token punctuation">,</span> exc_val<span class="token punctuation">,</span> exc_tb<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    <span class="token keyword">with</span> Client<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> client<span class="token punctuation">:</span>
        <span class="token comment"># 上传文件</span>
        resp_status <span class="token operator">=</span> client<span class="token punctuation">.</span>send<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>resp_status<span class="token punctuation">)</span>

        <span class="token comment"># 下载文件</span>
        client<span class="token punctuation">.</span>download<span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-运行服务" tabindex="-1"><a class="header-anchor" href="#_5-运行服务" aria-hidden="true">#</a> 5.运行服务</h2><p>打开两个控制台窗口，cd到<code>desktop</code>目录下，分别运行</p><div class="language-pow line-numbers-mode" data-ext="pow"><pre class="language-pow"><code>desktop&gt; python -m file_server.server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-powershell line-numbers-mode" data-ext="powershell"><pre class="language-powershell"><code>desktop&gt; python <span class="token operator">-</span>m file_server<span class="token punctuation">.</span>client
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可以看到<code>send.xlsx</code>文件下载到了<code>file_server/download</code>目录，<code>download.docx</code>文件上传到了<code>file_server/send</code>目录。</p>`,29),o=[t];function i(l,c){return s(),a("div",null,o)}const d=n(p,[["render",i],["__file","grpc_stream_python.html.vue"]]);export{d as default};
