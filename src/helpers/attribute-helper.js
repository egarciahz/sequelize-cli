import helpers from './index';

/**
 * @var {array<string,array<Number|Boolean|String>>>|null}
 */
var ParamsTypeMap = null;
var Sequelize = null;

function buildParamsTypeMaps() {
  if (ParamsTypeMap && Sequelize) {
    return;
  }

  try {
    Sequelize = helpers.generic.getSequelize();
  } catch (e) {
    throw new Error(e.message + Object.keys(helpers).join('|'));
  }

  ParamsTypeMap = {
    [Sequelize.DataTypes.STRING.name]: [Number, Boolean],
    [Sequelize.DataTypes.CHAR.name]: [Number, Boolean],
    [Sequelize.DataTypes.TEXT.name]: [Number, String],
    [Sequelize.DataTypes.FLOAT.name]: [Number, String],
    [Sequelize.DataTypes.REAL.name]: [String, String],
    [Sequelize.DataTypes.DOUBLE.name]: [String, String],
    [Sequelize.DataTypes.DECIMAL.name]: [String, String],
    [Sequelize.DataTypes.GEOMETRY.name]: [String, String],
    [Sequelize.DataTypes.GEOGRAPHY.name]: [String, String],
    [Sequelize.DataTypes.GEOMETRY.name]: [String, String],
    [Sequelize.DataTypes.GEOMETRY.name]: [String, String],
    [Sequelize.DataTypes.DATE.name]: [Number],
    [Sequelize.DataTypes.BLOB.name]: [Number],
    [Sequelize.DataTypes.CITEXT.name]: [],
    [Sequelize.DataTypes.ARRAY.name]: null,
    [Sequelize.DataTypes.ENUM.name]: null,
  };
}

/**
 * @param {string} type
 * @return {boolean}
 */
function hasValidFunctionType(type) {
  return Object.keys(ParamsTypeMap).includes(type.toUpperCase());
}

/**
 * Check the given dataType actual exists.
 * @param {string} dataType
 */
function validateDataType(dataType) {
  if (!Sequelize.DataTypes[dataType.toUpperCase()]) {
    throw new Error(`Unknown type '${dataType}'`);
  }
  return dataType;
}

/**
 * get data type mapper
 * @param {string} dataType
 *
 * @return {(i:number, raw) => any}
 */
function getTypeMap(dataType) {
  const paramTypes = ParamsTypeMap[dataType.toUpperCase()];
  return (i, raw) => (paramTypes ? paramTypes[i](raw) : String(raw));
}

/**
 * Patch the data type value
 * @param {string} dataType
 * @param {string} argStr
 *
 * @return {array<string|array|number|boolean>}
 */
function formatArguments(dataType, argStr) {
  const mapper = getTypeMap(dataType);

  return argStr
    .replace(/(^\{|\}$)/g, '')
    .split(/\s*,\s*/)
    .map((s, i) => {
      s = mapper(i, s);
      return typeof s === 'string' ? `'${s}'` : s;
    })
    .join(', ');
}

function formatAttributes(attribute) {
  const validValues = /^\{(,? ?[A-z0-9 ]+)+\}$/;
  const split = attribute.split(':');
  var result;
  console.log(split);
  if (split.length === 2) {
    result = {
      fieldName: split[0],
      dataType: split[1],
      dataFunction: null,
      dataValues: null,
    };
  }

  if (split.length === 3) {
    const isValidValue =
      !hasValidFunctionType(split[1]) && split[2].match(validValues) === null;
    const isValidValues = split[2].match(validValues) !== null;
    const isValidFunction = hasValidFunctionType(split[1]);

    if (isValidFunction && isValidValue && !isValidValues) {
      result = {
        fieldName: split[0],
        dataType: split[2],
        dataFunction: split[1],
        dataValues: null,
      };
    }

    if (isValidFunction && !isValidValue && isValidValues) {
      result = {
        fieldName: split[0],
        dataType: split[1],
        dataFunction: null,
        dataValues: formatArguments(split[1], split[2]),
      };
    }
  }

  return result;
}

module.exports = {
  formatArguments,
  formatAttributes,
  validateDataType,
  init: buildParamsTypeMaps,
};
