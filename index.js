const express = require('express')
const app = express();
const multer = require('multer')
const cors = require('cors')
const bodyParser = require('body-parser')
const { dirname } = require('path');
const path = require('path')
require('dotenv').config()
// const upload = multer({ dest: `${appDir}/public/uploadImage` })
// var bodyParser = require('body-parser');
app.use('/uploads', express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({ limit: '50mb' }));
const mongoURL = "mongodb+srv://admin:1234@sangkhla.lm5wh.mongodb.net/Sangkhla2goDB"
const mongoose = require('mongoose')

const appDir = dirname(require.main.filename);
// app.use(cors({
//       origin: '*' ,

//   }));
//   app.use(bodyParser.json())
app.use(
  cors({
    origin: '*',
    // origin: true,
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000", 'https://www.sangkhla2go.com');
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization , refreshToken"
  );
  res.header("Referrer-Policy", "no-referrer-when-downgrade");
  res.header("X-Content-Type-Options", "nosniff");
  res.header("X-XSS-Protection", "1; mode=block");
  res.header("X-Frame-Options", "SAMEORIGIN");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS')
  res.header("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

app.use(express.json());
app.use('/', require('./pages/api/sangkhlaAPI'))

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

mongoose.connection.readyState == 2 ? console.log('connected server...') : ''

app.listen(3001, function () {
  console.log(path.join(__dirname, 'public'))
  console.log('dir name is', appDir)
  console.log("server running on port 3001...");
})
  ;
module.exports = app