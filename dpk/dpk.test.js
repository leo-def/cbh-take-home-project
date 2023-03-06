// mock import
jest.mock("../config", () => {
  const getConfigFnc =  jest.fn().mockReturnValue(Promise.resolve(Object.freeze({
    TRIVIAL_PARTITION_KEY: "TRIVIAL_PARTITION_KEY",
    MAX_PARTITION_KEY_LENGTH: 5,
    ALGORITHM: "sha3-512",
    DIGEST_TYPE: "hex"
  })));
  return ({ getConfig: getConfigFnc })
});

jest.mock("../utils/hash", () => {
  const hashStrFnc =  jest.fn().mockReturnValue("hash-value");
  return {
      hashStr: hashStrFnc
  };
});

const {
  extractCandidateFromEvent,
  stringifyCandidate,
  compactCandidateStr,
  deterministicPartitionKey
} = require("./dpk");

describe("extractCandidateFromEvent", () => {
  it("Returns the partitionKey when given event with partitionKey", async () => {
    const partitionKey = 123;
    const event = { partitionKey };
    const candidate = await extractCandidateFromEvent(event);
    expect(candidate).toBe(partitionKey);
  });

  it("Returns the hash value when given event with no partitionKey", async () => {
    const event = {};
    const candidate = await extractCandidateFromEvent(event);
    expect(candidate).toBe("hash-value");
  });
});

describe("stringifyCandidate", () => {
  it("Returns the string value when given no string input", async () => {
      const candidate = 123;
      const candidateStr = await stringifyCandidate(candidate);
      expect(candidateStr).toBe("123");
  });

  it("Returns the same value when given a string input", async () => {
      const candidate = "456";
      const candidateStr = await stringifyCandidate(candidate);
      expect(candidateStr).toBe("456");
  });

  it("Returns 'TRIVIAL_PARTITION_KEY' when given no input", async () => {
      const candidate = null;
      const candidateStr = await stringifyCandidate(candidate);
      expect(candidateStr).toBe("TRIVIAL_PARTITION_KEY");
  });
});

describe("compactCandidateStr", () => {
  it("Returns the hash value when given a input smaller than 'MAX_PARTITION_KEY_LENGTH'", async () => {
    const candidateStr = "123"
    const compactCandidateStrResult = await compactCandidateStr(candidateStr);
    expect(compactCandidateStrResult).toBe("123");
  });

  it("Returns the hash value when given a input bigger than 'MAX_PARTITION_KEY_LENGTH'", async () => {
    const candidateStr = "123456789"
    const compactCandidateStrResult = await compactCandidateStr(candidateStr);
    expect(compactCandidateStrResult).toBe("hash-value");
  });
});

describe("deterministicPartitionKey", () => {
  it("Returns undefined when given no input", async () => {
    const result = await deterministicPartitionKey(null);
    expect(result).toBe(undefined);
  });

  it("Returns the compacted partition when given an event with a bigger partitionKey", async () => {
    const partitionKey = 123456789;
    const event = { partitionKey };
    const result = await deterministicPartitionKey(event);
    expect(result).toBe("hash-value");
  });

  it("Returns the partition when given an event with a smaller partitionKey", async () => {
    const partitionKey = 123;
    const event = { partitionKey };
    const result = await deterministicPartitionKey(event);
    expect(result).toBe("123");
  });

  it("Returns the partition when given an event with no partitionKey", async () => {
    const event = { otherField: "" };
    const result = await deterministicPartitionKey(event);
    expect(result).toBe("hash-value");
  });

});
