import { HomePage } from "@/features/home/HomePage";
import { buildStoreConfig } from "@/lib/config/store";

export default function Home() {
  return <HomePage config={buildStoreConfig()} />;
}
