import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import type { Config } from "../../../../config.js";
import { registerGetUserPowerShell } from "./register-get-user.js";
import { registerNewUserPowerShell } from "./register-new-user.js";
import { registerRemoveUserPowerShell } from "./register-remove-user.js";
import { registerDisableUserPowerShell } from "./register-disable-user.js";
import { registerEnableUserPowerShell } from "./register-enable-user.js";
import { registerGetDomainPowerShell } from "./register-get-domain.js";
import { registerGetRolePowerShell } from "./register-get-role.js";
import { registerGetRoleMemberPowerShell } from "./register-get-role-member.js";
import { registerLockItemPowerShell } from "./register-lock-item.js";
import { registerUnlockItemPowerShell } from "./register-unlock-item.js";

export function registerSecurityPowerShell(server: McpServer, config: Config) {
    registerGetUserPowerShell(server, config);
    registerNewUserPowerShell(server, config);
    registerRemoveUserPowerShell(server, config);
    registerDisableUserPowerShell(server, config);
    registerEnableUserPowerShell(server, config);
    registerGetDomainPowerShell(server, config);
    registerGetRolePowerShell(server, config);
    registerGetRoleMemberPowerShell(server, config);
    registerLockItemPowerShell(server, config);
    registerUnlockItemPowerShell(server, config);
}