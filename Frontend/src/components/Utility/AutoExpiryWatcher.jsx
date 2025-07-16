import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { isTokenExpired } from "../../utils/tokenFunctions";
import { decodeJwt } from "jose";

const AuthExpiryWatcher = () => {
  const token = useAuthStore((state) => state.token);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    const decoded = isTokenExpired(token) ? null : decodeJwt(token);
    if (!decoded?.exp) return;

    const now = Date.now();
    const expiryTime = decoded.exp * 1000;

    const timeLeft = expiryTime - now;

    const timeout = setTimeout(() => {
      clearAuth();
      navigate("/login");
    }, timeLeft);

    return () => clearTimeout(timeout);
  }, [token]);

  return null;
};

export default AuthExpiryWatcher;
