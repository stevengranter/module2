import { useEffect } from "react";

import { JSON_SERVER_URL } from "../utils/constants.ts";

export function useSubmitUserRegistration(formData) {
  useEffect(() => {
    {
      fetch(`${JSON_SERVER_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });
    }
  }, [formData]);
}
