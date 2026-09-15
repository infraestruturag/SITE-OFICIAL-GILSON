// GA4 / dataLayer helpers — safe no-op durante SSR
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const MEASUREMENT_ID = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY"] as
  | string
  | undefined;

let initialized = false;

export function initAnalytics() {
  if (typeof window === "undefined" || initialized) return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer!.push(args);
    };
  }

  if (MEASUREMENT_ID && !document.querySelector(`script[data-ga4="${MEASUREMENT_ID}"]`)) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    s.dataset["ga4"] = MEASUREMENT_ID;
    document.head.appendChild(s);
    window.gtag("js", new Date());
    window.gtag("config", MEASUREMENT_ID, { send_page_view: false });
  }
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  initAnalytics();
  window.gtag?.("event", name, params);
  window.dataLayer?.push({ event: name, ...params });
}

export const trackWhatsApp = (local: string) =>
  trackEvent("click_whatsapp", { local, method: "whatsapp" });

export const trackLead = (servico: string) =>
  trackEvent("generate_lead", { servico, currency: "BRL", value: 1 });

export const trackPageView = (pagina: string, titulo: string) =>
  trackEvent("page_view_custom", {
    pagina,
    titulo,
    page_location: typeof window !== "undefined" ? window.location.href : pagina,
  });
