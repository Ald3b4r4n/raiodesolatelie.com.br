import { LoadingState } from "@/components/ui/LoadingState";

export default function ProductLoadingPage() {
  return (
    <div className="product-detail-page">
      <LoadingState label="Carregando produto" />
    </div>
  );
}
