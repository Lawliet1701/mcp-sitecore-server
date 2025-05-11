import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "../../../../config.js";
import { z } from "zod";
import { safeMcpResponse } from "../../../../helper.js";
import { register } from "module";
import { registerGetUserPowerShell } from "./register-get-user.js";
import { registerNewUserPowerShell } from "./register-new-user.js";
import { registerRemoveUserPowerShell } from "./register-remove-user.js";
import { registerDisableUserPowerShell } from "./register-disable-user.js";

export function registerSecurityPowerShell(server: McpServer, config: Config) {
    registerGetUserPowerShell(server, config);
    registerNewUserPowerShell(server, config);
    registerRemoveUserPowerShell(server, config);
    registerDisableUserPowerShell(server, config);
}