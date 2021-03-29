import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import vitePluginImp from 'vite-plugin-imp'
import path from 'path'
import fs from 'fs'
// @ts-ignore
import lessToJS from 'less-vars-to-js'
import prodConfig from './configs/vite.prod'
import devConfig from './configs/vite.dev'

const isDev = process.argv[process.argv.length - 1] === 'development'

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './configs/themeVariables.less'), 'utf8')
)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/lib/${name}/style/index.less`,
        },
      ],
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: themeVariables
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  ...(isDev ? devConfig : prodConfig),
})
