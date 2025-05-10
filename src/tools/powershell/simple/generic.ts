import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import type { Config } from "../../../config.js";
import { PowershellClient } from "../client.js";
import { PowerShellOutputType } from "../output.js";

export async function runGenericPowershellCommand(config: Config, command: string, options: Record<string, any>, outputFormat?: PowerShellOutputType): Promise<CallToolResult> {
    const client = new PowershellClient(
        config.powershell.serverUrl,
        config.powershell.username,
        config.powershell.password,
        config.powershell.domain
    );

    let text = ""
    switch (outputFormat) {
        case PowerShellOutputType.JSON:
            text = await client.executeScriptJson(command, options);
            break;
        case PowerShellOutputType.XML:
            text = await client.executeScript(command, options);
            break;
        default:
            text = await client.executeScriptJson(command, options);
            break;
    }

    return {
        content: [
            {
                type: "text",
                text: text,
            },
        ],
        isError: false,
    }

}