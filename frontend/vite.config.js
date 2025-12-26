import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],

    theme: {
    extend: {
      colors: {
        retroPurple: "#B25690",
        retroTeal: "#71B379",
        retroBlue: "#1D71BA",
        retroOrange: "#EDC400",
        retroRed: "#CB625F",
        retroDark: "#2E1A47",
        retroLight: "#FDE8E8",
      },
      backgroundImage: {
        'retro-gradient': 'linear-gradient(135deg, #71B379 0%, #B25690 50%, #EDC400 100%)',
      }
    }
  }
})
