import {db} from 'database';
import {User} from 'models';
import type {NextApiRequest, NextApiResponse} from 'next';
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
    case 'POST':
      return loginUser(req, res);
    default:
      res.status(400).json({message: 'bad request'});
  }
}
async function loginUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {email = '', password = ''} = req.body;

  await db.connect();
  const user = await User.findOne({email}).lean();
  await db.disconnect();
  if (!user) {
    return res.status(400).json({message: 'Contraseña o correo no validos '});
  }

  if (!bcrypt.compareSync(password, user.password + '')) {
    return res.status(400).json({message: 'Contraseña o correo no validos -c'});
  }
  const {name, role, email: emailUser} = user;

  const token = Jwt.signToken(user._id, emailUser);

  return res.status(200).json({
    token,
    user: {role, name, email: emailUser},
  });
}
