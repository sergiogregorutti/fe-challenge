"use client";

import { useState, useEffect } from "react";
import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Card from "@/components/ui/Card";

type Band = {
  id: string;
  band_name: string;
  album: string;
  description: string;
  genre?: string;
};

export default function Home() {
  // State to control whether the sidebar is open
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // State to store the list of bands
  const [bands, setBands] = useState<Band[]>([]);
  // State to show error message in UI if fetch fails
  const [error, setError] = useState<string | null>(null);
  // State to show loading indicator
  const [loading, setLoading] = useState(true);

  // Stage for search and genre filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Fallback text for Bands description
  const bandDescriptionFallbackText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate ve";

  useEffect(() => {
    // Initial fetch to get the base band list
    fetch("/data/bands.json")
      .then((res) => res.json())
      .then(async (data) => {
        // Fetch specific description for each band
        const enriched = await Promise.all(
          data.map(async (band: Omit<Band, "description">) => {
            try {
              const res = await fetch(`/data/${band.id}.json`);
              if (!res.ok) throw new Error("Not found");
              const bandData = await res.json();
              return {
                ...band,
                description:
                  bandData.description || bandDescriptionFallbackText,
              };
            } catch {
              return {
                ...band,
                description: bandDescriptionFallbackText,
              };
            }
          })
        );
        setBands(enriched);
        setLoading(false);
      })
      .catch((err) => {
        // Log fetch error and display error message in UI
        console.error("Error fetching bands:", err);
        setError(
          "An error occurred while loading the data. Please try again later."
        );
        setLoading(false);
      });
  }, []);

  // Function to update search query
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // Function to update selected genre
  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedGenre]);

  return (
    <Container className="py-6">
      <div className="flex w-full">
        <main
          className={`transition-all duration-300 w-full ${
            isSidebarOpen ? "xl:w-3/4" : "w-full"
          }`}
        >
          <Header
            onSearchChange={handleSearchChange}
            onGenreSelect={handleGenreSelect}
            selectedGenre={selectedGenre}
            isSidebarOpen={isSidebarOpen}
          />
          {/* Display loading message while fetching data */}
          {loading && (
            <div className="bg-surface rounded-[10px] p-6 mt-6">Loading...</div>
          )}
          {/* Display error message if there was a problem loading the bands data */}
          {error && (
            <div className="bg-surface rounded-[10px] p-6 mt-6">{error}</div>
          )}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {bands
              .filter((band) => {
                const matchesGenre =
                  selectedGenre === "All" ||
                  band.genre?.toLowerCase() === selectedGenre.toLowerCase();
                const matchesSearch = band.band_name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase());
                return matchesGenre && matchesSearch;
              })
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((band) => (
                <div key={band.id}>
                  <Card
                    image={`/sources/im${band.id}.png`}
                    title={band.band_name}
                    subtitle={band.album}
                    description={band.description}
                    onErrorImage="/sources/default.png"
                  />
                </div>
              ))}
          </section>
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({
              length: Math.ceil(
                bands.filter((band) => {
                  const matchesGenre =
                    selectedGenre === "All" ||
                    band.genre?.toLowerCase() === selectedGenre.toLowerCase();
                  const matchesSearch = band.band_name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
                  return matchesGenre && matchesSearch;
                }).length / itemsPerPage
              ),
            }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === i + 1
                    ? "bg-primary text-white"
                    : "bg-gray-200 cursor-pointer"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </main>

        {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
      </div>
    </Container>
  );
}
