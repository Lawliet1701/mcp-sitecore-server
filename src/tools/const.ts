const introspectionQuery = `
    query IntrospectionQuery {
      __schema {
        
        queryType { name kind }
        mutationType { name kind }
        subscriptionType { name kind }
        types {
          ...FullType
        }
        directives {
          name
          description
          
          locations
          args {
            ...InputValue
          }
        }
      }
    }

    fragment FullType on __Type {
      kind
      name
      description
      
      
      fields(includeDeprecated: true) {
        name
        description
        args {
          ...InputValue
        }
        type {
          ...TypeRef
        }
        isDeprecated
        deprecationReason
      }
      inputFields {
        ...InputValue
      }
      interfaces {
        ...TypeRef
      }
      enumValues(includeDeprecated: true) {
        name
        description
        isDeprecated
        deprecationReason
      }
      possibleTypes {
        ...TypeRef
      }
    }

    fragment InputValue on __InputValue {
      name
      description
      type { ...TypeRef }
      defaultValue
      
      
    }

    fragment TypeRef on __Type {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                  ofType {
                    kind
                    name
                    ofType {
                      kind
                      name
                      ofType {
                        kind
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
`;

export const dummyScheme = `
scalar Date

scalar DateTime

scalar DateTimeOffset

scalar Seconds

scalar Milliseconds

scalar Decimal

type ItemTemplateField {
  # The ID of the field.
  id(
    # .NET GUID format to use. N = short id, B = long id, etc.
    format: String = "N"
  ): ID
  # The name of the field.
  name: String!
  # Name of the field's section.
  section: String!
  # The sorting order defined for the section.
  sectionSortOrder: Int!
  # Boolean value indicating whether the field is shared among all languages and all numbered versions.
  shared: Boolean!
  # The sorting order defined for the field.
  sortOrder: Int!
  # The full path to the source of the field.
  source: String!
  # The title of the field.
  title: String!
  # The type of the field.
  type: String!
  # A boolean value indicating whether the field is unversioned.
  unversioned: Boolean!
}

scalar JSON

interface ItemField {
  # Properties describing the field.
  definition: ItemTemplateField
  # The ID of the field.
  id(
    # .NET GUID format to use. N = short id, B = long id, etc.
    format: String = "N"
  ): ID!
  # Raw value serialized into JSON format. For example, for an image field, it contains image specific properties such as 'src' and 'alt'.
  jsonValue: JSON!
  # The name of the field.
  name: String!
  # Raw value of the field.
  value: String
}

type PageInfo {
  # When paginating forwards, the cursor to continue.
  endCursor: String!
  # Indicates whether more pages exist.
  hasNext: Boolean!
}

type ItemTemplate {
  # List of inherited templates.
  baseTemplates: [ItemTemplate]
  # The list of the template fields, including inherited fields.
  fields: [ItemTemplateField]
  # The ID of the template.
  id(
    # .NET GUID format to use. N = short id, B = long id, etc.
    format: String = "N"
  ): ID!
  # The name of the template.
  name: String!
  # The list of template fields defined for this template (not inherited).
  ownFields: [ItemTemplateField]
}

type ItemUrl {
  # The host name of the item’s site, as resolved during export.
  hostName: String!
  # The URL path of the item (without scheme and domain name).
  path: String!
  # The scheme (http or https) of the item’s site, as resolved during export.
  scheme: String!
  # The name of the resolved site of the item.
  siteName: String!
  # The full URL of the item, as resolved during export.
  url: String!
}

type ItemLanguage {
  # A mapping of the englishName to the nativeName. For example, 'Spanish (Argentina) : español (Argentina)'.
  displayName: String!
  # The name of the language in English.
  englishName: String!
  # The language and locale. For example, 'es-AR'.
  name: String!
  # The native name of the language.
  nativeName: String!
}

interface Item {
  # Ancestors in the content hierarchy.
  ancestors(
    # If set to true, only items with presentation details are returned. If set to false, only items without presentation are returned. If not set, all items are returned.
    hasLayout: Boolean = null
    # Only consider items with these template IDs.
    includeTemplateIDs: [String] = []
  ): [Item]!
  # Children in the content hierarchy.
  children(
    # If set to true, only items with presentation details are returned. If set to false, only items without presentation are returned. If not set, all items are returned.
    hasLayout: Boolean = null
    # Only consider items with these template IDs.
    includeTemplateIDs: [String] = []
    # Limits the results to the first n children. Use with 'after' for pagination.
    first: Int = null
    # Cursor value. Use with 'first' for pagination.
    after: String = null
  ): ItemSearchResults
  # The display name of the item.
  displayName: String
  # Single field by name or ID.
  field(
    # The name or ID of the field.
    name: String!
  ): ItemField
  # All item fields.
  fields(
    # If true, returns the fields defined for the item template (not inherited from template ancestors).
    ownFields: Boolean = false
  ): [ItemField]!
  # Indicates whether the item has children.
  hasChildren(
    # If set to true, only items with presentation details are returned. If set to false, only items without presentation are returned. If not set, all items are returned.
    hasLayout: Boolean = null
    # Only consider items with these template IDs.
    includeTemplateIDs: [String] = []
  ): Boolean!
  # Unique ID of the item.
  id(
    # .NET GUID format to use. N = short id, B = long id, etc.
    format: String = "N"
  ): ID!
  # Information about the language.
  language: ItemLanguage!
  # Item information for every language defined for the item.
  languages: [Item]!
  # The name of the item.
  name: String!
  # Parent in the content hierarchy.
  parent: Item
  # The full path of the item in the content tree.
  path: String!
  # personalization info
  personalization: ItemPersonalization
  # Item presentation details.
  rendered: JSON!
  # Information about the template.
  template: ItemTemplate!
  # Location object properties. For example, 'hostName', 'path'.
  url: ItemUrl!
  # The newest version of the item.
  version: Int!
}

type ItemSearchResults {
  # Pagination info.
  pageInfo: PageInfo!
  # Found items.
  results: [Item]!
  # Total number of items.
  total: Int!
}

type ItemPersonalization {
  variantIds: [String]!
}

type KeyValuePair {
  # The key of the key-value pair.
  key: String!
  # The value of the key-value pair.
  value: String!
}

type Route {
  # Item representing the route path.
  route: Item!
  # The route path for a specific language.
  routePath: String!
}

type DictionaryResult {
  # Pagination info.
  pageInfo: PageInfo!
  # All dictionary entries for a specific language.
  results: [KeyValuePair]!
  # Total number of dictionary entries for the site in a specific language.
  total: Int!
}

type RoutesResult {
  # Pagination info.
  pageInfo: PageInfo!
  # All site routes for a specific language.
  results: [Route]!
  # Total number of routes for the site in a specific language.
  total: Int!
}

type ErrorHandlingInfo {
  # Item representing the notFound page path.
  notFoundPage: Item
  # The path to redirect to, if a page is not found.
  notFoundPagePath: String
  # Item representing the serverError page path.
  serverErrorPage: Item
  # The path to redirect to, if a generic error occurs.
  serverErrorPagePath: String
}

enum RedirectType {
  REDIRECT_301
  REDIRECT_302
  SERVER_TRANSFER
}

type RedirectInfo {
  # Information about whether the query string is preserved upon redirect.
  isQueryStringPreserved: Boolean!
  # Language name that should match request locale (used only for redirect items).
  locale: String!
  # The pattern to get paths by and apply redirection to.
  pattern: String!
  # Type of redirect ('REDIRECT_301', 'REDIRECT_302' or 'SERVER_TRANSFER').
  redirectType: RedirectType!
  # The path to redirect to.
  target: String!
}

type SiteInfo {
  # Additional site attributes.
  attributes: [KeyValuePair]
  # Dictionary for the site in a specific language.
  dictionary(
    # The site language to request.
    language: String!
    # Cursor value. Use with 'first' for pagination.
    after: String = null
    # Limits the results to the first n phrases. Use with 'after' for pagination.
    first: Int = null
  ): DictionaryResult
  # Error handling information for the site.
  errorHandling(
    # The site language to request.
    language: String!
  ): ErrorHandlingInfo
  # The configured host name attribute of the site.
  hostname: String
  # The configured default language.
  language: String
  # The name of the site.
  name: String!
  # Information about redirect rules for the site.
  redirects: [RedirectInfo]!
  # Information about the URLs search engine crawlers can/are allowed to access on the site.
  robots: String
  # The content path of the root item of the site.
  rootPath: String!
  # Routes for the site in a specific language.
  routes(
    # The site language to request.
    language: String!
    # Paths to include in the routes result.
    includedPaths: [String] = null
    # Paths to exclude from the routes result.
    excludedPaths: [String] = null
    # Cursor value. Use with 'first' for pagination.
    after: String = null
    # Limits the results to the first n routes. Use with 'after' for pagination.
    first: Int = null
  ): RoutesResult
  # List of urls to sitemap.xml media items.
  sitemap: [String]
}
`;