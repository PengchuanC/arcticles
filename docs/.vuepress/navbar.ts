import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "系列文章",
    icon: "leaf",
    prefix: "/",
    children: [
      {
        text: "FOF系列",
        icon: "folder",
        prefix: "fof/",
        children: [
          {
            text: "SMA系统总览",
            icon: "article",
            link: "introduction_sma_system",
          },
          {
            text: "客户问卷管理系统",
            icon: "article",
            link: "introduction_questionnaire",
          },
          {
            text: "客户服务平台",
            icon: "article",
            link: "introduction-clientservices",
          },
          {
            text: "基金筛选系统",
            icon: "article",
            link: "introduction-fundscreen",
          },
          {
            text: "投资管理系统",
            icon: "article",
            link: "introduction_sma_management",
          },
        ],
      },
      {
        text: "python",
        icon: "folder",
        prefix: "python/",
        children: [
          {
            text: "使用其他语言扩展python",
            icon: "python",
            link: "python-extension",
          },
          {
            text: "使用manager在分布式进程间进行通信",
            icon: "python",
            link: "python-manager",
          },
          {
            text: "jwt使用",
            icon: "python",
            link: "python-jwt",
          },
          {
            text: "str类型和int数组类型转换",
            icon: "python",
            link: "python-bytes-str",
          }
        ],
      }
    ],
  },
  {
    text: "点个赞吧",
    icon: "gitee",
    link: "https://github.com/PengchuanC",
  },
]);
