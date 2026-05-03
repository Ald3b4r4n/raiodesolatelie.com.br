"use client";

import Link from "next/link";
import { useState } from "react";
import { ClipboardList, MessageCircleMore, PackageCheck, Ruler } from "lucide-react";

import { ExternalLink } from "@/components/links/ExternalLink";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { buildStoreConfig, normalizeWhatsAppPhone } from "@/lib/config/store";

const steps = [
  {
    title: "Separação da peça",
    description: "Identificamos disponibilidade, cores e tamanho com base no seu pedido.",
    icon: PackageCheck
  },
  {
    title: "Medidas e ajuste",
    description: "Confirmamos medidas, caimento e possibilidade de ajuste sob encomenda.",
    icon: Ruler
  },
  {
    title: "Resumo do atendimento",
    description: "Enviamos fotos, detalhes e valores antes de seguir para o WhatsApp.",
    icon: ClipboardList
  }
];

export function AtendimentoPage() {
  const config = buildStoreConfig();
  const [nome, setNome] = useState("");
  const [medidas, setMedidas] = useState("");
  const [cores, setCores] = useState("");
  const [demandas, setDemandas] = useState("");

  const getWhatsAppUrl = () => {
    const phone = normalizeWhatsAppPhone(config.whatsappPhone);
    if (!phone) return undefined;

    let text = `Olá, meu nome é ${nome || "um(a) cliente"}. Gostaria de iniciar um atendimento.\n\n`;
    if (medidas) text += `*Minhas medidas/tamanhos:* ${medidas}\n`;
    if (cores) text += `*Preferências de cores:* ${cores}\n`;
    if (demandas) text += `*Outras demandas:* ${demandas}\n`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="atendimento-page">
      <section className="atendimento-hero" aria-labelledby="atendimento-title">
        <div className="atendimento-hero__content">
          <p className="eyebrow">Atendimento do ateliê</p>
          <h1 id="atendimento-title">Preparação de atendimento</h1>
          <p>
            Organizamos detalhes da sua peça, medidas e fotos para que a conversa no
            WhatsApp seja rápida e objetiva.
          </p>
          <div className="atendimento-hero__actions">
            <Button asChild>
              <Link href="/catalog">Explorar catálogo</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="atendimento-form-section" aria-label="Preencha seus dados">
        <form className="atendimento-form">
          <div className="atendimento-form__intro">
            <strong>Dados do pedido</strong>
            <p>Preencha os campos abaixo para adiantar o nosso contato no WhatsApp.</p>
          </div>
          <Input
            label="Seu nome"
            name="nome"
            placeholder="Como gostaria de ser chamada(o)?"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <Input
            label="Medidas"
            name="medidas"
            placeholder="Sabe suas medidas ou qual tamanho usa geralmente?"
            value={medidas}
            onChange={(e) => setMedidas(e.target.value)}
          />
          <Input
            label="Preferência de cores"
            name="cores"
            placeholder="Tem preferência por alguma cor específica?"
            value={cores}
            onChange={(e) => setCores(e.target.value)}
          />
          <div className="field">
            <label className="field__label" htmlFor="outras-demandas">
              Outras demandas ou dúvidas
            </label>
            <textarea
              className="field__control"
              id="outras-demandas"
              name="demandas"
              placeholder="Descreva aqui o que você está procurando, peças específicas, etc."
              value={demandas}
              onChange={(e) => setDemandas(e.target.value)}
              rows={4}
              style={{ minHeight: "100px", resize: "vertical" }}
            />
          </div>
        </form>
      </section>

      <section className="atendimento-steps" aria-label="Etapas do atendimento">
        {steps.map((step) => (
          <article key={step.title} className="atendimento-step">
            <step.icon aria-hidden="true" />
            <div>
              <strong>{step.title}</strong>
              <p>{step.description}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="atendimento-footer" aria-label="Chamada final de atendimento">
        <div>
          <strong>Pronta para conversar com o ateliê?</strong>
          <p>Separamos as informações principais para facilitar o atendimento.</p>
        </div>
        <Button asChild>
          <ExternalLink href={getWhatsAppUrl() || config.whatsappUrl}>
            <MessageCircleMore aria-hidden="true" />
            Iniciar atendimento
          </ExternalLink>
        </Button>
      </section>
    </div>
  );
}
