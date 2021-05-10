import {Router} from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarSerivce from '../services/UpdateUserAvatar'

import multer from 'multer';
import uploadConfig from '../config/updload'
import User from '../models/User';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try{

    const {name, email, password} = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    })

    delete user.password;

    return response.json(user)
  } catch (err){
    response.status(404).json({"error": err.message});
  }
})

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try{
      const updateUserAvatar = new UpdateUserAvatarSerivce();

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,

      }
      );
      delete user.password;

      return response.json(user)
    }catch(err){
    response.status(404).json({"error": err.message});
    }
});

export default usersRouter;
