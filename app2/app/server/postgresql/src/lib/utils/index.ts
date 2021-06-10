import { Request } from 'express';
import { IDatabase, IUser } from 'lib/types';

export const authorize = async (
  db: IDatabase,
  req: Request
): Promise<IUser | null> => {
  const token = req.get('X-CSRF-TOKEN');

  const viewer = await db.users.findOne({
    _id: req.signedCookies.viewer,
    token,
  });

  return viewer;
};
