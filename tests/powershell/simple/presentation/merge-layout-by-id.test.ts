import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../client";
import { getCurrentLayoutId } from "../../tools/get-current-layout-id";

await client.connect(transport);

// /sitecore/content/Home/Tests/Presentation/Reset-Layout-By-Id
const itemId = "{CCBB4F6D-C64E-44A6-832D-66FECCA146ED}";

// /sitecore/layout/Layouts/Feature/Tests/Merge-Layout/Layout
const layoutId = "{A51BF5C0-CD68-48A5-884B-1BD4BD08D57C}";

describe("powershell", () => {
    it("presentation-merge-layout-by-id", async () => {
        // Arrange
        // Reset layout to ensure we have correct initial state before test.
        const resetLayoutArgs: Record<string, any> = {
            id: itemId,
            finalLayout: "true",
            language: "ja-jp",
        };
    
        
        await callTool(client, "presentation-reset-layout-by-id", resetLayoutArgs);

        // Set initial layout before test.

        const setLayoutArgs: Record<string, any> = {
            itemId,
            layoutId: layoutId,
            layoutPath: "master:",
            language: "ja-jp",
            finalLayout: "true",
        };

        // Initialize item initial state before test.
        await callTool(client, "presentation-set-layout-by-id", setLayoutArgs);

        const currentLayoutId = await getCurrentLayoutId(client, itemId, "true", "ja-jp");
        expect(currentLayoutId.toLowerCase()).toBe(layoutId.toLowerCase());

        const mergeLayoutArgs: Record<string, any> = {
            id: itemId,
            database: "master",
            language: "ja-jp",
        };

        // Act
        await callTool(client, "presentation-merge-layout-by-id", mergeLayoutArgs);

        // Assert
        const assertLayoutId = await getCurrentLayoutId(client, itemId, "false");
        expect(assertLayoutId.toLowerCase()).toBe(layoutId.toLowerCase());
    });
});