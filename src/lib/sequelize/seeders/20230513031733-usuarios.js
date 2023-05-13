'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'usuarios',
      [
        {
          id: 1,
          primer_nombre: 'Super',
          segundo_nombre: '',
          primer_apellido: 'Admin',
          segundo_apellido: '',
          estado: 1,
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('usuarios', [
      {
        id: 1,
      },
    ]);
  },
};
