import type { Metadata } from "next";

import { NovidadesPage } from "@/features/novidades/NovidadesPage";
import { buildNovidadesMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildNovidadesMetadata();

export default function Novidades() {
  return <NovidadesPage />;
}
