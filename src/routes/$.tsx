import { createFileRoute, Link } from "@tanstack/react-router";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { Home, Scale, Users, FileText, HeartHandshake } from "lucide-react";

import logo from "@/assets/logo_gilson.png";
import { trackWhatsApp, trackEvent } from "@/lib/analytics";

const WHATSAPP = "5563984474070";
const waMessage = "Olá Dr. Gilson, vim através do site e gostaria de falar sobre atendimento jurídico.";
const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waMessage)}`;

const quickLinks = [
  { to: "/divorcio", label: "Divórcio", Icon: Scale },
  { to: "/pensao-e-guarda", label: "Guarda e Pensão", Icon: Users },
  { to: "/inventario", label: "Inventário", Icon: FileText },
  { to: "/uniao-estavel", label: "União Estável", Icon: HeartHandshake },
];

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "Endereço Não Encontrado — Gilson Carvalho Advocacia" },
      { name: "description", content: "A página solicitada não existe. Entre em contato com o Dr. Gilson Carvalho ou retorne à página inicial." },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "Endereço Não Encontrado — Gilson Carvalho Advocacia" },
      { property: "og:description", content: "A página solicitada não existe. Entre em contato com o Dr. Gilson Carvalho ou retorne à página inicial." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://gilsoncarvalho.com/404" },
    ],
    links: [{ rel: "canonical", href: "https://gilsoncarvalho.com/404" }],
  }),
  component: NotFoundPage,
});

function NotFoundPage() {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-5 py-16 overflow-hidden" style={{ backgroundColor: "#2b2b2b" }}>
      {/* Marble background gradient */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(201,165,90,0.08) 0%, transparent 35%), radial-gradient(circle at 80% 70%, rgba(201,165,90,0.06) 0%, transparent 35%), linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />
      <div className="noise-overlay" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center text-center">
        <motion.img
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          src={logo}
          alt="Gilson Carvalho Advocacia"
          width={220}
          height={56}
          loading="eager"
          decoding="async"
          className="h-14 w-auto opacity-90 mb-8"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <h1 className="font-serif-luxe text-5xl sm:text-6xl text-gold mb-3">404</h1>
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-2xl sm:text-3xl font-semibold text-stone-50 tracking-tight"
        >
          Endereço Não Encontrado
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-4 text-stone-300 text-sm sm:text-base leading-relaxed max-w-md"
        >
          A página que você está procurando não existe ou foi movida. Como podemos te ajudar agora?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full"
        >
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackWhatsApp("404_whatsapp");
              trackEvent("click_404_whatsapp", { local: "404" });
            }}
            className="cta-pulse-gold inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full px-6 py-3.5 text-sm font-semibold tracking-wide text-white transition-all hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#2b2b2b]"
            style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
          >
            <FaWhatsapp size={18} />
            Falar com o Dr. Gilson no WhatsApp
          </a>
          <Link
            to="/"
            onClick={() => trackEvent("click_404_home", { local: "404" })}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full border border-gold/40 bg-white/[0.04] backdrop-blur-md px-6 py-3.5 text-sm font-medium tracking-wide text-gold transition-all hover:bg-gold/15 hover:border-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#2b2b2b]"
          >
            <Home size={16} />
            Voltar para a Página Inicial
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 w-full"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            <span className="text-[11px] tracking-[0.25em] uppercase text-gold/80">Acesso Rápido</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
              >
                <Link
                  to={link.to}
                  onClick={() => trackEvent("click_404_lp", { destino: link.to, servico: link.label })}
                  className="group flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-gold/30 bg-white/[0.03] backdrop-blur-md text-stone-100 transition-all hover:bg-gold/15 hover:border-gold hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#2b2b2b]"
                >
                  <span className="flex items-center justify-center shrink-0 w-9 h-9 rounded-full border border-gold/30 bg-gold/10 text-gold">
                    <link.Icon size={16} strokeWidth={1.5} />
                  </span>
                  <span className="flex-1 text-left text-sm font-medium tracking-wide">{link.label}</span>
                  <span className="text-stone-500 group-hover:text-gold transition-colors">→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
