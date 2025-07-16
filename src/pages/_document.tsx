import { buildUrl } from "@/utils/buildUrl";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        {/* Pré-conexão com Google Fonts (opcional, mas melhora performance) */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Importe a fonte (Nico Moji) diretamente do Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Nico+Moji&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Exemplo de uso do background que você mencionou */}
      <body style={{ backgroundImage: `url(${buildUrl("/bg-c.png")})` }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}