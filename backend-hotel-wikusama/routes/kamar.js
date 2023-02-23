//import library
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');

//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const models = require('../models/index');
const kamar = models.kamar;

//import auth
const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "BelajarNodeJSItuMenyengankan"

//endpoint ditulis disini
//endpoint get data kamar
app.get("/", (req,res) => {
    kamar.findAll()
    .then(kamar => {
        res.json({
            count: kamar.length,
            kamar: kamar
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})

//endpoint untuk menyimpan data kamar, METHOD POST, function create
app.post("/", (req,res) =>{
    let data ={
        nomor_kamar: req.body.nomor_kamar,
        id_tipe_kamar: req.body.id_tipe_kamar
    }
    kamar.create(data)
    .then(result => {
        res.json({
            message: "data has been inserted"
        })
    })
    .catch(error =>{
        res.json({
            message: error.message
        })
    })
}) 

//endpoint untuk mengupdate data kamar, METHOD: PUT, fuction: UPDATE
app.put("/:id", (req,res) => {
    let param = {
        id_kamar : req.params.id
    }
    let data = {
        nomor_kamar: req.body.nomor_kamar,
        id_tipe_kamar: req.body.id_tipe_kamar
    }
    kamar.update(data, {where: param})
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

//endpoint untuk menghapus data kamar,METHOD: DELETE, function: destroy
app.delete("/:id", (req,res) => {
    let param = {
        id_kamar : req.params.id
    }
    kamar.destroy({where: param})
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


module.exports = app;