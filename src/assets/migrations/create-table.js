'use strict';
import Sequelize, { QueryInterface } from "sequelize";

/**
 * @param {QueryInterface} queryInterface
 * @param {Sequelize} sequelize
 * 
 * @return {undefined}
 */
async function up(queryInterface, sequelize) {
  await queryInterface.createTable('<%= tableName %>', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    <% attributes.forEach(function(attribute) { %>
      <%= attribute.fieldName %>: {
        type: Sequelize.<%= attribute.dataFunction ? `${attribute.dataFunction.toUpperCase()}(sequelize.${attribute.dataType.toUpperCase()})` : attribute.dataValues ? `${attribute.dataType.toUpperCase()}(${attribute.dataValues})` : attribute.dataType.toUpperCase() %>
      },
    <% }) %>

    <%= createdAt %>: {
      allowNull: false,
      type: Sequelize.DATE
    },

    <%= updatedAt %>: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
};

/**
 * @param {QueryInterface} queryInterface
 * @param {Sequelize} sequelize
 * 
 * @return {undefined}
 */
async function down(queryInterface, sequelize) {
    await queryInterface.dropTable('<%= tableName %>');
}

export default { up, down };
