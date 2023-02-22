import jwt from 'jsonwebtoken';

export const signToken = (_id: string, email: string) => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('No hay semilla para el jwt - revisar variables de entorno');
  }

  return jwt.sign({_id, email}, process.env.JWT_SECRET_SEED, {expiresIn: '2d'});
};

export const isValidToken = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('No hay semilla para el jwt - revisar variables de entorno');
  }
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
        if (err) return reject('JWT no es valido');
        const {_id} = payload as {_id: string};
        resolve(_id);
      });
    } catch (err) {
      reject('JWT no es valido');
    }
  });
};
