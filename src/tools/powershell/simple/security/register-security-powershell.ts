import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "../../../../config.js";
import { z } from "zod";
import { safeMcpResponse } from "../../../../helper.js";
import { register } from "module";
import { registerGetUserPowerShell } from "./register-get-user.js";

export function registerSecurityPowerShell(server: McpServer, config: Config) {
    registerGetUserPowerShell(server, config);
}