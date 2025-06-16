"use client";

import { useState, useDeferredValue, useMemo } from "react";
import Container from "@/components/layout/Container";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Card from "@/components/ui/Card";
import { useBands } from "@/hooks/useBands";

export default function Home() {
  // State to control whether the sidebar is open
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // State for search and genre filter
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const [selectedGenre, setSelectedGenre] = useState("All");

  const { bands, loading, error } = useBands();

  const filteredBands = useMemo(() => {
    return bands.filter((band) => {
      const matchesGenre =
        selectedGenre === "All" ||
        band.genre?.toLowerCase() === selectedGenre.toLowerCase();
      const matchesSearch = band.band_name
        .toLowerCase()
        .includes(deferredSearchQuery.toLowerCase());
      return matchesGenre && matchesSearch;
    });
  }, [bands, selectedGenre, deferredSearchQuery]);

  // Function to update search query
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // Function to update selected genre
  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
  };

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
            {filteredBands.map((band) => (
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
        </main>

        {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
      </div>
    </Container>
  );
}
