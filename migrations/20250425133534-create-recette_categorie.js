'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Recette_Categorie', {
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
      categorieId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    return queryInterface.dropTable('Recette_Categorie');
  }
};