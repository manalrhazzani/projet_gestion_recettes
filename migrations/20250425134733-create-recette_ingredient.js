'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Recette_Ingredient', {
      recetteId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Recettes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      ingredientId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Ingredients',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      quantite: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Recette_Ingredient');
  }
};