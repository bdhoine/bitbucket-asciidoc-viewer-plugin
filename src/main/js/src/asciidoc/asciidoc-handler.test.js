import AsciidocHandler from "./asciidoc-handler";
import context from "../../__mocks__/context";

describe("AsciidocHandler", () => {
    test.each(["asciidoc", "adoc", "asc"])(
        "Can handle '%s' files in source content mode", extension => {
            const asciidocHandler = new AsciidocHandler(context(extension));
            expect(asciidocHandler.canHandleFile).toBe(true);
        }
    );

    test("Can't handle '.txt' files", () => {
        const asciidocHandler = new AsciidocHandler(context("txt"));
        expect(asciidocHandler.canHandleFile).toBe(false);
    });

    test("Can't handle '.adoc' files in diff context mode", () => {
        const asciidocHandler = new AsciidocHandler(context("adoc", "diff"));
        expect(asciidocHandler.canHandleFile).toBe(false);
    });
});
