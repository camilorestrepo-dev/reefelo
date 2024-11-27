import { useState } from "react";
import { AuthService } from "../services/auth/auth-service";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const [signInError, setSignInError] = useState<string>("");
  const [signInLoading, setSignInLoading] = useState<boolean>();

  const navigate = useNavigate();

  const clearSignInError = () => {
    setSignInError("");
  };

  const login = async () => {
    setSignInLoading(true);
    clearSignInError();
    try {
      await AuthService.loginGoogle();
      navigate("/home");
    } catch (e) {
      console.error(e);
      setSignInError("error.signUp");
    }
    setSignInLoading(false);
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return { signInError, signInLoading, clearSignInError, login, logout };
}
