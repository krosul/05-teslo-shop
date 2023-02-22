import {db} from 'database';
import {User} from 'models';
import type {NextApiRequest, NextApiResponse} from 'next';
import bcrypt from 'bcryptjs';
import {Jwt, validations} from 'utils';

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
      return registerUser(req, res);
    default:
      res.status(400).json({message: 'bad request'});
  }
}
async function registerUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    email = '',
    password = '',
    name = '',
  } = req.body as {email: string; password: string; name: string};

  if (password.length < 6) {
    return res.status(400).json({message: 'La contraseña debe de ser de 6 caracteres'});
  }

  if (name.length < 2) {
    return res.status(400).json({message: 'El nombre debe de ser mayor a 2 caracteres'});
  }
  if (!validations.isValidEmail(email)) {
    return res.status(400).json({message: 'No es un correo valido'});
  }

  await db.connect();
  const user = await User.findOne({email}).lean();

  if (user) {
    await db.disconnect();
    return res.status(400).json({message: 'Correo existente'});
  }
  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password, Number(process.env.BCRYPT_SALTS)),
    name,
    role: 'client',
  });
  try {
    await newUser.save({validateBeforeSave: true});
  } catch (err) {
    console.log(err);

    return res.status(500).json({message: 'Revisar logs del servidor'});
  }

  const {_id, role} = newUser;
  const token = Jwt.signToken(_id, email);
  return res.status(200).json({
    token,
    user: {
      role,
      name,
      email,
    },
  });
}
