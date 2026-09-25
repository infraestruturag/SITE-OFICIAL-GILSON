import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Users, FileText, Home, Shield, MapPin, Mail, Phone,
  Check, ChevronRight, Menu, X, Star, Instagram
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";

import logo from "@/assets/logo_gilson.png";
import { LOCAL_BUSINESS_JSONLD } from "@/lib/seo";
import { initAnalytics, trackLead, trackPageView, trackWhatsApp } from "@/lib/analytics";
import imgGilson from "@/assets/gilsonfoto1.png";
import imgGilson2 from "@/assets/fotogilson3.png";
import imgEscritorio from "@/assets/escritorio.png";
import bgBooks from "@/assets/bg-books.jpg";
import bgMarble from "@/assets/bg-marble.jpg";

const CANONICAL = "https://gilsoncarvalho.com/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gilson Carvalho — Advocacia | Direito de Família e Sucessões em Gurupi/TO" },
      { name: "description", content: "Ciência jurídica avançada e advocacia sob medida para proteger o seu patrimônio e seus direitos. OAB/TO 2.591 · OAB/RJ 256.131." },
      { property: "og:title", content: "Gilson Carvalho — Advocacia | Ciência Jurídica Avançada" },
      { property: "og:description", content: "Advocacia sob medida em Direito de Família e Sucessões. Atendimento sigiloso em todo o Brasil." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://gilsoncarvalho.com/og-gilson.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://gilsoncarvalho.com/og-gilson.jpg" },
      { property: "og:url", content: CANONICAL },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Gilson Carvalho — Advocacia",
          url: CANONICAL,
          inLanguage: "pt-BR",
          publisher: { ...LOCAL_BUSINESS_JSONLD, "@context": undefined },
        }),
      },
    ],
  }),
  component: Index,
});

const WHATSAPP = "5563984474070";
const waLink = (msg = "Olá Dr. Gilson, vim através do site e gostaria de falar sobre atendimento jurídico.") =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

const INSTAGRAM_URL = "https://instagram.com/gilsoncarvalho.adv";

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

// Magnetic hover anchor — moves slightly toward cursor
function MagneticLink({
  href, children, className, style, target, rel, onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.2}px)`;
  };
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`magnetic ${className ?? ""}`}
      style={style}
    >
      {children}
    </a>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ nome: "", telefone: "", email: "", area: "", mensagem: "" });
  const [waTipVisible, setWaTipVisible] = useState(false);
  const [waTipKey, setWaTipKey] = useState(0);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    initAnalytics();
    trackPageView("/", "Home — Gilson Carvalho Advocacia");
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setWaTipKey((k) => k + 1);
      setWaTipVisible(true);
      const t = setTimeout(() => setWaTipVisible(false), 3000);
      return () => clearTimeout(t);
    }, 8000);
    return () => clearInterval(id);
  }, []);

  // Scroll spy — highlight current section in nav
  useEffect(() => {
    const ids = ["inicio", "sobre", "areas", "depoimentos", "faq", "contato"];
    const onScroll = () => {
      let current = "inicio";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const maskPhone = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 2) return d.length ? `(${d}` : "";
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Olá, sou ${form.nome}.%0ATelefone: ${form.telefone}%0AE-mail: ${form.email}%0AÁrea de interesse: ${form.area}%0ANecessidade: ${form.mensagem}`;
    trackLead(form.area || "Home");
    trackWhatsApp("formulario_home");
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank", "noopener");
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navLinks = [
    { label: "Início", href: "#inicio" },
    { label: "Sobre Nós", href: "#sobre" },
    { label: "Áreas de Atuação", href: "#areas" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "FAQ", href: "#faq" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <div className="min-h-screen text-stone-100 relative" style={{ backgroundColor: "#333333" }}>
      <div className="noise-overlay" aria-hidden="true" />
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/5" style={{ backgroundColor: "rgba(29,29,29,0.85)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <a href="#inicio" className="flex items-center gap-3">
            <img src={logo} alt="Gilson Carvalho Advocacia" width={200} height={48} loading="eager" decoding="async" className="h-12 w-auto" />
          </a>
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map(l => {
              const isActive = activeSection === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className={`nav-link text-sm tracking-wider uppercase transition-colors ${isActive ? "active text-gold" : "text-stone-200 hover:text-gold"}`}
                >
                  {l.label}
                </a>
              );
            })}
          </nav>
          <MagneticLink href={waLink()} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp("cta")} className="hidden lg:inline-flex items-center gap-2 border text-gold px-5 py-2.5 text-xs tracking-[0.2em] uppercase hover:bg-gold hover:text-charcoal-deep" style={{ borderColor: "var(--gold)" }}>
            Falar com Advogado
          </MagneticLink>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-gold" aria-label="Abrir menu">
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden border-t border-white/10 px-6 py-6 space-y-4" style={{ backgroundColor: "#1d1d1d" }}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={(e) => handleNavClick(e, l.href)} className="block text-sm tracking-wider uppercase text-stone-200 hover:text-gold">
                {l.label}
              </a>
            ))}
            <a href={waLink()} target="_blank" rel="noopener noreferrer" onClick={() => { trackWhatsApp("cta"); setMenuOpen(false); }} className="inline-flex items-center gap-2 border border-gold text-gold px-5 py-2.5 text-xs tracking-[0.2em] uppercase">
              Falar com Advogado
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="inicio" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-fixed bg-center bg-cover" style={{ backgroundImage: `url(${bgBooks})` }} />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(20,20,20,0.85)" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/40" />
        {/* MOBILE PORTRAIT — absolute background behind text */}
        <motion.img
          src={imgGilson}
          alt=""
          aria-hidden="true"
          draggable={false}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="lg:hidden absolute inset-0 w-full h-full object-cover object-top scale-125 z-0 pointer-events-none select-none"
        />
        {/* Dark gradient veil to keep text readable on mobile */}
        <div className="lg:hidden absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-black/70 via-black/55 to-black/85" />

        {/* DESKTOP FULLSCREEN PORTRAIT */}
        <motion.img
          src={imgGilson}
          alt="Dr. Gilson Carvalho"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          aria-hidden="true"
          draggable={false}
          className="hidden lg:block hero-portrait-premium drop-shadow-[0_30px_50px_rgba(0,0,0,0.7)]"
        />


        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-24 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full">
          {/* LEFT COLUMN — TEXT + CTAs */}
          <div className="lg:col-span-7 order-2 lg:order-1 relative z-20">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-px bg-gold" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold">Advocacia de Excelência</span>
            </div>
            <h1 className="font-serif-luxe text-[2rem] sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl leading-[1.1] tracking-tight text-stone-50 text-balance break-words">
              <em className="text-gold-gradient not-italic">Ciência jurídica avançada</em> e advocacia sob medida para proteger o seu patrimônio e seus direitos.
            </h1>
            <div className="mt-8 md:mt-10 space-y-3">
              <p className="font-serif-luxe text-xl sm:text-2xl md:text-3xl text-stone-100 leading-snug">
                Dr. Gilson Carvalho
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] sm:text-xs tracking-[0.25em] uppercase">
                <span className="text-gold border border-gold/40 px-3 py-1">OAB/TO 2.591</span>
                <span className="text-gold border border-gold/40 px-3 py-1">OAB/RJ 256.131</span>
              </div>
              <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-stone-400 pt-1">
                Professor Universitário · Mestre & Especialista
              </p>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <MagneticLink
                href={waLink()}
                
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsApp("cta")}
                className="inline-flex items-center justify-center gap-3 text-charcoal-deep font-semibold px-7 py-4 text-xs tracking-[0.25em] uppercase hover:shadow-2xl hover:shadow-amber-900/40"
                style={{ backgroundColor: "#bfa15f" }}
              >
                Entrar em Contato
                <ChevronRight size={16} />
              </MagneticLink>
              <MagneticLink
                href="#areas"
                onClick={(e) => handleNavClick(e, "#areas")}
                className="inline-flex items-center justify-center gap-3 border text-gold font-medium px-7 py-4 text-xs tracking-[0.25em] uppercase hover:bg-gold hover:text-charcoal-deep"
                style={{ borderColor: "#bfa15f" }}
              >
                Nossas Soluções
              </MagneticLink>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-[11px] tracking-[0.2em] uppercase text-stone-300">Atendimento Presencial e Digital · Todo o Brasil</span>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="relative overflow-hidden border-y border-gold/20" style={{ backgroundColor: "#000000" }}>
        <div className="marquee-track py-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center shrink-0 pr-8">
              {[
                "Planejamento Sucessório", "Divórcio e Partilha", "Guarda e Pensão",
                "Defesa de Direitos", "Advocacia de Excelência", "Pareceres Jurídicos",
                "Atendimento Nacional", "Tradição e Resultados",
              ].map((t) => (
                <span key={t + i} className="flex items-center gap-8 pr-8">
                  <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-stone-100">{t}</span>
                  <span className="text-gold">•</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>


      {/* TRADIÇÃO ÉTICA RESULTADO */}
      <section id="sobre" className="relative py-28 lg:py-36" style={{ backgroundColor: "#2b2b2b" }}>
        <div className="absolute inset-0 opacity-[0.04] bg-cover bg-center" style={{ backgroundImage: `url(${bgMarble})` }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-px bg-gold" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold">Nossa Essência</span>
              <div className="w-16 h-px bg-gold" />
            </div>
            <h2 className="font-serif-luxe text-5xl md:text-6xl text-stone-50">Tradição, Ética e Resultado</h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <div className="relative mx-auto lg:mx-0 max-w-[450px]">
                <div className="absolute -inset-2 border border-gold/40" />
                <div className="p-[1px]" style={{ borderColor: "#C8A84B", border: "1px solid #C8A84B" }}>
                  <img
                    src={imgGilson2}
                    alt="Dr. Gilson Carvalho — Advogado"
                    width={450}
                    height={563}
                    loading="lazy"
                    decoding="async"
                    className="w-full max-w-[450px] h-auto object-cover rounded-lg mx-auto lg:mx-0 shadow-2xl shadow-black/60"
                    style={{ aspectRatio: "4/5" }}
                  />
                </div>
              </div>
            </motion.div>
            <div className="lg:col-span-7">
              <span className="inline-block text-[10px] tracking-[0.35em] uppercase text-gold border border-gold/40 px-4 py-2 mb-6">O Advogado</span>
              <h3 className="font-serif-luxe text-4xl md:text-5xl text-stone-50 leading-tight mb-8">
                Conheça quem atua em prol dos seus direitos.
              </h3>
              <p className="text-stone-300 leading-relaxed text-[15px] md:text-base">
                Advogado desde 2004, com sólida atuação nos estados do Tocantins e Rio de Janeiro.
                Professor universitário há mais de 15 anos, une a excelência acadêmica à prática jurídica
                estratégica. Possui Mestrado em Direito (Processo, Justiça e Direitos Humanos) pela UCP-RJ
                e tripla especialização: Direito Civil e Processual Civil (PUC/GO), Advocacia Estratégica
                em Família e Sucessões, e MBA em Gestão na Advocacia pelo IPOG. Uma trajetória marcada pela
                ética, transparência e proteção incansável dos direitos de seus clientes.
              </p>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-gold/20 pt-8">
                {[
                  ["20+", "Anos de Atuação"],
                  ["2", "Estados (TO · RJ)"],
                  ["MBA", "Gestão na Advocacia"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <div className="font-serif-luxe text-4xl text-gold">{n}</div>
                    <div className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mt-2">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O ESCRITÓRIO */}
      <section className="relative py-28 lg:py-36" style={{ backgroundColor: "#262626" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <span className="inline-block text-[10px] tracking-[0.35em] uppercase text-gold border border-gold/40 px-4 py-2 mb-6">O Escritório</span>
              <h3 className="font-serif-luxe text-4xl md:text-5xl text-stone-50 leading-tight mb-8">
                Gilson Carvalho <span className="text-gold">—</span> Advocacia
              </h3>
              <p className="text-stone-300 leading-relaxed text-[15px] md:text-base">
                Com mais de duas décadas de atuação estratégica, o escritório Gilson Carvalho Advocacia é referência em inteligência jurídica e proteção patrimonial. Nosso ecossistema jurídico entrega soluções sofisticadas nas áreas de Direito Civil, Família, Sucessões, Imobiliário e Fundiário. Pautados pelo rigor técnico, sigilo absoluto e por uma sólida formação acadêmica de excelência, nosso compromisso é garantir a segurança jurídica do seu legado e a inviolabilidade dos seus direitos.
              </p>
              <ul className="mt-10 space-y-4">
                {["Seriedade e compromisso com prazos", "Atendimento humanizado e estratégico"].map(it => (
                  <li key={it} className="flex items-center gap-4">
                    <span className="flex items-center justify-center w-8 h-8 border border-gold/50">
                      <Check size={14} className="text-gold" />
                    </span>
                    <span className="text-stone-200">{it}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-32 h-32 border border-gold/60 hidden md:block" />
                <img src={imgEscritorio} alt="Escritório Gilson Carvalho" width={1200} height={800} loading="lazy" decoding="async" className="relative w-full h-auto shadow-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ESPECIALIDADES */}
      <section id="areas" className="relative py-28 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${bgBooks})` }} />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(20,20,20,0.88)" }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-px bg-gold" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold">Áreas de Atuação</span>
              <div className="w-16 h-px bg-gold" />
            </div>
            <h2 className="font-serif-luxe text-5xl md:text-6xl text-stone-50 mb-6">Especialidades Jurídicas</h2>
            <p className="text-stone-300 text-base md:text-lg leading-relaxed">
              Atuação técnica e personalizada em cada demanda, com profundo conhecimento e dedicação total ao seu caso.
            </p>
          </div>
 
          <motion.div {...reveal} className="grid sm:grid-cols-2 gap-6">
            {[
              {
                Icon: Users,
                title: "Direito de Família e Sucessões",
                desc: "Demandas familiares, divórcios, inventários e partilhas de bens de forma humanizada e estratégica.",
                items: ["Divórcio consensual e litigioso", "Guarda, pensão e regulamentação de visitas", "Inventário, partilha e testamento", "Planejamento sucessório e holding familiar"],
              },
              {
                Icon: FileText,
                title: "Direito Civil & Contratos",
                desc: "Regulação de relações jurídicas gerais, elaboração, análise e revisão de contratos complexos e obrigações.",
                items: ["Elaboração e revisão contratual", "Responsabilidade civil e indenizações", "Cobranças e execuções", "Pareceres jurídicos especializados"],
              },
              {
                Icon: Home,
                title: "Direito Imobiliário",
                desc: "Segurança jurídica em transações, contratos de compra e venda, posses e regularização de imóveis.",
                items: ["Compra, venda e permuta de imóveis", "Usucapião e regularização fundiária", "Locações residenciais e comerciais", "Due diligence imobiliária"],
              },
              {
                Icon: Shield,
                title: "Direito Penal / Criminal",
                desc: "Defesa técnica especializada e acompanhamento detalhado em demandas de complexidade criminal.",
                items: ["Defesa em inquéritos e ações penais", "Acompanhamento em audiências", "Habeas corpus e medidas urgentes", "Recursos e tribunais superiores"],
              },
            ].map(({ Icon, title, desc, items }, idx) => (
              <Accordion key={title} type="single" collapsible>
                <AccordionItem
                  value={`area-${idx}`}
                  className="glass-card relative p-2 rounded-none border-0"
                >
                  <div className="absolute top-0 left-0 w-8 h-px bg-gold" />
                  <div className="absolute top-0 left-0 w-px h-8 bg-gold" />
                  <AccordionTrigger className="hover:no-underline px-6 py-6 [&[data-state=open]>svg]:text-gold">
                    <div className="flex items-start gap-5 text-left">
                      <Icon size={32} className="text-gold shrink-0 mt-1" strokeWidth={1.2} />
                      <div>
                        <h4 className="font-serif-luxe text-2xl text-stone-50 leading-tight mb-2">{title}</h4>
                        <p className="text-sm text-stone-400 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <ul className="space-y-3 border-t border-gold/20 pt-5">
                      {items.map((it) => (
                        <li key={it} className="flex items-start gap-3 text-stone-200 text-[15px]">
                          <Check size={16} className="text-gold mt-1 shrink-0" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </motion.div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section id="depoimentos" className="relative py-28 lg:py-36" style={{ backgroundColor: "#262626" }}>
        <div className="absolute inset-0 opacity-[0.04] bg-cover bg-center" style={{ backgroundImage: `url(${bgMarble})` }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-px bg-gold" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold">Prova Social</span>
              <div className="w-16 h-px bg-gold" />
            </div>
            <h2 className="font-serif-luxe text-4xl md:text-5xl text-stone-50 mb-4">O que dizem nossos clientes</h2>
            <p className="text-stone-300 text-base leading-relaxed">A confiança de quem busca soluções jurídicas sérias e personalizadas.</p>
          </div>
          <motion.div {...reveal} className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Mariana A.", role: "Cliente — Família", text: "Conduziu meu processo de divórcio com sensibilidade e total domínio técnico. Resultado acima das expectativas." },
              { name: "Rafael S.", role: "Cliente — Sucessões", text: "Planejamento sucessório impecável. Dr. Gilson explicou cada etapa com clareza e segurança jurídica." },
              { name: "Juliana M.", role: "Cliente — Civil", text: "Atendimento humano e estratégico. Recomendo a qualquer pessoa que busque excelência na advocacia." },
            ].map((d) => (
              <div key={d.name} className="card-hover-gold relative p-8 border border-gold/20" style={{ backgroundColor: "rgba(30,30,30,0.6)" }}>
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className="text-gold fill-gold" strokeWidth={1} />
                  ))}
                </div>
                <p className="text-stone-200 leading-relaxed italic mb-8">"{d.text}"</p>
                <div className="border-t border-gold/20 pt-5">
                  <div className="font-serif-luxe text-xl text-stone-50">{d.name}</div>
                  <div className="text-[10px] tracking-[0.25em] uppercase text-gold mt-1">{d.role}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-28 lg:py-36 overflow-hidden" style={{ backgroundColor: "#2b2b2b" }}>
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${bgBooks})` }} />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(20,20,20,0.85)" }} />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-px bg-gold" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold">Perguntas Frequentes</span>
              <div className="w-16 h-px bg-gold" />
            </div>
            <h2 className="font-serif-luxe text-4xl md:text-5xl text-stone-50">Tire suas principais dúvidas</h2>
          </div>
          <motion.div {...reveal}>
          <Accordion type="single" collapsible className="space-y-3">
            {[
              { q: "Como é feita a primeira consulta?", a: "A consulta inicial é realizada de forma presencial em nosso escritório ou por videoconferência. Analisamos o seu caso com profundidade, esclarecemos dúvidas e apresentamos as melhores estratégias jurídicas aplicáveis." },
              { q: "O escritório atende clientes em todo o Brasil?", a: "Sim. Com inscrições na OAB/TO e OAB/RJ, atuamos em demandas de todo o território nacional, com atendimento digital seguro e suporte presencial sempre que necessário." },
              { q: "Quais são as formas de pagamento dos honorários?", a: "Trabalhamos com honorários transparentes, definidos em contrato. Aceitamos pagamento via Pix, transferência bancária e cartão de crédito, podendo ser parcelados conforme a complexidade do caso." },
              { q: "Quanto tempo leva um processo judicial?", a: "O prazo varia conforme a natureza da demanda e da Justiça competente. Em cada etapa, mantemos o cliente integralmente informado e buscamos sempre as soluções mais ágeis e estratégicas." },
            ].map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-gold/20 px-6 rounded-none"
                style={{ backgroundColor: "rgba(30,30,30,0.6)" }}
              >
                <AccordionTrigger className="text-stone-50 font-serif-luxe text-lg md:text-xl hover:no-underline py-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-stone-300 leading-relaxed text-[15px] pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CONTATO */}

      <section id="contato" className="relative py-28 lg:py-36" style={{ backgroundColor: "#2b2b2b" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16">
          <div>
            <span className="inline-block text-[10px] tracking-[0.35em] uppercase text-gold border border-gold/40 px-4 py-2 mb-6">Contato</span>
            <h2 className="font-serif-luxe text-4xl md:text-5xl text-stone-50 leading-tight mb-6">
              Vamos conversar sobre o <em className="text-gold-gradient not-italic">seu caso.</em>
            </h2>
            <p className="text-stone-300 leading-relaxed mb-12 max-w-lg">
              Preencha o formulário ao lado ou utilize um de nossos canais diretos. Retornaremos com a discrição e a atenção que o seu caso merece.
            </p>
            <div className="space-y-6">
              {[
                { Icon: MapPin, label: "Matriz · Gurupi/TO", value: "Av. Guanabara, nº 1669, Centro — Gurupi, Tocantins", href: "https://maps.google.com/?q=Av.+Guanabara,+1669,+Centro+-+Gurupi,+TO" },
                { Icon: MapPin, label: "Filial · Rio de Janeiro/RJ", value: "Av. Rio Branco, 131 - 17º andar - Centro, Rio de Janeiro - RJ, 20040-006 - Sala 1703", href: "https://maps.app.goo.gl/aHr8H2udhfHtgt7r5" },
                { Icon: Mail, label: "E-mail", value: "profgilsonfilho@gmail.com", href: "mailto:profgilsonfilho@gmail.com" },
                { Icon: Phone, label: "WhatsApp", value: "+55 (63) 98447-4070", href: waLink() },
              ].map(({ Icon, label, value, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" onClick={() => { if (label === "WhatsApp") trackWhatsApp("contato"); }} className="flex items-start gap-5 border-b border-white/5 pb-6 hover:opacity-80 transition-opacity">
                  <div className="flex items-center justify-center w-12 h-12 border border-gold/40 shrink-0">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-1">{label}</div>
                    <div className="text-stone-100">{value}</div>
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-10 flex items-center gap-4">
              <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400">Siga-nos</span>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Gilson Carvalho Advocacia"
                className="group flex items-center justify-center w-11 h-11 border border-gold/40 hover:border-gold transition-colors"
              >
                <Instagram size={18} className="text-stone-300 group-hover:text-gold transition-colors" />
              </a>
            </div>
          </div>

          <div className="p-8 md:p-10 border border-gold/20" style={{ backgroundColor: "#1f1f1f" }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { id: "nome", label: "Nome Completo", type: "text", placeholder: "Seu nome completo" },
                { id: "telefone", label: "Telefone / WhatsApp", type: "tel", placeholder: "(63) 99999-9999" },
                { id: "email", label: "E-mail", type: "email", placeholder: "seu@email.com" },
              ].map(f => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="block text-[10px] tracking-[0.3em] uppercase text-gold mb-3">{f.label}</label>
                  <input
                    id={f.id}
                    type={f.type}
                    required
                    maxLength={f.id === "telefone" ? 15 : 150}
                    placeholder={f.placeholder}
                    inputMode={f.id === "telefone" ? "numeric" : undefined}
                    value={form[f.id as keyof typeof form]}
                    onChange={e => {
                      const v = f.id === "telefone" ? maskPhone(e.target.value) : e.target.value;
                      setForm({ ...form, [f.id]: v });
                    }}
                    className="w-full bg-transparent border-b border-white/20 focus:border-gold py-3 text-stone-100 placeholder:text-stone-600 outline-none transition-colors"
                  />
                </div>
              ))}
              <div>
                <label htmlFor="area" className="block text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Área de Interesse</label>
                <select
                  id="area"
                  required
                  value={form.area}
                  onChange={e => setForm({ ...form, area: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 focus:border-gold py-3 text-stone-100 outline-none"
                  style={{ backgroundColor: "#1f1f1f" }}
                >
                  <option value="">Selecione uma área...</option>
                  <option>Direito de Família e Sucessões</option>
                  <option>Direito Civil & Contratos</option>
                  <option>Direito Imobiliário</option>
                  <option>Direito Penal / Criminal</option>
                  <option>Outro</option>
                </select>
              </div>
              <div>
                <label htmlFor="mensagem" className="block text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Relate brevemente a sua necessidade</label>
                <textarea
                  id="mensagem"
                  required
                  rows={4}
                  maxLength={1000}
                  placeholder="Ex: Gostaria de entender sobre planejamento sucessório / holding familiar..."
                  value={form.mensagem}
                  onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                  className="w-full bg-transparent border border-white/15 focus:border-gold p-3 text-stone-100 placeholder:text-stone-600 outline-none transition-colors resize-none"
                />
              </div>
              <button type="submit" className="w-full gold-gradient text-charcoal-deep font-medium py-4 text-sm tracking-[0.25em] uppercase hover:shadow-2xl hover:shadow-amber-900/40 transition-all mt-4">
                Enviar Mensagem
              </button>
              <p className="text-[11px] text-stone-400 text-center leading-relaxed pt-1">
                🔒 Seus dados estão protegidos sob absoluto sigilo profissional e em estrita conformidade com a LGPD.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* LOCALIZAÇÃO — MAPA */}
      <section id="localizacao" className="relative py-24 lg:py-28 overflow-hidden" style={{ backgroundColor: "#1f1f1f" }}>
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${imgEscritorio})` }} />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.85)" }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-px bg-gold" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold">Onde Estamos</span>
              <div className="w-16 h-px bg-gold" />
            </div>
            <h2 className="font-serif-luxe text-4xl md:text-5xl text-stone-50 mb-3">Nossos Escritórios</h2>
            <p className="text-stone-400 text-sm md:text-base mb-8">Atuação em Tocantins e Rio de Janeiro</p>
            <div className="grid md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
              <a href="https://maps.google.com/?q=Av.+Guanabara,+1669,+Centro+-+Gurupi,+TO" target="_blank" rel="noopener noreferrer" className="card-hover-gold block p-6 border border-gold/25" style={{ backgroundColor: "rgba(30,30,30,0.7)" }}>
                <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">Matriz</div>
                <div className="font-serif-luxe text-xl text-stone-50 mb-2">Gurupi — Tocantins</div>
                <p className="text-stone-300 text-sm">Av. Guanabara, nº 1669, Centro — Gurupi/TO</p>
                <span className="inline-flex items-center gap-2 mt-3 text-[11px] tracking-[0.2em] uppercase text-gold"><MapPin size={13} /> Ver no mapa</span>
              </a>
              <a href="https://maps.app.goo.gl/aHr8H2udhfHtgt7r5" target="_blank" rel="noopener noreferrer" className="card-hover-gold block p-6 border border-gold/25" style={{ backgroundColor: "rgba(30,30,30,0.7)" }}>
                <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">Filial</div>
                <div className="font-serif-luxe text-xl text-stone-50 mb-2">Rio de Janeiro — RJ</div>
                <p className="text-stone-300 text-sm">Av. Rio Branco, 131 - 17º andar - Centro, Rio de Janeiro - RJ, 20040-006 - Sala 1703</p>
                <span className="inline-flex items-center gap-2 mt-3 text-[11px] tracking-[0.2em] uppercase text-gold"><MapPin size={13} /> Ver no mapa</span>
              </a>
            </div>
          </div>
          <motion.div {...reveal} className="relative border border-gold/30 p-2 shadow-2xl shadow-black/60">
            <iframe
              title="Localização do escritório Gilson Carvalho Advocacia"
              src="https://maps.google.com/maps?q=Avenida%20Guanabara,%201669,%20Centro,%20Gurupi,%20Tocantins&t=&z=15&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[350px] md:h-[420px] rounded-2xl shadow-2xl shadow-black/60"
              style={{ border: 0 }}
            />
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative pt-20 pb-8 border-t border-gold/20" style={{ backgroundColor: "#1a1a1a" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <img src={logo} alt="Gilson Carvalho" width={260} height={64} loading="lazy" decoding="async" className="h-16 w-auto object-contain mb-6" />
              <p className="text-sm text-stone-400 leading-relaxed max-w-xs mb-6">
                Advocacia Estratégica e Especializada · Atendimento sigiloso.
              </p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Gilson Carvalho Advocacia"
                className="inline-flex items-center gap-3 group"
              >
                <span className="flex items-center justify-center w-10 h-10 border border-gold/40 group-hover:border-gold transition-colors">
                  <Instagram size={16} className="text-stone-300 group-hover:text-gold transition-colors" />
                </span>
                <span className="text-[11px] tracking-[0.25em] uppercase text-stone-400 group-hover:text-gold transition-colors">@gilsoncarvalho.adv</span>
              </a>
            </div>
            <div>
              <h5 className="text-[10px] tracking-[0.3em] uppercase text-gold mb-6">Navegação</h5>
              <ul className="space-y-3">
                {navLinks.map(l => (
                  <li key={l.href}><a href={l.href} onClick={(e) => handleNavClick(e, l.href)} className="text-stone-300 hover:text-gold text-sm transition-colors">{l.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] tracking-[0.3em] uppercase text-gold mb-6">Contato</h5>
              <ul className="space-y-3 text-sm text-stone-300">
                <li><a href="https://maps.google.com/?q=Av.+Guanabara,+1669,+Centro+-+Gurupi,+TO" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors"><span className="block text-[10px] tracking-[0.3em] uppercase text-gold">Matriz · Gurupi/TO</span>Av. Guanabara, 1669 — Gurupi/TO</a></li>
                <li><a href="https://maps.app.goo.gl/aHr8H2udhfHtgt7r5" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors"><span className="block text-[10px] tracking-[0.3em] uppercase text-gold">Filial · Rio de Janeiro/RJ</span>Av. Rio Branco, 131 - 17º andar - Centro, Rio de Janeiro - RJ, 20040-006 - Sala 1703</a></li>
                <li><a href="mailto:profgilsonfilho@gmail.com" className="hover:text-gold transition-colors">profgilsonfilho@gmail.com</a></li>
                <li><a href={waLink()} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp("rodape")} className="hover:text-gold transition-colors">+55 (63) 98447-4070</a></li>
                <li className="pt-3 text-stone-400">
                  <span className="block text-[10px] tracking-[0.3em] uppercase text-gold mb-1">Horário de Atendimento</span>
                  Segunda a Sexta · 09:00 às 18:00
                </li>
                <li className="pt-3 border-t border-white/5 mt-4 flex flex-wrap gap-2">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-gold border border-gold/40 px-2 py-1">OAB/TO 2.591</span>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-gold border border-gold/40 px-2 py-1">OAB/RJ 256.131</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-stone-500">© 2026 Gilson Carvalho — Advocacia. Todos os direitos reservados.</p>
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold">Excelência • Ética • Resultado</p>
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <div className="fixed right-4 sm:right-6 bottom-24 sm:bottom-6 z-40 flex flex-col items-end gap-2">
        {waTipVisible && (
          <div
            key={waTipKey}
            className="wa-tooltip relative mr-1 px-4 py-2 border border-gold/40 text-[11px] tracking-[0.2em] uppercase text-stone-100 shadow-2xl"
            style={{ backgroundColor: "#1a1a1a" }}
          >
            <span className="text-gold">Agendar Consulta · Linha Direta</span>
            <span className="absolute -bottom-1 right-6 w-2 h-2 rotate-45 border-r border-b border-gold/40" style={{ backgroundColor: "#1a1a1a" }} />
          </div>
        )}
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsApp("float")}
          aria-label="Falar no WhatsApp"
          className="wa-ping wa-pulse-cta relative flex items-center justify-center w-16 h-16 rounded-full shadow-2xl shadow-green-900/50 hover:scale-110 transition-transform"
          style={{ backgroundColor: "#25D366" }}
        >
          <FaWhatsapp className="w-9 h-9 text-white" />
        </a>
      </div>
    </div>
  );
}
