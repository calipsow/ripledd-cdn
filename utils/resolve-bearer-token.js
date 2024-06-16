const extractBearerToken = (req) => {
  if (!req?.headers) return null;
  const authHeader = req?.headers["authorization"];
  if (!authHeader) return null;
  return authHeader.split(" ")[1];
};

module.exports = extractBearerToken;
