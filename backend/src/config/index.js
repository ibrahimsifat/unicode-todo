// console.log(process.env.DB_CONNECTION_URL);
const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "YOUR_secret_key",
  mongoUri:
    process.env.DB_CONNECTION_URL ||
    `mongodb://${process.env.IP || "localhost"}:${
      process.env.MONGO_PORT || "27017"
    }/unicode`,
  testingMongoUri:
    process.env.TEST_DB_CONNECTION_URL ||
    `mongodb://${process.env.IP || "localhost"}:${
      process.env.MONGO_PORT || "27017"
    }/unicode_test`,
  databaseName: process.env.DB_NAME || "unicode",
  databaseUsername: process.env.DB_USERNAME || "root",
  databasePassword: process.env.DB_PASSWORD || "",
  databaseUrlQuery: process.env.DB_URL_QUERY || "",
  corsUrl: process.env.CORS_URL || "http://localhost:3000",
  testBaseUrl: process.env.TEST_BASE_URL || "/api/v1",
  accessToken:
    process.env.ACCESS_TOKEN ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSWJyYWhpbSBTaWZhdCIsInVzZXJuYW1lIjoidXNlcm5hbWUiLCJlbWFpbCI6Imlic2lmYXQ5MDBAZ21haWwuY29tIiwicm9sZSI6IjY0ZjgyNDI3NTY0NDZlMWU1NzBlYTk0MCIsImJsb2NrZWQiOmZhbHNlLCJjb25maXJtZWQiOnRydWUsImlhdCI6MTY5NDU0MzM3OCwiZXhwIjoxNjk0NTQ2OTc4fQ.xuFXlYrq5BqkuojVUBbEnrnTNSRMBf4K-C7xPG9l8WU",
  invalidAccessToken: process.env.INVALID_ACCESS_TOKEN || "invalidToken",
  maxImageUploadSize:
    parseInt(process.env.MAX_FILE_UPLOAD_SIZE, 10) || 5 * 1024 * 1024, // 5 MB limit, adjust as needed,
  thumbnailWidth: parseInt(process.env.THUMBNAIL_WIDTH, 10) || 400,
  thumbnailHeight: parseInt(process.env.THUMBNAIL_HEIGHT, 10) || 400,
  thumbnailAllowedFormats: ["jpg", "jpeg", "png", "webp", "gif", "svg", "pdf"],
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || "",
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || "",
};

module.exports = config;
