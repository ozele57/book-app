import { useEffect, useState } from "react";

export default function ApiTest() {
  const [status, setStatus] = useState("Checking API...");

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
          setStatus(`API returned HTTP ${response.status}`);
          return;
        }

        setStatus("API response received: " + body);
      } catch (error) {
        console.error("API connection error:", error);
        setStatus("Browser could not read the API response. Check the console.");
      }
    }

    testApi();
  }, []);

  return <p>{status}</p>;
}