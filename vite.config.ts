import solid from 'solid-start/vite';
import solidSvg from 'vite-plugin-solid-svg';
import node from 'solid-start-node';
import vercel from 'solid-start-vercel';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      solid({ ssr: false, adapter: mode === 'production' ? vercel() : node() }),
      solidSvg({ defaultAsComponent: true }),
    ],
    build: {
      sourcemap: true,
    },
  };
});
