import { getRepository } from 'typeorm';
import User from '../models/User'
import { compare } from 'bcryptjs';
import usersRouter from '../routes/users.routes';
import {sign, verify} from 'jsonwebtoken'
import authConfig from '../config/auth';
import AppError from '../errors/AppError'

interface Request {
  email: string,
  password: string,
}

interface Response {
  user: User
  token: string,
}


class AuthenticateUserSerivce {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Incorret e-mail/password combination.', 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Incorret e-mail/password combination.', 401)
    }

    const {secret, expiresIn} = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    return { user, token }
  }


}

export default AuthenticateUserSerivce
