import { parseISO } from 'date-fns';
import {getCustomRepository} from 'typeorm';
import {Router} from 'express';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try{

    const {name, email, password} = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    })

    return response.json(user)
  } catch (err){
    response.status(404).json({"error": err.message});
  }
})

export default usersRouter;
