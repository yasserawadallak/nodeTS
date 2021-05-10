import 'reflect-metadata';

import express, {Request, Response, NextFunction} from 'express';
import 'express-async-errors';

import routes from './routes';
import './database';
 
import uploadConfig from './config/updload'
import AppError from './errors/AppError';

const app = express();


// ROUTES

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory))
app.use(routes);

// ERROR-HANDLING

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError){
      return response.status(err.statusCode).json({status: 'error', message: err.message})
    }

    console.error(err)

    return response.status(500).json({status: 'error', message: 'Internal Server error'})
 })


// SERVER INIT
app.listen(3334, () => {
  console.log('Server started on port 3333');
})
