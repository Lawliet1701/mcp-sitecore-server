import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../../client";

await client.connect(transport);

describe("powershell", () => {
    it("security-get-user-by-identity", async () => {
        const args: Record<string, string> = {
            identity: "admin",
        };
        const result = await callTool(client, "security-get-user-by-identity", args);
        const json = JSON.parse(result.content[0].text);
        
        expect(json).toMatchObject(
            {
                Obj: [
                    {
                        ToString: "Sitecore.Security.Accounts.User",
                        Delegation: {
                            ToString: "Sitecore.Security.Accounts.UserDelegation",
                        },
                        Domain: {
                            ToString: "sitecore",
                            AccountNameValidation: "^\\w[\\w\\s\\.\\@\\-]*$",
                            AccountPrefix: "sitecore\\",
                            AnonymousUserEmailPattern: "",
                            AnonymousUserName: "sitecore\\Anonymous",
                            Appearance: expect.anything(),
                            EveryoneRoleName: "sitecore\\Everyone",
                            MemberPattern: "sitecore\\*",
                            Name: "sitecore",
                            EnsureAnonymousUser: false,
                            IsDefault: false,
                            LocallyManaged: false,
                            DefaultProfileItemID: "",
                        },
                        Profile: {
                            ToString: "Sitecore.Security.UserProfile",
                            ClientLanguage: "",
                            Comment: "Sitecore Administrator",
                            ContentLanguage: "",
                            Email: "",
                            FullName: "Administrator",
                            Icon: "",
                            LegacyPassword: "",
                            ManagedDomainNames: "",
                            Notifications: "",
                            EngagementValue: "",
                            CurrentPosition: "",
                            Badges: "",
                            Name: "",
                            Portrait: "office/16x16/default_user.png",
                            ProfileItemId: "{AE4C4969-5B7E-4B4E-9042-B2D8701CE214}",
                            ProfileUser: "Sitecore.Security.Accounts.User",
                            RegionalIsoCode: "",
                            StartUrl: "",
                            State: "",
                            UserName: "sitecore\\admin",
                            Culture: {
                                ToString: "en-US",
                                LCID: 1033,
                                Name: "en-US",
                                DisplayName: "English (United States)",
                                IetfLanguageTag: "en-US",
                                ThreeLetterISOLanguageName: "eng",
                                ThreeLetterWindowsLanguageName: "ENU",
                                TwoLetterISOLanguageName: "en",
                            },
                            SerializedData: {
                                En: [
                                    {
                                        Key: "/sitecore\\\\admin/Shell/ShowDatabaseName",
                                        Value: true,
                                    },
                                    {
                                        Key: "WallpaperBackground",
                                        Value: "#07337C",
                                    },
                                    {
                                        Key: "WallpaperPosition",
                                        Value: "Cover",
                                    },
                                    {
                                        Key: "digestcredentialhash",
                                        Value: "71074d335e849629ebae2844eae3460a",
                                    },
                                    {
                                        Key: "digestcredentialhashwithoutdomain",
                                        Value: "19a27d233f54c9b09007d0532f4fdd43",
                                    },
                                ],
                            },
                            Properties: [
                                "System.Configuration.SettingsProperty",
                                "System.Configuration.SettingsProperty",
                                "System.Configuration.SettingsProperty",
                                "System.Configuration.SettingsProperty",
                                "System.Configuration.SettingsProperty",
                                "System.Configuration.SettingsProperty",
                                "System.Configuration.SettingsProperty",
                                "System.Configuration.SettingsProperty",
                                "System.Configuration.SettingsProperty",
                                "System.Configuration.SettingsProperty",
                                "System.Configuration.SettingsProperty",
                                "System.Configuration.SettingsProperty",
                                "System.Configuration.SettingsProperty",
                                "System.Configuration.SettingsProperty",
                                "System.Configuration.SettingsProperty",
                                "System.Configuration.SettingsProperty",
                                "System.Configuration.SettingsProperty",
                                "System.Configuration.SettingsProperty",
                                "System.Configuration.SettingsProperty",
                                "System.Configuration.SettingsProperty",
                                "System.Configuration.SettingsProperty",
                                "System.Configuration.SettingsProperty",
                                "System.Configuration.SettingsProperty",
                            ],
                            Providers: [
                                "Sitecore.Security.DisabledProfileProvider",
                                "System.Web.Profile.SqlProfileProvider",
                                "Sitecore.Security.SwitchingProfileProvider",
                            ],
                            PropertyValues: expect.any(Array),
                            Context: {
                                En: [
                                    {
                                        Key: "UserName",
                                        Value: "sitecore\\admin",
                                    },
                                    {
                                        Key: "IsAuthenticated",
                                        Value: false,
                                    },
                                ],
                            },
                            IsAdministrator: true,
                            IsAnonymous: true,
                            IsDirty: expect.any(Boolean),
                            IsSynchronized: false,
                            LastActivityDate: expect.any(String),
                            LastUpdatedDate: expect.any(String),
                        },
                        Roles: {
                            ToString: "Sitecore.Security.Accounts.Role",
                            IsEveryone: false,
                            IsGlobal: false,
                            AccountType: "Role",
                            Description: "Role",
                            DisplayName: "sitecore\\PowerShell Extensions Remoting",
                            LocalName: "sitecore\\PowerShell Extensions Remoting",
                            Name: "sitecore\\PowerShell Extensions Remoting",
                        },
                        RuntimeSettings: {
                            ToString: "Sitecore.SecurityModel.UserRuntimeSettings",
                            Properties: {
                            },
                            AddedRoles: [
                            ],
                            RemovedRoles: [
                            ],
                            IsAdministrator: false,
                            IsVirtual: false,
                        },
                        Identity: {
                            ToString: "Sitecore.Security.Principal.SitecoreIdentity",
                            AuthenticationType: "",
                            Name: "sitecore\\admin",
                            IsAuthenticated: false,
                        },
                        AccountType: {
                            ToString: "User",
                        },
                        IsAdministrator: true,
                        IsAuthenticated: false,
                        LocalName: "admin",
                        Description: "User",
                        DisplayName: "sitecore\\admin",
                        Name: "sitecore\\admin",
                        IsEnabled: true,
                        MemberOf: {
                            ToString: "Sitecore.Security.Accounts.Role",
                            IsEveryone: false,
                            IsGlobal: false,
                            AccountType: "Role",
                            Description: "Role",
                            DisplayName: "sitecore\\PowerShell Extensions Remoting",
                            LocalName: "sitecore\\PowerShell Extensions Remoting",
                            Name: "sitecore\\PowerShell Extensions Remoting",
                        },
                    },
                ],
            }
        );
    });
});