import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import type { Config } from "../../../config.js";
import { PowershellClient } from "../client.js";

export async function runGenericPowershellCommand(config: Config, command: string, options: Record<string, any>): Promise<CallToolResult> {
    const client = new PowershellClient(
        'https://xmcloudcm.localhost/',
        'admin',
        'b',
        'sitecore'
    );

    return {
        content: [
            {
                type: "text",
                text: await client.executeScriptJson(command, options),
            },
        ],
        isError: false,
    }

}