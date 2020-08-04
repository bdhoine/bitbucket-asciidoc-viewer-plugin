export default function (extension = "adoc", contentMode = "source") {
    return {
        fileChange: {
            commitRange: {
                untilRevision: {
                    id: "refs/heads/master"
                }
            },
            path: {
                extension,
                components: [
                    "folder",
                    "README.adoc"
                ]
            },
            repository: {
                project: {
                    key: "PK"
                },
                slug: "RS"
            }
        },
        contentMode,
        $container: document.createElement("container")
    };
}
