'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuarios = sequelize.define(
    'Usuarios',
    {
      id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      primer_nombre: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      segundo_nombre: {
        type: DataTypes.STRING(500),
      },
      primer_apellido: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      segundo_apellido: {
        type: DataTypes.STRING(500),
      },
      estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
        allowNull: false,
      },
    },
    {
      tableName: 'usuarios',
      timestamps: false,
    }
  );

  Usuarios.associate = function (models) {
    Usuarios.hasMany(models.Cuentas, {
      foreignKey: 'id_usuarios',
      as: 'cuentas',
    });
  };

  return Usuarios;
};
