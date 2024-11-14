const request = require("supertest");
const errors = require("../../../src/lib/utils/error"); // Adjust the path if necessary

describe("Error Handling Functions", () => {
  test("notFound should return correct error object", () => {
    const error = errors.notFound();
    expect(error).toEqual({
      name: "Not Found",
      message: "Resource not found",
      error: expect.any(Error),
      status: 404,
      details: {},
    });
  });

  test("badRequest should return correct error object", () => {
    const error = errors.badRequest();
    expect(error).toEqual({
      name: "Bad Request",
      message: "Bad Request",
      error: expect.any(Error),
      status: 400,
      details: {},
    });
  });

  test("serverError should return correct error object", () => {
    const error = errors.serverError();
    expect(error).toEqual({
      name: "Server Error",
      message: "Internal Server Error",
      error: expect.any(Error),
      status: 500,
      details: {},
    });
  });

  test("authenticationError should return correct error object", () => {
    const error = errors.authenticationError();
    expect(error).toEqual({
      name: "Authentication Error",
      message: "Authentication Failed",
      error: expect.any(Error),
      status: 401,
      details: {},
    });
  });

  test("authorizationError should return correct error object", () => {
    const error = errors.authorizationError();
    expect(error).toEqual(
      expect.objectContaining({
        name: "Error",
        message: "Permission Denied",
        status: 403,
      }),
    );
  });
});
