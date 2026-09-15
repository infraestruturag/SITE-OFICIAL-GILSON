import { createFileRoute } from "@tanstack/react-router";
import LegalLanding from "@/components/LegalLanding";
import bgMarble from "@/assets/bg-marble.jpg";
import bgBooks from "@/assets/bg-books.jpg";
import { jsonLdScript } from "@/lib/seo";

const CANONICAL = "https://gilsoncarvalho.com/direito-digital";

export const Route = createFileRoute("/direito-digital")({
  head: () => ({
    meta: [
      { title: "Direito Digital — Golpes Virtuais e Vazamento de Dados | Gilson Carvalho" },
      { name: "description", content: "Defesa em golpes virtuais, fraudes no WhatsApp, vazamento de dados e crimes digitais." },
      { property: "og:title", content: "Direito Digital — Gilson Carvalho Advocacia" },
      { property: "og:description", content: "Golpes virtuais, vazamento de dados e fraudes no WhatsApp." },
      { property: "og:type", content: "website" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://gilsoncarvalho.com/og-gilson.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://gilsoncarvalho.com/og-gilson.jpg" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [jsonLdScript({ url: CANONICAL })],
  }),
  component: DireitoDigitalPage,
});

function DireitoDigitalPage() {
  return (
    <LegalLanding
      eyebrow="Direito Digital"
      heroTitle="No ambiente digital, agir rápido é metade da solução."
      heroSubtitle="Atuação imediata em golpes virtuais, clonagem de WhatsApp, vazamento de dados e uso indevido da sua imagem — com preservação técnica de provas."
      heroImage={bgMarble}
      painsImage={bgBooks}
      solutionsImage={bgMarble}
      finalImage={bgBooks}
      ctaText="Agir Agora"
      whatsappMessage="Olá Dr. Gilson, vim através do site e gostaria de falar sobre Direito Digital."
      pains={[
        { title: "Golpe no WhatsApp", desc: "Conta clonada e contatos abordados em seu nome, com prejuízo financeiro e à sua reputação." },
        { title: "Vazamento de dados", desc: "Informações pessoais expostas por empresas, gerando fraudes e violação da LGPD." },
        { title: "Ataques à imagem online", desc: "Perfis falsos, difamação em redes sociais e conteúdo íntimo divulgado sem consentimento." },
      ]}
      solutions={[
        { title: "Recuperação e Bloqueio de Contas", desc: "Medidas urgentes junto às plataformas e autoridades para conter o golpe em andamento." },
        { title: "Ação por Vazamento (LGPD)", desc: "Responsabilização de empresas por tratamento indevido de dados e indenização." },
        { title: "Remoção de Conteúdo", desc: "Tutelas de urgência para retirada de publicações ofensivas e perfis falsos." },
        { title: "Ata Notarial e Prova Digital", desc: "Preservação técnica de evidências para garantir a força probatória do seu caso." },
      ]}
    />
  );
}
