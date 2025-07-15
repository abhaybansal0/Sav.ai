
const verifyCsrf = async (req, res, next) => {

  const cookieToken = req.cookies['XSRF-TOKEN'];
  const headerToken = req.get('X-XSRF-TOKEN');
  console.log(cookieToken, headerToken)
  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    console.log('Invalid csrf', 'abe yrr')
    return res.status(403).send('Invalid CSRF token');
  }
  next();

}

export default verifyCsrf