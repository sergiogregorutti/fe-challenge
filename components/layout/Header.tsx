import Image from "next/image";
import { useState } from "react";
import { FaBell, FaComments, FaGear, FaBars } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

type HeaderProps = {
  onSearchChange: (query: string) => void;
  onGenreSelect: (genre: string) => void;
  selectedGenre: string;
  isSidebarOpen: boolean;
};

export default function Header({
  onSearchChange,
  onGenreSelect,
  selectedGenre,
  isSidebarOpen,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={`flex flex-col ${
        isSidebarOpen
          ? "min-[1490px]:flex-row min-[1490px]:justify-between"
          : "lg:flex-row lg:justify-between"
      } gap-4 bg-surface px-6 rounded-[10px]`}
    >
      <div className="flex justify-between items-center w-full lg:w-auto">
        <Image
          src="/assets/logo.png"
          alt="Lyric Music"
          width={163}
          height={105}
          className="h-[89px] w-auto"
        />
        <button
          className={`${
            isSidebarOpen ? "min-[1490px]:hidden" : "lg:hidden"
          } text-foreground`}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <FaBars className="w-6 h-6 cursor-pointer" />
        </button>
      </div>

      <div
        className={`flex-1 flex-col items-center gap-4 ${
          menuOpen ? "flex mb-6" : "hidden"
        } ${
          isSidebarOpen
            ? "min-[1490px]:flex min-[1490px]:flex-row min-[1490px]:items-center min-[1490px]:gap-14 min-[1490px]:mb-0"
            : "lg:flex lg:flex-row lg:items-center lg:gap-5 xl:gap-14 xl:mb-0"
        }`}
      >
        <div className="flex gap-[10px] flex-wrap justify-center">
          {["All", "Country", "Rock", "Pop"].map((label) => {
            const isSelected = selectedGenre === label;
            return (
              <button
                key={label}
                onClick={() => onGenreSelect(label)}
                className={`px-6 py-[6px] cursor-pointer text-[18px] rounded-[18px] text-sm ${
                  isSelected
                    ? "bg-brand text-foreground"
                    : "bg-background text-foreground"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
        <div className="relative">
          <FaSearch className="absolute left-3 top-2.5 text-foreground w-4 h-4" />
          <input
            type="text"
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-background text-foreground text-sm pl-10 pr-4 py-2 rounded-[18px] placeholder-gray-500 w-48 sm:w-64"
          />
        </div>
        <div className="flex flex-1 justify-end items-center gap-4 text-foreground">
          <FaBell className="w-5 h-5 cursor-pointer" />
          <FaGear className="w-5 h-5 cursor-pointer" />
          <FaComments className="w-5 h-5 cursor-pointer" />
        </div>
      </div>
    </header>
  );
}
