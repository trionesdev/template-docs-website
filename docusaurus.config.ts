import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
    title: '北斗快速开发框架',
    tagline: '复杂的事情简单化，简单事情标准化',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://your-docusaurus-site.example.com',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'TrionesDev', // Usually your GitHub org/user name.
    projectName: 'docusaurus', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    // Please change this to your repo.
                },
                blog: {
                    showReadingTime: true,
                    feedOptions: {
                        type: ['rss', 'atom'],
                        xslt: true,
                    },
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                    // Useful options to enforce blogging best practices
                    onInlineTags: 'warn',
                    onInlineAuthors: 'warn',
                    onUntruncatedBlogPosts: 'warn',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],
    plugins: [
        [
            '@docusaurus/plugin-content-docs',
            {
                id: 'backend-spring-boot', // omitted => default instance
                path: 'docs-backend/spring-boot',
                routeBasePath: 'docs/backend/spring-boot',
                // sidebarPath: './sidebarsProduct.js',
                // ... other options
            },
        ],
        [
            '@docusaurus/plugin-content-docs',
            {
                id: 'frontend-react-antd', // omitted => default instance
                path: 'docs-frontend/react-antd',
                routeBasePath: 'docs/frontend/react-antd',
                // sidebarPath: './sidebarsProduct.js',
                // ... other options
            },
        ],
    ],
    themeConfig: {
        // Replace with your project's social card
        image: 'img/docusaurus-social-card.jpg',
        navbar: {
            title: 'TrionesDev',
            logo: {
                alt: 'My Site Logo',
                src: 'img/logo.svg',
            },
            items: [
                // {
                //     type: 'docSidebar',
                //     sidebarId: 'tutorialSidebar',
                //     position: 'left',
                //     label: 'Tutorial',
                // },
                // {to: '/blog', label: 'Blog', position: 'left'},
                {
                    to: '/docs/intro', label: '指南', position: 'right'
                },
                {
                    type: 'dropdown',
                    label: '服务端',
                    position: 'right',
                    items: [
                        {label: 'Spring Boot', to: '/docs/backend/spring-boot'}
                    ]
                },
                {
                    label: '前端', position: 'right', items: [
                        {label: 'React Antd', to: '/docs/frontend/react-antd'}
                    ]
                }
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Docs',
                    items: [
                        {
                            label: '书阙社区',
                            href: 'https://www.ithere.net',
                        },
                    ],
                },
                // {
                //     title: '北斗系列',
                //     items: [
                //         {
                //             label: '天枢信息化基座',
                //             href: 'https://discordapp.com/invite/docusaurus',
                //         },
                //         {
                //             label: '天玑物联网平台',
                //             href: 'https://stackoverflow.com/questions/tagged/docusaurus',
                //         },
                //         {
                //             label: '玉衡大数据平台',
                //             href: 'https://x.com/docusaurus',
                //         },
                //         {
                //             label: '玉衡即时通讯',
                //             href: 'https://x.com/docusaurus',
                //         }
                //     ],
                // },
            ],
            // logo: {
            //     alt: 'TrionesDev Logo',
            //     src: 'img/logo.svg',
            // },
            copyright: `Copyright © ${new Date().getFullYear()} TrionesDev, Inc. Built with Docusaurus.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,


};

export default config;
