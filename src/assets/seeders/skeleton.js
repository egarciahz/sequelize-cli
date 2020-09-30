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
   * Add seed commands here.
   *
   * @example
   * await queryInterface.bulkInsert('People', [{
   *   name: 'John Doe',
   *   isBetaMember: false
   * }], {});
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
   * Add commands to revert seed here.
   *
   * @example
   * await queryInterface.bulkDelete('People', null, {});
   */
}

export default { up, down };