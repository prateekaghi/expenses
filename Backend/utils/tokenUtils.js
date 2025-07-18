import { SignJWT, jwtVerify } from "jose";
const secret = new TextEncoder().encode(process.env.JWT_SECRET);
export const generateAccessToken = async ({
  id,
  email,
  first_name,
  last_name,
}) => {
  try {
    const token = await new SignJWT({ id, email, first_name, last_name })
      .setIssuedAt()
      .setExpirationTime(process.env.JWT_EXPIRY)
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);
    return token;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const verifyToken = async ({ token }) => {
  try {
    const data = await jwtVerify(token, secret);
    return data;
  } catch (error) {
    console.log("err", error);
  }
};
