
import { useEffect } from "react";

export default function ApiTest() {
  useEffect(() => {
    async function testApi() {
      try {
        const response = await fetch(
          "https://book-lib-api.up.railway.app/health"
        );

        const body = await response.text();

        console.log("API status:", response.status);
        console.log("API response:", body);

        if (!response.ok) {
          console.error(`API returned HTTP ${response.status}`);
        }
      } catch (error) {
        console.error("API connection error:", error);
      }
    }

    testApi();
  }, []);

  return null;
}
