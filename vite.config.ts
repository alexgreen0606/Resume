import { defineConfig } from 'vite'
import mdx from '@mdx-js/rollup'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
    {
      enforce: 'pre',
      ...mdx({
        providerImportSource: '@mdx-js/react'
      })
    },
    viteStaticCopy({
      targets: [
        {
          src: 'src/docs/strengths.csv',
          dest: ''
        }
      ]
    })
  ]
})
