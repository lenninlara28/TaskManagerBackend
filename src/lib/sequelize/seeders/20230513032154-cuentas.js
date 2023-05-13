'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'cuentas',
      [
        {
          id: 1,
          correo: 'superadmin@example.co',
          password: '$2b$10$C4ybtUUpcTaG7gHQLzUqnep0RbdlopO2JWf04yUq415MzX8VcIhg.',
          estado: 1,
          id_usuarios: 1,
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('cuentas', [
      {
        id: 1,
      },
    ]);
  },
};
