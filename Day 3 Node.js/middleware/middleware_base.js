export function basicAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization header missing"
    });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Basic") {
    return res.status(401).json({
      message: "Invalid Basic auth format"
    });
  }

  const base64Credentials = parts[1];

  const decoded = Buffer.from(base64Credentials, "base64")
    .toString("utf-8");

  const [username, password] = decoded.split(":");

  if (username !== "aditya" || password !== "1234") {
    return res.status(401).json({
      message: "Invalid username or password"
    });
  }

  req.user = {
    username,
    authType: "Basic"
  };

  next();
}
