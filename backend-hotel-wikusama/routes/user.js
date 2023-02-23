//import library
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())

//import model
const models = require('../models/index');
const user = models.user;

//import auth
const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "BelajarNodeJSItuMenyengankan";

//konfigurasi proses upload file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // set file storage
        cb(null, 'C:/Users/RAFI DUTA/Documents/KODING/REACT JS/hotel-wikusama/backend-hotel-wikusama/image/')
    },
    filename: (req, file, cb) => {
        // generate file name
        cb(null, 'foto-'+ Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage: storage})
//endpoint ditulis disini
//endpoint get data user
app.get("/", (req,res) => {
    user.findAll()
    .then(user => {
        res.json({
            count: user.length,
            user: user
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})

//endpoint untuk menyimpan data user, METHOD POST, function create
app.post("/", upload.single('foto'), (req,res) =>{
    let data ={
        name_user : req.body.name_user,
        foto: req.file.filename,
        email: req.body.email,
        password : req.body.password,
        role: req.body.role
    }
    if(!req.file){
        res.json({
            message: 'tidak ada file yang ditemukan'
        })
    }
    user.create(data)
    .then(result => {
        res.json({
            message: "data has been inserted"
        })
    })
    .catch(error =>{
        res.json({
            message: error.message,
        })
    })
}) 

//endpoint untuk mengupdate data user, METHOD: PUT, fuction: UPDATE
app.put("/:id", (req,res) => {
    let param = {
        id_user : req.params.id
    }
    let data = {
        name : req.body.name,
        username : req.body.username
    }
    if(req.body.password){
        data.password = md5(req.body.password)
    }
    user.update(data, {where: param})
    .then(result => {
        res.json({
            message : "data has been updated"
        })
    })
    .catch(error => {
        res.json({
            message  : error.message
        })
    })
})

//endpoint untuk menghapus data user,METHOD: DELETE, function: destroy
app.delete("/:id", (req,res) => {
    let param = {
        id_user : req.params.id
    }
    user.destroy({where: param})
    .then(result => {
        res.json({
            massege : "data has been deleted"
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint login user (authorization), METHOD: POST, function: findOne
app.post("/auth", async (req,res) => {
    let data = {
        name_user: req.body.name_user,
        password: req.body.password
    }

    //cari data user yang username dan password sama dengan input
    let result = await user.findOne({where: data})
    if(result){
        //ditemukan
        //set payload from data
        let payload = JSON.stringify({
            id_user: result.id_user,
            name_user: result.name_user
        })

        // generate token based on payload and secret_key
        let token = jwt.sign(payload, SECRET_KEY)

        //set output
        res.json({
            logged: true,
            data: result,
            token: token
        })
    }
    else{
        //tidak ditemukan
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})

module.exports = app;