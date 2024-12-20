// Load environment variables from .env file into process.env
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const router = require('./Routes/routes');
require('./Config/connecction')

const cpServer = express();

cpServer.use(cors());
cpServer.use(express.json());
cpServer.use(router)

const PORT = process.env.PORT || 3000;

cpServer.listen(PORT, () => {
  console.log(`Cookpedia Server Started at: Port ${PORT} and waiting for client requests`);
});

cpServer.get('/', (req, res) => {
  res.status(200).send('<h1>Hello</h1>');
});
