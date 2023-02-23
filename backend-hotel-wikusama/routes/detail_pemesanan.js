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
const detail_pemesanan = models.detail_pemesanan;


//endpoint ditulis disini
//endpoint get data detail_pemesanan
app.get("/", (req,res) => {
    detail_pemesanan.findAll()
    .then(detail_pemesanan => {
        res.json({
            count: detail_pemesanan.length,
            detail_pemesanan: detail_pemesanan
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })    
})

//endpoint untuk menyimpan data detail_pemesanan, METHOD POST, function create
app.post("/", (req,res) =>{
    let data ={
        id_pemesanan: req.body.id_pemesanan,
        id_kamar: req.body.id_kamar,
        tgl_akses: req.body.tgl_akses,
        harga: req.body.harga
    }
    detail_pemesanan.create(data)
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

//endpoint untuk mengupdate data detail_pemesanan, METHOD: PUT, fuction: UPDATE
app.put("/:id", (req,res) => {
    let param = {
        id_detail_pemesanan : req.params.id
    }
    let data = {
        id_pemesanan: req.body.id_pemesanan,
        id_kamar: req.body.id_kamar,
        tgl_akses: req.body.tgl_akses,
        harga: req.body.harga
    }
    detail_pemesanan.update(data, {where: param})
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

//endpoint untuk menghapus data detail_pemesanan,METHOD: DELETE, function: destroy
app.delete("/:id", (req,res) => {
    let param = {
        id_detail_pemesanan : req.params.id
    }
    detail_pemesanan.destroy({where: param})
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