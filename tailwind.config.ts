import { type Config } from "tailwindcss";
import colors from "tailwindcss/colors.js";

export default {
  content: [
    // use import.meta.dirname to find components correctly on cli use case
    // import.meta.dirname! + "/{routes,islands,components}/**/*.{ts,tsx}",
    "/Users/flow/flow/plrg/walkview/{routes,islands,components}/**/*.{ts,tsx}",
  ],
  theme: {
    colors: {
      "background": "hsl(222.2 84% 4.9%)",
      "foreground": "hsl(210 40% 98%)",
      "card": "hsl(222.2 84% 4.9%)",
      "card-foreground": "hsl(210 40% 98%)",
      "popover": "hsl(222.2 84% 4.9%)",
      "popover-foreground": "hsl(210 40% 98%)",
      "primary": "hsl(210 40% 98%)",
      "primary-foreground": "hsl(222.2 47.4% 11.2%)",
      "secondary": "hsl(217.2 32.6% 17.5%)",
      "secondary-foreground": "hsl(210 40% 98%)",
      "muted": "hsl(217.2 32.6% 17.5%)",
      "muted-foreground": "hsl(215 20.2% 65.1%)",
      "accent": "hsl(217.2 32.6% 17.5%)",
      "accent-foreground": "hsl(210 40% 98%)",
      "destructive": "hsl(0 62.8% 30.6%)",
      "destructive-foreground": "hsl(210 40% 98%)",
      "border": "hsl(217.2 32.6% 17.5%)",
      "input": "hsl(217.2 32.6% 17.5%)",
      "ring": "hsl(212.7 26.8% 83.9)",

      "red": colors.red,
      "green": colors.green,
      "orange": colors.orange,
    },
  },
} satisfies Config;
