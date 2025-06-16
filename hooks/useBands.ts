import { useState, useEffect } from "react";

export type Band = {
  id: string;
  band_name: string;
  album: string;
  description: string;
  genre?: string;
};

const fallbackDescription =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

export const useBands = () => {
  const [bands, setBands] = useState<Band[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/bands.json")
      .then((res) => res.json())
      .then(async (data) => {
        const enriched = await Promise.all(
          data.map(async (band: Omit<Band, "description">) => {
            try {
              const res = await fetch(`/data/${band.id}.json`);
              if (!res.ok) throw new Error("Not found");
              const bandData = await res.json();
              return {
                ...band,
                description: bandData.description || fallbackDescription,
              };
            } catch {
              return {
                ...band,
                description: fallbackDescription,
              };
            }
          })
        );
        setBands(enriched);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bands:", err);
        setError(
          "An error occurred while loading the data. Please try again later."
        );
        setLoading(false);
      });
  }, []);

  return { bands, loading, error };
};
