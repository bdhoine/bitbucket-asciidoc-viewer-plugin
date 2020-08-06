export default class AsciidocHandler {
    constructor(context) {
        this.fileExtension = context.fileChange.path.extension;
        this.contentMode = context.contentMode;
    }

    canHandleExtension() {
        const supportedExtensions = ["asciidoc", "adoc", "asc"];
        return supportedExtensions.indexOf(this.fileExtension) >= 0;
    }

    canHandleContentMode() {
        return this.contentMode === "source";
    }

    canHandleFile() {
        return this.canHandleExtension() && this.canHandleContentMode();
    }
}
