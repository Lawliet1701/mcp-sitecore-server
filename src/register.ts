import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Config } from "./config.js";

import { registerGraphQL } from "./tools/graphql/register-graphql.js";
import { getItemTool } from "./tools/item-service/tools/simple/get-item.js";
import { getItemChildrenTool } from "./tools/item-service/tools/simple/get-item-children.js";
import { getItemByPathTool } from "./tools/item-service/tools/simple/get-item-by-path.js";
import { createItemTool } from "./tools/item-service/tools/simple/create-item.js";
import { editItemTool } from "./tools/item-service/tools/simple/edit-item.js";
import { deleteItemTool } from "./tools/item-service/tools/simple/delete-item.js";
import { searchItemsTool } from "./tools/item-service/tools/simple/search-items.js";
import { runStoredQueryTool } from "./tools/item-service/tools/simple/run-stored-query.js";
import { runStoredSearchTool } from "./tools/item-service/tools/simple/run-stored-search.js";
import { getItemDescendantsTool } from "./tools/item-service/tools/composite/get-item-descendants.js";
import { getLanguagesTool } from "./tools/item-service/tools/composite/get-languages.js";
import { getUserByIdentityPowerShellTool } from "./tools/powershell/simple/security/get-user-by-identity.js";
import { getCurrentUserPowerShellTool } from "./tools/powershell/simple/security/get-current-user.js";
import { getUserByFilterPowerShellTool } from "./tools/powershell/simple/security/get-user-by-filter.js";
import { newUserPowerShellTool } from "./tools/powershell/simple/security/new-user.js";
import { removeUserPowerShellTool } from "./tools/powershell/simple/security/remove-user.js";
import { disableUserPowerShellTool } from "./tools/powershell/simple/security/disable-user.js";
import { enableUserPowerShellTool } from "./tools/powershell/simple/security/enable-user.js";
import { unlockUserPowerShellTool } from "./tools/powershell/simple/security/unlock-user.js";
import { setUserPowerShellTool } from "./tools/powershell/simple/security/set-user.js";
import { setUserPasswordPowerShellTool } from "./tools/powershell/simple/security/set-user-password.js";
import { getRoleByIdentityPowerShellTool } from "./tools/powershell/simple/security/get-role-by-identity.js";
import { getRoleByFilterPowerShellTool } from "./tools/powershell/simple/security/get-role-by-filter.js";
import { getRoleMemberPowerShellTool } from "./tools/powershell/simple/security/get-role-member.js";
import { addRoleMemberPowerShellTool } from "./tools/powershell/simple/security/add-role-member.js";
import { removeRoleMemberPowerShellTool } from "./tools/powershell/simple/security/remove-role-member.js";
import { unlockItemPowerShellTool } from "./tools/powershell/simple/security/unlock-item.js";
import { protectItemByPathPowerShellTool } from "./tools/powershell/simple/security/protect-item-by-path.js";
import { protectItemByIdPowerShellTool } from "./tools/powershell/simple/security/protect-item-by-id.js";
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
import { resumeSearchIndexPowerShellTool } from "./tools/powershell/simple/indexing/resume-search-index.js";
import { suspendSearchIndexPowerShellTool } from "./tools/powershell/simple/indexing/suspend-search-index.js";
import { stopSearchIndexPowerShellTool } from "./tools/powershell/simple/indexing/stop-search-index.js";
import { setItemAclByIdPowerShellTool } from "./tools/powershell/composite/security/set-item-acl-by-id.js";
import { setItemAclByPathPowerShellTool } from "./tools/powershell/composite/security/set-item-acl-by-path.js";
import { initializeSearchIndexingItemByIdPowerShellTool } from "./tools/powershell/composite/indexing/initialialize-search-indexing-item-by-id.js";
import { initializeSearchIndexingItemByPathPowerShellTool } from "./tools/powershell/composite/indexing/initialialize-search-indexing-item-by-path.js";
import { removeSearchIndexItemByIdPowerShellTool } from "./tools/powershell/composite/indexing/remove-search-index-item-by-id.js";
import { removeSearchIndexItemByPathPowerShellTool } from "./tools/powershell/composite/indexing/remove-search-index-item-by-path.js";
import { lockItemByIdPowerShellTool } from "./tools/powershell/simple/security/lock-item-by-id.js";
import { lockItemByPathPowerShellTool } from "./tools/powershell/simple/security/lock-item-by-path.js";
import { unprotectItemByIdPowerShellTool } from "./tools/powershell/simple/security/unprotect-item-by-id.js";
import { unprotectItemByPathPowerShellTool } from "./tools/powershell/simple/security/unprotect-item-by-path.js";
import { getDomainByNamePowerShellTool } from "./tools/powershell/simple/security/get-domain-by-name.js";
import { getAllDomainsPowerShellTool } from "./tools/powershell/simple/security/get-all-domains.js";
import { getDatabasePowerShellTool } from "./tools/powershell/simple/common/get-database.js";
import { getCachePowerShellTool } from "./tools/powershell/simple/common/get-cache.js";
import { getItemTemplateByIdPowerShellTool } from "./tools/powershell/simple/common/get-item-template-by-id.js";
import { getItemTemplateByPathPowerShellTool } from "./tools/powershell/simple/common/get-item-template-by-path.js";

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
        getLanguagesTool,     

        //PowerShell tools
        //Security
        //Simple Security PowerShell Tools
        getUserByIdentityPowerShellTool,
        getCurrentUserPowerShellTool,
        getUserByFilterPowerShellTool,
        newUserPowerShellTool,
        removeUserPowerShellTool,
        disableUserPowerShellTool,
        enableUserPowerShellTool,        
        unlockUserPowerShellTool,
        setUserPowerShellTool,        
        setUserPasswordPowerShellTool,
        getDomainByNamePowerShellTool,
        getAllDomainsPowerShellTool,
        getRoleByIdentityPowerShellTool,
        getRoleByFilterPowerShellTool,
        getRoleMemberPowerShellTool,
        addRoleMemberPowerShellTool,
        removeRoleMemberPowerShellTool,
        lockItemByIdPowerShellTool,
        lockItemByPathPowerShellTool,
        unlockItemPowerShellTool,        
        protectItemByPathPowerShellTool,
        protectItemByIdPowerShellTool,
        unprotectItemByIdPowerShellTool,
        unprotectItemByPathPowerShellTool,
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
        setItemAclByPathPowerShellTool,        //Common PowerShell Tools
        //Simple Common PowerShell Tools
        getDatabasePowerShellTool,
        getCachePowerShellTool,
        getItemTemplateByIdPowerShellTool,
        getItemTemplateByPathPowerShellTool,

        //Provider
        getItemPowerShellTool,        
        //Indexing PowerShell Tools
        initializeSearchIndexPowerShellTool,
        getSearchIndexPowerShellTool,
        findItemPowerShellTool,
        resumeSearchIndexPowerShellTool,
        suspendSearchIndexPowerShellTool,
        stopSearchIndexPowerShellTool,
        //Composite Indexing PowerShell Tools
        initializeSearchIndexingItemByIdPowerShellTool,
        initializeSearchIndexingItemByPathPowerShellTool,
        removeSearchIndexItemByIdPowerShellTool,
        removeSearchIndexItemByPathPowerShellTool,

    ], server, config);
}