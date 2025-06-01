import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "@/config.js";
import { z } from "zod";
import { safeMcpResponse } from "@/helper.js";
import { runGenericPowershellCommand } from "../../simple/generic.js";

export function initializeSearchIndexingItemByIdPowerShellTool(server: McpServer, config: Config) {
    server.tool(
        "indexing-initialize-search-index-item-by-id",
        "Rebuilds the index for a given tree with the specified root item by id and index name. Supports wildcard filtering for the index name.",
        {
            id: z.string()
                .describe("The ID of the item to rebuild the index for"),
            path: z.string()
                .default("master:")
                .optional(),
            indexName: z.string()
                .default("sitecore_*_index")
                .optional()
                .describe("The name of the index to rebuild"),
        },
        async (params) => {
            const command = `
                $item = Get-Item -Id ${params.id} -Path ${params.path};
                $indexName = "${params.indexName}";
                Initialize-SearchIndexItem -Item $item -Name $indexName
            `.replaceAll(/[\n]+/g, "");

            return safeMcpResponse(runGenericPowershellCommand(config, command, {}));
        }
    );
}

