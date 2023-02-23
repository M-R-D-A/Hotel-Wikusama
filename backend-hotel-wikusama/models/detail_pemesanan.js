'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail_pemesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.pemesanan,{
        foreignKey: "id_pemesanan",
        as: "pemesanan"
      })
      this.belongsTo(models.kamar,{
        foreignKey: "id_kamar",
        as: "detail_pemesanan"
      })
    }
  };
  detail_pemesanan.init({
    id_detail_pemesanan: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    id_pemesanan: DataTypes.INTEGER,
    id_kamar: DataTypes.INTEGER,
    tgl_akses: DataTypes.DATE,
    harga: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'detail_pemesanan',
    tableName: 'detail_pemesanan'
  });
  return detail_pemesanan;
};