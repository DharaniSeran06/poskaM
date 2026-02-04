import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story in Motion | POSKA MANOLITO AG",
  description: "Watch the story of POSKA MANOLITO AG - Building trust, quality and craftsmanship since 2003. Discover our journey in construction, plastering, facades, and painting.",
};

export default function OurStoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
