const crypto = require("crypto");
const { getConfig } = require('../config');

/**
 * create a hash from a string
 * @param string 
 * @returns string
 */
async function hashStr(str) {
  const config = await getConfig();
  return str ? crypto.createHash(config.ALGORITHM).update(str).digest(config.DIGEST_TYPE): undefined;
}

module.exports = {
    hashStr
}