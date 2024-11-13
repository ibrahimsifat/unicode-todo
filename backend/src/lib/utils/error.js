const notFound = (msg = "Resource not found") => {
  const error = {
    name: "Not Found",
    message: msg,
    error: new Error(msg),
    status: 404,
    details: {},
  };
  return error;
};

const badRequest = (msg = "Bad Request") => {
  const error = {
    name: "Bad Request",
    message: msg,
    error: new Error(msg),
    status: 400,
    details: {},
  };
  return error;
};
const serverError = (msg = "Internal Server Error") => {
  const error = {
    name: "Server Error",
    message: msg,
    error: new Error(msg),
    status: 500,
    details: {},
  };
  return error;
};

const authenticationError = (msg = "Authentication Failed") => {
  const error = {
    name: "Authentication Error",
    message: msg,
    error: new Error(msg),
    status: 401,
    details: {},
  };
  return error;
};

const authorizationError = (msg = "Permission Denied") => {
  const error = new Error(msg);
  error.status = 403;
  return error;
};

module.exports = {
  notFound,
  badRequest,
  serverError,
  authenticationError,
  authorizationError,
};
