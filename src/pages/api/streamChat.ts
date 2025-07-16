import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Endpoint que faz a chamada a OpenRouter (Anthropic, GPT etc.)
 * usando a chave do .env (process.env.OPENROUTER_API_KEY)
 * e devolve a resposta em streaming SSE para o frontend.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Leia a chave secreta do .env (SEM NEXT_PUBLIC_)
    const openRouterApiKey = process.env.OPENROUTER_API_KEY;
    if (!openRouterApiKey) {
      return res.status(500).json({ error: "OPENROUTER_API_KEY não encontrada no servidor." });
    }

    // Recebemos as mensagens no body
    // Usaremos req.body como texto (string) pois iremos dar JSON.parse
    if (!req.body) {
      return res.status(400).json({ error: "Nenhum body enviado a /api/streamChat" });
    }

    // Como estamos enviando no frontend: body: JSON.stringify({ messages }),
    // precisamos parsear aqui
    const parsedBody = JSON.parse(req.body);

    const { messages } = parsedBody;
    if (!messages) {
      return res.status(400).json({ error: "Nenhuma 'messages' encontrada no body" });
    }

    // Ajuste se quiser customizar a URL do seu site
    const YOUR_SITE_URL = "https://yumia.xyz";
    const YOUR_SITE_NAME = "Yumia";

    // Configura cabeçalhos para streaming
    // Transfer-Encoding chunked + text/plain
    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    });

    // Faz a requisição streaming à OpenRouter
    // Aqui está o exemplo com Anthropic/Claude, mas você pode trocar "model" etc.
    const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openRouterApiKey}`,
        "HTTP-Referer": YOUR_SITE_URL, // se quiser ranking no openrouter.ai
        "X-Title": YOUR_SITE_NAME,     // se quiser ranking no openrouter.ai
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "anthropic/claude-3.5-sonnet:beta",
        messages,
        temperature: 0.7,
        max_tokens: 200,
        stream: true,
      }),
    });

    if (!upstream.ok || !upstream.body) {
      const errorText = await upstream.text();
      res.write(errorText || `OpenRouter request failed (status ${upstream.status}).`);
      return res.end();
    }

    // Lê o streaming do upstream e repassa chunk a chunk pro frontend
    const reader = upstream.body.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        res.write(value);
      }
    }
    reader.releaseLock();

    res.end();
  } catch (error: any) {
    console.error("Erro em /api/streamChat:", error);
    return res.status(500).json({ error: error.message || "Erro interno no servidor" });
  }
}