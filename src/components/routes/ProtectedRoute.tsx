import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth.ts";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return <>{children}</>;
}
