import { Message } from "../messages/messages";
import { getWindowAI } from 'window.ai';

// A função getChatResponse não está sendo usada, mantemos pra compatibilidade.
export async function getChatResponse(messages: Message[], apiKey: string) {
  // function currently not used
  throw new Error("Not implemented");

  /*
  if (!apiKey) {
    throw new Error("Invalid API Key");
  }

  const configuration = new Configuration({
    apiKey: apiKey,
  });
  // ブラウザからAPIを叩くときに発生するエラーを無くすworkaround
  // https://github.com/openai/openai-node/issues/6#issuecomment-1492814621
  delete configuration.baseOptions.headers["User-Agent"];

  const openai = new OpenAIApi(configuration);

  const { data } = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
  });

  const [aiRes] = data.choices;
  const message = aiRes.message?.content || "エラーが発生しました";

  return { message: message };
  */
}

/**
 * getChatResponseStream
 *   - Agora NÃO chama a OpenRouter direto. Em vez disso,
 *     faz fetch("/api/streamChat"), que esconde a chave no servidor.
 *   - Mantive todos os seus console.log, a lógica SSE, e o parse dos chunks.
 */
export async function getChatResponseStream(
  messages: Message[],
  apiKey: string,        // ignorado, deixamos para compatibilidade
  openRouterKey: string // ignorado, deixamos para compatibilidade
) {
  console.log('getChatResponseStream');
  console.log('messages');
  console.log(messages);

  // Em vez de usar openRouterKey e fetch("https://openrouter.ai/..."), chamamos /api/streamChat
  const stream = new ReadableStream({
    async start(controller: ReadableStreamDefaultController) {
      try {
        // Faz POST para /api/streamChat, passando as messages
        // e esperando receber SSE chunk a chunk
        const generation = await fetch("/api/streamChat", {
          method: "POST",
          // Precisamos enviar { messages } no body como JSON
          body: JSON.stringify({ messages }),
        });

        if (!generation.ok || !generation.body) {
          console.error("Falha ao chamar /api/streamChat");
          controller.close();
          return;
        }

        let isStreamed = false;
        const reader = generation.body.getReader();

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            // Convert o chunk (Uint8Array) em string
            const chunk = new TextDecoder().decode(value);

            // Dividimos por linha
            let lines = chunk.split('\n');

            const SSE_COMMENT = ": OPENROUTER PROCESSING";

            // Remove linhas de comentário
            lines = lines.filter(line => !line.trim().startsWith(SSE_COMMENT));
            // Remove [DONE]
            lines = lines.filter(line => !line.trim().endsWith("data: [DONE]"));

            // Filtra só as que começam com "data:"
            const dataLines = lines.filter(line => line.startsWith("data:"));

            // Cada dataLine deve ter "data: {...json...}"
            const jsonMessages = dataLines.map(line => {
              const jsonStr = line.substring(5); // remove "data: "
              return JSON.parse(jsonStr);
            });

            try {
              jsonMessages.forEach((message) => {
                // Mantenho a mesma lógica: content = message.choices[0].delta.content
                // Se for Anthropic, é "delta.completion"; mas vamos manter seu original
                // (Se precisar de Claude, mude para: delta.content || delta.completion)
                const content = message.choices[0].delta.content;
                controller.enqueue(content);
              });
            } catch (error) {
              console.log('error processing messages:', jsonMessages);
              throw error;
            }

            isStreamed = true;
          }
        } catch (error) {
          console.error('Error reading the stream', error);
          controller.error(error);
        } finally {
          reader.releaseLock();
        }

        if (!isStreamed) {
          console.error('Streaming not supported! Need to handle this case.');
          // Se quiser fallback, pode fazer aqui
        }
      } catch (error) {
        controller.error(error);
      } finally {
        controller.close();
      }
    },
  });

  return stream;
}