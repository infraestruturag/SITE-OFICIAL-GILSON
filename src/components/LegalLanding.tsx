import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, ShieldAlert, Scale, FileText, Gavel, Lock, MapPin, Phone, Mail, PlayCircle, X, Maximize2, ExternalLink, type LucideIcon } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/logo_gilson.png";
import imgGilsonAuthority from "@/assets/fotogilson3.png";
import { Button } from "@/components/ui/button";
import { initAnalytics, trackEvent, trackPageView, trackWhatsApp } from "@/lib/analytics";

const WHATSAPP = "5563984474070";
const INSTAGRAM_URL = "https://instagram.com/gilsoncarvalho.adv";
const VIDEO_POSTER_URL =
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=85";
const EMAIL = "profgilsonfilho@gmail.com";
const MAPS_URL = "https://maps.google.com/?q=Av.+Guanabara,+1669,+Centro+-+Gurupi,+TO";
const MAPS_URL_RJ = "https://maps.app.goo.gl/aHr8H2udhfHtgt7r5";
const MAPS_EMBED = "https://www.google.com/maps?q=Av.%20Guanabara%2C%201669%2C%20Centro%20-%20Gurupi%2C%20TO&output=embed";



export const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

const PAIN_ICONS = [ShieldAlert, Scale, FileText, Gavel, Lock];
const FAMILY_SUCCESSION_ROUTES = new Set(["/divorcio", "/pensao-e-guarda", "/uniao-estavel", "/inventario"]);
const FAMILY_AUTHORITY_TEXT =
  "Mestremestr em Direito, Especialista em Direito Civil, de Família e Sucessões, e com MBA em Gestão na Advocacia, o Dr. Gilson Carvalho soma mais de 20 anos de experiência. Atua com excelência estratégica para proteger o patrimônio e garantir a segurança jurídica em momentos de transição familiar, sempre com sigilo absoluto.";
const PROPERTY_AUTHORITY_TEXT =
  "Mestremestre em Direito, Especialista em Direito Civil e com MBA em Gestão na Advocacia, o Dr. Gilson Carvalho soma mais de 20 anos de experiência. Atua com rigor técnico e excelência estratégica na defesa da propriedade, garantindo a regularização e a proteção rigorosa do seu patrimônio imobiliário e fundiário.";

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

/** Renderiza um comentário HTML real no DOM, sem ocupar espaço no layout. */
function HtmlComment({ text }: { text: string }) {
  return <span style={{ display: "none" }} dangerouslySetInnerHTML={{ __html: `<!-- ${text} -->` }} />;
}

export type LandingProps = {
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  painsImage?: string;
  solutionsImage?: string;
  authorityImage?: string;
  finalImage?: string;
  authorityText?: string;
  authorityTitle?: string;
  footerSubtitle?: string;
  /** Nome do arquivo em /public, ex.: "divorcio.mp4" */
  videoFile?: string;
  /** Rota usada nos comentários HTML dos links do Instagram, ex.: "/divorcio" */
  routePath?: string;
  instagramLinks?: string[];
  pains: { title: string; desc: string }[];
  solutions: { title: string; desc: string; icon?: LucideIcon }[];
  ctaText: string;
  whatsappMessage: string;
};

export default function LegalLanding(p: LandingProps) {
  const [waTipVisible, setWaTipVisible] = useState(false);
  const [waTipKey, setWaTipKey] = useState(0);
  const [selectedPoster, setSelectedPoster] = useState<number | null>(null);
  const closePosterRef = useRef<HTMLButtonElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  const galleryPrefix = p.routePath?.replace(/^\//, "") ?? "divorcio";
  const galleryImages = Array.from({ length: 6 }, (_, index) => `/${galleryPrefix}${index + 1}.png`);
  const isPensaoEGuarda = p.routePath === "/pensao-e-guarda";
  const authorityText = FAMILY_SUCCESSION_ROUTES.has(p.routePath ?? "")
    ? FAMILY_AUTHORITY_TEXT
    : PROPERTY_AUTHORITY_TEXT;
  const videoInstagramUrl =
    isPensaoEGuarda ? p.instagramLinks?.[0] ?? INSTAGRAM_URL : INSTAGRAM_URL;

  useEffect(() => {
    initAnalytics();
    trackPageView(typeof window !== "undefined" ? window.location.pathname : p.eyebrow, p.eyebrow);
  }, [p.eyebrow]);

  useEffect(() => {
    const id = setInterval(() => {
      setWaTipKey((k) => k + 1);
      setWaTipVisible(true);
      const t = setTimeout(() => setWaTipVisible(false), 3000);
      return () => clearTimeout(t);
    }, 8000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (selectedPoster === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closePosterRef.current?.focus();
    const handleModalKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedPoster(null);
      if (event.key === "ArrowLeft") showPoster(selectedPoster - 1);
      if (event.key === "ArrowRight") showPoster(selectedPoster + 1);
    };
    window.addEventListener("keydown", handleModalKeys);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleModalKeys);
    };
  }, [selectedPoster]);

  function showPoster(index: number) {
    const normalizedIndex = (index + galleryImages.length) % galleryImages.length;
    setSelectedPoster(normalizedIndex);
    trackEvent("view_cartaz_modal", {
      rota: p.routePath ?? "",
      cartaz: normalizedIndex + 1,
      arquivo: `${galleryPrefix}${normalizedIndex + 1}.png`,
    });
  }

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (selectedPoster === null || touchStartXRef.current === null) return;
    const distance = touchStartXRef.current - event.changedTouches[0].clientX;
    touchStartXRef.current = null;
    if (Math.abs(distance) < 50) return;
    showPoster(selectedPoster + (distance > 0 ? 1 : -1));
  };





  const painsBg = p.painsImage ?? p.heroImage;
  const solutionsBg = p.solutionsImage ?? p.heroImage;
  const finalBg = p.finalImage ?? p.heroImage;

  return (
    <div className="min-h-screen text-stone-100 relative" style={{ backgroundColor: "#333333" }}>
      <div className="noise-overlay" aria-hidden="true" />

      {/* HEADER — Logo + WhatsApp apenas */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/5" style={{ backgroundColor: "rgba(29,29,29,0.85)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <a href="#topo" className="flex items-center gap-3">
            <img src={logo} alt="Gilson Carvalho Advocacia" width={200} height={48} className="h-12 w-auto" loading="eager" decoding="async" />
          </a>
          <a
            href={waLink(p.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsApp("cta")}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs tracking-[0.2em] uppercase font-semibold shadow-lg shadow-green-900/30 hover:scale-[1.03] transition-transform"
            style={{ backgroundColor: "#25D366", color: "#0d2418" }}
          >
            <FaWhatsapp className="w-4 h-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="topo" className="relative min-h-[88vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-fixed bg-center bg-cover" style={{ backgroundImage: `url(${p.heroImage})` }} />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(15,15,15,0.8)" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10 py-24 text-center">
          <div className="inline-flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-px bg-gold" />
            <span className="text-xs tracking-[0.3em] uppercase text-gold">{p.eyebrow}</span>
            <div className="w-12 h-px bg-gold" />
          </div>
          <motion.h1 {...reveal} className="font-serif-luxe text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-stone-50 text-balance">
            <em className="text-gold-gradient not-italic">{p.heroTitle}</em>
          </motion.h1>
          <motion.p {...reveal} transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }} className="mt-8 text-stone-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            {p.heroSubtitle}
          </motion.p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#triagem" className="cta-pulse-gold inline-flex items-center justify-center gap-3 text-charcoal-deep font-semibold px-7 py-4 text-xs tracking-[0.25em] uppercase hover:shadow-2xl hover:shadow-amber-900/40 transition-all" style={{ backgroundColor: "#bfa15f" }}>
              <FaWhatsapp className="w-4 h-4" /> {p.ctaText}
            </a>
            <a href={waLink(p.whatsappMessage)} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp("cta")} className="cta-pulse-gold inline-flex items-center justify-center gap-2 border text-gold font-medium px-7 py-4 text-xs tracking-[0.25em] uppercase hover:bg-gold hover:text-charcoal-deep transition-colors" style={{ borderColor: "#bfa15f" }}>
              Falar Agora
            </a>

          </div>
        </div>
      </section>

      {/* PAINS */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${painsBg})` }} />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(15,15,15,0.8)" }} />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-gold" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold">Você reconhece?</span>
              <div className="w-12 h-px bg-gold" />
            </div>
            <h2 className="font-serif-luxe text-4xl md:text-5xl text-stone-50">Desafios que enfrentamos juntos</h2>
          </div>
          <motion.div {...reveal} className="grid md:grid-cols-3 gap-6">
            {p.pains.map((it, i) => {
              const PainIcon = PAIN_ICONS[i % PAIN_ICONS.length];
              return (
                <div key={it.title} className="relative p-8 border border-gold/20" style={{ backgroundColor: "rgba(30,30,30,0.7)" }}>
                  <PainIcon size={28} className="text-gold mb-5" strokeWidth={1.3} />
                  <h4 className="font-serif-luxe text-xl text-stone-50 mb-3">{it.title}</h4>
                  <p className="text-stone-300 text-sm leading-relaxed">{it.desc}</p>
                </div>
              );
            })}
          </motion.div>

        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${solutionsBg})` }} />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(15,15,15,0.8)" }} />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-gold" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold">Como podemos ajudar</span>
              <div className="w-12 h-px bg-gold" />
            </div>
            <h2 className="font-serif-luxe text-4xl md:text-5xl text-stone-50">Soluções jurídicas estratégicas</h2>
          </div>
          <motion.div {...reveal} className="grid md:grid-cols-2 gap-6">
            {p.solutions.map((it) => {
              const SolutionIcon = it.icon ?? Scale;
              return (
              <div key={it.title} className="card-hover-gold relative p-8 border border-gold/20" style={{ backgroundColor: "rgba(30,30,30,0.7)" }}>
                <div className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-10 h-10 border border-gold/50 shrink-0">
                    <SolutionIcon size={18} className="text-gold" strokeWidth={1.4} />
                  </span>
                  <div>
                    <h4 className="font-serif-luxe text-xl text-stone-50 mb-2">{it.title}</h4>
                    <p className="text-stone-300 text-sm leading-relaxed">{it.desc}</p>
                  </div>
                </div>
              </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* AUTHORITY */}
      <section className="relative py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: "#242424" }}>
        <div className="absolute inset-0 opacity-[0.05] bg-cover bg-center" style={{ backgroundImage: `url(${p.authorityImage ?? p.heroImage})` }} />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(15,15,15,0.8)" }} />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-gold" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold">Autoridade Jurídica</span>
              <div className="w-12 h-px bg-gold" />
            </div>
            <h2 className="font-serif-luxe text-4xl md:text-5xl text-stone-50">
              {p.authorityTitle ?? "Quem vai defender os direitos da sua família?"}
            </h2>
          </div>
          <motion.div {...reveal} className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative mx-auto max-w-[460px]">
              <div className="absolute -inset-2 border border-gold/40" />
              <div style={{ border: "1px solid #C8A84B" }} className="p-[2px]">
                <img
                  src={imgGilsonAuthority}
                  alt="Dr. Gilson Carvalho — Advogado especialista em Direito de Família e Sucessões"
                  width={450}
                  height={563}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover shadow-2xl shadow-black/60"
                  style={{ aspectRatio: "4/5" }}
                />
              </div>
            </div>
            <div>
              <span className="inline-block text-[10px] tracking-[0.35em] uppercase text-gold border border-gold/40 px-4 py-2 mb-6">Dr. Gilson Carvalho</span>
              <p className="text-stone-200 text-lg leading-relaxed mb-6">
                {authorityText}
              </p>
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="text-[10px] tracking-[0.25em] uppercase text-gold border border-gold/40 px-3 py-1.5">OAB/TO 2.591</span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-gold border border-gold/40 px-3 py-1.5">OAB/RJ 256.131</span>
              </div>
              <ul className="space-y-3">
                {["20+ anos de atuação estratégica", "MestreMestre em Direito · MBA em Gestão", "Atendimento sigiloso em todo o Brasil"].map((it) => (
                  <li key={it} className="flex items-center gap-3 text-stone-200">
                    <Check size={16} className="text-gold shrink-0" /> {it}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONHEÇA O ESCRITÓRIO — INSTAGRAM */}
      <section className="relative py-24 lg:py-28 overflow-hidden" style={{ backgroundColor: "#1f1f1f" }}>
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${solutionsBg})` }} />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(15,15,15,0.8)" }} />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-gold" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold">Conheça o Escritório</span>
              <div className="w-12 h-px bg-gold" />
            </div>
            <h2 className="font-serif-luxe text-3xl md:text-4xl lg:text-5xl text-stone-50 text-balance">
              Bastidores de quem <em className="text-gold-gradient not-italic">defende o seu caso</em>
            </h2>
            <p className="mt-5 text-stone-300 max-w-2xl mx-auto leading-relaxed">
              Acompanhe nossa rotina, decisões e orientações jurídicas no dia a dia — transparência antes mesmo do primeiro contato.
            </p>
          </div>

          <motion.div {...reveal} className="grid lg:grid-cols-2 gap-12 items-center">
            {/* VÍDEO PRINCIPAL — reprodutor único */}
            <div className="mx-auto w-[260px] sm:w-[290px]">
              <div className="relative rounded-[2.2rem] border-[6px] p-2 shadow-2xl shadow-black/60" style={{ borderColor: "#1a1a1a", backgroundColor: "#141414" }}>
                <div className="absolute left-1/2 -translate-x-1/2 top-3 h-1.5 w-16 rounded-full bg-black/70 z-10" />
                <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[1.7rem] border border-gold/25" style={{ backgroundColor: "#0f0f0f" }}>
                  {p.videoFile ? (
                    <>
                      <HtmlComment text={`ARQUIVO DO VIDEO: ${p.videoFile}`} />
                      {isPensaoEGuarda ? (
                        <video
                          src={`/${p.videoFile}`}
                          controls
                          playsInline
                          preload="metadata"
                          poster={VIDEO_POSTER_URL}
                          className="h-full w-full object-cover"
                          onPlay={() => trackEvent("play_video_bastidores", { rota: p.routePath ?? "" })}
                        />
                      ) : (
                        <>
                          <HtmlComment text="🚨 ATENÇÃO JOEL: QUANDO O VÍDEO OFICIAL FOR GRAVADO, REMOVA O ATRIBUTO 'poster' DESTA TAG E ADICIONE O ATRIBUTO 'controls' NOVAMENTE PARA LIBERAR O PLAY" />
                          <video
                            src={`/${p.videoFile}`}
                            playsInline
                            preload="metadata"
                            poster={logo}
                            className="h-full w-full object-contain bg-black/90 p-4"
                          />
                        </>
                      )}
                      <div className="pointer-events-none absolute inset-0" style={{ backgroundColor: "rgba(15,15,15,0.18)" }} />
                    </>
                  ) : (
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent("click_instagram", { local: "secao_escritorio" })}
                      className="group relative flex h-full w-full items-center justify-center"
                    >
                      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${p.authorityImage ?? p.heroImage})` }} />
                      <div className="absolute inset-0" style={{ backgroundColor: "rgba(15,15,15,0.8)" }} />
                      <div className="relative flex flex-col items-center gap-3 text-center px-6">
                        <PlayCircle size={54} className="text-gold transition-transform group-hover:scale-110" strokeWidth={1} />
                        <span className="text-[10px] tracking-[0.3em] uppercase text-stone-300">Vídeo em breve</span>
                      </div>
                    </a>
                  )}
                </div>
              </div>
              {/* INSIRA AQUI O LINK DO INSTAGRAM PARA ESTE VIDEO ESPECÍFICO */}
              <HtmlComment text="INSIRA AQUI O LINK DO INSTAGRAM PARA ESTE VIDEO ESPECÍFICO" />
              <a
                href={videoInstagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("click_instagram", { local: "video_completo", rota: p.routePath ?? "" })}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 border border-gold/40 px-4 py-3 text-[10px] tracking-[0.2em] uppercase text-gold transition-colors hover:bg-gold hover:text-charcoal-deep focus:outline-none focus:ring-2 focus:ring-gold"
              >
                <ExternalLink size={14} /> Assistir vídeo completo no Instagram
              </a>
            </div>

            <div>
              <div className="grid grid-cols-3 gap-3 mb-8">
                {galleryImages.map((src, i) => (
                  <Button
                    key={src}
                    type="button"
                    variant="ghost"
                    onClick={() => showPoster(i)}
                    className="group relative h-auto aspect-square overflow-hidden rounded-none border border-gold/20 p-0 focus-visible:ring-2 focus-visible:ring-gold"
                    aria-label={`Ampliar cartaz ${i + 1}`}
                  >
                    <img src={src} alt={`Cartaz informativo ${i + 1} — ${p.eyebrow}`} width={512} height={512} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute inset-0 bg-black/15 transition-colors group-hover:bg-black/40" />
                    <Maximize2 className="absolute bottom-2 right-2 text-gold opacity-80 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                  </Button>
                ))}
              </div>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("click_instagram", { local: "cta_instagram" })}
                className="cta-pulse-gold inline-flex w-full items-center justify-center gap-3 px-6 py-4 text-[11px] sm:text-xs tracking-[0.2em] uppercase font-semibold text-charcoal-deep text-center"
                style={{ backgroundColor: "#bfa15f" }}
              >
                <FaInstagram className="w-5 h-5 shrink-0" />
                Clique aqui e conheça nossa rotina e autoridade no Instagram
              </a>
              <p className="mt-4 text-center text-[11px] tracking-[0.25em] uppercase text-stone-400">@gilsoncarvalho.adv</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA FINAL — WHATSAPP DIRETO */}
      <section id="triagem" className="relative py-24 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${finalBg})` }} />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(15,15,15,0.8)" }} />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <h3 className="font-serif-luxe text-3xl md:text-4xl text-stone-50 leading-tight mb-5">
              Pronto para dar o <em className="text-gold-gradient not-italic">próximo passo seguro?</em>
            </h3>
            <p className="text-stone-300 leading-relaxed max-w-2xl mx-auto">
              Fale diretamente com o Dr. Gilson pelo WhatsApp e receba orientação estratégica feita sob medida para o seu caso, com total sigilo.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-3 p-8 md:p-10 border border-gold/20 flex flex-col items-center text-center gap-6" style={{ backgroundColor: "rgba(20,20,20,0.85)" }}>
              <h4 className="font-serif-luxe text-2xl md:text-3xl text-stone-50">Atendimento privado e imediato</h4>
              <p className="text-stone-300 text-sm leading-relaxed max-w-md">
                Sem formulários e sem burocracia: sua conversa começa agora, direto com o escritório.
              </p>
              <a
                href={waLink(p.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsApp("cta_final")}
                className="wa-pulse-cta inline-flex w-full items-center justify-center gap-3 px-6 py-5 text-xs tracking-[0.25em] uppercase font-semibold shadow-2xl shadow-green-900/30"
                style={{ backgroundColor: "#25D366", color: "#0d2418" }}
              >
                <FaWhatsapp className="w-5 h-5" /> Falar com o Dr. Gilson no WhatsApp
              </a>
              <ul className="grid sm:grid-cols-3 gap-3 w-full pt-2">
                {["Resposta rápida", "Sigilo profissional", "Atendimento em todo o Brasil"].map((it) => (
                  <li key={it} className="flex items-center justify-center gap-2 text-[11px] tracking-[0.15em] uppercase text-stone-400">
                    <Check size={13} className="text-gold shrink-0" /> {it}
                  </li>
                ))}
              </ul>
            </div>

            {/* Canais diretos */}
            <aside className="lg:col-span-2 space-y-5">
              <a
                href={waLink(p.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsApp("cta")}
                className="wa-pulse-cta relative flex items-center justify-center gap-3 text-charcoal-deep font-semibold px-6 py-4 text-xs tracking-[0.25em] uppercase shadow-2xl shadow-green-900/30"
                style={{ backgroundColor: "#25D366", color: "#0d2418" }}
              >
                <FaWhatsapp className="w-5 h-5" />
                <span className="wa-pulse-label">Falar agora no WhatsApp</span>
                <ChevronRight size={16} />
              </a>
              <div className="p-6 border border-gold/20 space-y-4" style={{ backgroundColor: "rgba(20,20,20,0.85)" }}>
                <a href={waLink(p.whatsappMessage)} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp("telefone")} className="flex items-start gap-3 hover:opacity-80 transition-opacity">
                  <span className="flex items-center justify-center w-9 h-9 border border-gold/40 shrink-0">
                    <Phone size={14} className="text-gold" />
                  </span>
                  <div>
                    <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-0.5">WhatsApp · Telefone</div>
                    <div className="text-stone-100 text-sm">+55 (63) 98447-4070</div>
                  </div>
                </a>
                <a href={`mailto:${EMAIL}`} className="flex items-start gap-3 hover:opacity-80 transition-opacity">
                  <span className="flex items-center justify-center w-9 h-9 border border-gold/40 shrink-0">
                    <Mail size={14} className="text-gold" />
                  </span>
                  <div>
                    <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-0.5">E-mail</div>
                    <div className="text-stone-100 text-sm">{EMAIL}</div>
                  </div>
                </a>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:opacity-80 transition-opacity">
                  <span className="flex items-center justify-center w-9 h-9 border border-gold/40 shrink-0">
                    <MapPin size={14} className="text-gold" />
                  </span>
                  <div>
                    <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-0.5">Matriz · Gurupi/TO</div>
                    <div className="text-stone-100 text-sm">Av. Guanabara, 1669 — Centro · Gurupi/TO</div>
                  </div>
                </a>
                <a href={MAPS_URL_RJ} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:opacity-80 transition-opacity">
                  <span className="flex items-center justify-center w-9 h-9 border border-gold/40 shrink-0">
                    <MapPin size={14} className="text-gold" />
                  </span>
                  <div>
                    <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-0.5">Filial · Rio de Janeiro/RJ</div>
                    <div className="text-stone-100 text-sm">Av. Rio Branco, 131 - 17º andar - Centro, Rio de Janeiro - RJ, 20040-006 - Sala 1703</div>
                  </div>
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-stone-300 hover:text-gold transition-colors pt-2">
                  <FaInstagram /> @gilsoncarvalho.adv
                </a>
              </div>
            </aside>
          </div>

          <div className="mt-12 flex items-center justify-center gap-3">
            <Check size={14} className="text-gold" />
            <span className="text-[11px] tracking-[0.25em] uppercase text-stone-400">Atendimento Presencial e Digital · Todo o Brasil</span>
          </div>
        </div>
      </section>

      {/* ONDE ESTAMOS */}
      <section className="relative py-20 lg:py-24" style={{ backgroundColor: "#1f1f1f" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="w-12 h-px bg-gold" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold">Onde Estamos</span>
              <div className="w-12 h-px bg-gold" />
            </div>
            <h3 className="font-serif-luxe text-3xl md:text-4xl text-stone-50">Atuação em Tocantins e Rio de Janeiro</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="card-hover-gold block p-6 border border-gold/20" style={{ backgroundColor: "rgba(30,30,30,0.7)" }}>
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">Matriz</div>
              <div className="font-serif-luxe text-xl text-stone-50 mb-2">Gurupi — Tocantins</div>
              <p className="text-stone-300 text-sm">Av. Guanabara, nº 1669, Centro — Gurupi/TO</p>
              <span className="inline-flex items-center gap-2 mt-3 text-[11px] tracking-[0.2em] uppercase text-gold">
                <MapPin size={13} /> Ver no mapa
              </span>
            </a>
            <a href={MAPS_URL_RJ} target="_blank" rel="noopener noreferrer" className="card-hover-gold block p-6 border border-gold/20" style={{ backgroundColor: "rgba(30,30,30,0.7)" }}>
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">Filial</div>
              <div className="font-serif-luxe text-xl text-stone-50 mb-2">Rio de Janeiro — RJ</div>
              <p className="text-stone-300 text-sm">Av. Rio Branco, 131 - 17º andar - Centro, Rio de Janeiro - RJ, 20040-006 - Sala 1703</p>
              <span className="inline-flex items-center gap-2 mt-3 text-[11px] tracking-[0.2em] uppercase text-gold">
                <MapPin size={13} /> Ver no mapa
              </span>
            </a>
          </div>
          <div className="border border-gold/20 overflow-hidden shadow-2xl shadow-black/40">
            <iframe
              title="Localização do escritório — Av. Guanabara, 1669, Centro, Gurupi/TO"
              src={MAPS_EMBED}
              width="100%"
              height="360"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </section>

      {/* FOOTER simplificado */}
      <footer className="relative pt-14 pb-8 border-t border-gold/20" style={{ backgroundColor: "#1a1a1a" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 gap-8 items-start mb-10">
            <div>
              <img src={logo} alt="Gilson Carvalho" width={230} height={56} className="h-14 w-auto object-contain mb-4" loading="lazy" decoding="async" />
              <p className="text-xs tracking-[0.25em] uppercase text-gold mb-1">OAB/TO 2.591 · OAB/RJ 256.131</p>
              <p className="text-stone-400 text-sm">{p.footerSubtitle ?? "Direito de Família e Sucessões · Atendimento sigiloso."}</p>
            </div>
            <div className="space-y-3 text-sm md:text-right">
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-1">Matriz · Gurupi/TO</div>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="block text-stone-300 hover:text-gold transition-colors">
                  Av. Guanabara, nº 1669, Centro — Gurupi/TO
                </a>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-1">Filial · Rio de Janeiro/RJ</div>
                <a href={MAPS_URL_RJ} target="_blank" rel="noopener noreferrer" className="block text-stone-300 hover:text-gold transition-colors">
                  Av. Rio Branco, 131 - 17º andar - Centro, Rio de Janeiro - RJ, 20040-006 - Sala 1703
                </a>
              </div>
              <a href={waLink(p.whatsappMessage)} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp("telefone")} className="block text-stone-300 hover:text-gold transition-colors">
                +55 (63) 98447-4070
              </a>
              <a href={`mailto:${EMAIL}`} className="block text-stone-300 hover:text-gold transition-colors">
                {EMAIL}
              </a>
              <a href={waLink(p.whatsappMessage)} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp("cta")} className="inline-flex items-center gap-2 text-gold hover:opacity-80 transition-opacity pt-1">
                <FaWhatsapp /> Falar no WhatsApp
              </a>
            </div>
          </div>
          <p className="text-xs text-stone-500 text-center pt-6 border-t border-white/5">© 2026 Gilson Carvalho — Advocacia. Todos os direitos reservados.</p>
        </div>
      </footer>

      {selectedPoster !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Cartaz informativo ${selectedPoster + 1}`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onTouchStart={(event) => {
            touchStartXRef.current = event.touches[0].clientX;
          }}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={() => {
            touchStartXRef.current = null;
          }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedPoster(null);
          }}
        >
          <div className="relative flex max-h-full max-w-5xl items-center justify-center [touch-action:pan-y]">
            <img
              src={galleryImages[selectedPoster]}
              alt={`Cartaz informativo ${selectedPoster + 1} ampliado — ${p.eyebrow}`}
              width={1024}
              height={1024}
              className="max-h-[88vh] max-w-full object-contain shadow-2xl shadow-black"
            />
            <Button
              ref={closePosterRef}
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => setSelectedPoster(null)}
              className="absolute -right-2 -top-12 h-10 w-10 rounded-full border border-gold/50 bg-charcoal-deep text-gold hover:bg-gold hover:text-charcoal-deep sm:-right-12 sm:top-0"
              aria-label="Fechar imagem ampliada"
            >
              <X size={22} />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => showPoster(selectedPoster - 1)}
              className="absolute left-2 h-12 w-12 rounded-full border border-gold/50 bg-charcoal-deep/90 text-gold shadow-xl hover:bg-gold hover:text-charcoal-deep sm:-left-16"
              aria-label="Ver cartaz anterior"
            >
              <ChevronLeft size={28} />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => showPoster(selectedPoster + 1)}
              className="absolute right-2 h-12 w-12 rounded-full border border-gold/50 bg-charcoal-deep/90 text-gold shadow-xl hover:bg-gold hover:text-charcoal-deep sm:-right-16"
              aria-label="Ver próximo cartaz"
            >
              <ChevronRight size={28} />
            </Button>
            <span aria-live="polite" className="absolute bottom-3 left-1/2 -translate-x-1/2 border border-gold/40 bg-charcoal-deep/90 px-3 py-1 text-xs text-gold">
              {selectedPoster + 1} / {galleryImages.length}
            </span>
          </div>
        </div>
      )}


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
          href={waLink(p.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
            onClick={() => trackWhatsApp("cta")}
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
