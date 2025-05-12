import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "../../../../config.js";
import { z } from "zod";

export function registerSetItemAcl(server: McpServer, config: Config) {
    // No composite commands needed at the moment - using the simple commands directly
}