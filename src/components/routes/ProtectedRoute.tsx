import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth.ts";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, guest } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !guest) {
      navigate("/login");
    }
  }, [navigate, user, guest]);

  return <>{children}</>;
}
