import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "../../../../config.js";
import { z } from "zod";
import { safeMcpResponse } from "../../../../helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function registerGetUserPowerShell(server: McpServer, config: Config) {
    server.tool(
        "security-get-user-by-name",
        "Get a Sitecore user by its name.",
        {
            identity: z.string(),
        },
        async (params) => {
            const command = `Get-User`;
            const options: Record<string, any>= {
                "Identity": params.identity,
            };
            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );

    server.tool(
        "security-get-current-user",
        "Get the current Sitecore user.",
        {},
        async () => {
            const command = `Get-User`;
            const options: Record<string, any>= {
                "Current": "",
            };
            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );

    server.tool(
        "security-get-user-by-filter",
        "Get a Sitecore users by filter.",
        {
            filter: z.string(),
        },
        async (params) => {
            const command = `Get-User`;
            const options: Record<string, any>= {
                "Filter": params.filter,
            };
            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}