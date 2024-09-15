import { useEffect, useState } from "react";

export default function useFetchSnaps() {
  const [snaps, setSnaps] = useState<Snap[]>([]);

  useEffect(() => {
    fetch("/api/snaps")
      .then((res) => res.json())
      .then((data) => setSnaps(data));
  }, []);

  return snaps;
}
