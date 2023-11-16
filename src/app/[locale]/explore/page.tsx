"use client";
import Divisor from "@/components/atoms/Divisor";
import Nav from "@/components/molecules/Navbar";
import Posts from "@/components/organisms/Posts";
export default function Host() {
  return (
    <main className="overflow-hidden">
      <Nav search divisor fill="#4E20E0" searchSize="xs" />
      <Posts />
      <Divisor />
    </main>
  );
}
