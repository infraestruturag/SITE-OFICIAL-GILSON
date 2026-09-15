import { createFileRoute } from "@tanstack/react-router";
import LegalLanding from "@/components/LegalLanding";
import bgMarble from "@/assets/bg-marble.jpg";
import bgBooks from "@/assets/bg-books.jpg";
import temaImg from "@/assets/tema-imobiliaria.jpg";
import { Building2, FileCheck2, KeyRound, SearchCheck } from "lucide-react";
import { jsonLdScript } from "@/lib/seo";

const CANONICAL = "https://gilsoncarvalho.com/regularizacao-imobiliaria";

export const Route = createFileRoute("/regularizacao-imobiliaria")({
  head: () => ({
    meta: [
      { title: "Regularização Imobiliária — Gilson Carvalho Advocacia" },
      { name: "description", content: "Escrituras, registros, legalização de posse e documentação de imóveis urbanos. OAB/TO e OAB/RJ." },
      { property: "og:title", content: "Regularização Imobiliária — Gilson Carvalho Advocacia" },
      { property: "og:description", content: "Seu imóvel só é realmente seu quando os documentos comprovam." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://gilsoncarvalho.com/og-gilson.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://gilsoncarvalho.com/og-gilson.jpg" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [jsonLdScript({ url: CANONICAL })],
  }),
  component: RegularizacaoImobiliariaPage,
});

function RegularizacaoImobiliariaPage() {
  return (
    <LegalLanding
      eyebrow="Direito Imobiliário"
      heroTitle="Seu imóvel só é realmente seu quando os documentos comprovam."
      heroSubtitle="A segurança do seu patrimônio depende da regularidade documental. Oferecemos inteligência jurídica para sanar pendências e consolidar o seu direito de propriedade."
      heroImage={temaImg}
      painsImage={temaImg}
      solutionsImage={bgMarble}
      finalImage={bgBooks}
      ctaText="Regularizar meu Imóvel"
      whatsappMessage="Olá Dr. Gilson, vim através do site e gostaria de falar sobre Regularização Imobiliária."
      routePath="/regularizacao-imobiliaria"
      videoFile="regularizacao-imobiliaria.mp4"
      authorityTitle="Quem vai proteger o seu patrimônio e os seus direitos?"
      footerSubtitle="Direito Imobiliário e Fundiário · Atuação técnica e sigilosa."
      authorityText="Gilson Carvalho alia mais de 20 anos de experiência jurídica à atuação estratégica em Direito Imobiliário e Fundiário. Com vasta expertise também em Família e Sucessões, garante a segurança patrimonial e a regularização dos seus bens com total discrição e precisão técnica."
      instagramLinks={[
        "https://www.instagram.com/p/DErrVxfzoHX/?stkn=dDNkM3hwbzVwNW1l",
        "https://www.instagram.com/p/DEcTdy4s5eq/?stkn=MWZlZWtvb3VnYjBiYQ==",
        "https://www.instagram.com/p/DEVansRsKR4/?stkn=NTYxZWM1cTBuM3Y=",
        "https://www.instagram.com/p/DEPoDkxxg7_/?stkn=MWtvbXQ2dHE3b3RvbA==",
        "https://www.instagram.com/p/DDwfEgktP_X/?stkn=MTRreGhiNGE2Y2dsMw==",
        "https://www.instagram.com/p/DDspdrKzOR8/?stkn=MTJoZzFiNjFtdXpocw==",
      ]}
      pains={[
        { title: "Imóvel sem escritura", desc: "Posse antiga sem registro impede venda, financiamento e transmissão aos herdeiros." },
        { title: "Registro divergente", desc: "Área, metragem ou proprietário desatualizados na matrícula geram bloqueio em qualquer negócio." },
        { title: "Contrato de gaveta", desc: "Compra informal sem transferência formal deixa o comprador sem qualquer garantia real." },
      ]}
      solutions={[
        { title: "Escrituração e Registro", desc: "Condução completa em cartório até a matrícula atualizada em seu nome.", icon: FileCheck2 },
        { title: "Retificação de Área e Matrícula", desc: "Correção administrativa ou judicial de metragem, confrontantes e dados do imóvel.", icon: Building2 },
        { title: "Adjudicação Compulsória", desc: "Ação para obter a escritura quando o vendedor desapareceu ou se recusa a outorgá-la.", icon: KeyRound },
        { title: "Due Diligence Imobiliária", desc: "Análise de riscos, certidões e ônus antes da compra — evitando prejuízos irreversíveis.", icon: SearchCheck },
      ]}
    />
  );
}
