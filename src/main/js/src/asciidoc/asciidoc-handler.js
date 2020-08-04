export default class AsciidocHandler {
    constructor(context) {
        this.fileExtension = context.fileChange.path.extension;
        this.contentMode = context.contentMode;
    }

    get canHandleExtension() {
        const supportedExtensions = ["asciidoc", "adoc", "asc"];
        return supportedExtensions.indexOf(this.fileExtension) >= 0;
    }

    get canHandleContentMode() {
        return this.contentMode === "source";
    }

    get canHandleFile() {
        return this.canHandleExtension && this.canHandleContentMode;
    }
}
