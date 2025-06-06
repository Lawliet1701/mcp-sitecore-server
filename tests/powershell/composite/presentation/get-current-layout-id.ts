import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

export async function getCurrentLayoutId(itemId: string, client: Client): Promise<string> {
    const getLayoutArgs: Record<string, any> = {
        id: itemId,
        finalLayout: "true",
        language: "ja-jp",
    };

    const result = await callTool(client, "presentation-get-layout-by-id", getLayoutArgs);
    const json = JSON.parse(result.content[0].text);

    return json.Obj[0].ID.ToString;
}