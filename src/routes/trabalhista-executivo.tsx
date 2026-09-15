import { createFileRoute } from "@tanstack/react-router";
import LegalLanding from "@/components/LegalLanding";
import bgBooks from "@/assets/bg-books.jpg";
import bgMarble from "@/assets/bg-marble.jpg";
import { jsonLdScript } from "@/lib/seo";

const CANONICAL = "https://gilsoncarvalho.com/trabalhista-executivo";

export const Route = createFileRoute("/trabalhista-executivo")({
  head: () => ({
    meta: [
      { title: "Trabalhista Executivo — Rescisão Indireta | Gilson Carvalho" },
      { name: "description", content: "Defesa trabalhista de alto padrão para executivos e profissionais: rescisão indireta, verbas e assédio." },
      { property: "og:title", content: "Trabalhista Executivo — Gilson Carvalho Advocacia" },
      { property: "og:description", content: "Rescisão indireta e defesa trabalhista de alto padrão." },
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
  component: TrabalhistaPage,
});

function TrabalhistaPage() {
  return (
    <LegalLanding
      eyebrow="Trabalhista Executivo"
      heroTitle="Sua carreira merece uma saída à altura do que você construiu."
      heroSubtitle="Assessoria trabalhista de alto padrão para executivos e profissionais qualificados: rescisão indireta, verbas, bônus e reparação por assédio."
      heroImage={bgBooks}
      painsImage={bgMarble}
      solutionsImage={bgBooks}
      finalImage={bgMarble}
      ctaText="Falar com Especialista"
      whatsappMessage="Olá Dr. Gilson, vim através do site e gostaria de falar sobre Direito Trabalhista Executivo."
      pains={[
        { title: "Ambiente insustentável", desc: "Assédio moral, cobranças abusivas e descumprimento reiterado do contrato pelo empregador." },
        { title: "Verbas não pagas", desc: "Bônus, comissões, stock options e horas extras retidos ou calculados de forma incorreta." },
        { title: "Pedido de demissão precipitado", desc: "Sair sem estratégia significa abrir mão de direitos relevantes e da segurança financeira." },
      ]}
      solutions={[
        { title: "Rescisão Indireta", desc: "Encerramento do vínculo por culpa do empregador, preservando todas as verbas de uma dispensa sem justa causa." },
        { title: "Cobrança de Verbas e Bônus", desc: "Apuração técnica de comissões, participações e remuneração variável devidas." },
        { title: "Assédio Moral e Danos", desc: "Produção de prova robusta e pedido de indenização proporcional ao dano sofrido." },
        { title: "Negociação Confidencial", desc: "Acordos extrajudiciais discretos, preservando reputação e relacionamento de mercado." },
      ]}
    />
  );
}
