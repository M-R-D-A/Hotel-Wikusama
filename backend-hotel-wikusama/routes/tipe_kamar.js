//import library
const express = require("express");
const bodyParser = require("body-parser");
const md5 = require("md5");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//import model
const models = require("../models/index");
const { sequelize, Op } = require("sequelize");
const kamar = models.kamar;
const detail_pemesanan = models.detail_pemesanan;
const tipe_kamar = models.tipe_kamar;

//konfigurasi proses upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // set file storage
    cb(
      null,
      "C:/Users/RAFI DUTA/Documents/KODING/REACT JS/hotel-wikusama/backend-hotel-wikusama/image/"
    );
  },
  filename: (req, file, cb) => {
    // generate file name
    cb(null, "foto-" + Date.now() + path.extname(file.originalname));
  },
});

let upload2 = multer({ storage: storage });
//endpoint ditulis disini
//endpoint get data tipe_kamar
app.get("/", (req, res) => {
  tipe_kamar
    .findAll()
    .then((tipe_kamar) => {
      res.json({
        count: tipe_kamar.length,
        tipe_kamar: tipe_kamar,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

app.post("/kosong", (req, res) => {
  tipe_kamar
    .findAll({
      include: [
        {
          model: kamar,
          as: "kamar",
          attributes: ["id_kamar"],
          required: false,
          where: {
            id_tipe_kamar: req.body.id,
          },
          include: [
            {
              model: detail_pemesanan,
              as: "detail_pemesanan",
              attributes: ["tgl_akses"],
              required: false,
              where: {
                tgl_akses: {
                  [Op.and]: {
                    [Op.between]: [req.body.tgl_check_in, req.body.tgl_check_out],
                    // [Op.is]: null,
                  }
                },
              },

              // {
              //    "$kamar->detail_pemesanan.tgl_akses$": null,
              // },
            },
          ],
        },
      ],
      // attributes: ["nama_tipe_kamar"],
      where: {
        "$kamar.id_tipe_kamar$": req.body.id,
        "$kamar->detail_pemesanan.tgl_akses$": {
          [Op.is]: null
        },
      },
    })
    .then((result) => {
      res.json({
        tipe_kamar: result,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

//endpoint untuk menyimpan data tipe_kamar, METHOD POST, function create
app.post("/", upload2.single("foto"), (req, res) => {
  let data = {
    nama_tipe_kamar: req.body.nama_tipe_kamar,
    harga: req.body.harga,
    deskripsi: req.body.deskripsi,
    foto: req.file.filename,
  };
  tipe_kamar
    .create(data)
    .then((result) => {
      res.json({
        message: "data has been inserted",
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

//endpoint untuk mengupdate data tipe_kamar, METHOD: PUT, fuction: UPDATE
app.put("/:id", (req, res) => {
  let param = {
    id_tipe_kamar: req.params.id,
  };
  let data = {
    nama_tipe_kamar: req.body.nama_tipe_kamar,
    harga: req.body.harga,
    deskripsi: req.body.deskripsi,
  };
  tipe_kamar
    .update(data, { where: param })
    .then((result) => {
      res.json({
        message: "data has been updated",
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

//endpoint untuk menghapus data tipe_kamar,METHOD: DELETE, function: destroy
app.delete("/:id", (req, res) => {
  let param = {
    id_tipe_kamar: req.params.id,
  };
  tipe_kamar
    .destroy({ where: param })
    .then((result) => {
      res.json({
        massege: "data has been deleted",
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

module.exports = app;
