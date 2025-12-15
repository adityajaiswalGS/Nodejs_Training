export function oauthMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization header missing"
    });
  }


const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({
      message: "Invalid"
    });
  }


  
  const token = parts[1];

  if (token !== "token123") {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }

  req.user = {
    id: 1,
    name: "Aditya"
  };
  
  next();
}

