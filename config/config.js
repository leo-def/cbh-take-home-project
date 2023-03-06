const CONFIG = Object.freeze({
    TRIVIAL_PARTITION_KEY: "0",
    MAX_PARTITION_KEY_LENGTH: 256,
    ALGORITHM: "sha3-512",
    DIGEST_TYPE: "hex"
})

/**
 * get app config values
 * @returns config
 */
async function getConfig() {
    return Promise.resolve(CONFIG);
}

module.exports = {
    getConfig
}