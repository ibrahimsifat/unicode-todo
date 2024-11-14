const jwt = require("jsonwebtoken");
const {
  generateToken,
  decodeToken,
  verifyToken,
} = require("../../../src/lib/utils/token");
const error = require("../../../src/lib/utils/error");
const config = require("../../../src/config");

// Mock the config and error modules
jest.mock("../../../src/config", () => ({
  accessTokenSecret: "test-secret-key",
}));

jest.mock("../../../src/lib/utils/error", () => ({
  serverError: jest.fn((msg) => new Error(msg || "Server Error")),
  badRequest: jest.fn((msg) => new Error(msg || "Bad Request")),
}));

describe("JWT Utils", () => {
  const mockPayload = { userId: "123", role: "user" };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe("generateToken", () => {
    it("should generate a valid JWT token with default options", () => {
      const token = generateToken({ payload: mockPayload });

      expect(token).toBeDefined();
      expect(typeof token).toBe("string");

      // Verify the generated token
      const decoded = jwt.verify(token, config.accessTokenSecret);
      expect(decoded).toMatchObject(mockPayload);
    });

    it("should generate a token with custom expiration", () => {
      const token = generateToken({
        payload: mockPayload,
        expiresIn: "2h",
      });

      const decoded = jwt.verify(token, config.accessTokenSecret);
      expect(decoded).toMatchObject(mockPayload);

      // Verify expiration is roughly 2 hours from now (with 5 second tolerance)
      const expectedExp = Math.floor(Date.now() / 1000) + 2 * 60 * 60;
      expect(decoded.exp).toBeCloseTo(expectedExp, -2);
    });

    it("should throw server error if token generation fails", () => {
      // Mock jwt.sign to simulate failure
      jest.spyOn(jwt, "sign").mockImplementationOnce(() => null);

      expect(() => {
        generateToken({ payload: mockPayload });
      }).toThrow("Server Error");

      expect(error.serverError).toHaveBeenCalled();
    });
  });

  describe("decodeToken", () => {
    let validToken;

    beforeEach(() => {
      validToken = jwt.sign(mockPayload, config.accessTokenSecret);
    });

    it("should successfully decode a valid token", () => {
      const decoded = decodeToken({ token: validToken });

      expect(decoded).toBeDefined();
      expect(decoded).toMatchObject(mockPayload);
    });

    it("should throw bad request error if no token provided", () => {
      expect(() => {
        decodeToken({ token: null });
      }).toThrow("provide a access token");

      expect(error.badRequest).toHaveBeenCalled();
    });

    it("should return decoded token even if expired", () => {
      // Create an expired token
      const expiredToken = jwt.sign(mockPayload, config.accessTokenSecret, {
        expiresIn: "-1h",
      });

      const decoded = decodeToken({ token: expiredToken });
      expect(decoded).toBeDefined();
      expect(decoded).toMatchObject(mockPayload);
    });
  });

  describe("verifyToken", () => {
    let validToken;

    beforeEach(() => {
      validToken = jwt.sign(mockPayload, config.accessTokenSecret);
    });

    it("should successfully verify a valid token", () => {
      const verified = verifyToken({ token: validToken });

      expect(verified).toBeDefined();
      expect(verified).toMatchObject(mockPayload);
    });

    it("should throw bad request error if no token provided", () => {
      expect(() => {
        verifyToken({ token: null });
      }).toThrow("Server Error");

      expect(error.badRequest).toHaveBeenCalled();
    });

    it("should throw server error for invalid token", () => {
      const invalidToken = "invalid.token.here";

      expect(() => {
        verifyToken({ token: invalidToken });
      }).toThrow("Server Error");

      expect(error.serverError).toHaveBeenCalled();
    });

    it("should throw server error for expired token", () => {
      // Create an expired token
      const expiredToken = jwt.sign(mockPayload, config.accessTokenSecret, {
        expiresIn: "-1h",
      });

      expect(() => {
        verifyToken({ token: expiredToken });
      }).toThrow("Server Error");

      expect(error.serverError).toHaveBeenCalled();
    });
  });
});
