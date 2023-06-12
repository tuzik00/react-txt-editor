const path = require('path');

module.exports = {
    stories: ['../src/**/*.stories.@(ts|tsx|mdx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/preset-create-react-app',
    ],
    features: { emotionAlias: false },
    framework: '@storybook/react',
    core: {
        builder: 'webpack5',
    },
    webpackFinal: async (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, '../src'),
        };

        config.resolve.extensions.push('.ts', '.tsx', '.svg');

        config.module.rules.forEach((rule, ruleIndex) => {
            if (rule?.oneOf?.length > 0) {
                rule?.oneOf.forEach((oneOf, oneOfIndex) => {
                    if (!Array.isArray(oneOf?.test) && /svg/.test(String(oneOf?.test))) {
                        config.module.rules[ruleIndex].oneOf[oneOfIndex] = {
                            test: /\.svg$/,
                            exclude: [/\.bg\.svg$/],
                            use: [
                                {
                                    loader: 'esbuild-loader',
                                    options: {
                                        loader: 'tsx',
                                        target: 'es2018',
                                    },
                                },
                                {
                                    loader: '@svgr/webpack',
                                    options: {
                                        svgo: true,
                                        svgoConfig: {
                                            pretty: true,
                                            plugins: ['removeDimensions'],
                                        }
                                    },
                                },
                            ],
                        };
                    }
                })
            }
        })

        return config;
    },
}
