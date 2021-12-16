const express = require('express')
const app = express();
const multer  = require('multer')
// const cors = require('cors')
// const { dirname } = require('path');
const path = require('path')
// const appDir = dirname(require.main.filename);
// const upload = multer({ dest: `${appDir}/public/uploadImage` })
// app.use('/uploads', express.static('./uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'public')));

require('dotenv').config()
const mongoose = require('mongoose')
app.use(cors({
    origin: '*'
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization , refreshToken"
    );
    res.header("Referrer-Policy", "no-referrer-when-downgrade");
    res.header("X-Content-Type-Options", "nosniff");
    res.header("X-XSS-Protection", "1; mode=block");
    res.header("X-Frame-Options", "SAMEORIGIN");
    res.header("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });
app.use(express.json());
const mongoURL = process.env.DB_URL
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})
mongoose.connection.readyState==2?console.log('connected server...'):''
app.use('/',require('./pages/api/sangkhlaAPI'))
app.listen(8080,function(){
    // console.log(appDir)
    console.log("server running on port 8080...");
})
