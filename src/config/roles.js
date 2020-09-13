export const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(401).send('Unauthorized role');
  }
  return next();
};
