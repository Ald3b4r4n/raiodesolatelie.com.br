import type { StoreConfig } from "@/lib/config/store";

type HomePageProps = {
  config: StoreConfig;
};

export function HomePage({ config }: HomePageProps) {
  return (
    <div className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <p className="eyebrow">Produtos próprios feitos com cuidado</p>
        <h1 id="home-title">Raio de Sol Ateliê</h1>
        <p className="home-hero__text">
          Produtos artesanais com atendimento direto, escolha simples e contato pelo
          WhatsApp assim que o número oficial for informado.
        </p>
        <div className="home-actions" aria-label="Ações principais">
          <a className="ui-button ui-button--primary" href="/catalog">
            Ver catálogo
          </a>
          {config.whatsappUrl ? (
            <a className="ui-button ui-button--secondary" href={config.whatsappUrl}>
              Chamar no WhatsApp
            </a>
          ) : (
            <button className="ui-button ui-button--secondary" type="button" disabled>
              WhatsApp em breve
            </button>
          )}
        </div>
      </section>

      <section className="home-section" id="catalogo" aria-labelledby="catalog-title">
        <div>
          <p className="eyebrow">Catálogo</p>
          <h2 id="catalog-title">Destaques</h2>
        </div>
        <p>
          Produtos reais serão adicionados quando fotos, nomes, preços e variações forem
          confirmados.
        </p>
        <div className="home-placeholder-grid" aria-label="Prévia do catálogo">
          <span>Pronta entrega</span>
          <span>Encomendas via WhatsApp</span>
          <span>Produtos autorais</span>
        </div>
      </section>

      <section className="home-section" id="atendimento" aria-labelledby="contact-title">
        <div>
          <p className="eyebrow">Atendimento</p>
          <h2 id="contact-title">Contato e redes sociais</h2>
        </div>
        <p>
          Os canais oficiais serão ativados quando a cliente informar o número de WhatsApp
          e os links de Instagram e TikTok.
        </p>
        <ul className="social-list" aria-label="Redes sociais">
          {config.socialLinks.map((link) => (
            <li key={link.label}>
              {link.href ? (
                <a href={link.href} rel="noreferrer" target="_blank">
                  {link.label}
                </a>
              ) : (
                <span>{link.placeholder}</span>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
