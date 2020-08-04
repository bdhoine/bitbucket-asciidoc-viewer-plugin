import fileHandlers from "bitbucket/feature/files/file-handlers";

import AsciidocHandler from "./asciidoc/asciidoc-handler";
import AsciidocView from "./asciidoc/asciidoc-view";

export const weight = 900;

export function handler(context) {
    const asciidocHandler = new AsciidocHandler(context);
    if (asciidocHandler.canHandleFile) {
        const asciidocView = new AsciidocView(context);
        asciidocView.render();

        return {
            destroy: function () {
                asciidocView.destroy();
            },
            asciidocView
        };
    }
}

fileHandlers.register({
    weight: weight,
    handle: handler
});
