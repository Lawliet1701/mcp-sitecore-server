# Folder containing the wrapper for the Sitecore PowerShell Extensions API

This folder contains implementations of MCP tools that interact with Sitecore PowerShell Extensions.

## Folders structure

- **simple**: contains simple implementations of Sitecore PowerShell commands
  - **security**: contains security-related PowerShell commands
    - User Management: create, get, modify, and remove users
    - Role Management: create, get, add/remove members, and remove roles
    - Domain Management: create, get, and remove domains
    - Item Security: get, test, add, protect/unprotect, and lock/unlock items
- **composite**: contains composite implementations that combine multiple PowerShell commands
- **user**: use this folder for combining your own MCP tools implementations

## Security Tools

### User Management

- `security-get-user-by-identity`: Get a user by identity
- `security-get-current-user`: Get the current user
- `security-get-user-by-filter`: Get users by filter
- `security-new-user`: Create a new user
- `security-remove-user`: Remove a user
- `security-disable-user`: Disable a user
- `security-enable-user`: Enable a user
- `security-unlock-user`: Unlock a user
- `security-set-user`: Update user properties

### Role Management

- `security-get-role-by-identity`: Get a role by identity
- `security-get-role-by-filter`: Get roles by filter
- `security-new-role`: Create a new role
- `security-remove-role`: Remove a role
- `security-get-role-member`: Get role members
- `security-add-role-member`: Add a member to a role
- `security-remove-role-member`: Remove a member from a role

### Domain Management

- `security-get-domain`: Get all domains
- `security-get-domain-by-name`: Get a domain by name
- `security-new-domain`: Create a new domain
- `security-remove-domain`: Remove a domain

### Item Security

- `security-get-item-acl-by-id`: Get ACL for an item by ID
- `security-get-item-acl-by-path`: Get ACL for an item by path
- `security-add-item-acl-by-id`: Add ACL entry to an item by ID
- `security-add-item-acl-by-path`: Add ACL entry to an item by path
- `security-test-item-acl-by-id`: Test ACL for an item by ID
- `security-test-item-acl-by-path`: Test ACL for an item by path
- `security-lock-item-by-id`: Lock an item by ID
- `security-lock-item-by-path`: Lock an item by path
- `security-unlock-item-by-id`: Unlock an item by ID
- `security-unlock-item-by-path`: Unlock an item by path
- `security-protect-item-by-id`: Protect an item by ID
- `security-protect-item-by-path`: Protect an item by path
- `security-unprotect-item-by-id`: Unprotect an item by ID
- `security-unprotect-item-by-path`: Unprotect an item by path

## Indexing Tools

### Simple Indexing Tools

- `indexing-initialize-search-index`: Initialize one or more Sitecore search indexes
- `indexing-get-search-index`: Get information about Sitecore search indexes
- `indexing-find-item`: Find items using the Sitecore Content Search API
- `indexing-suspend-search-index`: Suspend one or more running Sitecore search indexes
- `indexing-stop-search-index`: Stop one or more running Sitecore search indexes
- `indexing-resume-search-index`: Resume one or more paused Sitecore search indexes

### Composite Indexing Tools

- `indexing-initialize-search-index-item-by-id`: Rebuild the index for a given tree with the specified root item by ID
- `indexing-initialize-search-index-item-by-path`: Rebuild the index for a given tree with the specified root item by path
- `indexing-remove-search-index-item-by-id`: Remove the item with the specified ID from the search index
- `indexing-remove-search-index-item-by-path`: Remove the item with the specified path from the search index