const express = require('express');
const multer = require('multer')
const { dirname, resolve } = require('path');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId
const randomstring = require('randomstring')
const mongoose = require('mongoose');
const Drivers = require('../../model/driver')
const BoatProvider = require('../../model/boatProvider')
const DriverLocation = require('../../model/driverLocation')
const Catagory = require('../../model/catagory')
const Accommodation = require('../../model/accommodation')
const Restaurant = require('../../model/restaurant')
const Reviews = require('../../model/review')
const Admins = require('../../model/admin')
const { smtpTransport } = require('../../controllers/nodemailer');
const accommodation = require('../../model/accommodation');
const Attraction = require('../../model/attraction')
const Tradition = require('../../model/traditions')
const Officer = require('../../model/officer')
const Product = require('../../model/product');
const Comment = require('../../model/comments')
const BoatClubName = require('../../model/boatClubName')
// const handle = express.getRequestHandler()
// const formidable = require("formidable");
// const form  =formidable.IncomingForm()
const JWT_SECRET = 'sadkajsdj1k3sastichasasclsadnfjasltuSFKHSJKDAPI@$@QKFSJKSJDK'
require('dotenv').config()
const appDir = dirname(require.main.filename);

const driver_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${appDir}/public/uploadImage/driver`)
  },
  filename: function (req, file, cb) {
    let _fileType = file.originalname.substring(file.originalname.indexOf("."));
    let _fileName
    if (_fileType === '.jpg' || _fileType === '.png' || _fileType === '.jpeg' || _fileType === '.webp') {

      _fileName = file.fieldname + Date.now() + _fileType;
    }
    else {
      _fileName = 'wrong_file_type' + Date.now()
    }
    cb(null, _fileName);
  },
})
const upload_driver_image = multer({ storage: driver_storage })

const officer_storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, `${appDir}/public/uploadImage/officer`)
  },
  filename: function (req, file, cb) {
    let _fileType = file.originalname.substring(file.originalname.indexOf("."));
    let _fileName
    if (_fileType === '.jpg' || _fileType === '.png' || _fileType === '.jpeg' || _fileType === '.webp') {

      _fileName = file.fieldname + Date.now() + _fileType;
    }
    else {
      _fileName = 'wrong_file_type' + Date.now()
    }
    cb(null, _fileName);
  },
})
const upload_officer_image = multer({ storage: officer_storage })

const tradition_storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, `${appDir}/public/uploadImage/tradition`)
  },
  filename: function (req, file, cb) {
    let _fileType = file.originalname.substring(file.originalname.indexOf("."));
    let _fileName
    if (_fileType === '.jpg' || _fileType === '.png' || _fileType === '.jpeg' || _fileType === '.webp') {

      _fileName = file.fieldname + Date.now() + _fileType;
    }
    else {
      _fileName = 'wrong_file_type' + Date.now()
    }
    cb(null, _fileName);
  },
})
const upload_tradition_image = multer({ storage: tradition_storage })


const product_storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, `${appDir}/public/uploadImage/product`)
  },
  filename: function (req, file, cb) {
    let _fileType = file.originalname.substring(file.originalname.indexOf("."));
    let _fileName
    if (_fileType === '.jpg' || _fileType === '.png' || _fileType === '.jpeg' || _fileType === '.webp') {

      _fileName = file.fieldname + Date.now() + _fileType;
    }
    else {
      _fileName = 'wrong_file_type' + Date.now()
    }
    cb(null, _fileName);
  },
})
const upload_product_images = multer({ storage: product_storage })

const attraction_storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, `${appDir}/public/uploadImage/attraction`)
  },

  filename: function (req, file, cb) {
    let _fileType = file.originalname.substring(file.originalname.indexOf("."));
    let _fileName
    if (_fileType === '.jpg' || _fileType === '.png' || _fileType === '.jpeg' || _fileType === '.webp') {

      _fileName = file.fieldname + Date.now() + _fileType;
    }
    else {
      _fileName = 'wrong_file_type' + Date.now()
    }
    cb(null, _fileName);
  },
})
const upload_attraction_images = multer({ storage: attraction_storage })

const boat_provider_storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, `${appDir}/public/uploadImage/boatProvider`)
  },
  filename: function (req, file, cb) {
    let _fileType = file.originalname.substring(file.originalname.indexOf("."));
    let _fileName
    if (_fileType === '.jpg' || _fileType === '.png' || _fileType === '.jpeg' || _fileType === '.webp') {

      _fileName = file.fieldname + Date.now() + _fileType;

    }
    else {
      _fileName = 'wrong_file_type' + Date.now()
    }
    cb(null, _fileName);
  },
})
const upload_boat_provider_image = multer({ storage: boat_provider_storage })

const restaurant_storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, `${appDir}/public/uploadImage/restaurant`)
  },
  filename: function (req, file, cb) {
    let _fileType = file.originalname.substring(file.originalname.indexOf("."));
    let _fileName
    if (_fileType === '.jpg' || _fileType === '.png' || _fileType === '.jpeg' || _fileType === '.webp') {

      _fileName = file.fieldname + Date.now() + _fileType;
    }
    else {
      _fileName = 'wrong_file_type' + Date.now()
    }
    cb(null, _fileName);
  },
})
const upload_restaurant_images = multer({ storage: restaurant_storage })

const accommodation_storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, `${appDir}/public/uploadImage/accommodation`)
  },
  filename: function (req, file, cb) {
    let _fileType = file.originalname.substring(file.originalname.indexOf("."));
    let _fileName
    if (_fileType === '.jpg' || _fileType === '.png' || _fileType === '.jpeg' || _fileType === '.webp') {

      _fileName = file.fieldname + Date.now() + _fileType;
    }
    else {
      _fileName = 'wrong_file_type' + Date.now()
    }
    cb(null, _fileName);
  },
})
const upload_accommodation_images = multer({ storage: accommodation_storage })


const mongoURL = process.env.DB_URL


router.route("/check").get((req, res) => {
  // const a = `${process.cwd}`
  // console.log(url.pathToFileURL(a)) 
  let image_name = `${__dirname}`
  let a = url.pathToFileURL(image_name)
  console.log('a is', a);
  res.status(200).json({ status: 200, cwd: image_name, dir: __dirname, });
});
//////////// create api ////////////

// create boat tour provider api
router.route("/create/boat-provider").post((req, res) => {

  const club_name = req.body.club_name
  const provider_name = req.body.provider_name;
  const owner_name = req.body.owner_name;
  const driver_name = req.body.driver_name;
  const boat_quantity = req.body.boat_quantity;
  const max_passenger = req.body.max_passenger;
  const contact = req.body.contact;
  const boat_images = req.body.boat_images;
  const provider_image = req.body.provider_image;

  BoatProvider.create({
    club_name,
    provider_name,
    owner_name,
    driver_name,
    boat_quantity,
    max_passenger,
    contact,
    boat_images,
    provider_image
  })
    .then((e) =>
      res.status(201).json({ status: true, message: "create data success" })
    )
    .catch(res.status(500));
})

// create boat club
router.route("/create/boatClub").post((req, res) => {
  if (!req.body.club_name) {
    return res.status(400).json({ status: 400, type: 'failed', message: 'error' })
  }
  const club_name = req.body.club_name
  BoatClubName.create({
    club_name
  }).then((e) => {
    res.status(201).json({ status: 201, message: 'create data success' })
  }).catch(res.status(500))

})


// create driver location api
router.route("/create/driverLocation").post((req, res) => {
  const location_name = req.body.location_name;
  const location_detail = req.body.location_detail;
  DriverLocation.create({
    location_name,
    location_detail
  }).then((e) => {
    res.status(201).json({ status: 201, message: 'create data success' })
  }).catch(res.status(500));
})

// create driver api
router.route("/create/driver").post((req, res) => {
  console.log('req is', req.body);
  const location_id = ObjectId(req.body.location_id);
  const driver_name = req.body.driver_name;
  const contact = req.body.contact;
  const image = req.body.image;
  const services = req.body.services
  console.log('location id is', location_id);
  Drivers.create({
    location_id,
    driver_name,
    contact,
    image,
    services
  })
    .then((e) =>
      res.status(201).json({ status: true, message: "create data success" })
    )
    .catch(res.status(500));
})

// create restaurant catagory api
router.route("/create/catagory").post((req, res) => {
  const catagory_name = req.body.catagory_name;
  Catagory.create({
    catagory_name
  }).then((e) =>
    res.status(201).json({ status: true, message: "create data success" })
  )
    .catch(res.status(500));
})

// create restaurant
router.route("/create/restaurant").post((req, res) => {
  const type = req.body.type
  const name = req.body.name;
  const location = req.body.location;
  const recommend_menu = req.body.recommend_menu;
  const open_time = req.body.open_time;
  const close_time = req.body.close_time
  const food_min_price = req.body.food_min_price
  const food_max_price = req.body.food_max_price
  const drink_min_price = req.body.drink_min_price
  const drink_max_price = req.body.drink_max_price
  const images = req.body.images;
  const fb_page = req.body.fb_page
  const fb_link = req.body.fb_link
  const line = req.body.line
  const tel = req.body.tel;
  const services = req.body.services;

  Restaurant.create({
    name,
    type,
    location,
    recommend_menu,
    open_time,
    close_time,
    food_min_price,
    food_max_price,
    drink_min_price,
    drink_max_price,
    images,
    fb_page,
    fb_link,
    line,
    tel,
    services
  }).then((e) =>
    res.status(201).json({ status: true, message: "create data success" })
  )
    .catch(res.status(500));

})

// create accommodation  api
router.route("/create/accommodation").post((req, res) => {
  console.log(req.body.fb_link);
  const name = req.body.name
  const type = req.body.type
  const min_price = req.body.min_price
  const max_price = req.body.max_price
  const information = req.body.information
  const fb_page = req.body.fb_page
  const fb_link = req.body.fb_link
  const tel = req.body.tel
  const services = req.body.services
  const images = req.body.images
  //  services.sort()
  const sortService = (arr) => {
    let service = ["ลานจอดรถ", "สระว่ายน้ำ", "Wi-Fi", "ห้องน้้ำส่วนตัว", "ร้านอาหาร", "ห้องประชุม", "เช่ารายเดือน", "ลานกางเต็นท์", "อาหารเช้า", "บริการลากแพ", "คาราโอเกะ"]
    arr.sort((a, b) => {
      return service.indexOf(a.service)
        - service.indexOf(b.service)
    })
  }
  sortService(services)
  Accommodation.create({
    name,
    type,
    min_price,
    max_price,
    information,
    fb_page,
    fb_link,
    tel,
    services,
    images
  }).then((e) =>
    res.status(201).json({ status: true, message: "create data success" })
  )
    .catch(res.status(500));
})


// create Review api
router.route("/create/review").post((req, res) => {
  console.log('req . body is', req.body)
  const review_name = req.body.review_name;
  const review_link = req.body.review_link;
  Reviews.create({
    review_name,
    review_link,
  }).then((e) =>
    res.status(201).json({ status: true, message: "create data success" })
  )
    .catch(res.status(500));
})

// create comment api 
router.route("/create/comment").post(async (req, res) => {
  console.log('req.body is', req.body);
  const user_email = 'tuchchaponsuthamma@gmail.com'
  const commentator_email = req.body.commentator_email
  const commentator_name = req.body.commentator_name
  const comment_text = req.body.comment_text
  const comment_status = "pending"
  if (!commentator_email || typeof commentator_email !== 'string') {
    return res.json({ status: 'error', error: 'Invalid email' })
  }
  await Comment.create({
    commentator_email,
    commentator_name,
    comment_text,
    comment_status
  }).then((e) => {
    new Promise((resolve, reject) => {
      smtpTransport.verify()
      smtpTransport.sendMail({
        to: user_email,
        from: 'sangkhla2go',
        subject: 'แจ้งเตือนจากระบบคอมเมนต์',
        html: `<p>มีคอมเมนต์ใหม่จากผู้ใช้งาน</p>`
      }, function (err, info) {
        if (err) {
          console.log('err is', err);
          reject(err)
          return res
            .json({ status: 400, type: 'failed', payload: "ผิดพลาด", error: err })
        }
        else {
          resolve(info)
          console.log('info is', info);
          return res
            .json({ status: 200, type: 'success', payload: "เพิ่มคอมเมนต์เรียบร้อยแล้ว" })
        }
      })
    }
    )
  })
})

// create admin api
router.route("/create/admin").post(async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  if (!email || typeof email !== 'string') {
    return res.json({ status: 'error', error: 'Invalid email' })
  }
  if (password.length < 5) {
    return res.json({
      status: 'error',
      error: 'password should be atleast 6 characters'

    })
  }
  let encodePass = await bcrypt.hash(password, 10)
  console.log('email is', email)
  console.log('encode password is', encodePass);

  try {
    // res.json({status:'ok',data:{email:email,password:encodePass}})
    await Admins.create({
      email,
      password: encodePass,
    })

  } catch (error) {
    if (error.code === 11000) {
      console.log('error is', error);
      return res.json({ status: 'error', error: 'Username already in use' })
    }
  }
  res.status(201).json({
    status: true, message: "create data success",
    payload: {
      email: email,
      password: password,
      encodePass: encodePass
    }
  })
})

//login api
router.route('/login').post(async (req, res) => {
  const { email, password } = req.body
  const admin = await Admins.findOne({ email }).lean()
  if (!admin) {
    return res.json({ status: 'error', error: 'email or password wrong!!' })
  }
  console.log('admin password is ', admin.password);
  if (await bcrypt.compare(password, admin.password)) {

    const token = jwt.sign({
      id: admin._id,
      email: email, password: password
    },
      JWT_SECRET)
    console.log('token is ', token);
    res.json({ status: 'ok', data: 'login success!! ', token })
  }
  else {
    res.json({ status: 'error', error: 'password wrong' })
  }
})
// router.route('/upload/attraction-images').post(async(req,res,next)=>{
//   const form = formidable({multiples:true})
//   form.parse(req,(err,fields,files)=>{
//     if (err) {
//       next(err)
//       return
//     }
//   })
// })
// change password  api
router.route('/reset-password').post(async (req, res) => {
  const { password, token } = req.body
  console.log(req.body);
  Admins.findOne({ token: token }, async (err, admin) => {
    if (err) {
      return res.status(400).json({ status: 400, type: 'failed' })
    }
    if (!admin) {
      return res
        .status(404)
        .json({ status: 404, type: 'failed', payload: 'ไม่พบอีเมล์ผู้ใช้งาน' })
    }
    if (password.length < 5) {
      return res.json({
        status: 'error',
        error: 'password should be atleast 6 characters'

      })
    }
    else {
      let encodePass = await bcrypt.hash(password, 10)
      admin.password = encodePass
      admin.save()
      console.log(admin.password)
      return res.status(200).json({ status: 200, type: 'success', admin: admin })
    }
  })


})
/////////////////////////////////// upload image api ///////////////////////////////////
//upload driver image
router.route('/upload/driver-image').post(upload_driver_image.single('driver'), (req, res, cb) => {
  console.log(req.file)
  console.log('id is', req.body.id)
  let image_name = req.file.filename
  res.status(200).json({ status: 200, type: 'success', image_name })
})

//upload officer image
router.route('/upload/officer-image').post(upload_officer_image.single('officer'), (req, res, cb) => {
  console.log(req.file)
  let image_name = req.file.filename
  res.status(200).json({ status: 200, type: 'success', image_name })
})

//upload tradition images
router.route('/upload/tradition-images').post(upload_tradition_image.single('tradition'), (req, res, cb) => {
  let image_name = req.file.filename
  res.status(200).json({ status: 200, type: 'success', image_name })
})

//upload product images
router.route('/upload/product-images').post(upload_product_images.single('product'), (req, res, cb) => {
  let image_name = req.file.filename
  res.status(200).json({ status: 200, type: 'success', image_name })
})

// upload attraction images
router.route('/upload/attraction-images').post(upload_attraction_images.single('attraction'), (req, res, cb) => {

  // console.log('cb is',cb);
  // console.log('res is',res);
  console.log('app dir is', appDir);
  console.log('file name is', req.file.filename);
  // console.log('file is',res.allowHalfOpen);
  // res.sendFile(`${req.file.filename}`, {root: "/uploadimage"});
  // let image_name =`${process.cwd()}/uploadimage/attraction/${req.file.filename}`
  // let image_name =`${req.file.filename.toString}`

  let image_name = req.file.filename
  res.status(200).json({ status: 200, type: 'success', image_name })

  console.log(error);
  res.status(500).json({ err, error, filename: image_name });

  // return handle(req, res)
  // res.status(200).json({status:200,type:'success',image_name})

})


//upload boat provider image 
router.route('/upload/boatprovider-image').post(upload_boat_provider_image.single('provider'), (req, res, cb) => {
  let image_name = req.file.filename.toString.trim()
  res.status(200).json({ status: 200, type: 'success', image_name })
})

//upload boat images
router.route('/upload/boat-images').post(upload_boat_provider_image.single('boat'), (req, res, cb) => {
  let image_name = req.file.filename
  res.status(200).json({ status: 200, type: 'success', image_name })
})

//upload restaurant images
router.route('/upload/restaurant-images').post(upload_restaurant_images.single('restaurant'), (req, res, cb) => {
  let image_name = req.file.filename
  res.status(200).json({ status: 200, type: 'success', image_name })
})

//upload accommodation images
router.route('/upload/accommodation-images').post(upload_accommodation_images.single('accommodation'), (req, res, cb) => {
  let image_name = req.file.filename
  res.status(200).json({ status: 200, type: 'success', image_name })
})

// forgotPassword api
router.route('/forgot-password/').post(async (req, res) => {
  let new_admin_password = { email: '', token: '' }
  new_admin_password.email = req.body.email,
    new_admin_password.token = req.body.token


  if (!req.body) {
    return res.status(400).json({ status: 400, type: 'failed', })
  }
  Admins.findOne({ email: new_admin_password.email.toLowerCase().trim() }, async (err, admin) => {

    if (err) {
      return res.status(400).json({ status: 400, type: 'failed', payload: err })
    }
    if (!admin) {
      return res
        .status(400)
        .json({ status: 400, type: 'failed', payload: 'ไม่พบอีเมล์ผู้ใช้งาน' })
    }
    else {
      let new_token = randomstring.generate(32)
      console.log('new token is ', new_token);
      try {
        console.log(new_token);
        admin.token = new_token
        admin.save()
        console.log('update admin is', admin);
        console.log('token is ', new_token);
        console.log(admin.email);
        let url = `https://www.sangkhla2go.com/resetPassword?token=${new_token}`
        await new Promise((resolve, reject) => {

          smtpTransport.verify()
          smtpTransport.sendMail({
            to: admin.email,
            from: 'sangkhla2go',
            subject: 'การตั้งค่ารหัสผ่านใหม่',
            html: `<p><a href=${url}>ตั้งรหัสผ่านใหม่</a></p>`
          }, function (err, info) {
            if (err) {
              console.log('err is', err);
              reject(err)
            }
            else {
              resolve(info)
              return res
                .json({ status: 200, type: 'success', payload: "เราส่งวิธีการเปลี่ยนรหัสผ่านไปที่อีเมลของท่านแล้ว " })
            }

          })

        })
      } catch (error) {
        console.log(error);
      }
    }
  })
})

// attraction api
router.route('/create/attraction').post((req, res) => {
  const type = req.body.type
  const name = req.body.name
  const detail = req.body.detail
  const images = req.body.images
  name.trim()
  Attraction.create({
    type,
    name,
    detail,
    images
  }).then((e) =>
    res.status(201).json({ status: true, message: "create data success" })
  )
    .catch(res.status(500));
})

// create tradition api
router.route('/create/tradition').post((req, res) => {
  const type = req.body.type
  const month = req.body.month
  const name = req.body.name
  const local_name = req.body.local_name
  const detail = req.body.detail
  const images = req.body.images
  Tradition.create({
    type,
    month,
    name,
    local_name,
    detail,
    images
  }).then((e) =>
    res.status(201).json({ status: true, message: "create data success" })
  )
    .catch(res.status(500));

})
router.route('/create/officer').post((req, res) => {
  console.log(req.body.youtube);
  const name = req.body.name
  const position = req.body.position
  const detail = req.body.detail
  const image = req.body.image
  const fb = req.body.fb
  const ig = req.body.ig
  const youtube = req.body.youtube
  Officer.create({
    name,
    position,
    detail,
    image,
    fb,
    ig,
    youtube
  }).then((e) =>
    res.status(201).json({ status: true, message: "create data success" })
  ).catch(res.status(500));

})

// create product api
router.route('/create/product').post((req, res) => {
  const name = req.body.name
  const detail = req.body.detail
  const fb_page = req.body.fb_page
  const tel = req.body.tel
  const link = req.body.link
  const images = req.body.images
  if (!name) {
    return res.status(400).json({ status: false, message: 'ข้อมูลไม่ครบถ้วน' })
  }
  Product.create({
    name,
    detail,
    fb_page,
    tel,
    link,
    images
  }).then((e) =>
    res.status(201).json({ status: true, message: 'create data success' })
  ).catch(res.status(500))
})

/////////////////////// GET API ///////////////////////////////////////

// get data length api
router.route('/get/data-length').get((req, res) => {
  let restaurant = Restaurant.find()
  let accommodation = Accommodation.find()
  let driver = Drivers.find()
  let boat = BoatProvider.find()
  let product = Product.find()
  let attraction = Attraction.find()
  let tradition = Tradition.find()
  let review = Reviews.find()
  restaurant.count((err, res_count) => {
    if (err) res.send(err)
    accommodation.count((err, accom_count) => {
      if (err) res.send(err)
      driver.count((err, driver_count) => {
        if (err) res.send(err)
        boat.count((err, boat_count) => {
          if (err) res.send(err)
          product.count((err, product_count) => {
            if (err) res.send(err)
            attraction.count((err, attraction_count) => {
              if (err) res.send(err)
              tradition.count((err, tradition_count) => {
                if (err) res.send(err)
                review.count((err, review_count) => {
                  if (err) res.send(err)
                  return res.status(200).json({
                    status: 200,
                    type: 'success',
                    payload: { restaurant: res_count, accom: accom_count, driver: driver_count, boat: boat_count, product: product_count, attraction: attraction_count, tradition: tradition_count, review: review_count }
                  })
                })
              })
            })
          })
        })
      })
    })
    // console.log(count);
  })





})
//get boat tour provider api
router.route("/get/boat-provider").get((req, res) => {
  let data_array = []
  BoatProvider.find({}, function (err, data) {
    if (err) {
      res.send(err)
    }
    for (let i = 0; i < data.length; i++) {
      let boat_provider = {
        id: '', club_name: '', driver_name: '', provider_name: '', owner_name: '',
        boat_quantity: '', max_passenger: '', contact: '',
        boat_images: [], provider_image: ''
      }
      boat_provider.id = data[i]._id
      boat_provider.club_name = data[i].club_name
      boat_provider.driver_name = data[i].driver_name
      boat_provider.provider_name = data[i].provider_name
      boat_provider.owner_name = data[i].owner_name
      boat_provider.boat_quantity = data[i].boat_quantity
      boat_provider.max_passenger = data[i].max_passenger
      boat_provider.contact = data[i].contact
      for (let j = 0; j < data[i].boat_images.length; j++) {
        boat_provider.boat_images.push(data[i].boat_images[j])
      }
      boat_provider.provider_image = data[i].provider_image
      data_array.push(boat_provider)
    }
    return res.status(200).json({
      status: 200,
      type: 'success',
      payload: data_array
    })
  })
})

//get driver location
router.route('/get/driverLocation').get((req, res) => {
  let location_array = []
  let first_array = []
  let data_array = []
  let filter = ["วินท่ารถตู้หน้าโรงพยาบาล", "วินหน้า ธ.กรุงไทย", "วินตรงข้าม ธ.กรุงไทย", "วินสะพานไม้ฝั่งมอญ", "วินตลาดฝั่งมอญ", "วินดงสัก", "วินกองทุนแม่", "วินสหกรณ์สังขละบุรี"]
  const sortLocation = (arr) => {

    arr.sort((a, b) => {
      return filter.indexOf(a.location_name)
        - filter.indexOf(b.location_name)
    })
  }
  DriverLocation.find({}, function (err, data) {
    if (err) {
      res.send(err)
    }
    for (let i = 0; i < data.length; i++) {
      let location = { id: '', location_name: '', location_detail: '' }
      location.id = data[i]._id
      location.location_name = data[i].location_name
      location.location_detail = data[i].location_detail
      for (let j = 0; j < filter.length; j++) {
        if (location.location_name.trim() === filter[j]) first_array.push(location)
      }
      location_array.push(location)
    }
    sortLocation(first_array)
    let uniq_location = first_array.concat(location_array)
    // console.log(uniq_location);
    // console.log(first_array);

    data_array = [...new Set(uniq_location)]
    return res.status(200).json({
      status: 200,
      type: 'success',
      payload: data_array,
    })
  })
})

// get one boat provider
router.route('/get/boat/:id').post((req, res) => {

  const id = req.body.id
  try {
    BoatProvider.findOne({ _id: id }, function (err, data) {
      if (err) {

      }
      else {
        return res.status(200).json({
          status: 200, type: 'success', payload: data
        })
      }
    })
  } catch (error) {

  }
})

// get one driver location 
router.route('/get/location/:id').post((req, res) => {

  const id = req.body.id
  // let id = ObjectId(req.params.id.toString())

  // id = id.slice(0,1)

  try {
    DriverLocation.findOne({ _id: id }, function (err, data) {
      if (err) {

      } else {
        return res.status(200).json({
          status: 200,
          type: 'success',

          payload: data
        })
      }
    })

  } catch (error) {



  }
})
// get club name by id 
router.route('/get/clubName/:id').post((req, res) => {
  const id = req.body.id
  try {
    BoatClubName.findOne({ _id: id }, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        return res.status(200).json({
          status: 200,
          type: 'success',
          payload: data
        })
      }

    })
  } catch (error) {

  }
})

// get reviews api

router.route('/get/reviews').get((req, res) => {
  let data_array = []
  Reviews.find({}, function (err, data) {
    if (err) {
      res.send(err)
    }
    for (let i = 0; i < data.length; i++) {
      let reviews = { id: '', review_name: '', review_link: '' }
      reviews.id = data[i]._id
      reviews.review_name = data[i].review_name
      reviews.review_link = data[i].review_link
      data_array.push(reviews)
    }
    return res.status(200).json({ payload: data_array, status: 200 })
  })
})

// get boat club name 
router.route('/get/boatClubName').get((req, res) => {
  let data_array = []
  BoatClubName.find({}, function (err, data) {
    if (err) {
      res.send(err)
    }
    for (let i = 0; i < data.length; i++) {

      let boatClubName = { id: '', club_name: '' }
      boatClubName.id = data[i]._id
      boatClubName.club_name = data[i].club_name
      data_array.push(boatClubName)
    }
    return res.status(200).json({ payload: data_array, status: 200 })
  })
})

// get comment api
router.route('/get/comment').get((req, res) => {
  let pending_comment = []
  let approve_comment = []
  let reject_comment = []
  let data_array = []
  Comment.find({}, (err, data) => {
    if (err) {
      res.send(err)
    }
    for (let i = 0; i < data.length; i++) {
      let comment = { id: '', commentator_name: '', commentator_email: '', comment_status: '', comment_text: '' }
      comment.id = data[i]._id
      comment.commentator_name = data[i].commentator_name
      comment.commentator_email = data[i].commentator_email
      comment.comment_status = data[i].comment_status
      comment.comment_text = data[i].comment_text
      data[i].comment_status === 'pending' ? pending_comment.push(comment) :
        data[i].comment_status === 'approve' ? approve_comment.push(comment) :
          data[i].comment_status === 'reject' ? reject_comment.push(comment) : data_array.push(comment)

    }
    return res.status(200).json({ payload: { pending: pending_comment, approve: approve_comment, reject: reject_comment }, status: 200 })
  })
})

// get one review 
router.route('/get/review/:id').post((req, res) => {
  const id = req.body.id
  if (!id) {
    return res.status(400).json({ status: 400, type: 'error', payload: 'ข้อมูลไม่ถูกต้อง' })
  }
  try {
    Reviews.findOne({ _id: new ObjectId(id) }, function (err, data) {
      if (err) {
        res.send(err)
      }
      let review = { id: '', review_name: '', review_link: '', }
      review.id = data._id
      review.review_name = data.review_name
      review.review_link = data.review_link
      return res.status(200).json({ status: 200, type: 'success', payload: review })
    })
  } catch (error) {
  }
})
// get one tradition
router.route('/get/tradition/:id').post((req, res) => {
  const id = req.body.id
  if (!id) {
    return res.status(400).json({ status: 400, type: 'error', payload: 'ข้อมูลไม่ถูกต้อง' })
  }
  try {
    Tradition.findOne({ _id: new ObjectId(id) }, function (err, data) {
      if (err) {
        res.send(err)
      }

      let tradition = { id: '', type: '', month: '', name: '', local_name: '', detail: '', images: [] }
      tradition.id = new ObjectId(data._id)
      tradition.type = data.type
      tradition.month = data.month
      tradition.name = data.name
      tradition.local_name = data.local_name
      tradition.detail = data.detail
      tradition.images = data.images
      return res.status(200).json({ status: 200, type: 'success', payload: tradition })
    })
  } catch (error) {

  }
})

// get one officer
router.route('/get/officer/:id').post((req, res) => {
  const id = req.body.id;

  if (!id) {
    return res.status(400).json({ status: 400, type: 'error', payload: 'ข้อมูลไม่ถูกต้อง' })
  }

  try {
    Officer.findOne({ _id: new ObjectId(id) }, (err, data) => {
      if (err) {
        res.send(err)
      }
      let officer = { id: '', name: '', position: '', detail: '', image: '', fb: '', youtube: '', ig: '' }
      officer.id = data._id
      officer.name = data.name
      officer.position = data.position
      officer.detail = data.detail
      officer.image = data.image
      officer.fb = data.fb
      officer.ig = data.ig
      officer.youtube = data.youtube
      return res.status(200).json({ status: 200, type: 'success', payload: officer })
    })
  } catch (error) {

  }
})
// get one product
router.route('/get/product/:id').post((req, res) => {
  const id = req.body.id
  if (!id) {
    return res.status(400).json({ status: 400, type: 'error', payload: 'ข้อมูลไม่ถูกต้อง' })
  }
  Product.findOne({ _id: new ObjectId(id) }, (err, data) => {
    if (err) {
      res.send(err)
    }
    let product = { id: '', name: '', detail: '', fb_page: '', tel: '', link: '', images: [] }
    product.id = data._id
    product.name = data.name
    product.detail = data.detail
    product.fb_page = data.fb_page
    product.tel = data.tel
    product.link = data.link
    product.images = data.images
    return res.status(200).json({ status: 200, type: 'success', payload: product })
  })
})

//get one attraction api
router.route('/get/attraction/:id').post((req, res) => {
  const id = req.body.id


  if (!id) {
    return res.status(400).json({ status: 400, type: 'error', payload: 'ข้อมูลไม่ถูกต้อง' })
  }
  Attraction.findOne({ _id: new ObjectId(id) }, (err, data) => {
    if (err) {
      res.send(err)
    }
    let attraction = { id: '', name: '', type: '', detail: '', images: [] }
    attraction.id = data._id
    attraction.name = data.name
    attraction.type = data.type
    attraction.detail = data.detail
    attraction.images = data.images
    return res.status(200).json({ status: 200, type: 'success', payload: attraction })
  })
})

//get driver id
router.route('/get/driver/:id').post((req, res) => {
  const id = req.body.id
  let dataService = []
  if (!req.body.id) {
    return res.status(400).json({ status: 400, type: 'error', payload: 'ข้อมูลไม่ถูกต้อง' })
  }


  try {
    Drivers.findOne({ _id: new ObjectId(id) }, function (err, data) {
      dataService = data.services
      let triCycle = false
      let sidetow = false
      for (let i = 0; i < dataService.length; i++) {
        dataService.includes("รถพ่วงข้าง") ? sidetow = true : ''
        dataService.includes("รถสามล้อ") ? triCycle = true : ''

      }

      if (err) {

      }
      return res.status(200).json({
        status: 200,
        type: 'success',
        payload: data,
        sidetow,
        triCycle
      })
    })
  } catch (error) {

  }
})
// get one restaurant api
router.route('/get/restaurant/:id').post((req, res) => {
  const id = req.body.id
  if (!req.body.id) {
    return res.status(400).json({ status: 400, type: 'error', payload: 'ข้อมูลไม่ถูกต้อง' })
  }
  try {

    Restaurant.findOne({ _id: new ObjectId(id) }, function (err, data) {
      if (err) {
        res.send(err)
      }
      return res.status(200).json({
        status: 200,
        type: 'success',
        payload: data
      })
    })
  } catch (error) {
    res.send(error)
  }
})

// get one accommodation api
router.route('/get/accommodation/:id').post((req, res) => {
  let id = req.body.id

  if (!req.body.id) {
    return res.status(400).json({ status: 400, type: 'error', payload: 'ข้อมูลไม่ถูกต้อง' })
  }

  Accommodation.findOne({ _id: new ObjectId(id) }, function (err, data) {
    if (err) {
      res.send(err)
    }
    return res.status(200).json({
      status: 200,
      type: 'success',
      payload: data
    })
  })
})


// populate
router.route('/get/driverfromlocation').post((req, res) => {
  let id = req.body.id
  let sidetow = false
  let triCycle = false
  let data_array = []

  Drivers.find({ location_id: new ObjectId(id) }).
    populate('driverlocations').
    exec(function (err, data) {
      if (err) return res.status(400)

      for (let i = 0; i < data.length; i++) {
        let driver = { id: '', location_id: '', name: '', tel: '', contact: '', image: '' }
        driver.id = data[i]._id
        driver.location_id = data[i].location_id
        driver.name = data[i].driver_name
        driver.tel = data[i].tel
        driver.contact = data[i].contact
        driver.image = data[i].image
        data[i].services.includes("รถพ่วงข้าง") ? sidetow = true : ''
        data[i].services.includes("รถสามล้อ") ? triCycle = true : ''
        data_array.push(driver)

      }



      return res.status(200).json({
        status: 200,
        type: "success",
        payload: data_array,
        sidetow: sidetow,
        triCycle: triCycle
      })

    })
})

// get driver api

router.route("/get/driver").get((req, res) => {

  let driver_array = []
  Drivers.find({}, function (err, data) {
    if (err) {
      res.send(err);
    }
    for (let i = 0; i < data.length; i++) {
      let driver = { id: '', location_id: '', driver_name: '', contact: '', driver_image: '' }
      driver.id = data[i]._id
      driver.location_id = data[i].location_id
      driver.driver_name = data[i].driver_name
      driver.driver_image = data[i].driverImage
      driver.contact = data[i].contact
      driver_array.push(driver)

    }
    return res.status(200).json({
      status: 200,
      type: "success",
      payload: driver_array
    })
  })
})

//get officer api
router.route("/get/officers").get((req, res) => {
  let officer_array = []
  let leader = {}
  let consultant = []
  let coordinator = []
  let intern = []
  let new_graduate = []
  let citizen = []
  Officer.find({}, function (err, data) {

    if (err) {
      res.send(err)
    }
    for (let i = 0; i < data.length; i++) {
      let officer = { id: '', position: '', name: '', detail: '', image: '', fb: '', ig: '', youtube: '' }
      // const element = data[i];
      officer.id = data[i]._id
      officer.position = data[i].position
      officer.name = data[i].name
      officer.detail = data[i].detail
      officer.image = data[i].image
      officer.fb = data[i].fb
      officer.ig = data[i].ig
      officer.youtube = data[i].youtube
      if (data[i].position === "หัวหน้าโครงการ") leader = officer
      if (data[i].position === "ที่ปรึกษา") consultant.push(officer)
      if (data[i].position === "ผู้ประสานงาน") coordinator.push(officer)
      if (data[i].position === "บัณฑิตจบใหม่") new_graduate.push(officer)
      if (data[i].position === "ประชาชน") citizen.push(officer)
      if (data[i].position === "นักศึกษาฝึกงาน") intern.push(officer)
      officer_array.push(officer)
    }
    return res.status(200).json({
      status: 200,
      type: 'success',
      payload: {
        leader: leader,
        consultant: consultant,
        coordinator: coordinator,
        new_graduate: new_graduate,
        citizen: citizen,
        intern: intern,
        officer: officer_array
      }
    })
  })
})
// get restaurant catagory api
router.route("/get/catagory").get((req, res) => {
  let catagory_array = []
  Catagory.find({}, function (err, data) {
    if (err) {
      res.send(err);
    }
    for (let i = 0; i < data.length; i++) {
      let catagory = { id: '', catagory_name: '' }
      catagory.id = data[i]._id
      catagory.catagory_name = data[i].catagory_name;
      catagory_array.push(catagory)
    }
    return res.status(200).json({
      status: 200,
      type: "success",
      payload: catagory_array
    })
  })
})

// get accommodation type api


// get acommodation api
router.route("/get/accommodation").get((req, res) => {
  let data_array = []
  let homepage_hotel = []
  let all_hotel = []
  let boat_house_array = []
  const sortService = (arr) => {
    let service = ["ลานจอดรถ", "สระว่ายน้ำ", "Wi-Fi", "ห้องน้ำส่วนตัว", "ร้านอาหาร", "ห้องประชุม", "เช่ารายเดือน", "ลานกางเต็นท์", "อาหารเช้า", "บริการลากแพ", "คาราโอเกะ"]
    arr.sort((a, b) => {
      return service.indexOf(a)
        - service.indexOf(b)
    })
  }
  Accommodation.find({}, function (err, data) {
    if (err) {
      res.send(err)
    }
    for (let i = 0; i < data.length; i++) {
      let ser_arr = []
      let accommodation = {
        id: '', type: '', name: '', information: '',
        min_price: '', max_price: '', tel: '', fb_page: '',
        services: [], images: [], fb_link: ''
      }
      accommodation.id = data[i]._id,
        accommodation.type = data[i].type,
        accommodation.name = data[i].name,
        accommodation.information = data[i].information,
        accommodation.min_price = data[i].min_price,
        accommodation.max_price = data[i].max_price,
        accommodation.fb_page = data[i].fb_page,
        accommodation.fb_link = data[i].fb_link,
        accommodation.tel = data[i].tel
      for (let j = 0; j < data[i].services.length; j++) {
        ser_arr.push(data[i].services[j])
      }
      for (let k = 0; k < data[i].images.length; k++) {
        accommodation.images.push(data[i].images[k])
      }
      data_array.push(accommodation)
      sortService(ser_arr)
      accommodation.services = ser_arr
      accommodation.type.includes("แพพัก") ? null : all_hotel.push(accommodation)
      accommodation.type.includes("แพพัก") ? boat_house_array.push(accommodation) : !accommodation.type.includes("แพพัก") && homepage_hotel.length < 40 ? homepage_hotel.push(accommodation) : ''


    }
    return res.status(200).json({ status: 200, payload: data_array, length: data.length, hotel: homepage_hotel, boat_house: boat_house_array, all_hotel: all_hotel })

  })
})

// get accommodation sort 6 type 
router.route("/get/accom-sort").get((req, res) => {
  let hotel_arr = []
  let gest_house_arr = []
  let resort_arr = []
  let house_arr = []
  let host_tel_arr = []
  let home_stay_arr = []
  let boat_house_arr = []

  const sortService = (arr) => {
    let service = ["ลานจอดรถ", "สระว่ายน้ำ", "Wi-Fi", "ห้องน้ำส่วนตัว", "ร้านอาหาร", "ห้องประชุม", "เช่ารายเดือน", "ลานกางเต็นท์", "อาหารเช้า", "บริการลากแพ", "คาราโอเกะ"]
    arr.sort((a, b) => {
      return service.indexOf(a)
        - service.indexOf(b)
    })
  }
  Accommodation.find({}, function (err, data) {
    if (err) {
      res.send(err)
    }
    for (let i = 0; i < data.length; i++) {
      let ser_arr = []
      let accommodation = {
        id: '', type: '', name: '', information: '',
        min_price: '', max_price: '', tel: '', fb_page: '',
        services: [], images: [], fb_link: ''
      }
      accommodation.id = data[i]._id,
        accommodation.type = data[i].type,
        accommodation.name = data[i].name,
        accommodation.information = data[i].information,
        accommodation.min_price = data[i].min_price,
        accommodation.max_price = data[i].max_price,
        accommodation.fb_page = data[i].fb_page,
        accommodation.fb_link = data[i].fb_link,
        accommodation.tel = data[i].tel
      for (let j = 0; j < data[i].services.length; j++) {
        ser_arr.push(data[i].services[j])
      }
      for (let k = 0; k < data[i].images.length; k++) {
        accommodation.images.push(data[i].images[k])
      }
      sortService(ser_arr)
      accommodation.services = ser_arr
      accommodation.type.includes("โรงแรม") ? hotel_arr.push(accommodation) : accommodation.type.includes("แพพัก") ? boat_house_arr.push(accommodation) :
        accommodation.type.includes("โฮมสเตย์") ? home_stay_arr.push(accommodation) : accommodation.type.includes("เรือนรับรอง") ? house_arr.push(accommodation) :
          accommodation.type.includes("รีสอร์ท") ? resort_arr.push(accommodation) : accommodation.type.includes("โฮสเทล") ? host_tel_arr.push(accommodation) :
            accommodation.type.includes("เกสต์เฮ้าส์") ? gest_house_arr.push(accommodation) : ''
    }
    return res.status(200).json({
      type: 'success', status: 200, payload: {
        hotel: hotel_arr, boat_house: boat_house_arr, homestay: home_stay_arr
        , house: house_arr, resort: resort_arr, hosttel: host_tel_arr, gesthouse: gest_house_arr
      }
    })
  })
})

// get restaurant api 
router.route('/get/restaurant').get((req, res) => {
  let data_array = []
  Restaurant.find({}, function (err, data) {
    for (let i = 0; i < data.length; i++) {
      let restaurant = {
        id: '', type: [], name: '', services: [], location: '', recommend_menu: '',
        food_min_price: '', food_max_price: '', drink_min_price: '', drink_max_price: '', open_time: '', close_time: ''
        , images: [], tel: '', fb_page: '', fb_link: '', line: ''
      }
      restaurant.id = data[i]._id
      restaurant.name = data[i].name
      restaurant.location = data[i].location
      restaurant.recommend_menu = data[i].recommend_menu
      restaurant.food_min_price = data[i].food_min_price
      restaurant.food_max_price = data[i].food_max_price
      restaurant.drink_min_price = data[i].drink_min_price
      restaurant.drink_max_price = data[i].drink_max_price
      restaurant.open_time = data[i].open_time
      restaurant.close_time = data[i].close_time
      restaurant.tel = data[i].tel
      restaurant.fb_page = data[i].fb_page
      restaurant.fb_link = data[i].fb_link
      restaurant.line = data[i].line
      for (let j = 0; j < data[i].images.length; j++) {
        restaurant.images.push(data[i].images[j])
      }
      for (let k = 0; k < data[i].services.length; k++) {
        restaurant.services.push(data[i].services[k])

      }
      for (let l = 0; l < data[i].type.length; l++) {
        restaurant.type.push(data[i].type[l])

      }



      data_array.push(restaurant)
    }
    return res.status(200).json({ payload: data_array, status: 200 })
  })

})


//get attraction index 
router.route('/get/init-attraction').get((req, res) => {
  let data_array = []
  let indexAttraction = ["พระเจดีย์สามองค์", "วัดวังก์วิเวการาม", "จุดชมทิวทัศน์สังขละบุรี", "เจดีย์พุทธคยา", "ห้วยซองกาเรีย", "สะพานอุตตมานุสรณ์ (สะพานมอญ)", "เมืองบาดาล วัดจมน้ำ"]
  const sortAttraction = (arr) => {

    arr.sort((a, b) => {
      // console.log('a is', a.name);
      return indexAttraction.indexOf(a.name)
        - indexAttraction.indexOf(b.name)
    })
  }

  Attraction.find({}, function (err, data) {

    for (let i = 0; i < data.length; i++) {

      let attraction = { id: '', type: '', name: '', detail: '', images: [] }
      attraction.id = data[i]._id
      attraction.type = data[i].type
      attraction.name = data[i].name
      attraction.detail = data[i].detail
      for (let j = 0; j < data[i].images.length; j++) {
        attraction.images.push(data[i].images[j])
      }
      for (let k = 0; k < indexAttraction.length; k++) {

        if (attraction.name.trim() === indexAttraction[k]) {
          data_array.push(attraction)

        }
      }

    }
    sortAttraction(data_array)
    // console.log('data_array is', data_array);
    // console.log('lenght is', data_array.length,);
    return res.status(200).json({ payload: data_array, status: 200 })
  })
})

//get attraction index mobile and tablet screen
router.route('/get/init-attraction-mobile').get((req, res) => {
  let data_array = []
  let indexAttraction = ["เมืองบาดาล วัดจมน้ำ", "พระเจดีย์สามองค์", "เจดีย์พุทธคยา", "ห้วยซองกาเรีย", "วัดวังก์วิเวการาม", "สะพานอุตตมานุสรณ์ (สะพานมอญ)", "จุดชมทิวทัศน์สังขละบุรี"]
  const sortAttraction = (arr) => {

    arr.sort((a, b) => {
      // console.log('a is', a.name);
      return indexAttraction.indexOf(a.name)
        - indexAttraction.indexOf(b.name)
    })
  }

  Attraction.find({}, function (err, data) {

    for (let i = 0; i < data.length; i++) {

      let attraction = { id: '', type: '', name: '', detail: '', images: [] }
      attraction.id = data[i]._id
      attraction.type = data[i].type
      attraction.name = data[i].name
      attraction.detail = data[i].detail
      for (let j = 0; j < data[i].images.length; j++) {
        attraction.images.push(data[i].images[j])
      }
      for (let k = 0; k < indexAttraction.length; k++) {

        if (attraction.name.trim() === indexAttraction[k]) {
          data_array.push(attraction)

        }
      }

    }
    sortAttraction(data_array)
    // console.log('data_array is', data_array);
    // console.log('lenght is', data_array.length,);
    return res.status(200).json({ payload: data_array, status: 200 })
  })
})

// get attraction api 
router.route('/get/attractions').get((req, res) => {
  let data_array = []
  let nature_attraction = []
  let tradition_attraction = []
  let agri_attraction = []

  Attraction.find({}, function (err, data) {

    for (let i = 0; i < data.length; i++) {
      let attraction = { id: '', type: '', name: '', detail: '', images: [] }
      attraction.id = data[i]._id
      attraction.type = data[i].type
      attraction.name = data[i].name
      attraction.detail = data[i].detail
      for (let j = 0; j < data[i].images.length; j++) {
        attraction.images.push(data[i].images[j])
      }
      data_array.push(attraction)
      attraction.type === "ธรรมชาติ" ? nature_attraction.push(attraction)
        : attraction.type === "วัฒนธรรม" ? tradition_attraction.push(attraction)
          : agri_attraction.push(attraction)
    }
    return res.status(200).json({ payload: { attraction: data_array, nature_attraction, tradition_attraction, agri_attraction }, status: 200 })
  })

})

// get product api
router.route('/get/products').get((req, res) => {

  let data_array = []
  let all_product = []
  let first_array = []
  const sortProduct = (arr) => {
    let product = ["ผ้าทอมือกะเหรี่ยง", "สินค้าผ้าทอมือ", "ไม้กวาดดอกหญ้า",]
    arr.sort((a, b) => {
      // console.log('a is', a.name);
      return product.indexOf(a.name)
        - product.indexOf(b.name)
    })
  }
  Product.find({}, function (err, data) {
    if (err) {
      res.send(err)
    }
    for (let i = 0; i < data.length; i++) {
      let product = { id: '', name: '', detail: '', fb_page: '', tel: '', link: '', images: [] }
      product.id = data[i]._id
      product.name = data[i].name
      product.detail = data[i].detail
      product.fb_page = data[i].fb_page
      product.tel = data[i].tel
      product.link = data[i].link
      for (let j = 0; j < data[i].images.length; j++) {
        product.images.push(data[i].images[j])

      }
      product.name === "ผ้าทอมือกะเหรี่ยง" || product.name === "สินค้าผ้าทอมือ" ||
        product.name === "ไม้กวาดดอกหญ้า" ? first_array.push(product) : data_array.push(product)
    }
    sortProduct(first_array)
    all_product = first_array.concat(data_array)
    // console.log(first_array);
    // console.log('after arr', data_array);
    return res.status(200).json({ payload: all_product, status: 200 })
  })
})

// get tradition api
router.route('/get/traditions').get((req, res) => {
  let mon_array = []
  let karen_array = []
  Tradition.find({}, function (err, data) {
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        let tradition = { id: '', type: '', name: '', local_name: '', month: '', detail: '', images: [] }
        tradition.id = data[i]._id
        tradition.type = data[i].type
        tradition.name = data[i].name,
          tradition.month = data[i].month
        tradition.type === 'ประเพณีชาวกระเหรี่ยง' ? tradition.local_name = data[i].local_name : tradition.local_name = ''
        tradition.detail = data[i].detail
        for (let j = 0; j < data[i].images.length; j++) {
          tradition.images.push(data[i].images[j])
        }
        tradition.type === 'ประเพณีชาวกระเหรี่ยง' ? karen_array.push(tradition) : mon_array.push(tradition)

      }
      const sortByMonth = (arr) => {
        let months = ["เดือนมกราคม", "เดือนกุมภาพันธ์", "เดือนมีนาคม", "เดือนเมษายน", "เดือนพฤษภาคม", "เดือนมิถุนายน", "เดือนกรกฎาคม",
          "เดือนสิงหาคม", "เดือนกันยายน", "เดือนตุลาคม", "เดือนพฤศจิกายน", "เดือนธันวาคม"]
        arr.sort((a, b) => {
          return months.indexOf(a.month)
            - months.indexOf(b.month)
        })
      }
      sortByMonth(karen_array)
      sortByMonth(mon_array)
      return res.status(200).json({
        status: 200,
        type: "success",
        payload: { karen_tradition: karen_array, mon_tradition: mon_array }
      })
    } else {
      return res.status(400).json({
        status: 400,
        type: 'failed',
        payload: 'ไม่พบข้อมูล'
      })
    }

  })
})


//////////// update data API ////////////

//edit driver location api
router.route('/edit/driverLocation').post(async (req, res) => {
  let newlocation = await DriverLocation.findOne({ _id: req.body._id })

  newlocation.location_name = req.body.location_name
  newlocation.location_detail = req.body.location_detail
  if (!req.body.location_name) {
    return res
      .status(400)
      .json({ status: 400, type: 'failed', payload: 'กรุณากรอกข้อมูลให้ครบถ้วน' })
  }
  await newlocation.save()
  return res.status(200).json({ status: 200, type: 'success', payload: 'แก้ไขข้อมูลเรียบร้อยแล้ว' })
})
// edit review api
router.route('/edit/review').post(async (req, res) => {
  let id = req.body.id

  let edit_review = await Reviews.findOne({ _id: new ObjectId(id) })
  if (!edit_review) {
    return res
      .status(400)
      .json({ status: 400, type: 'failed', payload: 'กรุณากรอกข้อมูลให้ครบถ้วน' })
  }
  edit_review.review_name = req.body.review_name
  edit_review.review_link = req.body.review_link

  edit_review.save()
  return res.status(200).json({ status: 200, type: 'success', payload: 'แก้ไขข้อมูลเรียบร้อยแล้ว' })
})

// edit boat club name
router.route('/edit/boatClubName').post(async (req, res) => {
  console.log('req body is', req.body);
  let newClubName = await BoatClubName.findOne({ _id: req.body._id })
  newClubName.club_name = req.body.club_name
  if (!req.body.club_name) {
    return res.status(400).json({ status: 400, type: 'failed', payload: 'กรุณากรอกข้อมูลให้ครบถ้วน' })
  }
  await newClubName.save()
  return res.status(200).json({ status: 200, type: 'success', payload: 'แก้ไขข้อมูลเรียบร้อยแล้ว' })
})

// approve reject comment api
router.route('/edit/comment-status').post(async (req, res) => {
  let id = req.body.id
  let user_email = req.body.commentator_email
  let comment_status = req.body.comment_status
  let edit_comment = await Comment.findOne({ _id: new ObjectId(id) })
  edit_comment.comment_status = req.body.comment_status
  console.log(req.body.commentator_email);
  if (!id) {
    return res.status(400).json({ status: 400, type: 'failed', payload: 'กรุณากรอกข้อมูลให้ครบถ้วน' })
  }
  if (comment_status === "approve") {
    await new Promise((resolve, reject) => {

      smtpTransport.verify()
      smtpTransport.sendMail({
        to: user_email,
        from: 'sangkhla2go',
        subject: 'แจ้งเตือนผลการรีวิวจากเว็บไซต์ Sangkhla2go',
        html: `<span>คอมเมนต์รีวิวของท่านผ่านการอนุมัติจากผู้ดูแลระบบแล้ว</span>`
      }, function (err, info) {
        if (err) {
          console.log('err is', err);
          reject(err)
          return res.json({ status: 400, type: 'failed', payload: "ไม่สามารถส่งอีเมลล์ได้" })
        }
        else {
          resolve(info)
          edit_comment.save()
          return res
            .json({ status: 200, type: 'success', payload: "แก้ไขสถานะของคอมเมนต์เรียบร้อยแล้ว" })
        }

      })

    })
  }
  else if (comment_status === "reject") {
    await new Promise((resolve, reject) => {

      smtpTransport.verify()
      smtpTransport.sendMail({
        to: user_email,
        from: 'sangkhla2go',
        subject: 'แจ้งเตือนผลการรีวิวจากเว็บไซต์ Sangkhla2go',
        html: `<span>คอมเมนต์รีวิวของท่านไม่ผ่านการอนุมัติจากผู้ดูแลระบบ</span>`
      }, function (err, info) {
        if (err) {
          console.log('err is', err);
          reject(err)
          return res.json({ status: 400, type: 'failed', payload: "ไม่สามารถส่งอีเมลล์ได้" })
        }
        else {
          resolve(info)
          edit_comment.save()
          return res
            .json({ status: 200, type: 'success', payload: "แก้ไขสถานะของคอมเมนต์เรียบร้อยแล้ว" })
        }
      })
    })
  }

})


// edit driver api 
router.route('/edit/driver').post(async (req, res) => {
  let id = req.body._id

  let new_driver = await Drivers.findOne({ _id: new ObjectId(id) })

  if (!new_driver) {
    return res
      .status(400)
      .json({ status: 400, type: 'failed', payload: 'กรุณากรอกข้อมูลให้ครบถ้วน' })
  }
  new_driver.location_id = new ObjectId(req.body.location_id),
    new_driver.driver_name = req.body.driver_name,
    new_driver.contact = req.body.contact,
    new_driver.services = req.body.services
  new_driver.image = req.body.image,
    await new_driver.save()
  return res.status(200).json({ status: 200, type: 'success', payload: 'แก้ไขข้อมูลเรียบร้อยแล้ว' })
})

// edit boat provider api
router.route('/edit/boat-provider').post(async (req, res) => {
  let id = req.body._id
  let new_boat_provider = await BoatProvider.findOne({ _id: new ObjectId(id) })
  if (!new_boat_provider) {
    return res
      .status(400)
      .json({ status: 400, type: 'failed', payload: 'กรุณากรอกข้อมูลให้ครบถ้วน' })
  }
  new_boat_provider.club_name = req.body.club_name
  new_boat_provider.provider_name = req.body.provider_name
  new_boat_provider.owner_name = req.body.owner_name
  new_boat_provider.driver_name = req.body.driver_name
  new_boat_provider.boat_quantity = req.body.boat_quantity
  new_boat_provider.max_passenger = req.body.max_passenger
  new_boat_provider.contact = req.body.contact
  new_boat_provider.boat_images = req.body.boat_images
  new_boat_provider.provider_image = req.body.provider_image
  await new_boat_provider.save()
  return res.status(200).json({ status: 200, type: 'success', payload: 'แก้ไขข้อมูลเรียบร้อยแล้ว' })

})

// edit accommodation api
router.route('/edit/accommodation').post(async (req, res) => {
  let id = req.body._id
  let update_accommodation = await accommodation.findOne({ _id: new ObjectId(id) })

  if (!req.body.type || !req.body.name) {
    return res.status(400).json({ status: 400, type: 'failed', payload: 'กรุณากรอกข้อมูลให้ครบถ้วน' })
  }
  update_accommodation.name = req.body.name
  update_accommodation.type = req.body.type
  update_accommodation.information = req.body.information
  update_accommodation.min_price = req.body.min_price
  update_accommodation.max_price = req.body.max_price
  update_accommodation.services = req.body.services
  update_accommodation.tel = req.body.tel
  update_accommodation.fb_page = req.body.fb_page
  update_accommodation.fb_link = req.body.fb_link
  update_accommodation.images = req.body.images
  await update_accommodation.save()
  return res.status(200).json({ status: 200, type: 'success', payload: 'แก้ไขข้อมูลเรียบร้อยแล้ว' })
})

// edit restaurant catagory api
router.route('/edit/catagory').post(async (req, res) => {
  let update_catagory = await Catagory.findOne({ _id: req.body.id })
  if (!req.body.catagory_name) {
    return res.status(400).json({ status: 400, type: 'failed', payload: 'กรุณากรอกข้อมูลให้ครบถ้วน' })
  }
  update_catagory.catagory_name = req.body.catagory_name
  await update_catagory.save()
  return res.status(200).json({ status: 200, type: 'success', payload: 'แก้ไขข้อมูลเรียบร้อยแล้ว' })
})

// edit restaurant api
router.route('/edit/restaurant').post(async (req, res) => {
  let id = req.body._id

  let update_restaurant = await Restaurant.findOne({ _id: new ObjectId(id) })
  if (!req.body.name) {
    return res.status(400).json({ status: 400, type: 'failed', payload: 'กรุณากรอกข้อมูลให้ครบถ้วน' })
  }
  update_restaurant.name = req.body.name
  update_restaurant.type = req.body.type
  update_restaurant.location = req.body.location
  update_restaurant.food_type = req.body.food_type
  update_restaurant.recommend_menu = req.body.recommend_menu
  update_restaurant.open_time = req.body.open_time
  update_restaurant.food_min_price = req.body.food_min_price
  update_restaurant.food_max_price = req.body.food_max_price
  update_restaurant.drink_min_price = req.body.drink_min_price
  update_restaurant.drink_max_price = req.body.drink_max_price
  update_restaurant.tel = req.body.tel
  update_restaurant.fb_page = req.body.fb_page
  update_restaurant.fb_link = req.body.fb_link
  update_restaurant.line = req.body.line
  update_restaurant.services = req.body.services
  update_restaurant.images = req.body.images
  await update_restaurant.save()
  return res.status(200).json({ status: 200, type: 'success', payload: 'แก้ไขข้อมูลเรียบร้อยแล้ว' })
})



// edit tradiion  api
router.route('/edit/tradition').post(async (req, res) => {
  let update_tradition = await Tradition.findOne({ _id: req.body.id })
  if (!req.body.name || !req.body.type || !req.body.detail) {
    return res.status(400).json({ status: 400, type: 'failed', payload: 'กรุณากรอกข้อมูลให้ครบถ้วน' })
  }



  update_tradition.type = req.body.type
  update_tradition.month = req.body.month
  update_tradition.name = req.body.name
  update_tradition.local_name = req.body.local_name
  update_tradition.detail = req.body.detail
  update_tradition.images = req.body.images
  if (req.body.type === "ประเพณีชาวมอญ") {
    update_tradition.local_name = ''
  }
  await update_tradition.save()
  return res.status(200).json({ status: 200, type: 'success', payload: 'แก้ไขข้อมูลเรียบร้อยแล้ว' })
})
// edit attraction api
router.route('/edit/attraction').post(async (req, res) => {
  if (!req.body.type || !req.body.name || !req.body.detail) {
    return res.status(400).json({ status: 400, type: 'failed', payload: 'ข้อมูลที่ส่งมาไม่ครบถ้วน' })
  }
  let update_attraction = await Attraction.findOne({ _id: req.body.id })
  if (!update_attraction) {
    return res.status(400).json({ status: 400, type: 'failed', payload: 'ข้อมูลที่ส่งมาไม่ครบถ้วน' })
  }
  update_attraction.name = req.body.name.trim()
  update_attraction.type = req.body.type
  update_attraction.detail = req.body.detail
  update_attraction.images = req.body.images

  await update_attraction.save()
  return res.status(200).json({ status: 200, type: 'failed', payload: 'แก้ไขข้อมูลเรียบร้อยแล้ว' })
})


// edit officer api
router.route('/edit/officer').post(async (req, res) => {
  let id = req.body.id
  console.log(req.body.youtube);
  let new_officer = await Officer.findOne({ _id: new ObjectId(id) })

  if (!new_officer) {
    return res.status(400).json({ status: 400, type: 'failed', payload: 'กรุณากรอกข้อมูลให้ครบถ้วน' })
  }
  new_officer.name = req.body.name
  new_officer.position = req.body.position
  new_officer.detail = req.body.detail
  new_officer.image = req.body.image
  new_officer.fb = req.body.fb
  new_officer.ig = req.body.ig
  new_officer.youtube = req.body.youtube
  await new_officer.save()
  return res.status(200).json({ status: 200, type: 'success', payload: 'แก้ไขข้อมูลเรียบร้อยแล้ว' })
})

// edit product api
router.route('/edit/product').post(async (req, res) => {
  let id = req.body.id
  let new_product = await Product.findOne({ _id: new ObjectId(id) })
  if (!new_product) {
    return res.status(400).json({ status: 400, type: 'failed', payload: 'กรุณากรอกข้อมูลให้ครบถ้วน' })
  }
  if (!req.body.name) {
    return res.status(400).json({ status: 400, type: 'failed', payload: 'กรุณากรอกข้อมูลให้ครบถ้วน' })
  }
  new_product.name = req.body.name
  new_product.detail = req.body.detail
  new_product.fb_page = req.body.fb_page
  new_product.tel = req.body.tel
  new_product.link = req.body.link
  new_product.images = req.body.images
  await new_product.save()
  return res.status(200).json({ status: 200, type: 'success', payload: 'แก้ไขข้อมูลเรียบร้อยแล้ว' })
})


//////////// delete API ////////////

// delete driver location api
router.route('/delete/driver-location').delete(async (req, res) => {

  if (!req.body.id) {
    return res.status(400).json({ status: 400, type: 'failed', payload: 'ไม่พบข้อมูลที่ส่งมา' })
  }
  await DriverLocation.deleteOne({ _id: req.body.id })
  return res.json({ status: 200, type: 'success', payload: 'ลบข้อมูลสำเร็จ' })
})

// delete boat club name 
router.route('/delete/boat-clubname').delete(async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ status: 400, type: 'failed', payload: 'ไม่พบข้อมูลที่ส่งมา' })
  }
  await BoatClubName.deleteOne({ _id: req.body.id })
  return res.json({ status: 200, type: 'success', payload: 'ลบข้อมูลสำเร็จ' })
})

// delete driver api
router.route('/delete/driver').delete(async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ status: 400, type: 'failed', payload: 'ไม่พบข้อมูลที่ส่งมา' })
  }
  await Drivers.deleteOne({ _id: req.body.id })
  return res.status(200).json({ status: 200, type: 'success', payload: 'ลบข้อมูลสำเร็จ' })
})

// delete boat provider api
router.route('/delete/boat-provider').delete(async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ status: 400, type: 'failed', payload: 'ไม่พบข้อมูลที่ส่งมา' })
  }
  await BoatProvider.deleteOne({ _id: req.body.id })
  return res.status(200).json({ status: 200, type: 'success', payload: 'ลบข้อมูลสำเร็จ' })
})

// delete accommodation api
router.route('/delete/accommodation').delete(async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ status: 400, type: 'failed', payload: 'ไม่พบข้อมูลที่ส่งมา' })
  }
  await accommodation.deleteOne({ _id: req.body.id })
  return res.status(200).json({ status: 200, type: 'success', payload: 'ลบข้อมูลสำเร็จ' })
})

// delete restaurant api
router.route('/delete/restaurant').delete(async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ status: 400, type: 'failed', payload: 'ไม่พบข้อมูลที่ส่งมา' })
  }
  await Restaurant.deleteOne({ _id: req.body.id })
  return res.status(200).json({ status: 200, type: 'success', payload: 'ลบข้อมูลสำเร็จ' })
})

// delete restaurant catagory api
router.route('/delete/catagory').delete(async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ status: 400, type: 'failed', payload: 'ไม่พบข้อมูลที่ส่งมา' })
  }
  await Catagory.deleteOne({ _id: req.body.id })
  return res.status(200).json({ status: 200, type: 'success', payload: 'ลบข้อมูลสำเร็จ' })
})

// delete attraction api
router.route('/delete/attraction').delete(async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ status: 400, type: 'failed', payload: 'ไม่พบข้อมูลที่ส่งมา' })
  }
  await Attraction.deleteOne({ _id: req.body.id })
  return res.status(200).json({ status: 200, type: 'success', payload: 'ลบข้อมูลสำเร็จ' })
})

// delete tradition api
router.route('/delete/tradition').delete(async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ status: 400, type: 'failed', payload: 'ไม่พบข้อมูลที่ส่งมา' })
  }
  await Tradition.deleteOne({ _id: req.body.id })
  return res.status(200).json({ status: 200, type: 'success', payload: 'ลบข้อมูลสำเร็จ' })
})

// delete review api
router.route('/delete/review').delete(async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ status: 400, type: 'failed', payload: 'ไม่พบข้อมูลที่ส่งมา' })
  }
  await Reviews.deleteOne({ _id: req.body.id })
  return res.status(200).json({ status: 200, type: 'success', payload: 'ลบข้อมูลสำเร็จ' })
})

// delete comment api
router.route("/delete/comment").delete(async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ status: 400, type: 'failed', payload: 'ไม่พบข้อมูลที่ส่งเข้ามา' })
  }
  await Comment.deleteOne({ _id: req.body.id })
  return res.status(200).json({ status: 200, type: 'success', payload: 'ลบข้อมูลสำเร็จ' })
})

// delete  officer api
router.route('/delete/officer').delete(async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ status: 400, type: 'failed', payload: 'ไม่พบข้อมูลที่ส่งมา' })
  }
  await Officer.deleteOne({ _id: req.body.id })
  return res.status(200).json({ status: 200, type: 'success', payload: 'ลบข้อมูลสำเร็จแล้ว' })
})

// delete product api
router.route('/delete/product').delete(async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ status: 400, type: 'failed', payload: 'ไม่พบข้อมูลที่ส่งมา' })
  }
  await Product.deleteOne({ _id: req.body.id })
  return res.status(200).json({ status: 200, type: 'success', payload: 'ลบข้อมูลสำเร็จแล้ว' })
})
router.route('/get/path').get(async (req, res) => {

  return res.json({ path: appDir })
})
// router.route('*', (req, res) => {
//   return handle(req, res)
// })
module.exports = router;