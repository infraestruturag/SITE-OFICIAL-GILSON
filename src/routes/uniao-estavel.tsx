import { createFileRoute } from "@tanstack/react-router";
import LegalLanding from "@/components/LegalLanding";
import bgBooks from "@/assets/bg-books.jpg";
import bgMarble from "@/assets/bg-marble.jpg";
import temaImg from "@/assets/tema-uniao-nova.jpg";
import { Briefcase, FileText, Handshake, Scale } from "lucide-react";
import { jsonLdScript } from "@/lib/seo";

const CANONICAL = "https://gilsoncarvalho.com/uniao-estavel";

export const Route = createFileRoute("/uniao-estavel")({
  head: () => ({
    meta: [
      { title: "União Estável — Gilson Carvalho Advocacia" },
      { name: "description", content: "Reconhecimento, dissolução e consultoria em contratos de união estável. Planejamento patrimonial seguro." },
      { property: "og:title", content: "União Estável — Gilson Carvalho Advocacia" },
      { property: "og:description", content: "Planejamento seguro para os seus próximos passos e para o seu patrimônio." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://gilsoncarvalho.com/og-gilson.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://gilsoncarvalho.com/og-gilson.jpg" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [jsonLdScript({ url: CANONICAL })],
  }),
  component: UniaoEstavelPage,
});

function UniaoEstavelPage() {
  return (
    <LegalLanding
      eyebrow="Direito de Família"
      heroTitle="Planejamento seguro para os seus próximos passos e para o seu patrimônio."
      heroSubtitle="Formalizar sua relação traz clareza para o futuro. Assessoramos casais no reconhecimento, contratos e dissolução, garantindo proteção patrimonial com total discrição."
      heroImage={temaImg}
      painsImage={temaImg}
      solutionsImage={bgBooks}
      finalImage={bgMarble}
      ctaText="Planejar com Segurança"
      whatsappMessage="Olá Dr. Gilson, vim através do site e gostaria de falar sobre União Estável."
      routePath="/uniao-estavel"
      videoFile="uniao-estavel.mp4"
      authorityTitle="Quem vai defender os direitos da sua família?"
      footerSubtitle="Direito de Família e Sucessões · Atendimento sigiloso."
      authorityText="Gilson Carvalho é especialista em Direito de Família e Sucessões com mais de 20 anos de atuação. Dedica-se a proteger o patrimônio e garantir a paz em momentos de transição familiar, oferecendo excelência jurídica e sigilo absoluto."
      instagramLinks={[
        "https://www.instagram.com/p/DGIlXQ4TC9T/?stkn=bmd3cWtvOG8wb2Jm",
        "https://www.instagram.com/p/DFYaqNLz287/?stkn=MTU5ZzN5MmRoM3hpbw==",
        "https://www.instagram.com/p/DFKhwCwzjMZ/?stkn=MTc3eHE0anJmMDZyNQ==",
        "https://www.instagram.com/p/DFIESV7zzvP/?stkn=MTFoMTJld2U0cTB4eA==",
        "https://www.instagram.com/p/DE7J3JFz3WX/?stkn=MWlqcjZpb2pnaTducA==",
        "https://www.instagram.com/p/DEzW3NuTUn2/?stkn=MWJ2bXR0YWZkMW9jOA==",
      ]}
      pains={[
        { title: "Vulnerabilidade patrimonial", desc: "Conviver sem contrato escrito pode gerar partilhas inesperadas e conflitos futuros." },
        { title: "Reconhecimento contestado", desc: "Dificuldade em comprovar a união em momentos sensíveis — herança, plano de saúde, previdência." },
        { title: "Dissolução conflituosa", desc: "Encerramento da relação sem clareza sobre direitos, bens e eventuais alimentos." },
      ]}
      solutions={[
        { title: "Contrato de União Estável", desc: "Definição clara de regime de bens, autonomia patrimonial e regras de convivência.", icon: FileText },
        { title: "Reconhecimento Judicial e Extrajudicial", desc: "Comprovação técnica da união para garantir direitos previdenciários, sucessórios e patrimoniais.", icon: Scale },
        { title: "Dissolução Consensual", desc: "Encerramento estruturado, com partilha equilibrada e proteção de cada parte.", icon: Handshake },
        { title: "Planejamento Patrimonial do Casal", desc: "Holdings, doações e regimes personalizados para proteger o que vocês construíram juntos.", icon: Briefcase },
      ]}
    />
  );
}
