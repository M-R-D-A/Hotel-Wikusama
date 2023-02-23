//import library
const express = require("express");
const bodyParser = require("body-parser");
const md5 = require("md5");

//implementasi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//import model
const models = require("../models/index");
const detail_pemesanan = models.detail_pemesanan;
const tipe_kamar = models.tipe_kamar;
const kamar = models.kamar;
const { sequelize, Op } = require("sequelize");
const pemesanan = models.pemesanan;
const moment = require('moment');
sequelize

//endpoint ditulis disini



//endpoint get data pemesanan
app.get("/", (req, res) => {
  pemesanan
    .findAll()
    .then((pemesanan) => {
      res.json({
        count: pemesanan.length,
        pemesanan: pemesanan,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

// function getDaysBetween(startDateString, endDateString) {
//     const startDate = new Date(startDateString);
//     const endDate = new Date(endDateString);
//     const msPerDay = 1000 * 60 * 60 * 24; // number of milliseconds in a day
//     const diffInMs = endDate - startDate; // difference in milliseconds
//     const diffInDays = Math.floor(diffInMs / msPerDay); // round down to nearest integer
//     return diffInDays;
//   }

//endpoint untuk menyimpan data pemesanan, METHOD POST, function create
app.post("/", (req, res) => {
  let data = {
    nomor_pemesanan: req.body.nomor_pemesanan,
    nama_pemesan: req.body.nama_pemesan,
    email_pemesan: req.body.email_pemesan,
    tgl_pemesanan: req.body.tgl_pemesanan,
    tgl_check_in: req.body.tgl_check_in,
    tgl_check_out: req.body.tgl_check_out,
    nama_tamu: req.body.nama_tamu,
    jumlah_kamar: req.body.jumlah_kamar,
    id_tipe_kamar: req.body.id_tipe_kamar,
    status_pemesanan: req.body.status_pemesanan,
    id_user: req.body.id_user,
  };
  pemesanan
    .create(data)
    .then((res_pemesanan) => {
      tipe_kamar
      .findAll({
        include: [
          {
            model: kamar,
            as: "kamar",
            attributes: ["id_kamar"],
            required: false,
            where: {
              id_tipe_kamar: req.body.id_tipe_kamar,
            },
            include: [
              {
                model: detail_pemesanan,
                as: "detail_pemesanan",
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
          "$kamar->detail_pemesanan.tgl_akses$": {
            [Op.is]: null
          },
        },
      })
        .then(async (result) => {
            const nomor = result[0].kamar
            // const numDays = getDaysBetween(req.body.tgl_check_in, req.body.tgl_check_out)
            const startDate = new Date(req.body.tgl_check_in);
            const endDate = new Date(req.body.tgl_check_out);
            const dates = [];
            for (let date = startDate; date < endDate; date.setDate(date.getDate() + 1)){
                dates.push(new Date(date));
            }
            let pemesanan_id = res_pemesanan.dataValues.id_pemesanan; 
            for (let i = 0; i < req.body.jumlah_kamar; i++) {
              if (nomor[i]) {
                const nomer = nomor[i].id_kamar;
                console.log(nomer);
                for (let b = 0; b < dates.length; b++) {
                  let data = detail_pemesanan.build({
                    id_pemesanan: pemesanan_id,
                    id_kamar: nomer,
                    tgl_akses: dates[b],
                    harga: 10000
                  });
                  await data.save();
                }
              } else {
                console.log(`Invalid room index ${i}`);
              }
            }       
        });
        
        
    })
    .catch((error) => {
      res.json({
        message: "hai" + error.message,
      });
    });
});

//endpoint untuk mengupdate data pemesanan, METHOD: PUT, fuction: UPDATE
app.put("/:id", (req, res) => {
  let param = {
    id_pemesanan: req.params.id,
  };
  let data = {
    nomor_pemesanan: req.body.nomor_pemesanan,
    nama_pemesan: req.body.nama_pemesan,
    email_pemesan: req.body.email_pemesan,
    tgl_pemesanan: req.body.tgl_pemesanan,
    tgl_check_in: req.body.tgl_check_in,
    tgl_check_out: req.body.tgl_check_out,
    nama_tamu: req.body.nama_tamu,
    jumlah_kamar: req.body.jumlah_kamar,
    id_tipe_kamar: req.body.id_tipe_kamar,
    status_pemesanan: req.body.status_pemesanan,
    id_user: req.body.id_user,
  };
  pemesanan
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

//endpoint untuk menghapus data pemesanan,METHOD: DELETE, function: destroy
app.delete("/:id", (req, res) => {
  let param = {
    id_pemesanan: req.params.id,
  };
  pemesanan
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
