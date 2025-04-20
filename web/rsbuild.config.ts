import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    proxy: {
      // 代理 /api 开头的请求到目标服务器
      '/api': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
});
