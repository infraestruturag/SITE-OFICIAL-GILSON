import { createFileRoute } from "@tanstack/react-router";
import LegalLanding from "@/components/LegalLanding";
import bgMarble from "@/assets/bg-marble.jpg";
import bgBooks from "@/assets/bg-books.jpg";
import { jsonLdScript } from "@/lib/seo";

const CANONICAL = "https://gilsoncarvalho.com/imobiliario";

export const Route = createFileRoute("/imobiliario")({
  head: () => ({
    meta: [
      { title: "Direito Imobiliário — Usucapião e Regularização | Gilson Carvalho" },
      { name: "description", content: "Usucapião, regularização de imóveis e contratos imobiliários com segurança jurídica total." },
      { property: "og:title", content: "Direito Imobiliário — Gilson Carvalho Advocacia" },
      { property: "og:description", content: "Usucapião, regularização de imóveis e contratos imobiliários." },
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
  component: ImobiliarioPage,
});

function ImobiliarioPage() {
  return (
    <LegalLanding
      eyebrow="Direito Imobiliário"
      heroTitle="Seu imóvel só é realmente seu quando está no papel."
      heroSubtitle="Usucapião, regularização documental e contratos imobiliários conduzidos com técnica — transformando posse em propriedade segura."
      heroImage={bgMarble}
      painsImage={bgBooks}
      solutionsImage={bgMarble}
      finalImage={bgBooks}
      ctaText="Regularizar meu Imóvel"
      whatsappMessage="Olá Dr. Gilson, vim através do site e gostaria de falar sobre Direito Imobiliário."
      pains={[
        { title: "Imóvel sem escritura", desc: "Anos de posse sem registro impedem venda, financiamento e transmissão aos herdeiros." },
        { title: "Documentação irregular", desc: "Divergências de matrícula, área e inventários pendentes travam qualquer negociação." },
        { title: "Contratos frágeis", desc: "Compra, venda ou locação firmadas sem cláusulas de proteção geram prejuízos e litígios." },
      ]}
      solutions={[
        { title: "Usucapião Judicial e Extrajudicial", desc: "Conversão da posse prolongada em propriedade registrada, pela via mais rápida disponível." },
        { title: "Regularização e Retificação", desc: "Ajuste de matrícula, georreferenciamento, averbação de construção e inventário de imóveis." },
        { title: "Contratos Imobiliários", desc: "Elaboração e revisão de compra e venda, permuta, locação e built to suit." },
        { title: "Ações Possessórias", desc: "Reintegração, manutenção de posse e defesa contra invasões e distratos abusivos." },
      ]}
    />
  );
}
