'use strict';
import Sequelize, { QueryInterface } from "sequelize";

/**
 * @param {QueryInterface} queryInterface
 * @param {Sequelize} sequelize
 * 
 * @return {void}
 */
async function up(queryInterface, sequelize) {
  /**
   * Add altering commands here.
   *
   * @example
   * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
   */
}

/**
 * @param {QueryInterface} queryInterface
 * @param {Sequelize} sequelize
 * 
 * @return {void}
 */
async function down(queryInterface, sequelize) {
  /**
   * Add reverting commands here.
   *
   * @example
   * await queryInterface.dropTable('users');
   */
}

export default { up, down };
