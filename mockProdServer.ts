import { createProdMockServer } from 'vite-plugin-mock/client';

export function setupProdMockServer() {
    createProdMockServer(import.meta.glob('./mock/**/*.ts', { eager: true }));
}
