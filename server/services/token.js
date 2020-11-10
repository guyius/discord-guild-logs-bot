import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const baseUrl = "https://www.warcraftlogs.com/oauth/token";
const id = Buffer.from(process.env.CLIENT_ID).toString('base64');
const secret = Buffer.from(process.env.CLIENT_SECRET).toString('base64');
const body = "grant_type=client_credentials";
let accessToken;
let expiryDate;

export const getToken = () => {
  if(expiryDate > new Date() && accessToken) return accessToken;

  return fetch(baseUrl, {
    body,
    headers: {
      Authorization: `Basic ${id}${secret}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST"
  })
  .then(res => res.json())
  .then(json => {
    const { expires_in, access_token } = json;
    const now = new Date();
    expiryDate = new Date(now.getTime() + expires_in * 1000);
    accessToken = access_token;
    return accessToken;
  })
  .catch(e => console.log(e));
}
