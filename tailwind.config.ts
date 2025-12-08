import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			alpine: {
  				'50': '#faf9f7',
  				'100': '#f5f3ef',
  				'200': '#e8e4dc',
  				'300': '#d4cec2',
  				'400': '#b8af9e',
  				'500': '#9c917d',
  				'600': '#857a68',
  				'700': '#6e6456',
  				'800': '#5c5349',
  				'900': '#4d463e',
  				'950': '#292520'
  			},
  			gold: {
  				'50': '#fdfaf3',
  				'100': '#faf3e0',
  				'200': '#f4e4bc',
  				'300': '#ecd08e',
  				'400': '#e2b55e',
  				'500': '#d99f3d',
  				'600': '#c98830',
  				'700': '#a66a29',
  				'800': '#865428',
  				'900': '#6d4624',
  				'950': '#3d2311'
  			},
  			glacier: {
  				'50': '#f4f9fb',
  				'100': '#e7f2f6',
  				'200': '#c4e2ea',
  				'300': '#9dcdd9',
  				'400': '#63adc1',
  				'500': '#4593a9',
  				'600': '#38778e',
  				'700': '#306174',
  				'800': '#2c5261',
  				'900': '#294553',
  				'950': '#182d38'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			serif: [
  				'var(--font-cormorant)',
  				'Cormorant Garamond',
  				'Georgia',
  				'serif'
  			],
  			sans: [
  				'var(--font-outfit)',
  				'Outfit',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		animation: {
  			'fade-in': 'fadeIn 1s ease-out forwards',
  			'slide-up': 'slideUp 0.8s ease-out forwards',
  			'slide-down': 'slideDown 0.8s ease-out forwards',
  			'scale-in': 'scaleIn 0.6s ease-out forwards'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			slideUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(30px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			slideDown: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(-30px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			scaleIn: {
  				'0%': {
  					opacity: '0',
  					transform: 'scale(0.95)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'scale(1)'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

