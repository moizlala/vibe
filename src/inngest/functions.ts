import { gemini, createAgent } from "@inngest/agent-kit";
import { Sandbox } from '@e2b/code-interpreter';
import { inngest } from "./client";
import { getSandbox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event ,step }) => {

    const sandboxId = await step.run("get-sanbox-id", async () => {
      const sandbox = await Sandbox.create("vibe-nextjs-moiz-test3");
      return sandbox.sandboxId;
    });

    const codeAgent = createAgent({
      name: "code-agent",
      system:
        "You are an expert next.js developer.  You write readable, maintainable code. You write next.js & React  snippets.",
      model: gemini({ model: "gemini-2.0-flash" }),
    });

    const { output } = await codeAgent.run(
      `write the following snippet: ${event.data.value}`
    );
    
    const sandboxUrl = await step.run("get-sanbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(3000);
      return `http://${host}`;
    });

    return { output , sandboxUrl};
  }
);
