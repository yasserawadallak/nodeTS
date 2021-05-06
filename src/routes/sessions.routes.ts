import {Router} from 'express';
import AuthenticateUserSerivce from '../services/AuthenticaUserService';

  
const sessionsRouter = Router();


sessionsRouter.post('/', async (request, response) => {
  try{

    const {email, password} = request.body;

    const authenticateUser = new AuthenticateUserSerivce();

    const { user, token } = await authenticateUser.execute({email, password})

    delete user.password;

    return response.json({token})
  } catch (err){
    response.status(404).json({"error": err.message});
  }
})

export default sessionsRouter;
