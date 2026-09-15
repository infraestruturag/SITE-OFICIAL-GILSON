import { createFileRoute } from "@tanstack/react-router";
import LegalLanding from "@/components/LegalLanding";
import bgMarble from "@/assets/bg-marble.jpg";
import bgBooks from "@/assets/bg-books.jpg";
import temaImg from "@/assets/tema-fundiario.jpg";
import { FileLock2, Gavel, LandPlot, Scale } from "lucide-react";
import { jsonLdScript } from "@/lib/seo";

const CANONICAL = "https://gilsoncarvalho.com/direito-fundiario";

export const Route = createFileRoute("/direito-fundiario")({
  head: () => ({
    meta: [
      { title: "Direito Fundiário e Conflitos de Posse — Gilson Carvalho Advocacia" },
      { name: "description", content: "Reintegração de posse, litígios de áreas rurais e urbanas, contratos agrários e defesa possessória." },
      { property: "og:title", content: "Direito Fundiário — Gilson Carvalho Advocacia" },
      { property: "og:description", content: "Defesa firme da sua terra em conflitos de posse e domínio." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://gilsoncarvalho.com/og-gilson.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://gilsoncarvalho.com/og-gilson.jpg" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [jsonLdScript({ url: CANONICAL })],
  }),
  component: DireitoFundiarioPage,
});

function DireitoFundiarioPage() {
  return (
    <LegalLanding
      eyebrow="Conflitos de Posse e Domínio"
      heroTitle="Defesa firme da sua terra em conflitos de posse e domínio."
      heroSubtitle="Rigor técnico na defesa do seu patrimônio. Prestamos assessoria jurídica avançada em disputas possessórias e litígios complexos, assegurando a sua propriedade."
      heroImage={temaImg}
      painsImage={temaImg}
      solutionsImage={bgMarble}
      finalImage={bgBooks}
      ctaText="Proteger minha Propriedade"
      whatsappMessage="Olá Dr. Gilson, vim através do site e gostaria de falar sobre Direito Fundiário."
      routePath="/direito-fundiario"
      videoFile="direito-fundiario.mp4"
      authorityTitle="Quem vai proteger o seu patrimônio e os seus direitos?"
      footerSubtitle="Direito Imobiliário e Fundiário · Atuação técnica e sigilosa."
      authorityText="Gilson Carvalho alia mais de 20 anos de experiência jurídica à atuação estratégica em Direito Imobiliário e Fundiário. Com vasta expertise também em Família e Sucessões, garante a segurança patrimonial e a regularização dos seus bens com total discrição e precisão técnica."
      instagramLinks={[
        "https://www.instagram.com/p/DDIV7PbTEpo/?stkn=em55djNtaXd5ajFx",
        "https://www.instagram.com/p/DDF6Ac4TY8B/?stkn=NGQ1ZGZveWJqNm04",
        "https://www.instagram.com/p/DCtsjqfMpZM/?stkn=MXVscTRpYXJmY214Zw==",
        "https://www.instagram.com/p/DCjY5XbPiMC/?stkn=ZHc0dGtpZm1zZTkx",
        "https://www.instagram.com/p/DCeQGu4NuFe/?stkn=MXh1emZ4cHU4ZmFpYw==",
        "https://www.instagram.com/p/DCWuW8rPHoY/?stkn=MWtiOWtlcnI5ZzJ4aA==",
      ]}
      pains={[
        { title: "Invasão de área", desc: "Ocupação indevida da propriedade exigindo resposta judicial imediata e liminar." },
        { title: "Disputa de divisas", desc: "Conflitos com confrontantes sobre limites, cercas e faixas de terra produtiva." },
        { title: "Contratos rurais frágeis", desc: "Arrendamentos e parcerias mal redigidos que geram litígio e perda de posse." },
      ]}
      solutions={[
        { title: "Ações Possessórias com Liminar", desc: "Reintegração, manutenção de posse e interdito proibitório com pedido de urgência.", icon: Gavel },
        { title: "Ação Reivindicatória", desc: "Retomada do imóvel com base no domínio comprovado pela matrícula.", icon: Scale },
        { title: "Demarcatória e Divisória", desc: "Definição judicial de limites e divisão de áreas comuns entre proprietários.", icon: LandPlot },
        { title: "Contratos Agrários Blindados", desc: "Arrendamento, parceria e comodato redigidos para prevenir litígio futuro.", icon: FileLock2 },
      ]}
    />
  );
}
