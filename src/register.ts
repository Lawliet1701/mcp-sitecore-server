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
import { getUserPowerShellTool } from "./tools/powershell/simple/security/get-user.js";
import { newUserPowerShellTool } from "./tools/powershell/simple/security/new-user.js";
import { removeUserPowerShellTool } from "./tools/powershell/simple/security/remove-user.js";
import { disableUserPowerShellTool } from "./tools/powershell/simple/security/disable-user.js";
import { enableUserPowerShellTool } from "./tools/powershell/simple/security/enable-user.js";
import { unlockUserPowerShellTool } from "./tools/powershell/simple/security/unlock-user.js";
import { setUserPowerShellTool } from "./tools/powershell/simple/security/set-user.js";
import { setUserPasswordPowerShellTool } from "./tools/powershell/simple/security/set-user-password.js";
import { getDomainPowerShellTool } from "./tools/powershell/simple/security/get-domain.js";
import { getRolePowerShellTool } from "./tools/powershell/simple/security/get-role.js";
import { getRoleMemberPowerShellTool } from "./tools/powershell/simple/security/get-role-member.js";
import { addRoleMemberPowerShellTool } from "./tools/powershell/simple/security/add-role-member.js";
import { removeRoleMemberPowerShellTool } from "./tools/powershell/simple/security/remove-role-member.js";
import { lockItemPowerShellTool } from "./tools/powershell/simple/security/lock-item.js";
import { unlockItemPowerShellTool } from "./tools/powershell/simple/security/unlock-item.js";
import { protectItemPowerShellTool } from "./tools/powershell/simple/security/protect-item.js";
import { unprotectItemPowerShellTool } from "./tools/powershell/simple/security/unprotect-item.js";
import { newRolePowerShellTool } from "./tools/powershell/simple/security/new-role.js";
import { removeRolePowerShellTool } from "./tools/powershell/simple/security/remove-role.js";
import { newDomainPowerShellTool } from "./tools/powershell/simple/security/new-domain.js";
import { removeDomainPowerShellTool } from "./tools/powershell/simple/security/remove-domain.js";
import { testAccountPowerShellTool } from "./tools/powershell/simple/security/test-account.js";
import { getItemAclPowerShellTool } from "./tools/powershell/simple/security/get-item-acl.js";
import { testItemAclPowerShellTool } from "./tools/powershell/simple/security/test-item-acl.js";
import { addItemAclPowerShellTool } from "./tools/powershell/simple/security/add-item-acl.js";
import { clearItemAclPowerShellTool } from "./tools/powershell/simple/security/clear-item-acl.js";
import { getItemPowerShellTool } from "./tools/powershell/simple/provider/get-item.js";
import { initializeSearchIndexPowerShellTool } from "./tools/powershell/simple/indexing/initialize-search-index.js";
import { getSearchIndexPowerShellTool } from "./tools/powershell/simple/indexing/get-search-index.js";
import { findItemPowerShellTool } from "./tools/powershell/simple/indexing/find-item.js";
import { setItemAclByIdPowerShellTool } from "./tools/powershell/composite/security/set-item-acl-by-id.js";
import { setItemAclByPathPowerShellTool } from "./tools/powershell/composite/security/set-item-acl-by-path.js";





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
        setItemAclByIdPowerShellTool,
        setItemAclByPathPowerShellTool,
        //Provider
        getItemPowerShellTool,
        //Indexing PowerShell Tools
        initializeSearchIndexPowerShellTool,
        getSearchIndexPowerShellTool,
        findItemPowerShellTool,

    ], server, config);
}