import { notFound } from "next/navigation";

/** Ensures unknown paths render root `app/not-found.tsx` (more specific routes win). */
export default function CatchAllUnknownRoute() {
  notFound();
}
