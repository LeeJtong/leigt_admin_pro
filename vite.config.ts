import { defineConfig, loadEnv } from 'vite';
import type { UserConfig, ConfigEnv } from 'vite';
import { fileURLToPath } from 'url';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { viteMockServe } from 'vite-plugin-mock';
import AutoImport from 'unplugin-auto-import/vite';
import Icons from 'unplugin-icons/vite';
import Components from 'unplugin-vue-components/vite';
import IconsResolver from 'unplugin-icons/resolver';
import ElementPlus from 'unplugin-element-plus/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { visualizer } from 'rollup-plugin-visualizer';
import externalGlobals from 'rollup-plugin-external-globals';
import { createHtmlPlugin } from 'vite-plugin-html';
import { manualChunksPlugin } from 'vite-plugin-webpackchunkname';

const globals = externalGlobals({
    moment: 'moment',
    'video.js': 'videojs',
    jspdf: 'jspdf',
    xlsx: 'XLSX',
    echarts: 'echarts' // ✅ 修复拼写
});

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
    const root = process.cwd();
    const env = loadEnv(mode, root);

    return {
        root,
        base: '/',
        publicDir: fileURLToPath(new URL('./public', import.meta.url)),
        assetsInclude: fileURLToPath(new URL('./src/assets', import.meta.url)),
        css: {
            preprocessorOptions: {
                less: {
                    additionalData: `@import '@/styles/variable.less';`
                }
            }
        },
        plugins: [
            vue(),
            vueJsx(),
            viteMockServe({
                mockPath: 'mock',
                enable: true
            }),
            ElementPlus(),
            AutoImport({
                imports: ['vue', 'vue-router', 'pinia'],
                eslintrc: { enabled: true },
                resolvers: [ElementPlusResolver(), IconsResolver()],
                dts: fileURLToPath(new URL('./types/auto-imports.d.ts', import.meta.url))
            }),
            Components({
                resolvers: [IconsResolver(), ElementPlusResolver()],
                dts: fileURLToPath(new URL('./types/components.d.ts', import.meta.url)),
                dirs: [fileURLToPath(new URL('./src/components/auto', import.meta.url))],
                include: [/\.vue$/, /\.vue\?/]
            }),
            Icons({ autoInstall: true }),
            manualChunksPlugin(),

            // ✅ 保证在所有插件最后
            createHtmlPlugin({
                inject: {
                    data: {
                        monentscript:
                            '<script src="https://cdn.jsdelivr.net/npm/moment@2.29.1/min/moment.js"></script>',
                        videoscript:
                            '<script src="https://cdn.jsdelivr.net/npm/video.js@7.14.3/dist/video.min.js"></script>',
                        echartscript:
                            '<script src="https://cdn.jsdelivr.net/npm/echarts@5.2.1/dist/echarts.min.js"></script>',
                        jspdfscript:
                            '<script src="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/pdf.umd.min.js"></script>',
                        xlsxscript:
                            '<script src="https://cdn.jsdelivr.net/npm/xlsx@0.17.4/dist/xlsx.full.min.js"></script>'
                    }
                }
            })
        ],
        server: {
            https: false,
            host: true,
            port: 9001,
            open: false,
            cors: true,
            proxy: {
                [env.VITE_APP_API_BASEURL]: {
                    target: 'http://localhost:9001',
                    changeOrigin: true
                },
                [env.VITE_APP_MOCK_BASEURL]: {
                    target: 'http://localhost:9001',
                    changeOrigin: true
                }
            }
        },
        build: {
            sourcemap: false,
            chunkSizeWarningLimit: 400,
            rollupOptions: {
                input: {
                    index: fileURLToPath(new URL('./index.html', import.meta.url))
                },
                external: ['moment', 'video.js', 'jspdf', 'xlsx', 'echarts'], // ✅ 必须和 globals 一致
                plugins: [visualizer({ open: true }), globals],
                treeshake: {
                    preset: 'recommended'
                },
                output: {
                    experimentalMinChunkSize: 20 * 1024,
                    manualChunks: (id: string) => {
                        if (id.includes('node_modules')) return 'vendor';
                    }
                }
            }
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                '#': fileURLToPath(new URL('./types', import.meta.url))
            }
        }
    };
});
