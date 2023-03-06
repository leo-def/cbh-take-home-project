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

const {
  hashStr
} = require("./hash");

describe("extractCandidateFromEvent", () => {
  it("Returns undefined when given no input", async () => {
    const str = null;
    const hash = await hashStr(str);
    expect(hash).toBe(undefined);
  });

  it("Returns a hash when given a string input", async () => {
    const str = "123";
    const candidate = await hashStr(str);
    expect(candidate).toBe("48c8947f69c054a5caa934674ce8881d02bb18fb59d5a63eeaddff735b0e9801e87294783281ae49fc8287a0fd86779b27d7972d3e84f0fa0d826d7cb67dfefc");
  });
});
