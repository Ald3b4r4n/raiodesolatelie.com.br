import { buildStoreConfig } from "@/lib/config/store";

export function Footer() {
  const config = buildStoreConfig();

  return (
    <footer className="site-footer">
      <p>Raio de Sol Ateliê</p>
      <p>Moda artesanal com vitrine mobile-first, compra direta e atendimento próximo.</p>
      <div className="site-footer__links">
        <a href={config.whatsappUrl}>WhatsApp</a>
        <a href={config.socialLinks[0]?.href} rel="noreferrer" target="_blank">
          Instagram
        </a>
        <a href={config.socialLinks[1]?.href} rel="noreferrer" target="_blank">
          TikTok
        </a>
      </div>
    </footer>
  );
}
