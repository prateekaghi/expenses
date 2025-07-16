import { decodeJwt } from "jose";

export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = decodeJwt(token);

    if (!decoded?.exp) return true;
    const now = Math.floor(Date.now() / 1000);

    return decoded.exp < now;
  } catch (error) {
    return true;
  }
};
