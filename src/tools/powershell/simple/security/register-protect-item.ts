import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../generic.js";

export function protectItemPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "security-protect-item-by-path",
        "Protect a Sitecore item by its path.",
        {
            path: z.string()
                .describe("The path of the item to protect (e.g. /sitecore/content/Home)"),
            passThru: z.boolean().optional()
                .describe("If set to true, passes the processed object back to the pipeline"),
            database: z.string().optional()
                .describe("The database containing the item (defaults to the context database)")
        },
        async (params) => {
            const command = `Protect-Item`;
            const options: Record<string, any> = {
                "Path": params.path,
            };

            if (params.passThru) {
                options["PassThru"] = "";
            }

            if (params.database) {
                options["Database"] = params.database;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );

    server.tool(
        "security-protect-item-by-id",
        "Protect a Sitecore item by its ID.",
        {
            id: z.string()
                .describe("The ID of the item to protect"),
            passThru: z.boolean().optional()
                .describe("If set to true, passes the processed object back to the pipeline"),
            database: z.string().optional()
                .describe("The database containing the item (defaults to the context database)")
        },
        async (params) => {
            const command = `Protect-Item`;
            const options: Record<string, any> = {
                "Id": params.id,
            };

            if (params.passThru) {
                options["PassThru"] = "";
            }

            if (params.database) {
                options["Database"] = params.database;
            }

            return safeMcpResponse(runGenericPowershellCommand(config, command, options));
        }
    );
}