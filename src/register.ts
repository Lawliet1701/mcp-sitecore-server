import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "./config.js";

import { registerGraphQL } from "./tools/graphql/register-graphql.js";
import { getItemTool } from "./tools/item-service/tool-registrations/simple/get-item.registration.js";
import { getItemChildrenTool } from "./tools/item-service/tool-registrations/simple/get-item-children.registration.js";
import { getItemByPathTool } from "./tools/item-service/tool-registrations/simple/get-item-by-path.registration.js";
import { createItemTool } from "./tools/item-service/tool-registrations/simple/create-item.registration.js";
import { editItemTool } from "./tools/item-service/tool-registrations/simple/edit-item.registration.js";
import { deleteItemTool } from "./tools/item-service/tool-registrations/simple/delete-item.registration.js";
import { searchItemsTool } from "./tools/item-service/tool-registrations/simple/search-items.registration.js";
import { runStoredQueryTool } from "./tools/item-service/tool-registrations/simple/run-stored-query.registration.js";
import { runStoredSearchTool } from "./tools/item-service/tool-registrations/simple/run-stored-search.registration.js";
import { getItemDescendantsTool } from "./tools/item-service/tool-registrations/composite/get-item-descendants.registration.js";
import { getLanguagesTool } from "./tools/item-service/tool-registrations/composite/get-languages.registration.js";
import { getUserPowerShellTool } from "./tools/powershell/simple/security/register-get-user.js";
import { newUserPowerShellTool } from "./tools/powershell/simple/security/register-new-user.js";
import { removeUserPowerShellTool } from "./tools/powershell/simple/security/register-remove-user.js";
import { disableUserPowerShellTool } from "./tools/powershell/simple/security/register-disable-user.js";
import { enableUserPowerShellTool } from "./tools/powershell/simple/security/register-enable-user.js";
import { unlockUserPowerShellTool } from "./tools/powershell/simple/security/register-unlock-user.js";
import { setUserPowerShellTool } from "./tools/powershell/simple/security/register-set-user.js";
import { setUserPasswordPowerShellTool } from "./tools/powershell/simple/security/register-set-user-password.js";
import { getDomainPowerShellTool } from "./tools/powershell/simple/security/register-get-domain.js";
import { getRolePowerShellTool } from "./tools/powershell/simple/security/register-get-role.js";
import { getRoleMemberPowerShellTool } from "./tools/powershell/simple/security/register-get-role-member.js";
import { addRoleMemberPowerShellTool } from "./tools/powershell/simple/security/register-add-role-member.js";
import { removeRoleMemberPowerShellTool } from "./tools/powershell/simple/security/register-remove-rolemember.js";
import { lockItemPowerShellTool } from "./tools/powershell/simple/security/register-lock-item.js";
import { unlockItemPowerShellTool } from "./tools/powershell/simple/security/register-unlock-item.js";
import { protectItemPowerShellTool } from "./tools/powershell/simple/security/register-protect-item.js";
import { unprotectItemPowerShellTool } from "./tools/powershell/simple/security/register-unprotect-item.js";
import { newRolePowerShellTool } from "./tools/powershell/simple/security/register-new-role.js";
import { removeRolePowerShellTool } from "./tools/powershell/simple/security/register-remove-role.js";
import { newDomainPowerShellTool } from "./tools/powershell/simple/security/register-new-domain.js";
import { removeDomainPowerShellTool } from "./tools/powershell/simple/security/register-remove-domain.js";
import { testAccountPowerShellTool } from "./tools/powershell/simple/security/register-test-account.js";
import { getItemAclPowerShellTool } from "./tools/powershell/simple/security/register-get-item-acl.js";
import { testItemAclPowerShellTool } from "./tools/powershell/simple/security/register-test-item-acl.js";
import { addItemAclPowerShellTool } from "./tools/powershell/simple/security/register-add-item-acl.js";
import { clearItemAclPowerShellTool } from "./tools/powershell/simple/security/register-clear-item-acl.js";
import { getItemPowerShellTool } from "./tools/powershell/simple/provider/register-get-item.js";
import { setItemAclPowerShellTool } from "./tools/powershell/composite/security/register-set-item-acl.js";
import { initializeSearchIndexPowerShellTool } from "./tools/powershell/simple/indexing/register-initialize-search-index.js";
import { getSearchIndexPowerShellTool } from "./tools/powershell/simple/indexing/register-get-search-index.js";
import { findItemPowerShellTool } from "./tools/powershell/simple/indexing/register-find-item.js";





export async function register(array: Array<(server: McpServer, config: Config) => void>,
    server: McpServer,
    config: Config) {
    for (const register of array) {
        await register(server, config);
    }
}

export async function registerAll(server: McpServer, config: Config) {
    await register([
        registerGraphQL,        //Item Service
        //Simple Item Service Tools
        getItemTool,
        getItemChildrenTool,
        getItemByPathTool,
        createItemTool,
        editItemTool,
        deleteItemTool,
        searchItemsTool,
        runStoredQueryTool,
        runStoredSearchTool,

        //Composite Item Service Tools
        getItemDescendantsTool,
        getLanguagesTool,        //PowerShell tools
        //Security
        //Simple Security PowerShell Tools
        getUserPowerShellTool,
        newUserPowerShellTool,
        removeUserPowerShellTool,
        disableUserPowerShellTool,
        enableUserPowerShellTool,        
        unlockUserPowerShellTool,
        setUserPowerShellTool,
        setUserPasswordPowerShellTool,
        getDomainPowerShellTool,
        getRolePowerShellTool,
        getRoleMemberPowerShellTool,
        addRoleMemberPowerShellTool,
        removeRoleMemberPowerShellTool,
        lockItemPowerShellTool,
        unlockItemPowerShellTool,
        protectItemPowerShellTool,
        unprotectItemPowerShellTool,
        newRolePowerShellTool,
        removeRolePowerShellTool,
        newDomainPowerShellTool,
        removeDomainPowerShellTool,
        testAccountPowerShellTool,
        getItemAclPowerShellTool,
        testItemAclPowerShellTool,
        addItemAclPowerShellTool,
        clearItemAclPowerShellTool,
        //Composite Security PowerShell Tools
        setItemAclPowerShellTool,
        //Provider
        getItemPowerShellTool,
        //Indexing PowerShell Tools
        initializeSearchIndexPowerShellTool,
        getSearchIndexPowerShellTool,
        findItemPowerShellTool,

    ], server, config);
}