const DEFAULT_MESSAGE =
  "Olá, Dr. Gilson! Acessei o seu site oficial (gilsoncarvalho.com) e gostaria de informações sobre uma consulta jurídica.";

const ROUTE_MESSAGES: Record<string, string> = {
  "/divorcio":
    "Olá, Dr. Gilson! Acessei a página de Divórcio e Partilha de Bens no seu site e gostaria de informações sobre atendimento.",
  "/pensao-e-guarda":
    "Olá, Dr. Gilson! Acessei a página de Pensão e Guarda no seu site e gostaria de informações sobre atendimento.",
  "/inventario":
    "Olá, Dr. Gilson! Acessei a página de Inventário e Sucessões no seu site e gostaria de informações sobre atendimento.",
  "/uniao-estavel":
    "Olá, Dr. Gilson! Acessei a página de União Estável no seu site e gostaria de informações sobre atendimento.",
  "/regularizacao-imobiliaria":
    "Olá, Dr. Gilson! Acessei a página de Regularização Imobiliária no seu site e gostaria de informações sobre atendimento.",
  "/direito-fundiario":
    "Olá, Dr. Gilson! Acessei a página de Direito e Regularização Fundiária no seu site e gostaria de informações sobre atendimento.",
  "/bio": DEFAULT_MESSAGE,
  "/": DEFAULT_MESSAGE,
};

export function getWhatsAppMessage(pathname?: string, fallback = DEFAULT_MESSAGE) {
  const currentPath =
    pathname ?? (typeof window !== "undefined" ? window.location.pathname : "/");
  return ROUTE_MESSAGES[currentPath] ?? fallback;
}