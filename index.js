import express from "express";
import graphqlHTTP from "express-graphql";
import bodyParser from 'body-parser'; // import body-parser
import mongo from "mongoose";
import dotenv from "dotenv";

//Allow process.env usage
dotenv.config();

const app = express();
const PORT = process.env.PORT || "3000";

app.use(bodyParser.json());

let initCounter = 1;
const initServer = () => {  
  mongo.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('connected to database');
    app.listen(PORT, () => console.log('Server running successfully'));
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
//app.use(‘/graphiql’, graphqlHTTP({ schema: require(‘./schema.js’), graphiql: true}));

