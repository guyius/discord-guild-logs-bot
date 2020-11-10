import express from "express";
import graphqlHTTP from "express-graphql";
import bodyParser from 'body-parser'; // import body-parser
import mongo from "mongoose";
import dotenv from "dotenv";
import api from "./server/api.js";

dotenv.config();

const app = express();
const port = process.env.PORT || "3000";

app
.use(bodyParser.json())
.use('/api', api);

let initCounter = 1;
const initServer = () => {  
  mongo.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('connected to database');
    app.listen(port, () => console.log(`Server running successfully ${port}`));
  })
  .catch((err) => {
    console.log(`Experience this error: ${err}`);
    if (initCounter < process.env.MAX_INIT_ATTEMPTS) {
      initCounter++;
      init();
    } else {
      throw err;
    }    
  });
};

initServer();
