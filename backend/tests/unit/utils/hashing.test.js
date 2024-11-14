const bcrypt = require("bcryptjs");
const { generateHash, hashMatched } = require("../../../src/lib/utils/hashing");

// Mock bcrypt methods
jest.mock("bcryptjs");

describe("Hashing Utility Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("generateHash should return a hashed value", async () => {
    const payload = "testPassword";
    const salt = "mockSalt";
    const hash = "mockHash";

    bcrypt.genSalt.mockResolvedValue(salt);
    bcrypt.hash.mockResolvedValue(hash);

    const result = await generateHash(payload);
    expect(result).toBe(hash);
    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith(payload, salt);
  });

  test("hashMatched should return true for matching hashes", async () => {
    const raw = "testPassword";
    const hash = "mockHash";

    bcrypt.compare.mockResolvedValue(true);

    const result = await hashMatched(raw, hash);
    expect(result).toBe(true);
    expect(bcrypt.compare).toHaveBeenCalledWith(raw, hash);
  });

  test("hashMatched should return false for non-matching hashes", async () => {
    const raw = "testPassword";
    const hash = "mockHash";

    bcrypt.compare.mockResolvedValue(false);

    const result = await hashMatched(raw, hash);
    expect(result).toBe(false);
    expect(bcrypt.compare).toHaveBeenCalledWith(raw, hash);
  });
});
