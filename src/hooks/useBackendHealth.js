import { useEffect, useState } from "react";

export default function useBackendHealth(url = "http://localhost:3001/products") {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    let active = true;

    async function ping() {
      try {
        const res = await fetch(url, { method: "GET" });
        if (!active) return;
        setIsOnline(res.ok);
      } catch {
        if (!active) return;
        setIsOnline(false);
      }
    }

    // initial check + periodic revalidation
    ping();
    const id = setInterval(ping, 5000);

    return () => {
      active = false;
      clearInterval(id);
    };
  }, [url]);

  return { isOnline };
}
