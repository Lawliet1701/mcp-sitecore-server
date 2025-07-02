import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../../client";

await client.connect(transport);

describe("powershell", () => {
    it("common-add-item-version-by-id", async () => {
        // Arrange
        const itemId = "{57AAB557-7193-40DF-BBB4-8DF292776224}";
        const language = "en";
        const targetLanguage = "fr-CA";

        const args: Record<string, any> = {
            id: itemId,
            language: language,
            targetLanguage: targetLanguage
        };

        // Act
        await callTool(client, "common-add-item-version-by-id", args);

        // Assert
        const getItemArgs: Record<string, any> = {
            id: itemId,
            language: targetLanguage,
        };

        const result = await callTool(client, "provider-get-item-by-id", getItemArgs);
        const json = JSON.parse(result.content[0].text);
        
        expect(json.Obj).toBeDefined();

        // Cleanup
        const removeVersionArgs: Record<string, any> = {
            id: itemId,
            language: targetLanguage,
        };

        await callTool(client, "common-remove-item-version-by-id", removeVersionArgs);
    });
});
