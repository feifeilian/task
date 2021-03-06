module.exports = {
  entry:  __dirname + "/app/index.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/dist",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  },
  module:{
  	rules:[
      {
      	test: /\.css$/,
      	use: ['style-loader','css-loader']
      },
      {
      	test: /\.less$/,
      	use: ['style-loader','css-loader','less-loader']
      },
      {
      	test: /\.js$/,
      	exclude:/(node_modules)/,
        use:{
        	loader:'babel-loader',
        	query:{
	      		presets:['es2015']
      	    }
        }      	
      }
  	]
  },

}