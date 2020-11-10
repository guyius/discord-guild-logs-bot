import express from "express";
import bodyParser from 'body-parser';
import { getToken } from "./services/token.js";

const api = express.Router();
const jsonParser = bodyParser.json()

api.post('/get-token', jsonParser, async (req, res) => {
  const token = await getToken();
  res.send("Received token");
});

export default api;