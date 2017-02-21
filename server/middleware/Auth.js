import jwt from 'jsonwebtoken';
import db from '../models';

const secret = process.env.SECRET || 'wearethepirateswhodontdoanything';

const authentication = {
  verifyUser(req, res, next) {
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
  },

  verifyAdmin(req, res, next) {
    db.Role
      .findById(req.decodedToken.roleId)
      .then((role) => {
        if (role.title === 'admin') {
          next();
        } else { return res.status(403).send({ message: 'Permission denied, admin only' }); }
      });
  }
}

export default authentication;
