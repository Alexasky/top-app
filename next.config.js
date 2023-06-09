module.exports = {
    images: {
        domains: ['courses-top.ru'],
    },
    basePath: '/top-app',
    reactStrictMode: true,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg?$/,
            oneOf: [
                {
                    use: [
                        {
                            loader: '@svgr/webpack',
                            options: {
                                prettier: false,
                                svgo: true,
                                svgoConfig: {
                                    plugins: [
                                        {
                                            name: 'preset-default',
                                            params: {
                                                overrides: {
                                                    // disable plugins
                                                    removeViewBox: false,
                                                },
                                            },
                                        },
                                    ],
                                },
                                titleProp: true,
                            },
                        },
                    ],
                    issuer: {
                        and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
                    },
                },
            ],
        });

        return config;
    },
};
