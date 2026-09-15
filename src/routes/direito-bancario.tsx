import { createFileRoute } from "@tanstack/react-router";
import LegalLanding from "@/components/LegalLanding";
import bgMarble from "@/assets/bg-marble.jpg";
import bgBooks from "@/assets/bg-books.jpg";
import { jsonLdScript } from "@/lib/seo";

const CANONICAL = "https://gilsoncarvalho.com/direito-bancario";

export const Route = createFileRoute("/direito-bancario")({
  head: () => ({
    meta: [
      { title: "Direito Bancário — Juros Abusivos e Fraudes | Gilson Carvalho" },
      { name: "description", content: "Defesa contra fraudes bancárias, revisão de juros abusivos e proteção financeira. OAB/TO e OAB/RJ." },
      { property: "og:title", content: "Direito Bancário — Gilson Carvalho Advocacia" },
      { property: "og:description", content: "Fraudes bancárias, juros abusivos e proteção do seu patrimônio financeiro." },
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
  component: DireitoBancarioPage,
});

function DireitoBancarioPage() {
  return (
    <LegalLanding
      eyebrow="Direito Bancário"
      heroTitle="O banco errou com você. Nós corrigimos."
      heroSubtitle="Atuação técnica contra fraudes bancárias, empréstimos não autorizados e juros abusivos — recuperando o que é seu com discrição e rigor jurídico."
      heroImage={bgMarble}
      painsImage={bgBooks}
      solutionsImage={bgMarble}
      finalImage={bgBooks}
      ctaText="Analisar meu Caso"
      whatsappMessage="Olá Dr. Gilson, vim através do site e gostaria de falar sobre Direito Bancário."
      pains={[
        { title: "Descontos não autorizados", desc: "Empréstimos consignados e tarifas lançados na sua conta sem qualquer autorização." },
        { title: "Juros abusivos", desc: "Contratos com encargos muito acima da média praticada pelo mercado." },
        { title: "Golpes e fraudes digitais", desc: "Transferências indevidas, PIX fraudulento e negativação injusta do seu nome." },
      ]}
      solutions={[
        { title: "Revisional de Contrato", desc: "Perícia contábil e ação revisional para reduzir juros e recalcular o saldo devedor." },
        { title: "Restituição de Valores", desc: "Recuperação de descontos indevidos, com devolução em dobro quando cabível." },
        { title: "Defesa em Fraudes Bancárias", desc: "Responsabilização da instituição por falha na segurança e reparação de danos." },
        { title: "Limpeza de Nome", desc: "Exclusão de negativações indevidas e indenização por dano moral." },
      ]}
    />
  );
}
