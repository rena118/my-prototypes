import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // 构建产物供原型生成器的静态工作台直接服务，资源必须用相对路径
  base: command === "build" ? "./" : "/",
  server: {
    port: 4177,
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: ["terminal.local"],
    // 上级目录名含异常字符（U+E21B）时，Vite 会把模块解析到真实路径，需显式放开该目录，否则加载被拒后回退成未编译源码
    fs: { allow: ["../.."] },
  },
  preview: { port: 4177, host: "0.0.0.0", strictPort: true },
  build: {
    // 生成器禁止服务 dist；pages/ 会被生成器扫描为可预览页面
    outDir: "pages",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        index: "index.html",
        applications: "entries/applications.html",
        "declaration-form": "entries/declaration-form.html",
        drafts: "entries/drafts.html",
        manage: "entries/manage.html",
        "manage-members": "entries/manage-members.html",
        "manage-activities": "entries/manage-activities.html",
        "manage-showcase": "entries/manage-showcase.html",
        "manage-credits": "entries/manage-credits.html",
        "manage-publish": "entries/manage-publish.html",
        "manage-renew": "entries/manage-renew.html",
        mine: "entries/mine.html",
        report: "entries/report.html",
        plaza: "entries/plaza.html",
        "club-detail": "entries/club-detail.html",
        "club-gallery": "entries/club-gallery.html",
        "moment-wall": "entries/moment-wall.html",
      },
    },
  },
}));
