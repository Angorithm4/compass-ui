module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/compass-ui/'
    : '/',

    pages: {
	'index': {
	    entry: './src/pages/index/main.js',
	    template: 'public/index.html',
	    title: 'index',
	    chunks: [ 'chunk-vendors', 'chunk-common', 'index']
	},

	'about': {
	    entry: './src/pages/about/main.js',
	    template: 'public/index.html',
	    title: 'about',
	    chunks: [ 'chunk-vendors', 'chunk-common', 'about']
	},

	'contact-us': {
	    entry: './src/pages/contact/main.js',
	    template: 'public/index.html',
	    title: 'contact-us',
	    chunks: [ 'chunk-vendors', 'chunk-common', 'contact-us']
	},

	'faq': {
	    entry: './src/pages/faq/main.js',
	    template: 'public/index.html',
	    title: 'faq',
	    chunks: [ 'chunk-vendors', 'chunk-common', 'faq']
	},

	'trade-record': {
	    entry: './src/pages/traderec/main.js',
	    template: 'public/index.html',
	    title: 'trade-record',
	    chunks: [ 'chunk-vendors', 'chunk-common', 'trade-record']
	},

	'site-news': {
	    entry: './src/pages/sitenews/main.js',
	    template: 'public/index.html',
	    title: 'site-news',
	    chunks: [ 'chunk-vendors', 'chunk-common', 'site-news']
	}
    }
}
