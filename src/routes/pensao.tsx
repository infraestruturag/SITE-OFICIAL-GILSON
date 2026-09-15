import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/pensao")({
  beforeLoad: () => {
    throw redirect({ to: "/pensao-e-guarda" });
  },
});
