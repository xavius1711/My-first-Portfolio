import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        cyan: {
          DEFAULT: "#00E5FF",
          50: "#E5FAFF",
          100: "#CCF5FF",
          500: "#00E5FF",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
      },
      // THÊM CẤU HÌNH BÓNG ĐỔ SIÊU THỰC (Custom Shadows)
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 229, 255, 0.3)',
        '4xl': '0 50px 100px -20px rgba(0, 0, 0, 0.25)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1.25)' },
          '50%': { transform: 'translateY(-20px) scale(1.25)' },
        }
      },
      animation: {
        "float": "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;