'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cuentas = sequelize.define(
    'Cuentas',
    {
      id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      correo: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
        allowNull: false,
      },
      id_usuarios: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
      },
    },
    {
      tableName: 'cuentas',
      timestamps: false,
    }
  );

  Cuentas.associate = function (models) {
    Cuentas.belongsTo(models.Usuarios, {
      foreignKey: 'id_usuarios',
      as: 'usuarios',
    });
  };

  return Cuentas;
};
