import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  MessageCircle,
  MapPin,
  Instagram,
  Mail,
  ExternalLink,
  Globe,
  Share2,
} from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo_gilson.png";
import avatar from "@/assets/fotogilsonlink.png";
import { trackWhatsApp, trackEvent } from "@/lib/analytics";

const WHATSAPP = "5563984474070";
const waMessage = "Olá Dr. Gilson, vim através do site e gostaria de falar sobre atendimento jurídico.";
const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waMessage)}`;
const INSTAGRAM_URL = "https://www.instagram.com/gilsoncarvalho.adv/";
const MAPS_URL = "https://maps.google.com/?q=Av.+Guanabara,+1669,+Centro+-+Gurupi,+TO";
const EMAIL_URL = "mailto:profgilsonfilho@gmail.com";
const handleWhatsAppClick = (label: string) => {
  trackWhatsApp(label);
  trackEvent("click_whatsapp", { local: label, method: "whatsapp" });
};

export const Route = createFileRoute("/links")({
  head: () => ({
    meta: [
      { title: "Dr. Gilson Carvalho | Cartão Virtual e Canais de Atendimento" },
      {
        name: "description",
        content:
          "Acesse rapidamente nossos canais oficiais de atendimento, localização do escritório e agendamento de consultas jurídicas.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Dr. Gilson Carvalho | Cartão Virtual e Canais de Atendimento" },
      {
        property: "og:description",
        content:
          "Acesse rapidamente nossos canais oficiais de atendimento, localização do escritório e agendamento de consultas jurídicas.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://gilsoncarvalho.com/links" },
      { property: "og:image", content: "https://gilsoncarvalho.com/og-gilson.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://gilsoncarvalho.com/og-gilson.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://gilsoncarvalho.com/links" }],
  }),
  component: LinksPage,
});

type ActionItem = {
  label: string;
  sublabel?: string;
  href?: string;
  to?: string;
  external?: boolean;
  showExternalIcon?: boolean;
  variant?: "primary" | "default";
  Icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  onClick?: () => void;
};

const topActions: ActionItem[] = [
  {
    label: "Agendar Consulta no WhatsApp",
    sublabel: "Resposta em poucos minutos",
    href: waLink,
    external: true,
    variant: "primary",
    Icon: MessageCircle,
    onClick: () => {
      handleWhatsAppClick("links_whatsapp_agendar");
      trackEvent("click_link_whatsapp", { local: "links" });
    },
  },
  {
    label: "Site Oficial",
    sublabel: "Conheça nosso portal corporativo",
    to: "/",
    showExternalIcon: true,
    Icon: Globe,
    onClick: () => trackEvent("click_link_site_oficial", { local: "links" }),
  },
  {
    label: "Localização do Escritório",
    sublabel: "Como chegar",
    href: MAPS_URL,
    external: true,
    Icon: MapPin,
    onClick: () => trackEvent("click_link_maps", { local: "links" }),
  },
  {
    label: "Instagram Oficial",
    sublabel: "@gilsoncarvalho.adv",
    href: INSTAGRAM_URL,
    external: true,
    Icon: Instagram,
    onClick: () => trackEvent("click_link_instagram", { local: "links" }),
  },
  {
    label: "Contato via E-mail Profissional",
    sublabel: "profgilsonfilho@gmail.com",
    href: EMAIL_URL,
    external: true,
    Icon: Mail,
    onClick: () => trackEvent("click_link_email", { local: "links" }),
  },
];

function LinkButton({
  item,
  index,
}: {
  item: ActionItem;
  index: number;
}) {
  const isPrimary = item.variant === "primary";

  const baseClass =
    "group relative flex items-center gap-3 w-full px-5 py-4 rounded-xl border text-left transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#2b2b2b]";

  const primaryClass =
    "bg-gradient-to-r from-[#25D366]/20 to-[#25D366]/5 border-[#25D366]/50 text-stone-50 hover:bg-[#25D366]/30 hover:border-[#25D366] hover:shadow-[0_12px_40px_-12px_rgba(37,211,102,0.35)]";

  const defaultClass =
    "bg-white/[0.03] backdrop-blur-md border-gold/30 text-stone-100 hover:bg-gold/15 hover:border-gold hover:text-white hover:shadow-[0_12px_40px_-12px_rgba(201,165,90,0.25)]";

  const className = `${baseClass} ${isPrimary ? primaryClass : defaultClass}`;

  const inner = (
    <>
      <span
        className={`flex items-center justify-center shrink-0 w-10 h-10 rounded-full border ${
          isPrimary
            ? "border-[#25D366]/40 bg-[#25D366]/10 text-[#25D366]"
            : "border-gold/30 bg-gold/10 text-gold"
        }`}
      >
        <item.Icon size={18} strokeWidth={1.5} />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-sm tracking-wider uppercase font-medium">{item.label}</span>
        {item.sublabel && (
          <span className="block text-[11px] text-stone-400 mt-0.5">{item.sublabel}</span>
        )}
      </span>
      {item.external || item.showExternalIcon ? (
        <ExternalLink size={14} className="text-stone-500 group-hover:text-gold transition-colors" />
      ) : (
        <span className="w-[14px]" aria-hidden="true" />
      )}
    </>
  );

  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.12 + index * 0.07, ease: "easeOut" }}
    >
      {item.external && item.href ? (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          onClick={item.onClick}
        >
          {inner}
        </a>
      ) : item.to ? (
        <Link to={item.to} className={className} onClick={item.onClick}>
          {inner}
        </Link>
      ) : null}
    </motion.li>
  );
}

function ShareButton() {
  const handleShare = async () => {
    trackEvent("click_link_share", { local: "links" });
    const url = typeof window !== "undefined" ? window.location.href : "";
    const data = {
      title: "Dr. Gilson Carvalho — Advocacia",
      text: "Canais oficiais de atendimento do Dr. Gilson Carvalho.",
      url,
    };
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.success("Link copiado com sucesso!");
    } catch {
      // usuário cancelou o compartilhamento nativo
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label="Compartilhar cartão digital"
      className="group inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/[0.04] backdrop-blur-md px-4 py-2 text-[10px] tracking-[0.22em] uppercase text-gold transition-all hover:bg-gold/15 hover:border-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#2b2b2b]"
    >
      <Share2 size={14} strokeWidth={1.6} />
      Compartilhar cartão digital
    </button>
  );
}

function LinksPage() {
  return (
    <div
      className="min-h-screen relative flex flex-col items-center px-5 py-12 pb-20 sm:py-16"
      style={{ backgroundColor: "#2b2b2b" }}
    >
      {/* Mármoro sutil e overlay de ruído */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(201,165,90,0.08) 0%, transparent 40%, rgba(201,165,90,0.05) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="noise-overlay" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center text-center">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <div
            className="absolute inset-0 rounded-full blur-2xl"
            style={{ backgroundColor: "rgba(201,165,90,0.35)" }}
          />
          <div
            className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-[3px] shadow-2xl"
            style={{ borderColor: "#c9a55a" }}
          >
            <img
              src={avatar}
              alt="Dr. Gilson Carvalho"
              width={160}
              height={160}
              decoding="async"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
          </div>
        </motion.div>

        {/* Name & subtitle */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 font-serif-luxe text-3xl sm:text-4xl text-stone-50"
        >
          Gilson Carvalho
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="mt-3 flex flex-wrap items-center justify-center gap-2"
        >
          <span className="text-[10px] tracking-[0.22em] uppercase text-gold border border-gold/40 px-2.5 py-0.5">
            OAB/TO 2.591
          </span>
          <span className="text-[10px] tracking-[0.22em] uppercase text-gold border border-gold/40 px-2.5 py-0.5">
            OAB/RJ 256.131
          </span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.29 }}
          className="mt-5 text-stone-300 text-sm leading-relaxed max-w-sm"
        >
          Advogado especialista em Direito de Família e Sucessões. Atuação estratégica, ética e
          resultados seguros há mais de 20 anos.
        </motion.p>

        <div className="mt-6">
          <ShareButton />
        </div>

        {/* Top actions */}
        <ul className="mt-8 w-full space-y-3">
          {topActions.map((it, i) => (
            <LinkButton key={it.label} item={it} index={i} />
          ))}
        </ul>


        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <img src={logo} alt="Gilson Carvalho Advocacia" width={170} height={40} loading="lazy" decoding="async" className="h-10 w-auto opacity-80" />
          <p className="text-[11px] tracking-[0.18em] uppercase text-stone-400 text-center leading-relaxed">
            Dr. Gilson Carvalho — OAB/TO 2.591 · OAB/RJ 256.131
          </p>
        </motion.div>
      </div>
    </div>
  );
}
