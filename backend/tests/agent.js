const request = require("supertest");
const express = require("express");
const app = require("../src/app/app");
app.use(express.json());

const agent = request.agent(app);

// Set the global base URL
agent.baseUrl = "/api/v1";

// console.log("Global Base URL:", agent.baseUrl);
module.exports = agent;
