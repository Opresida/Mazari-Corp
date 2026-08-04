import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { buildJsonLd, buildNoscriptContact } from "./src/lib/structured-data";

const port = Number(process.env.PORT) || 5000;
const basePath = process.env.BASE_PATH || "/";

/**
 * Injeta no index.html o JSON-LD e o bloco de contato do <noscript>, gerados a
 * partir de `src/lib/contact.ts`.
 *
 * Por que em build e não em runtime: assim o dado estruturado já sai escrito no
 * HTML servido, e o crawler não depende de executar JavaScript para lê-lo.
 *
 * Por que injetar em vez de deixar fixo no HTML: a razão social, o CNPJ e o
 * endereço apareceriam em dois lugares (HTML e componentes React) e sairiam do ar
 * na primeira atualização de cadastro. Divergência de NAP derruba o sinal de
 * entidade no Google — exatamente o que este site já tinha com dois e-mails
 * diferentes. Aqui existe um lugar só.
 *
 * Se um marcador sumir do index.html, o build QUEBRA de propósito: melhor falhar
 * do que publicar um site sem dado estruturado sem ninguém perceber.
 */
function mazariSeoInject(): Plugin {
  const MARKERS = {
    jsonLd: "<!--@mazari:json-ld-->",
    contact: "<!--@mazari:noscript-contact-->",
  };

  return {
    name: "mazari-seo-inject",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        for (const [key, marker] of Object.entries(MARKERS)) {
          if (!html.includes(marker)) {
            throw new Error(
              `[mazari-seo-inject] marcador "${marker}" (${key}) não encontrado no index.html. ` +
                `Ele é obrigatório — sem ele o site vai ao ar sem dados estruturados. ` +
                `Restaure o marcador ou ajuste o plugin em vite.config.ts.`,
            );
          }
        }

        const jsonLd = `<script type="application/ld+json">\n${JSON.stringify(
          buildJsonLd(),
          null,
          2,
        )}\n    </script>`;

        return html
          .replace(MARKERS.jsonLd, jsonLd)
          .replace(MARKERS.contact, buildNoscriptContact());
      },
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    mazariSeoInject(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
