import { SignJWT, jwtVerify } from "jose";

export const generateToken = async ({ email, id }) => {
  const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
  const expiry = process.env.ACCESS_TOKEN_EXPIRY;
  return await new SignJWT({ email, id })
    .setIssuedAt()
    .setExpirationTime(expiry)
    .setProtectedHeader({ alg: "HS256" })
    .sign(secret);
};

export const generateRefreshToken = async ({ email, id }) => {
  const secret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET);
  const expiry = process.env.REFRESH_TOKEN_EXPIRY;

  return await new SignJWT({ email, id })
    .setIssuedAt()
    .setExpirationTime(expiry)
    .setProtectedHeader({ alg: "HS256" })
    .sign(secret);
};

export const verifyRefreshToken = async ({ token }) => {
  const secret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET);
  const { payload } = jwtVerify(token, secret);
  return payload;
};
