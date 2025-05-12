/**
 * Simple array of access rights available in Sitecore security operations.
 * Used in security-related PowerShell operations like Test-ItemAcl.
 * 
 * @see https://doc.sitecorepowershell.com/appendix/security/test-itemacl
 */
export const AccessRights = [
  // Item-level access rights
  'item:read',
  'item:write',
  'item:create',
  'item:delete',
  'item:rename',
  'item:admin',

  // Field-level access rights
  'field:read',
  'field:write',

  // Language-level access rights
  'language:read',
  'language:write',

  // Workflow-related access rights
  'workflowState:delete',
  'workflowState:write',
  'workflowCommand:execute',

  // Additional access rights
  'site:enter',
  'remote:fieldread',
  'insert:show',
  'profile:customize',
  'bucket:makebucket',
  'bucket:unmake'
];
