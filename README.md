# Model Context Protocol server for Sitecore

[![Build](https://github.com/antonytm/mcp-sitecore-server/actions/workflows/publish-npm.yml/badge.svg)](https://github.com/Antonytm/mcp-sitecore-server/actions/workflows/publish-npm.yml)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## Implemented tools

- [x] GraphQL API
  - [x] `introspection-grahpql-{schema}`: returns the GraphQL schema
  - [x] `query-graphql-{schema}`: executes a GraphQL query
- [x] Item Service API
  - [x] `item-service-get-item`: returns an item by ID
  - [x] `item-service-get-item-children`: returns the children of an item by ID
  - [x] `item-service-get-item-by-path`: returns an item by path
  - [x] `item-service-create-item`: creates an item by providing a template ID and parent path.
  - [x] `item-service-edit-item`: edits an item by ID
  - [x] `item-service-delete-item`: deletes an item by ID
  - [x] `item-service-search-items`: searches for items
  - [x] `item-service-run-stored-query`: runs a stored query
  - [x] `item-service-run-stored-search`: runs a stored search
  - [x] Composite Item Service API
    - [x] `item-service-get-languages`: returns Sitcore languages in the instance
    - [x] `item-service-get-item-descendants`: returns the descendants of an item by ID
- [ ] Sitecore Powershell
  - [ ] Security
    - [x] `security-get-current-user`: returns the current user
    - [x] `security-get-user-by-identity`: returns a user by name
    - [x] `security-get-user-by-filter`: returns a user by filter
    - [x] `security-new-domain`: creates a new domain
    - [x] `security-new-user`: creates a new user
    - [x] `security-new-role`: creates a new role
    - [x] `security-remove-domain`: removes a domain
    - [x] `security-remove-user`: removes a user
    - [x] `security-remove-role`: removes a role
    - [x] `security-get-domain`: returns a domains
    - [x] `security-get-domain-by-name`: returns a domain by name
    - [x] `security-get-role-by-identity`: returns a role by name
    - [x] `security-get-role-by-filter`: returns a role by filter
    - [x] `security-get-role-member`: returns members of a role
    - [x] `security-enable-user`: enables a user
    - [x] `security-disable-user`: disables a user
    - [x] `security-set-user-password`: changes a user's password
    - [x] `security-lock-item-by-id`: locks an item by ID
    - [x] `security-unlock-item-by-id`: unlocks an item by ID
    - [x] `security-lock-item-by-path`: locks an item by path
    - [x] `security-unlock-item-by-path`: unlocks an item by path
    - [x] `security-protect-item-by-id`: protects an item by ID
    - [x] `security-protect-item-by-path`: protects an item by path
    - [x] `security-unprotect-item-by-id`: unprotects an item by ID
    - [x] `security-unprotect-item-by-path`: unprotects an item by path
    - [x] `security-test-acccount`: tests an account
    - [x] `security-unlock-user`: unlocks a user
      - [ ] test covergage requires logging user with wrong password
    - [ ] `security-login-user`: logs in a user. Blocked by [SPE issue](https://github.com/SitecorePowerShell/Console/issues/1367#issue-3055272174).
    - [ ] `security-logout-user`: logs out a user. Blocked by [SPE issue](https://github.com/SitecorePowerShell/Console/issues/1368)
    - [ ] `security-export-user`: exports a user. Blocked by [SPE issue](https://github.com/SitecorePowerShell/Console/issues/1370)
    - [ ] `security-import-user`: imports a user. Blocked by [SPE issue](https://github.com/SitecorePowerShell/Console/issues/1371)
    - [ ] `security-export-role`: exports a role. Blocked by [SPE issue](https://github.com/SitecorePowerShell/Console/issues/1369)
    - [ ] `security-import-role`: imports a role. Blocked by [SPE issue](https://github.com/SitecorePowerShell/Console/issues/1372)
    - [x] `security-add-role-member`: adds a member to a role
    - [x] `security-remove-role-member`: removes a member from a role
    - [x] `security-test-item-acl-by-id`: tests an item ACL by ID
    - [x] `security-test-item-acl-by-path`: tests an item ACL by path
    - [x] `security-add-item-acl-by-id`: adds an item ACL by ID
    - [x] `security-add-item-acl-by-path`: adds an item ACL by path
    - [x] `security-clear-item-acl-by-id`: clears an item ACL by ID
    - [x] `security-clear-item-acl-by-path`: clears an item ACL by path
    - [x] `security-set-item-acl-by-id`: sets an item ACL by ID
    - [x] `security-set-item-acl-by-path`: sets an item ACL by path
  - [x] Provider
    - [x] `provider-get-item-by-id`: returns an item by ID
    - [x] `provider-get-item-by-path`: returns an item by path
    - [x] `provider-get-item-by-query`: returns an item by query
    - [x] `provider-get-item-by-path`: returns an item by path  
  - [x] Indexing
    - [x] `indexing-initialize-search-index`: initializes one or more search indexes
    - [x] `indexing-get-search-index`: returns a search index
    - [x] `indexing-find-item`: finds an item in a search index    
    - [x] `indexing-suspend-search-index`: suspends one or more running search indexes
    - [x] `indexing-stop-search-index`: stops one or more running search indexes
    - [x] `indexing-resume-search-index`: resumes one or more paused search indexes
    - [x] `indexing-initialize-search-index-item-by-id`: rebuilds the index for a given tree with the specified root item by ID and index name
    - [x] `indexing-initialize-search-index-item-by-path`: rebuilds the index for a given tree with the specified root item by path and index name
    - [x] `indexing-remove-search-index-item-by-id`: removes the item with the specified ID from the search index
    - [x] `indexing-remove-search-index-item-by-path`: removes the item with the specified path from the search index
    - [ ] ~~`indexing-initialize-item`: initializes items with the PowerShell automatic properties for each field.~~ Skipped, no value for MCP server.
  - [x] Common
    - [x] `common-get-database`: returns information about Sitecore databases
    - [x] `common-get-cache`: returns information about Sitecore caches
    - [x] `common-get-item-template-by-id`: returns template information for a Sitecore item by ID
    - [x] `common-get-item-template-by-path`: returns template information for a Sitecore item by path
    - [x] `common-get-item-reference-by-id`: returns item references (where it is used) for a Sitecore item by ID
    - [x] `common-get-item-reference-by-path`: returns item references (where it is used) for a Sitecore item by path
    - [x] `common-get-item-referrer-by-id`: returns items referring to a Sitecore item by ID (which items reference it)
    - [x] `common-get-item-referrer-by-path`: returns items referring to a Sitecore item by path (which items reference it)

- [ ] Sitecore CLI

### Tools selection

AI Agents may have limit on the amount of tools they can use. Please make sure that you have disabled the tools you don't need. It will make your agent faster, cheaper and more efficient.

## Installation

Add the following Model Context Protocol server to your Cursor, VS Code, Claud:

```json
    "Sitecore": {
        "type": "stdio",
        "command": "npx",
        "args": ["@antonytm/mcp-sitecore-server@latest"],
        "env": {
          "TRANSPORT": "stdio",
          "GRAPHQL_ENDPOINT": "https://xmcloudcm.localhost/sitecore/api/graph/",
          "GRAPHQL_SCHEMAS": "edge,master,core",
          "GRAPHQL_API_KEY": "{6D3F291E-66A5-4703-887A-D549AF83D859}",
          "GRAPHQL_HEADERS": "",
          "ITEM_SERVICE_DOMAIN": "sitecore",
          "ITEM_SERVICE_USERNAME": "admin",
          "ITEM_SERVICE_PASSWORD": "b",
          "ITEM_SERVICE_SERVER_URL": "https://xmcloudcm.localhost/",
          "POWERSHELL_DOMAIN": "sitecore",
          "POWERSHELL_USERNAME": "admin",
          "POWERSHELL_PASSWORD": "b",
          "POWERSHELL_SERVER_URL": "https://xmcloudcm.localhost/",
        }
    }
```

### Environment Variables Description

- `TRANSPORT`: The transport protocol to use. Options are `stdio` or `sse`.
- `GRAPHQL_ENDPOINT`: The GraphQL endpoint URL for the Sitecore instance.
- `GRAPHQL_SCHEMAS`: The Sitecore schemas to use for the GraphQL API, comma-separated.
- `GRAPHQL_API_KEY`: The API key for the GraphQL endpoint.
- `GRAPHQL_HEADERS`: Additional headers to include in the GraphQL requests.
- `ITEM_SERVICE_DOMAIN`: The domain for the Item Service API authentication. Default is `sitecore`.
- `ITEM_SERVICE_USERNAME`: The username for the Item Service API authentication.
- `ITEM_SERVICE_PASSWORD`: The password for the Item Service API authentication.
- `ITEM_SERVICE_SERVER_URL`: The base URL for the Item Service API.
- `POWERSHELL_DOMAIN`: The domain for the Sitecore PowerShell Remoting API authentication. Default is `sitecore`.
- `POWERSHELL_USERNAME`: The username for the Sitecore PowerShell Remoting API authentication.
- `POWERSHELL_PASSWORD`: The password for the Sitecore PowerShell Remoting API authentication.
- `POWERSHELL_SERVER_URL`: The base URL for the Sitecore PowerShell Remoting API.

## Resources list

- [x] `config`: returns the configuration of the server. Use it to check if everything is properly configured.

## Local Installation / Development

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to build the project
4. Run `npm start` to start the server

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.
