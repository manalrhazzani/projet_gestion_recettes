'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Commentaires', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      contenu: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      utilisateurId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Utilisateurs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      recetteId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Recettes',
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
    return queryInterface.dropTable('Commentaires');
  }
};