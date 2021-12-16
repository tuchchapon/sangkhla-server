const express = require('express')
const app = express();
const multer  = require('multer')
const cors = require('cors')
// const { dirname } = require('path');
const path = require('path')
// const appDir = dirname(require.main.filename);
// const upload = multer({ dest: `${appDir}/public/uploadImage` })
// app.use('/uploads', express.static('./uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'public')));

require('dotenv').config()
const mongoose = require('mongoose')
app.use(cors())
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
