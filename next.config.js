module.exports = {
    env: {
        DB_URL : "mongodb+srv://admin:1234@sangkhla.lm5wh.mongodb.net/Sangkhla2goDB",
        SERVER_API : "https://sangkhla2go-7uklpz68l-tuchy.vercel.app",
        // SERVER_API : "https://dee3-14-207-50-169.ngrok.io",
        // SERVER_API : "http://localhost:8080",
        SERVER_IMAGE_PATH:'https://sangkhla-server.vercel.app/uploads/uploadImage',
        LOCAL_API : "http://localhost:8080" ,
        LOCAL_IMAGE_PATH : "http://localhost:8080/uploads/uploadImage",
        FRONT_IMAGE_PATH : "http://localhost:8080/uploads",
        UPLOAD_PATH : "https://sangkhla-server.vercel.app/"
    },
  }
  const alias = require('./config/alias')

  module.exports = {
    images: {
      domains: ['raw.githubusercontent.com'],
    },
  
    webpack: (config) => {
      config.resolve = {
        alias: { ...(config.resolve.alias || {}), ...alias },
      }
  
      config.module.rules.push({
        test: /\.(png|jpg|svg|jpeg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
          },
        },
      })
  
      return config
    },
  }