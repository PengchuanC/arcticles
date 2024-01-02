import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "Maverick",
  description: "朝花夕拾",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
