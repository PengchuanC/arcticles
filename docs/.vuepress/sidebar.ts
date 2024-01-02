import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    {
      text: "FOF系列",
      icon: "result",
      prefix: "fof/",
      link: "fof/",
      children: "structure",
    },
    {
      text: "PYTHOPN系列",
      icon: "python",
      prefix: "python/",
      children: "structure",
    },
    {
      text: "技术文章",
      icon: "folder",
      prefix: "posts/",
      children: "structure",
    },
    "intro",
  ],
});
