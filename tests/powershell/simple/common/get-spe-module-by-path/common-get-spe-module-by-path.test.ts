import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../../client";

await client.connect(transport);

describe("powershell", () => {
    it("common-get-spe-module-by-path", async () => {
        // Arrange
        const modulePath = "/sitecore/system/Modules/PowerShell/Script Library/JSS SXA/Basic Site";
        
        const args: Record<string, any> = {
            path: modulePath
        };

        // Act
        const result = await callTool(client, "common-get-spe-module-by-path", args);

        // Assert
        const json = JSON.parse(result.content[0].text);
        
        expect(json).toBeDefined();
        expect(json.Obj[0].ToString).toBe("Spe.Core.Modules.Module");
        expect(json.Obj[0].Name).toBe("Basic Site");
    });
});
