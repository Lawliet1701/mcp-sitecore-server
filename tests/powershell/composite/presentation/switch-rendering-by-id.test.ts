import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../client";
import { resetLayoutById } from "../../tools/reset-layout";

await client.connect(transport);

// /sitecore/content/Home/Tests/Presentation/Switch-Rendering-By-Id
const itemId = "{19BB2EBA-3025-484F-8D8C-8F978E6AC4E5}";

// /sitecore/layout/Renderings/Sample/Sample Rendering
const oldRenderingId = "{493B3A83-0FA7-4484-8FC9-4680991CF743}";

// /sitecore/layout/Renderings/Feature/Tests/Switch-Rendering/Expected Rendering
const newRenderingId = "{1C8B443B-E78A-4AE7-AB30-CB0166299877}";

const database = "master";
const language = "ja-jp";
const finalLayout = "true";

describe("powershell", () => {
    it("presentation-switch-rendering-by-id", async () => {
        // Arrange
        // Initialize item initial state before test.
        await resetLayoutById(client, itemId, database, language, finalLayout);

        const switchRenderingArgs: Record<string, any> = {
            itemId,
            oldRenderingId,
            newRenderingId,            
            database,
            finalLayout,
            language,
        };
        
        // Act
        await callTool(client, "presentation-switch-rendering-by-id", switchRenderingArgs);

        // Assert
        const getRenderingsArgs: Record<string, any> = {
            itemId,
            database,
            language,
            finalLayout,
        };
        
        const result = await callTool(client, "presentation-get-rendering-by-id", getRenderingsArgs);
        const resultJson = JSON.parse(result.content[0].text);
        const rendering = resultJson.Obj[2];
        expect(rendering.ItemID.toLowerCase()).toBe(newRenderingId.toLowerCase());
    });
});