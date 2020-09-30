'use strict';
import Sequelize, { Model, DataTypes } from "sequelize";

/**
 * @class <%= name %>
 * 
 * @param {DataTypes} datatype
 * @param {Sequelize} sequelize
 * 
 * @return {<%= name %>}
 */
export default function <%= `${name}ModelFactory` %> (sequelize, Types) {
  class <%= name %> extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  };

  <%= name %>.init({
    <% attributes.forEach(function(attribute, index) { %>
      <%= attribute.fieldName %>: Types.<%= attribute.dataFunction ? `${attribute.dataFunction.toUpperCase()}(DataTypes.${attribute.dataType.toUpperCase()})` : attribute.dataValues ? `${attribute.dataType.toUpperCase()}(${attribute.dataValues})` : attribute.dataType.toUpperCase() %>
      <%= (Object.keys(attributes).length - 1) > index ? ',' : '' %>
    <% }) %>
  }, {
    sequelize,
    modelName: '<%= name %>',
    <%= underscored ? 'underscored: true,' : '' %>
  });

  return <%= name %>;
};
