import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "../../../config.js";
import { z } from "zod";
import { safeMcpResponse } from "../../../helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function getRenderingPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "presentation-get-rendering-by-path",
        "Gets a Sitecore rendering item by its path.",
        {
            path: z.string()
                .describe("The path of the rendering item to retrieve (e.g. /sitecore/layout/Renderings/Sample/Navigation)"),
            database: z.string().optional()
                .describe("The database containing the rendering (defaults to master)"),
        },
        async (params) => {
            const command = `Get-Rendering`;
            const options: Record<string, any> = {
                "Path": params.path,
            };

            if (params.database) {
                options["Database"] = params.database;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );

    server.tool(
        "presentation-get-rendering-by-id",
        "Gets a Sitecore rendering item by its ID.",
        {
            id: z.string()
                .describe("The ID of the rendering item to retrieve"),
            database: z.string().optional()
                .describe("The database containing the rendering (defaults to master)"),
        },
        async (params) => {
            const command = `Get-Rendering`;
            const options: Record<string, any> = {
                "ID": params.id,
            };

            if (params.database) {
                options["Database"] = params.database;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}
