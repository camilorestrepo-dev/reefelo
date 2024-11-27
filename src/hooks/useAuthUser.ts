import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { AuthService } from "../services/auth/auth-service";

export function useAuthUser() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    AuthService.getUser().then((loadedUser) => {
      setUser(loadedUser);
    });
  }, []);

  return { user };
}
