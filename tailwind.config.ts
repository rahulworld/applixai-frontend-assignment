import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        bg: '#FFFFFF',
        // prime: 'hsl(var(--accent))',
        // main: '#52CCA3', // main color which used before multicolor theme 
        dark: '#141525',
        modelBackground: '#f2f2f2',
        mdDark: '#111111',
        extraDark: '#030303',
        textIcon: '#757575',
        // darkGreen: 'hsl(var(--background))',
        primaryLight: '#DAE5EA',
        textNeutralWhite: '#FFFFFF',
        textNeutralThirty: '#C6D2E0',
        textNeutralSixty: '#899BB0',
        textNeutralFourty: '#B6C4D4',
        textNeutralFifty: '#A5B5C8',
        textNeutralOneTwenty: '#161B21',
        textNeutralTwenty: '#D8E1EB',
        textNeutralTen: '#EBF1F7',

        
        // newly added styles
        inputBack: 'hsl(var(--input))',
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))', // white on light, black on dark
        foreground: 'hsl(var(--foreground))', // dark on light , white on dark
        // static const textNeutralThirty = Color(0xFFC6D2E0);
        // static const textNeutralSixty = Color(0xFF899BB0);
        // static const textNeutralSeventy = Color(0xFF708398);
        // static const textNeutralFourty = Color(0xFFB6C4D4);
        // static const textNeutralFifty = Color(0xFFA5B5C8);
        // static const textNeutralOneTwenty = Color(0xFF161B21);
        // static const textNeutralTwenty = Color(0xFFD8E1EB);
        // static const textNeutralTen = Color(0xFFEBF1F7);
        // static const textSuccessFifty = Color(0xFF5CC06B);
        // static const textDangerFifty = Color(0xFFF46D7D);
        // static const textSuccessSeventy = Color(0xFF1B8632);
        // static const textNeutralOneTen = Color(0xFF252E39);
        // static const textNeutralWhite = Color(0xFFFFFFFF);


  backgroundNeutralWhite: "#FFFFFF",
  backgroundNeutralNinety: "#475769",
  backgroundSuccessTwenty: "#C5EFC8",
  backgroundNeutralEighty: "#5A6C80",
  backgroundDangerFifty: "#F46D7D",
  backgroundDangerSixty: "#E43F4E",
  backgroundNeutralThirty: "#C6D2E0",
  backgroundNeutralSeventy: "#708398",
  backgroundNeutralSixty: "#899BB0",

  backgroundNeutralOneTen: "#252E39",

  backgroundNeutralHundred: "#364251",
  backgroundNeutralTen: "#EBF1F7",

  contentBackground: "#141525",
  colorsPrimaryGreyEighty: "#5A6C80",
  backgroundSuccessFifty: "#5CC06B",
  backgroundSuccessSixty: "#36A34A",
  backgroundWarningSixty: "#F7A500",
  blockDisableBackground: "#F8ABB8",

  // blackOpacity = Color(0xFF000000);
  // whiteOpacity = Color(0xFFFFFFFF);

  whiteTen: "#FFFFFF",
  // whiteTwenty: = Color(0x32FFFFFF);
  // whiteThirty = Color(0x4CFFFFFF);
  // whiteSixty = Color(0x9AFFFFFF);
  // whiteEighty = Color(0xCCFFFFFF);

  // whiteFive = Color(0x0CFFFFFF);
  // whiteTwelve = Color(0x1EFFFFFF);
  // rewardSelectedColor = Color(0xFFF1FFFC);
  // pixelCardTransparentBg = Color(0x61D9D9D9);
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      lineClamp: {
        10: '10',
        12: '12',
      },
      gridAutoColumns: {
        270: '270px',
        250: '250px',
      },
      screens: {
        mdheight: { raw: '(min-height: 640px)' },
        // => @media (min-height: 640px) { ... }
        lgheight: { raw: '(min-height: 800px)' },
        // => @media (min-height: 800px) { ... }
        '3xl': '1680px',
      },
      // newly added
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      // fontFamily: {
      //   sans: ['var(--font-sans)', ...fontFamily.sans],
      // },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
       },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    }
  },
  plugins: [],
};
export default config;
