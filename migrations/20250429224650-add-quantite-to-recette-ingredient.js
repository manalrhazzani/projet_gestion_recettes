'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     return queryInterface.addColumn('Recette_Ingredient', 'quantite', {
      type: Sequelize.STRING(50),
      allowNull: false,   
    });
  },

  down: async (queryInterface, Sequelize) => {
     return queryInterface.removeColumn('Recette_Ingredient', 'quantite');
  }
};
