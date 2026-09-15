# Manual do Projeto — Gilson Carvalho Advocacia

Guia prático para manter o site. Todos os caminhos são relativos à raiz do projeto.

---

## Seção 1 — Como editar os contatos globais

### 1.1 Telefone / WhatsApp
O número aparece como uma constante chamada `WHATSAPP` (formato internacional, só dígitos: `5563984474070`).

Arquivos onde ele aparece:
- `src/routes/index.tsx` (Home)
- `src/routes/links.tsx` (Cartão Digital)
- `src/routes/$.tsx` (página 404)
- `src/components/LegalLanding.tsx` (todas as Landing Pages)

Para trocar o número, edite a linha em cada arquivo:

```ts
const WHATSAPP = "5563984474070"; // 55 + DDD + número
```

A mensagem inicial enviada ao WhatsApp fica logo abaixo, na variável `waMessage`.

### 1.2 E-mail, Instagram e endereço
- **E-mail:** procure por `advogado@gilsoncarvalho.com` nos mesmos arquivos e substitua.
- **Instagram:** constante `INSTAGRAM_URL` (`https://www.instagram.com/gilsoncarvalho.adv/`).
- **Endereço e mapa:** o texto do endereço está nos rodapés (`index.tsx`, `LegalLanding.tsx`) e o mapa é um `<iframe>` do Google Maps na seção "Nosso Escritório" em `src/routes/index.tsx`.

### 1.3 Dados que aparecem no Google (dados estruturados)
Edite `src/lib/seo.ts`. Ali ficam nome, telefone, e-mail, endereço, coordenadas (`geo`), horário de atendimento e OABs. Esse arquivo alimenta o JSON-LD de todas as páginas.

---

## Seção 2 — Cartão Digital (/links): adicionar ou remover botões

Arquivo: `src/routes/links.tsx`.

Existem duas listas:

- `topActions` — botões principais (WhatsApp, Site Oficial, Localização, Instagram, E-mail).
- `serviceLinks` — bloco "Especialidades".

Para **adicionar** um botão externo, inclua um item na lista:

```ts
{
  label: "Nome do Botão",
  sublabel: "Texto pequeno abaixo (opcional)",
  href: "https://site-externo.com",
  external: true,
  Icon: Globe, // ícone importado de "lucide-react"
  onClick: () => trackEvent("click_link_meu_botao", { local: "links" }),
}
```

Para um link **interno** do próprio site, troque `href`/`external` por `to: "/divorcio"`.

Para **remover**, apague o objeto correspondente da lista.

Para **reordenar**, mude a posição dos itens na lista — a ordem na tela é a ordem do array.

Para destacar em verde (estilo WhatsApp), adicione `variant: "primary"`.

Ícones disponíveis: qualquer nome da biblioteca [lucide.dev/icons](https://lucide.dev/icons). Lembre de importá-lo no topo do arquivo.

### Foto de perfil
A foto vem de `src/assets/fotogilsonlink.png.asset.json`. Para trocar, envie a nova imagem para `src/assets/` e altere o import no topo do arquivo para `import avatar from "@/assets/nova-foto.png";`, usando `src={avatar}`.

---

## Seção 3 — Editar textos, depoimentos e fotos das 4 LPs de Família

LPs ativas e seus arquivos:

| Página | Arquivo |
| --- | --- |
| /divorcio | `src/routes/divorcio.tsx` |
| /pensao-e-guarda | `src/routes/pensao-e-guarda.tsx` |
| /inventario | `src/routes/inventario.tsx` |
| /uniao-estavel | `src/routes/uniao-estavel.tsx` |

Todas usam o mesmo modelo visual: `src/components/LegalLanding.tsx`. Você quase nunca precisa mexer no modelo — apenas no conteúdo de cada rota.

Dentro de cada arquivo de rota você encontra:

- `title` / `subtitle` — título e subtítulo do topo (Hero).
- `pains` — lista de dores/problemas com ícone.
- `benefits` — lista de benefícios.
- `steps` — passo a passo do atendimento.
- `testimonials` — depoimentos: cada item tem `name`, `text` e nota em estrelas.
- `faq` — perguntas e respostas.
- `heroImage` — imagem de fundo do topo.
- Bloco `head()` — título e descrição que aparecem no Google e nas redes sociais.

Exemplo de depoimento:

```ts
{ name: "Maria S.", text: "Atendimento humano e rápido. Recomendo." }
```

Para trocar uma foto: coloque o arquivo em `src/assets/`, importe no topo (`import hero from "@/assets/minha-foto.jpg";`) e use na propriedade `heroImage`.

---

## Seção 4 — Ativar e personalizar as 5 LPs de reserva

Rotas de reserva já criadas (funcionam, mas não estão divulgadas no menu/rodapé):

- `/direito-bancario` → `src/routes/direito-bancario.tsx`
- `/trabalhista-executivo` → `src/routes/trabalhista-executivo.tsx`
- `/imobiliario` → `src/routes/imobiliario.tsx`
- `/previdenciario` → `src/routes/previdenciario.tsx`
- `/direito-digital` → `src/routes/direito-digital.tsx`

Passo a passo para ativar uma delas:

1. **Personalize o conteúdo** — abra o arquivo da rota e edite os mesmos campos descritos na Seção 3 (`title`, `pains`, `benefits`, `testimonials`, `faq`, `heroImage`).
2. **Ajuste o SEO** — no bloco `head()`, atualize título, descrição e o endereço canônico.
3. **Divulgue o link** — se quiser que apareça no site, adicione a rota na lista de links do rodapé em `src/routes/index.tsx` e/ou na lista `serviceLinks` de `src/routes/links.tsx`.
4. **Coloque no sitemap** — abra `public/sitemap.xml` e adicione um bloco:

```xml
<url>
  <loc>https://gilsoncarvalho.com/imobiliario</loc>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

5. Publique o site para as mudanças irem ao ar.

Para "desativar" uma LP, basta não divulgá-la e removê-la do sitemap.

---

## Seção 5 — Onde inserir os IDs do Google (Ads, GTM e GA4)

Todo o rastreamento passa por `src/lib/analytics.ts` e pelo cabeçalho em `src/routes/__root.tsx`.

### 5.1 Google Analytics 4 (ID `G-XXXXXXXXXX`)
O código do GA4 é lido de uma variável de ambiente. Se preferir fixar o ID no código, abra `src/lib/analytics.ts` e substitua:

```ts
const MEASUREMENT_ID = "G-XXXXXXXXXX";
```

### 5.2 Google Tag Manager (ID `GTM-XXXXXXX`)
Adicione o script do GTM na lista `scripts` do `head()` em `src/routes/__root.tsx`:

```ts
scripts: [
  jsonLdScript(),
  { src: "https://www.googletagmanager.com/gtm.js?id=GTM-XXXXXXX", async: true },
],
```

O site já cria a `window.dataLayer`, então o GTM lê os eventos automaticamente.

### 5.3 Google Ads (ID `AW-XXXXXXXXX`)
1. Adicione a tag global do Ads da mesma forma que o GTM acima (`https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX`).
2. Para marcar uma conversão, use o rótulo fornecido pelo Google Ads dentro de `src/lib/analytics.ts`, na função `trackLead`:

```ts
window.gtag?.("event", "conversion", {
  send_to: "AW-XXXXXXXXX/RotuloDaConversao",
});
```

### 5.4 Eventos já disparados pelo site
| Evento | Quando acontece |
| --- | --- |
| `click_whatsapp` | Qualquer clique em botão de WhatsApp |
| `generate_lead` | Envio do formulário de uma LP |
| `page_view_custom` | Visualização de página |
| `click_link_whatsapp`, `click_link_site_oficial`, `click_link_maps`, `click_link_instagram`, `click_link_email`, `click_link_share`, `click_link_especialidade` | Cliques na página /links |
| `click_404_whatsapp`, `click_404_home`, `click_404_lp` | Cliques na página de erro 404 |

Todos podem ser usados como conversão no GTM ou no Google Ads.
