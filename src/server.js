import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { port } from './config/env';
import routes from './routes';

// connect to db
import './config/db';

// dir upload file : create folder project
let dirHapt;
if (process.platform === 'win32') {
  dirHapt = path.join(process.env.APPDATA, 'hapt');
} else {
  dirHapt = path.join(process.env.HOME, '.config', 'hapt');
}
fs.exists(dirHapt, exists => {
  if (!exists) {
    fs.mkdir(dirHapt, err => {
      if (err) {
        console.error(err);
      }
    });
  }
});

const app = express();

// This is CORS-enabled for all origins!
app.use(cors());

// morgan is just a logger to log responses in the console.
app.use(morgan('combined'));
// helmet is a package to add some security headers to the responses.
app.use(helmet());

// serve static files (images...) from public folder.
app.use(express.static(path.join(__dirname, '../public')));

// serve static files (images...) from upload folder project created .
if (process.platform === 'win32') {
  app.use('/files', express.static(path.join(process.env.APPDATA, 'hapt')));
} else {
  app.use('/files', express.static(path.join(process.env.HOME, '.config', 'hapt')));
}

// config bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// config routes
app.use('/', routes);

// listen for requests
app.listen(port, () => {
  console.warn('Server is listening on port: ' + port);
});
