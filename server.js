const express = require('express');
const dotenv = require('dotenv').config();
const ConnectDB = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const Port = 5000;

// Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded());

// Autoriser les requêtes depuis 'http://localhost:5173'
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true, // autoriser les cookies
  })
);

app.use('/user', require('./routes/user.router'));
app.use('/post', require('./routes/post.router'))
// Connection à la base de données
ConnectDB();

app.listen(Port, () => {
  console.log('Serveur en écoute sur le port ' + Port);
});
