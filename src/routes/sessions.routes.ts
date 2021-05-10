import {Router} from 'express';
import AuthenticateUserSerivce from '../services/AuthenticaUserService';


const sessionsRouter = Router();


sessionsRouter.post('/', async (request, response) => {

    const {email, password} = request.body;

    const authenticateUser = new AuthenticateUserSerivce();

    const { user, token } = await authenticateUser.execute({email, password})

    delete user.password;

    return response.json({token})

})

export default sessionsRouter;
