import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "./config.js";

import { registerGraphQL } from "./tools/graphql/register-graphql.js";
import { registerGetItemTool } from "./tools/item-service/tool-registrations/simple/get-item.registration.js";
import { registerGetItemChildrenTool } from "./tools/item-service/tool-registrations/simple/get-item-children.registration.js";
import { registerGetItemByPathTool } from "./tools/item-service/tool-registrations/simple/get-item-by-path.registration.js";
import { registerCreateItemTool } from "./tools/item-service/tool-registrations/simple/create-item.registration.js";
import { registerEditItemTool } from "./tools/item-service/tool-registrations/simple/edit-item.registration.js";
import { registerDeleteItemTool } from "./tools/item-service/tool-registrations/simple/delete-item.registration.js";
import { registerSearchItemsTool } from "./tools/item-service/tool-registrations/simple/search-items.registration.js";
import { registerRunStoredQueryTool } from "./tools/item-service/tool-registrations/simple/run-stored-query.registration.js";
import { registerRunStoredSearchTool } from "./tools/item-service/tool-registrations/simple/run-stored-search.registration.js";
import { registerGetItemDescendantsTool } from "./tools/item-service/tool-registrations/composite/get-item-descendants.registration.js";
import { registerGetLanguagesTool } from "./tools/item-service/tool-registrations/composite/get-languages.registration.js";
import { registerGetUserPowerShell } from "./tools/powershell/simple/security/register-get-user.js";
import { registerNewUserPowerShell } from "./tools/powershell/simple/security/register-new-user.js";
import { registerRemoveUserPowerShell } from "./tools/powershell/simple/security/register-remove-user.js";
import { registerDisableUserPowerShell } from "./tools/powershell/simple/security/register-disable-user.js";
import { registerEnableUserPowerShell } from "./tools/powershell/simple/security/register-enable-user.js";
import { registerUnlockUserPowerShell } from "./tools/powershell/simple/security/register-unlock-user.js";
import { registerSetUserPowerShell } from "./tools/powershell/simple/security/register-set-user.js";
import { registerSetUserPasswordPowerShell } from "./tools/powershell/simple/security/register-set-user-password.js";
import { registerGetDomainPowerShell } from "./tools/powershell/simple/security/register-get-domain.js";
import { registerGetRolePowerShell } from "./tools/powershell/simple/security/register-get-role.js";
import { registerGetRoleMemberPowerShell } from "./tools/powershell/simple/security/register-get-role-member.js";
import { registerAddRoleMemberPowerShell } from "./tools/powershell/simple/security/register-add-role-member.js";
import { registerRemoveRoleMemberPowerShell } from "./tools/powershell/simple/security/register-remove-rolemember.js";
import { registerLockItemPowerShell } from "./tools/powershell/simple/security/register-lock-item.js";
import { registerUnlockItemPowerShell } from "./tools/powershell/simple/security/register-unlock-item.js";
import { registerProtectItemPowerShell } from "./tools/powershell/simple/security/register-protect-item.js";
import { registerUnprotectItemPowerShell } from "./tools/powershell/simple/security/register-unprotect-item.js";
import { registerNewRolePowerShell } from "./tools/powershell/simple/security/register-new-role.js";
import { registerRemoveRolePowerShell } from "./tools/powershell/simple/security/register-remove-role.js";
import { registerNewDomainPowerShell } from "./tools/powershell/simple/security/register-new-domain.js";
import { registerRemoveDomainPowerShell } from "./tools/powershell/simple/security/register-remove-domain.js";
import { registerTestAccountPowerShell } from "./tools/powershell/simple/security/register-test-account.js";
import { registerGetItemAclPowerShell } from "./tools/powershell/simple/security/register-get-item-acl.js";
import { registerTestItemAclPowerShell } from "./tools/powershell/simple/security/register-test-item-acl.js";
import { registerAddItemAclPowerShell } from "./tools/powershell/simple/security/register-add-item-acl.js";
import { registerClearItemAclPowerShell } from "./tools/powershell/simple/security/register-clear-item-acl.js";
import { registerGetItemPowerShell } from "./tools/powershell/simple/provider/register-get-item.js";
import { registerSetItemAclPowerShell } from "./tools/powershell/composite/security/register-set-item-acl.js";
import { registerInitializeSearchIndexPowerShell } from "./tools/powershell/simple/indexing/register-initialize-search-index.js";
import { registerGetSearchIndexPowerShell } from "./tools/powershell/simple/indexing/register-get-search-index.js";
import { registerFindItemPowerShell } from "./tools/powershell/simple/indexing/register-find-item.js";





export async function register(array: Array<(server: McpServer, config: Config) => void>,
    server: McpServer,
    config: Config) {
    for (const register of array) {
        await register(server, config);
    }
}

export async function registerAll(server: McpServer, config: Config) {
    await register([
        registerGraphQL,
        //Item Service
        //Simple Item Service Tools
        registerGetItemTool,
        registerGetItemChildrenTool,
        registerGetItemByPathTool,
        registerCreateItemTool,
        registerEditItemTool,
        registerDeleteItemTool,
        registerSearchItemsTool,
        registerRunStoredQueryTool,
        registerRunStoredSearchTool,

        //Composite Item Service Tools
        registerGetItemDescendantsTool,
        registerGetLanguagesTool,

        //PowerShell tools
        //Security
        //Simple Security PowerShell Tools
        registerGetUserPowerShell,
        registerNewUserPowerShell,
        registerRemoveUserPowerShell,
        registerDisableUserPowerShell,
        registerEnableUserPowerShell,
        registerUnlockUserPowerShell,
        registerSetUserPowerShell,
        registerSetUserPasswordPowerShell,
        registerGetDomainPowerShell,
        registerGetRolePowerShell,
        registerGetRoleMemberPowerShell,
        registerAddRoleMemberPowerShell,
        registerRemoveRoleMemberPowerShell,
        registerLockItemPowerShell,
        registerUnlockItemPowerShell,
        registerProtectItemPowerShell,
        registerUnprotectItemPowerShell,
        registerNewRolePowerShell,
        registerRemoveRolePowerShell,
        registerNewDomainPowerShell,
        registerRemoveDomainPowerShell,
        registerTestAccountPowerShell,
        registerGetItemAclPowerShell,
        registerTestItemAclPowerShell,
        registerAddItemAclPowerShell,
        registerClearItemAclPowerShell,
        //Composite Security PowerShell Tools
        registerSetItemAclPowerShell,
        //Provider
        registerGetItemPowerShell,
        //Indexing PowerShell Tools
        registerInitializeSearchIndexPowerShell,
        registerGetSearchIndexPowerShell,
        registerFindItemPowerShell,

    ], server, config);
}