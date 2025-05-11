import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../../client";

await client.connect(transport);

describe("powershell", () => {
    it("security-get-domain", async () => {
        const result = await callTool(client, "security-get-domain", {});
        const json = JSON.parse(result.content[0].text);

        expect(json).toMatchObject({
            Obj: [
                {
                    ToString: "default",
                    AccountNameValidation: "^\\w[\\w\\s\\.\\@\\-]*$",
                    AccountPrefix: "default\\",
                    AnonymousUserEmailPattern: "",
                    AnonymousUserName: "default\\Anonymous",
                    EveryoneRoleName: "default\\Everyone",
                    MemberPattern: "default\\*",
                    Name: "default",
                    Appearance: {
                        ToString: "Sitecore.Data.Appearance",
                        DisplayName: "default",
                        HelpLink: "",
                        Icon: "",
                        LongDescription: "",
                        ShortDescription: "",
                        Style: "",
                    },
                    EnsureAnonymousUser: true,
                    IsDefault: true,
                    LocallyManaged: false,
                    DefaultProfileItemID: "",
                },
                {
                    ToString: "extranet",
                    AccountNameValidation: "^\\w[\\w\\s\\.\\@\\-]*$",
                    AccountPrefix: "extranet\\",
                    AnonymousUserEmailPattern: "",
                    AnonymousUserName: "extranet\\Anonymous",
                    EveryoneRoleName: "extranet\\Everyone",
                    MemberPattern: "extranet\\*",
                    Name: "extranet",
                    Appearance: {
                        ToString: "Sitecore.Data.Appearance",
                        DisplayName: "extranet",
                        HelpLink: "",
                        Icon: "",
                        LongDescription: "",
                        ShortDescription: "",
                        Style: "",
                    },
                    EnsureAnonymousUser: true,
                    IsDefault: false,
                    LocallyManaged: false,
                    DefaultProfileItemID: "",
                },
                {
                    ToString: "sitecore",
                    AccountNameValidation: "^\\w[\\w\\s\\.\\@\\-]*$",
                    AccountPrefix: "sitecore\\",
                    AnonymousUserEmailPattern: "",
                    AnonymousUserName: "sitecore\\Anonymous",
                    EveryoneRoleName: "sitecore\\Everyone",
                    MemberPattern: "sitecore\\*",
                    Name: "sitecore",
                    Appearance: {
                        ToString: "Sitecore.Data.Appearance",
                        DisplayName: "sitecore",
                        HelpLink: "",
                        Icon: "",
                        LongDescription: "",
                        ShortDescription: "",
                        Style: "",
                    },
                    EnsureAnonymousUser: false,
                    IsDefault: false,
                    LocallyManaged: false,
                    DefaultProfileItemID: "",
                },
            ],
        });
    });
});