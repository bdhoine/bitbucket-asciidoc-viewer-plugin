const WrmPlugin = require("atlassian-webresource-webpack-plugin");

module.exports = env => {
    return {
        entry: {
            "asciidoc-viewer": "./src/asciidoc-viewer.js"
        },
        output: {
            path: env.outputFolder,
            filename: "bundle.[name].js"
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
            ],
        },
        plugins: [
            new WrmPlugin({
                contextMap: {
                    "asciidoc-viewer": ["bitbucket.feature.files.fileHandlers"]
                },
                pluginKey: "com.github.bdhoine.bitbucket-asciidoc-viewer-plugin",
                providedDependencies: {
                    "bitbucket/feature/files/file-handlers": {
                        "dependency": "com.atlassian.bitbucket.server.bitbucket-web-api:file-handlers",
                        "import": {
                            "var": "require('bitbucket/feature/files/file-handlers')",
                            "amd": "bitbucket/feature/files/file-handlers"
                        }
                    }
                },
                xmlDescriptors: `${env.outputFolder}/${env.pluginDescriptorsFolder}/wr-defs.xml`
            })
        ],
        externals: {
            ajs: "AJS"
        }
    };
};
