import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
// 引入环境变量需要loadEnv

export default ({ mode }) => {
  const nodeEnv = loadEnv(mode, process.cwd())
  console.log(11111, nodeEnv.VITE_API_URL)
  return defineConfig({
    plugins: [
      vue()
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'), // 路径别名
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'] // 导入时想要省略的扩展名列表
      }
    },
    build: {
      outDir: 'dist', // 指定打包完目录名称（相对于 项目根目录)
      assetsDir: 'static', // 指定生成静态资源的存放路径（相对于 build.outDir）
      // minify: "terser", // 混淆器，terser构建后文件体积更小 默认为esbuild  esbuild打包更快
      chunkSizeWarningLimit: 3000, // chunk 大小警告的限制（以 kbs 为单位）
      rollupOptions: {
        // external:['@popperjs/core'],
        output: {
          // 解决打包时Some chunks are larger警告
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString()
            }
          }
        }
      }
    },
    css: {},
    server: {
      host: '0.0.0.0', // 0.0.0.0是localhost和本地ip都可以启动
      port: 8081,
      proxy: {
        '/server': {
          target: 'https://uat-apisix.caizidao.com.cn:1443',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/server/, '')
        }
      }
    }
  })
}
