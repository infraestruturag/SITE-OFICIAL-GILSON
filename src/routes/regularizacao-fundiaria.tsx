import { createFileRoute } from "@tanstack/react-router";
import LegalLanding from "@/components/LegalLanding";
import bgMarble from "@/assets/bg-marble.jpg";
import bgBooks from "@/assets/bg-books.jpg";
import temaImg from "@/assets/tema-fundiaria.jpg";
import { LandPlot, MapPinned, Ruler, ScrollText } from "lucide-react";
import { jsonLdScript } from "@/lib/seo";

const CANONICAL = "https://gilsoncarvalho.com/regularizacao-fundiaria";

export const Route = createFileRoute("/regularizacao-fundiaria")({
  head: () => ({
    meta: [
      { title: "Regularização Fundiária e Usucapião — Gilson Carvalho Advocacia" },
      { name: "description", content: "Regularização de terras rurais e urbanas, usucapião, georreferenciamento e titulação definitiva." },
      { property: "og:title", content: "Regularização Fundiária — Gilson Carvalho Advocacia" },
      { property: "og:description", content: "Segurança jurídica para consolidar o seu direito de propriedade." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://gilsoncarvalho.com/og-gilson.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://gilsoncarvalho.com/og-gilson.jpg" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [jsonLdScript({ url: CANONICAL })],
  }),
  component: RegularizacaoFundiariaPage,
});

function RegularizacaoFundiariaPage() {
  return (
    <LegalLanding
      eyebrow="Direito Agrário e Fundiário"
      heroTitle="Segurança jurídica para consolidar o seu direito de propriedade."
      heroSubtitle="A propriedade exige respaldo legal sólido. Atuamos de forma estratégica na regularização de áreas rurais e urbanas, assegurando a titulação do seu território."
      heroImage={temaImg}
      painsImage={temaImg}
      solutionsImage={bgMarble}
      finalImage={bgBooks}
      ctaText="Regularizar minha Terra"
      whatsappMessage="Olá Dr. Gilson, vim através do site e gostaria de falar sobre Regularização Fundiária."
      routePath="/regularizacao-fundiaria"
      videoFile="regularizacao-fundiaria.mp4"
      authorityTitle="Quem vai proteger o seu patrimônio e os seus direitos?"
      footerSubtitle="Direito Imobiliário e Fundiário · Atuação técnica e sigilosa."
      authorityText="Gilson Carvalho alia mais de 20 anos de experiência jurídica à atuação estratégica em Direito Imobiliário e Fundiário. Com vasta expertise também em Família e Sucessões, garante a segurança patrimonial e a regularização dos seus bens com total discrição e precisão técnica."
      instagramLinks={[
        "https://www.instagram.com/p/DDo6XeQzwRA/?stkn=ZTd1M3Q3anNweGh5",
        "https://www.instagram.com/p/DDhMKXoztay/?stkn=NHliZzY0OG03Z2o=",
        "https://www.instagram.com/p/DDfgKg4T8rb/?stkn=MXhtaXE3ZmhsZnhxeA==",
        "https://www.instagram.com/p/DDaF8uCT6xz/?stkn=MTZkOW12cm9mcmVmeg==",
        "https://www.instagram.com/p/DDXQm5bMg0t/?stkn=MTBxeDdrZnN1eGkxMQ==",
        "https://www.instagram.com/p/DDMn17rMBpb/?stkn=cTljN2F0emZlOWFp",
      ]}
      pains={[
        { title: "Terra sem título", desc: "Décadas de ocupação produtiva sem documento que assegure a propriedade." },
        { title: "Limites indefinidos", desc: "Ausência de georreferenciamento gera sobreposição de áreas e disputas com vizinhos." },
        { title: "Crédito rural negado", desc: "Sem matrícula regular, o banco não financia safra, maquinário ou expansão." },
      ]}
      solutions={[
        { title: "Usucapião Judicial e Extrajudicial", desc: "Reconhecimento da propriedade pelo tempo de posse, com a via mais rápida disponível.", icon: ScrollText },
        { title: "Titulação e Georreferenciamento", desc: "Condução técnica junto a INCRA, órgãos estaduais e cartórios até o título final.", icon: MapPinned },
        { title: "REURB Urbana", desc: "Regularização fundiária urbana de núcleos consolidados, individual ou coletiva.", icon: LandPlot },
        { title: "Desmembramento e Retificação", desc: "Ajuste formal de áreas, divisões e confrontações na matrícula do imóvel rural.", icon: Ruler },
      ]}
    />
  );
}
