import { createFileRoute } from "@tanstack/react-router";
import LegalLanding from "@/components/LegalLanding";
import bgBooks from "@/assets/bg-books.jpg";
import bgMarble from "@/assets/bg-marble.jpg";
import { jsonLdScript } from "@/lib/seo";

const CANONICAL = "https://gilsoncarvalho.com/previdenciario";

export const Route = createFileRoute("/previdenciario")({
  head: () => ({
    meta: [
      { title: "Direito Previdenciário — Aposentadoria Planejada | Gilson Carvalho" },
      { name: "description", content: "Planejamento previdenciário, aposentadorias, revisões e benefícios negados pelo INSS." },
      { property: "og:title", content: "Direito Previdenciário — Gilson Carvalho Advocacia" },
      { property: "og:description", content: "Planejamento previdenciário e aposentadorias com o melhor benefício possível." },
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
  component: PrevidenciarioPage,
});

function PrevidenciarioPage() {
  return (
    <LegalLanding
      eyebrow="Previdenciário"
      heroTitle="Aposentar-se bem é resultado de planejamento, não de sorte."
      heroSubtitle="Simulação técnica, correção de vínculos e escolha da melhor regra de transição para você receber o maior benefício possível — no menor tempo."
      heroImage={bgBooks}
      painsImage={bgMarble}
      solutionsImage={bgBooks}
      finalImage={bgMarble}
      ctaText="Planejar minha Aposentadoria"
      whatsappMessage="Olá Dr. Gilson, vim através do site e gostaria de falar sobre Direito Previdenciário."
      pains={[
        { title: "Benefício negado", desc: "Indeferimentos do INSS por falha documental ou tempo de contribuição não reconhecido." },
        { title: "Valor abaixo do devido", desc: "Aposentadorias concedidas sem considerar períodos especiais, rurais ou contribuições antigas." },
        { title: "Decisão no escuro", desc: "Aposentar-se sem simulação pode custar milhares de reais ao longo de toda a vida." },
      ]}
      solutions={[
        { title: "Planejamento Previdenciário", desc: "Simulação de cenários e regras de transição para definir o melhor momento de se aposentar." },
        { title: "Aposentadorias em Geral", desc: "Por idade, tempo de contribuição, especial, rural e por incapacidade permanente." },
        { title: "Revisão de Benefício", desc: "Recálculo de benefícios já concedidos com pagamento de atrasados." },
        { title: "Recursos e Ações Contra o INSS", desc: "Atuação administrativa e judicial em indeferimentos, cessações e perícias." },
      ]}
    />
  );
}
