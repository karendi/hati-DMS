import jwt from 'jsonwebtoken';
import db from '../models';

const secret = process.env.SECRET || 'wearethepirateswhodontdoanything';

class Authentication {
  static verifyUser(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          res.status(401).send({ message: 'Invalid token' });
        } else {
          req.decodedToken = decoded;
          next();
        }
      });
    } else {
      res.status(401).send({ message: 'Verification failed' });
    }
  }

  static verifyAdmin(req, res, next) {
    db.Role
      .findById(req.decodedToken.roleId)
      .then((role) => {
        if (role.title === 'admin') {
          next();
        } else { return res.status(403).send({ message: 'Permission denied, admin only' }); }
      });
  }

  static logout(req, res, next) {
    const token = req.headers.token || req.headers['x-access-token'];
    const decoded = req.decodedToken;
    if (token && decoded) {
      delete req.headers.token;
      delete req.headers['x-access-token'];
      delete req.decodedToken;
      next();
    }
  }
}

export default Authentication;
