import React from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { FaXmark } from "react-icons/fa6";

type SidebarProps = {
  onClose: () => void;
};

export default function Sidebar({ onClose }: SidebarProps) {
  return (
    <div className="hidden xl:block xl:w-1/4 xl:pl-6">
      <aside className="rounded-[10px] bg-surface p-6">
        <div className="flex justify-between items-center mb-4 relative">
          <SectionTitle className="pr-6">Welcome to Lyric Music</SectionTitle>
          <button
            onClick={onClose}
            className="text-sm text-foreground absolute right-0 top-0 cursor-pointer"
          >
            <FaXmark className="w-5 h-5" />
          </button>
        </div>
        <p className="mb-[15px]">
          We’re thrilled to have you join us on this musical journey! Lyric
          Music is your gateway to a fresh and immersive way to enjoy the bands
          and artists you love. Whether you&apos;re searching for your all-time
          favorite tracks, exploring curated playlists crafted to fit every
          mood, or discovering new songs that will soon become your go-to
          anthems, Lyric Music is here to elevate your listening experience.
        </p>
        <p className="mb-[15px]">
          Imagine having the perfect soundtrack for every moment of your life,
          from energizing workouts to peaceful evenings under the stars. With an
          intuitive interface designed to make finding music effortless and
          enjoyable, you’ll spend less time searching and more time grooving.
          Best of all, it’s completely free—because we believe that great music
          should be accessible to everyone.
        </p>
        <p>
          At Lyric Music, we’re passionate about creating a community where
          music lovers like you can explore, connect, and celebrate the power of
          sound. So dive in, press play, and let the music move you. Welcome to
          your new favorite way to listen.
        </p>
      </aside>
    </div>
  );
}
