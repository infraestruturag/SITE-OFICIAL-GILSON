import { createFileRoute } from "@tanstack/react-router";
import LegalLanding from "@/components/LegalLanding";
import bgMarble from "@/assets/bg-marble.jpg";
import bgBooks from "@/assets/bg-books.jpg";
import temaImg from "@/assets/tema-divorcio.jpg";
import { Briefcase, Gavel, Handshake, ScrollText } from "lucide-react";
import { jsonLdScript } from "@/lib/seo";

const CANONICAL = "https://gilsoncarvalho.com/divorcio";

export const Route = createFileRoute("/divorcio")({
  head: () => ({
    meta: [
      { title: "Divórcio Rápido e Justo — Gilson Carvalho Advocacia" },
      { name: "description", content: "Em um momento de decisões importantes, orientação jurídica adequada faz toda a diferença. Atuamos com discrição, segurança e atenção à proteção dos seus direitos e do seu patrimônio. OAB/TO e OAB/RJ." },
      { property: "og:title", content: "Divórcio — Gilson Carvalho Advocacia" },
      { property: "og:description", content: "Agilidade, discrição e proteção patrimonial em seu processo de separação." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://gilsoncarvalho.com/og-gilson.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://gilsoncarvalho.com/og-gilson.jpg" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [jsonLdScript({ url: CANONICAL })],
  }),
  component: DivorcioPage,
});

function DivorcioPage() {
  return (
    <LegalLanding
      eyebrow="Direito de Família"
      heroTitle="Um final mais justo representa um recomeço mais tranquilo."
      heroSubtitle="Em um momento de decisões importantes, orientação jurídica adequada faz toda a diferença. Atuamos com discrição, segurança e atenção à proteção dos seus direitos e do seu patrimônio."
      heroImage={temaImg}
      painsImage={temaImg}
      solutionsImage={bgMarble}
      finalImage={bgBooks}
      ctaText="Iniciar Conversa Sigilosa"
      whatsappMessage="Olá Dr. Gilson, vim através do site e gostaria de falar sobre Divórcio."
      routePath="/divorcio"
      videoFile="divorcio.mp4"
      authorityTitle="Quem vai defender os direitos da sua família?"
      footerSubtitle="Direito de Família e Sucessões · Atendimento sigiloso."
      authorityText="Gilson Carvalho é especialista em Direito de Família e Sucessões com mais de 20 anos de atuação. Dedica-se a proteger o patrimônio e garantir a paz em momentos de transição familiar, oferecendo excelência jurídica e sigilo absoluto."
      instagramLinks={[
        "https://www.instagram.com/gilsoncarvalho.adv/p/DPTzaueAcUj/",
        "https://www.instagram.com/p/DTbMkXKEvGL/?stkn=MXUxejEyOTM5dHAwZg==",
        "https://www.instagram.com/p/DQcAjSVD9GD/?stkn=OWZqbHF3bDBtcmtn",
        "https://www.instagram.com/p/DQCQrzyCVMS/?stkn=MTRkeTJyaXZ0M2h4cQ==",
        "https://www.instagram.com/p/DP2FOkSD88Y/?stkn=cmR5bXIydWZmM2h5",
        "https://www.instagram.com/gilsoncarvalho.adv/p/DPT0TKtjpyA/",
      ]}
      pains={[
        { title: "Insegurança patrimonial", desc: "Receio de perder bens conquistados ou de uma partilha injusta na separação." },
        { title: "Conflitos prolongados", desc: "Discussões intermináveis que prolongam o sofrimento e oneram financeiramente." },
        { title: "Falta de discrição", desc: "Medo da exposição pessoal e do impacto na imagem profissional ou familiar." },
      ]}
      solutions={[
        { title: "Divórcio Consensual Estratégico", desc: "Acordos cuidadosamente estruturados, resolvendo o processo em tempo recorde com mínima exposição.", icon: ScrollText },
        { title: "Defesa Litigiosa Robusta", desc: "Quando o acordo não é possível, atuamos com firmeza técnica para proteger seus direitos integralmente.", icon: Gavel },
        { title: "Proteção Patrimonial", desc: "Análise minuciosa da partilha, holdings familiares e blindagem ética de bens.", icon: Briefcase },
        { title: "Mediação Privada", desc: "Conduzimos a negociação fora do tribunal sempre que possível — sigilo, agilidade e respeito.", icon: Handshake },
      ]}
    />
  );
}
