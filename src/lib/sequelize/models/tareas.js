'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tareas = sequelize.define(
    'Tareas',
    {
      id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      titulo: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
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
      tableName: 'tareas',
      timestamps: true,
    }
  );

  Tareas.associate = function (models) {
    Tareas.belongsTo(models.Usuarios, {
      foreignKey: 'id_usuarios',
      as: 'usuarios',
    });
  };

  return Tareas;
};
