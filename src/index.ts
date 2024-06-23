import { Hono } from "hono";
import { streamText } from "hono/streaming";
import { YoutubeTranscript } from "youtube-transcript";

type Bindings = {
  [key in keyof CloudflareBindings]: CloudflareBindings[key];
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", async (c) => {
  const url = c.req.query("url");
  if (!url) {
    return c.text('https://ytmd.shivs.me/url?="<url>"');
  }

  try {
    new URL(url);
  } catch {
    return c.text("invalid URL");
  }
  const transcript = (
    await YoutubeTranscript.fetchTranscript(c.req.query("url") as string)
  )
    .map((i) => i.text)
    .join(" ");
  return streamText(c, async (stream) => {
    const fetch = async (inp: string) =>
      await c.env.AI.run("@cf/qwen/qwen1.5-14b-chat-awq", {
        prompt: `You are responsible for summarizing transcript content to markdown. Given the transcript of a video, produce a readable, clean markdown with headings and subheadings based on the transcript content. 
      Do not include any links.
Input: ${inp}
Output:\`\`\`markdown\n`,
      });

    const chunkSize = 5000;
    const chunks = [];

    for (let i = 0; i < transcript.length; i += chunkSize) {
      chunks.push(transcript.slice(i, i + chunkSize));
    }

    for (const chunk of chunks) {
      const response = await fetch(chunk);
      // @ts-expect-error;
      await stream.write(response.response);
    }
  });
});

export default app;
