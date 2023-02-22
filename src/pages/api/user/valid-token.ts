import type {NextApiRequest, NextApiResponse} from 'next';
import {db} from 'database';
import {User} from 'models';
import bcrypt from 'bcryptjs';
import {Jwt} from 'utils';

type Data =
  | {
      message: string;
    }
  | {
      token: string;
      user: {
        name: string;
        email: string;
        role: string;
      };
    };

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return ValidateToken(req, res);
    default:
      res.status(400).json({message: 'bad request'});
  }
}
async function ValidateToken(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {token = ''} = req.cookies;

  let userId = '';
  try {
    userId = await Jwt.isValidToken(token);
  } catch (err) {
    return res.status(401).json({message: 'Token de autorizacion no es valido'});
  }
  await db.connect();
  const user = await User.findById(userId).lean();
  await db.disconnect();

  if (!user) {
    return res.status(400).json({message: 'No existe un usuario por ese id'});
  }
  const {_id, email, name, role} = user;
  res.status(200).json({
    token: Jwt.signToken(_id, email),
    user: {role, email, name},
  });
}
