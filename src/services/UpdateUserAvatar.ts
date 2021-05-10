import {getRepository} from 'typeorm'
import User from '../models/User'
import path from 'path'
import fs from 'fs'

import uploadConfig from '../config/updload'

interface Request{
  user_id: string,
  avatarFilename: string,
}

class UpdateUserAvatarSerivce{
  public async execute({user_id, avatarFilename}: Request):
  Promise<User>
   {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id)
    if(!user){
      throw new Error('Only authenticated user can change avatar');
    }

    if (user.avatar){
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath)

      if(userAvatarFileExist){
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await userRepository.save(user);

    return user
   }
}

export default UpdateUserAvatarSerivce
