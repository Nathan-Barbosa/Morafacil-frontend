import tailwindcssAnimate from 'tailwindcss-animate';
import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	fontFamily: {
  		inter: [
  			'Inter',
  			'sans-serif',
                ...fontFamily.sans
            ],
  		roboto: [
  			'Roboto',
  			'sans-serif',
                ...fontFamily.sans
            ],
  		sans: [
  			'Inter',
                ...fontFamily.sans
            ]
  	},
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			primaryDarker: '#924902',
  			primaryDark: '#C36203',
  			primaryLight: '#F8AF68',
  			primaryLighter: '#FBCA9B',
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			secondaryDarker: '#67044C',
  			secondaryDark: '#890665',
  			secondaryLight: '#CC5CAD',
  			secondaryLighter: '#DD87C5',
  			tertiary: '#11AF99',
  			tertiaryDarker: '#0A695C',
  			tertiaryDark: '#0E8C7A',
  			tertiaryLight: '#68CEC0',
  			tertiaryLighter: '#94DED3',
  			error: '#B21616',
  			errorDark: '#5C0000',
  			errorLight: '#FC5454',
  			errorLighter: '#FFD3D3',
  			warning: '#EDC005',
  			warningDark: '#BB7D02',
  			warningLight: '#FDDD48',
  			warningLighter: '#FBF2CD',
  			info: '#0066AD',
  			infoDark: '#024C81',
  			infoLight: '#3284BD',
  			infoLighter: '#CCE0EE',
  			success: '#00AD47',
  			successDark: '#006128',
  			successLight: '#4CC57E',
  			successLighter: '#CCEEDA',
  			gray1: '#F5F5F6',
  			gray2: '#F0F1F1',
  			gray3: '#EBECED',
  			gray4: '#E6E7E8',
  			gray5: '#AAACAE',
  			gray6: '#7D7F82',
  			gray7: '#4C4C4C',
  			white: '#FFFFFF',
  			black: '#0C0C0B',
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
  		height: {},
  		maxHeight: {},
  		width: {},
  		maxWidth: {},
  		minWidth: {},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontSize: {},
  		boxShadow: {
  			searchBarShadow: '2px 2px 2px 0px #00000026',
  			tooltipShadow: ' 2px 2px 8px 2px #00000026',
  			shadowTopRight: '1px 0px 4px 0px rgba(0, 0, 0, 0.25);'
  		},
  		animation: {
  			slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
  			slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
  			slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
  			slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		keyframes: {
  			slideDownAndFade: {
  				from: {
  					opacity: '0',
  					transform: 'translateY(-2px)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			slideLeftAndFade: {
  				from: {
  					opacity: '0',
  					transform: 'translateX(2px)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			slideUpAndFade: {
  				from: {
  					opacity: '0',
  					transform: 'translateY(2px)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			slideRightAndFade: {
  				from: {
  					opacity: '0',
  					transform: 'translateX(-2px)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		}
  	}
  },
  plugins: [tailwindcssAnimate, require("tailwindcss-animate")],
};
