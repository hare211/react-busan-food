/* global skel */
skel.init({
	reset: 'full',
	breakpoints: {
		'global': { href: '/css/style.css', containers: 1400, grid: { gutters: 50 } },
		'xlarge': { media: '(max-width: 1680px)', href: '/css/style-xlarge.css' },
		'large': { media: '(max-width: 1280px)', href: '/css/style-large.css', containers: 1200, grid: { gutters: 40 }, viewport: { scalable: false } },
		'medium': { media: '(max-width: 980px)', href: '/css/style-medium.css', containers: 960, grid: { gutters: 35 } },
		'small': { media: '(max-width: 736px)', href: '/css/style-small.css', containers: '100%', grid: { gutters: 20 } },
		'xsmall': { media: '(max-width: 480px)', href: '/css/style-xsmall.css' }
	},
	plugins: {
		layers: {
			config: {
				mode: 'transform'
			},
			navPanel: {
				animation: 'overlayX',
				breakpoints: 'medium',
				clickToHide: true,
				height: '100%',
				hidden: true,
				html: '<div data-action="navList" data-args="nav"></div>',
				orientation: 'vertical',
				position: 'top-left',
				side: 'left',
				width: 250
			},
			titleBar: {
				breakpoints: 'medium',
				height: 44,
				html: '<span class="toggle" data-action="toggleLayer" data-args="navPanel"></span><span class="title" data-action="copyText" data-args="logo"></span>',
				position: 'top-left',
				side: 'top',
				width: '100%'
			}
		}
	}
});
