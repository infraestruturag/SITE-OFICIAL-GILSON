import { createFileRoute } from "@tanstack/react-router";
import LegalLanding from "@/components/LegalLanding";
import bgBooks from "@/assets/bg-books.jpg";
import bgMarble from "@/assets/bg-marble.jpg";
import temaImg from "@/assets/tema-guarda.jpg";
import { CalendarDays, HandCoins, HeartHandshake, ShieldCheck } from "lucide-react";
import { jsonLdScript } from "@/lib/seo";

const CANONICAL = "https://gilsoncarvalho.com/pensao-e-guarda";

export const Route = createFileRoute("/pensao-e-guarda")({
  head: () => ({
    meta: [
      { title: "Guarda e Pensão Alimentícia — Gilson Carvalho Advocacia" },
      { name: "description", content: "Garantia de direitos, regulamentação de visitas e revisão de pensão. Proteção absoluta do futuro dos seus filhos." },
      { property: "og:title", content: "Guarda e Pensão — Gilson Carvalho Advocacia" },
      { property: "og:description", content: "Proteção absoluta do bem-estar e do futuro dos seus filhos." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://gilsoncarvalho.com/og-gilson.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://gilsoncarvalho.com/og-gilson.jpg" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [jsonLdScript({ url: CANONICAL })],
  }),
  component: PensaoGuardaPage,
});

function PensaoGuardaPage() {
  return (
    <LegalLanding
      eyebrow="Família · Filhos"
      heroTitle="Proteção absoluta do bem-estar e do futuro dos seus filhos."
      heroSubtitle="Atuamos na proteção de direitos, estruturação de convivência familiar e adequação de pensões com sensibilidade e rigor técnico — colocando o bem-estar e o futuro dos filhos em primeiro lugar."
      heroImage={temaImg}
      painsImage={temaImg}
      solutionsImage={bgBooks}
      finalImage={bgMarble}
      ctaText="Proteger meus Filhos"
      whatsappMessage="Olá Dr. Gilson, vim através do site e gostaria de falar sobre Guarda e Pensão Alimentícia."
      routePath="/pensao-e-guarda"
      videoFile="pensao-e-guarda.mp4"
      authorityTitle="Quem vai defender os direitos da sua família?"
      footerSubtitle="Direito de Família e Sucessões · Atendimento sigiloso."
      authorityText="Gilson Carvalho é especialista em Direito de Família e Sucessões com mais de 20 anos de atuação. Dedica-se a proteger o patrimônio e garantir a paz em momentos de transição familiar, oferecendo excelência jurídica e sigilo absoluto."
      instagramLinks={[
        "https://www.instagram.com/gilsoncarvalho.adv/p/DTZDVpqjK3C/",
        "https://www.instagram.com/gilsoncarvalho.adv/p/DS517c6kkCw/",
        "https://www.instagram.com/gilsoncarvalho.adv/p/DQwL52qjy-3/",
        "https://www.instagram.com/gilsoncarvalho.adv/p/DQuCkKNAe-Q/",
        "https://www.instagram.com/gilsoncarvalho.adv/p/DQrd_CvEmcL/",
        "https://www.instagram.com/p/DJjmkOcRRef/?stkn=MTE3ZTZxcGFiY2tjaA==",
      ]}
      pains={[
        { title: "Convívio ameaçado", desc: "Dificuldade em manter contato regular e qualitativo com os filhos após a separação." },
        { title: "Pensão desajustada", desc: "Valores incompatíveis com a realidade atual — seja por insuficiência ou por excesso." },
        { title: "Decisões unilaterais", desc: "Falta de diálogo nas escolhas educacionais, médicas e de rotina dos filhos." },
      ]}
      solutions={[
        { title: "Regulamentação de Guarda", desc: "Guarda compartilhada ou unilateral, sempre orientada pelo melhor interesse da criança.", icon: ShieldCheck },
        { title: "Fixação e Revisão de Pensão", desc: "Cálculo técnico realista, ações de revisão para mais ou para menos conforme mudança de cenário.", icon: HandCoins },
        { title: "Regulamentação de Visitas", desc: "Estabelecimento claro de períodos, feriados e férias — eliminando atritos recorrentes.", icon: CalendarDays },
        { title: "Execução de Alimentos", desc: "Atuação firme para garantir o cumprimento dos valores devidos ao seu filho.", icon: HeartHandshake },
      ]}
    />
  );
}
