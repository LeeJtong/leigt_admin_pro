import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

// 自动引入 mock 文件夹下的所有 .ts 文件
export function setupProdMockServer() {
    createProdMockServer(import.meta.glob('./mock/**/*.ts', { eager: true }));
}
