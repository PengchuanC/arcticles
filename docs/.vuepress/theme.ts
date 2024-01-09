import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  // hostname: "http://localhost:8080",
  hostname: "https://arc.cpolar.cn",

  author: {
    name: "Chuanchao.peng",
    url: "https://github.com/PengchuanC",
  },

  pure: true,

  // iconAssets: "fontawesome-with-brands",
  iconAssets: "iconfont",

  logo: "/logo.svg",

  repo: "PengchuanC/arcticles",

  docsDir: "docs",

  // navbar
  navbar,

  // sidebar
  sidebar,

  footer: "山高月小",

  displayFooter: true,

  blog: {
    description: "学金融的开发者",
    intro: "/intro.html",
    medias: {
      BiliBili: "https://space.bilibili.com/15965393/",
      Gitee: "https://gitee.com/pengchuanchao",
      GitHub: "https://github.com/PengchuanC",
      QQ: "https://wpa.qq.com/msgrd?v=3&uin=996766914&site=qq&menu=yes",
      Steam: "https://steamcommunity.com/id/76561198116895713",
      Weibo: "https://example.com",
    },
  },


  // page meta
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  plugins: {
    blog: true,

    // install @waline/client before enabling it
    // WARNING: This is a test server for demo only.
    // You should create and use your own comment service in production.
    // comment: {
    //   provider: "Waline",
    //   serverURL: "https://waline-comment.vuejs.press",
    // },

    // all features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      alert: true,
      chart: true,
      codetabs: true,
      component: true,
      figure: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      mark: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,

      // gfm requires mathjax-full to provide tex support
      gfm: true,

      // install katex before enabling it
      // katex: true,

      // install mathjax-full before enabling it
      mathjax: true,

      // install mermaid before enabling it
      // mermaid: true,

      // playground: {
      //   presets: ["ts", "vue"],
      // },

      // install reveal.js before enabling it
      // revealJs: {
      //   plugins: ["highlight", "math", "search", "notes", "zoom"],
      // },

      // install @vue/repl before enabling it
      // vuePlayground: true,
    },

    // uncomment these if you want a PWA
    pwa: {
      favicon: "/favicon.ico",
      cacheHTML: true,
      cachePic: true,
      appendBase: true,
      apple: {
        icon: "/logo.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/logo.png",
        color: "#ffffff",
      },
      manifest: {
        icons: [
          {
            src: "/logo.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/logo.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/logo.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/logo.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "maverick",
            short_name: "maverick",
            url: "/posts/",
            icons: [
              {
                src: "/logo.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
            ],
          },
        ],
      },
    },
  },
});
