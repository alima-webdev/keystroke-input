import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        dts()
    ],
    build: {
        sourcemap: true,
        lib: {
            entry: 'src/index.tsx',
            name: 'KeystrokeInput',
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
})
