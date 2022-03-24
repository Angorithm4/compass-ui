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

	'trade-record': {
	    entry: './src/pages/traderec/main.js',
	    template: 'public/trade-record.html',
	    title: 'trade-record',
	    chunks: [ 'chunk-vendors', 'chunk-common', 'trade-record']
	},

	'histp': {
	    entry: './src/pages/histp/main.js',
	    template: 'public/histp.html',
	    title: 'histp',
	    chunks: [ 'chunk-vendors', 'chunk-common', 'histp']
	},

    }
}
