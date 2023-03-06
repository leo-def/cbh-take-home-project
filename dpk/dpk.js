const { getConfig } = require('../config');
const { hashStr } = require('../utils/hash');

/**
 * extract a candidate from a event
 * @param event
 * @returns string | number
 */
async function extractCandidateFromEvent(event) {
  return (event.partitionKey) ? event.partitionKey : hashStr(JSON.stringify(event));
}

/**
 * convert a candidate to string
 * @param candidate 
 * @returns string
 */
async function stringifyCandidate(candidate) {
  const config = await getConfig();
  if(!candidate) {
    return config.TRIVIAL_PARTITION_KEY;
  }
  return (typeof candidate !== "string") ? JSON.stringify(candidate) : candidate;
}

/**
 * compact a string representation of a candidate
 * @param candidateStr 
 * @returns string
 */
async function compactCandidateStr(candidateStr) {
  const config = await getConfig();
  return (candidateStr.length > config.MAX_PARTITION_KEY_LENGTH) ? hashStr(candidateStr) : candidateStr;
}

/**
 * Extract a deterministic partition key from a Event
 * @param event 
 * @returns string | undefined
 */
async function deterministicPartitionKey(event) {
  if (!event) {
    return undefined;
  }
  const candidate = await extractCandidateFromEvent(event);
  const candidateStr = await stringifyCandidate(candidate);
  return compactCandidateStr(candidateStr);
};

module.exports = {
  hashStr,
  extractCandidateFromEvent,
  stringifyCandidate,
  compactCandidateStr,
  deterministicPartitionKey
}