import { describe, it, expect } from "vitest";
import { callTool } from "@modelcontextprotocol/inspector/cli/build/client/tools.js";
import { client, transport } from "../../../client";
import { getCurrentLayoutId } from "./get-current-layout-id";

await client.connect(transport);

// /sitecore/content/Home/Tests/Presentation/Set-Layout-By-Id
const itemId = "{9AC094BF-5EFD-4BE3-B04B-2C3CE926673B}";
const layoutOneId = "{7BDF4126-6FF2-413F-A85F-154FF6372F55}";
const layoutTwoId = "{65B0B63C-55B5-4348-A009-10AB428E50D3}";

describe("powershell", () => {
    it("presentation-set-layout-by-id", async () => {
        // Arrange
        const currentLayoutId = await getCurrentLayoutId(itemId, client);
        const expectedLayoutId = currentLayoutId.toLowerCase() === layoutOneId.toLowerCase() ?
            layoutTwoId.toLowerCase() : layoutOneId.toLowerCase();

        const setLayoutArgs: Record<string, any> = {
            itemId: itemId,
            layoutId: expectedLayoutId,
            layoutPath: "master:",
            language: "ja-jp",
            finalLayout: "true",
        };

        // Act
        await callTool(client, "presentation-set-layout-by-id", setLayoutArgs);

        // Assert
        const layoutId = await getCurrentLayoutId(itemId, client);
        expect(layoutId.toLowerCase()).toBe(expectedLayoutId.toLowerCase());
    });
});