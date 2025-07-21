# Sitecore CLI

## Items serialization

### Push subcommand

The `push` command takes items serialized as `.yml` files on disk and pushes them to a destination Sitecore instance. The push operation uses serialization `Module.json` files to determine the items included in the serialization process. During the push operation, the serialization engine evaluates existing serialized items on the file system and performs a deep comparison of the same Items in the source Sitecore instance.

    `dotnet sitecore ser push`
    
| Parameter | Description |
|--|--|
| -i, --include | Specify module configurations to include. Supports module name, tags. Wildcards and multiple values are allowed. |
| -e, --exclude <exclude> | Specify module configurations to exclude explicitly. Supports module name, tags. Wildcards and multiple values are allowed. |
| -p, --publish | Publish synced items. Not recommended to use with Publishing Service due to performance drop. |


### Pull subcommand

The `pull` subcommand takes items from Sitecore, serializes them, and stores them as `.yml` files on a given file system path. The subcommand uses `Module.json` files to determine what items are included in the serialization process. During the pull operation, the serialization engine evaluates existing serialized items on disk and performs a deep comparison of the same items in the source Sitecore instance.

    `dotnet sitecore ser pull`
    

| Parameter | Description |
|--|--|
| -i, --include | Specify module configurations to include. Supports module name, tags. Wildcards and multiple values are allowed. |
| -e, --exclude | Specify module configurations to exclude explicitly. Supports module name, tags. Wildcards and multiple values are allowed. |

### Validate subcommand

The `validate` subcommand ensures file system integrity of serialized items and paths. Additionally, by using the `--fix (-f)` argument option flag, the command can attempt to auto-correct identified issues. The subcommand evaluates all serialized paths and subtrees on the file system configured in serialization `Module.json` files and performs the following checks on the file system:

 - Invalid physical path.
 - Orphaned parent ID.
 - Non-included item.
 - Empty folder.
 - Duplicate item ID.
 - Non-unique path.

`dotnet sitecore ser validate`

| Parameter | Description |
|--|--|
| -i, --include | Specify module configurations to include. Supports module name, tags. Wildcards and multiple values are allowed. |
| -e, --exclude <exclude> | Specify module configurations to exclude explicitly. Supports module name, tags. Wildcards and multiple values are allowed. |
| -f, --fix | Execute possible fix operations when validating the serialized items. |


## Indexing
This command automates indexing operations.

### List subcommand
Provides the list of available indexes from the environment

    `dotnet sitecore index list`

### Schema-populate subcommand
Populates the managed schema

`dotnet sitecore index schema-populate`

### Rebuild subcommand
Rebuilds sitecore index(es)

`dotnet sitecore index rebuild`

| Parameter | Description |
|--|--|
| -i, --indexes | Rebuild the specified indexes. |