import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
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
    reactRefresh()
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
