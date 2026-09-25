import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Plate Platform',
  tagline: 'Enterprise AI Agent Governance & Control Plane',
  favicon: 'img/kovern-icon.svg',

  future: {
    v4: true,
  },

  url: 'https://plate-platform.github.io',
  baseUrl: '/plate-docs/',

  organizationName: 'plate-platform',
  projectName: 'plate-platform',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

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
          routeBasePath: '/',
          editUrl: 'https://github.com/plate-platform/plate-platform/edit/main/plate-docs/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    mermaid: {
      theme: {
        light: 'neutral',
        dark: 'dark',
      },
    },
    navbar: {
      title: '',
      logo: {
        alt: 'Plate Platform Docs',
        src: 'img/plate-logo.svg',
        srcDark: 'img/plate-logo.svg',
        width: 160,
        height: 32,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'plateSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/plate-platform/plate-platform',
          label: 'GitHub',
          position: 'right',
        },
      ],
      style: 'dark',
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Enterprise',
          items: [
            { label: 'Why Plate for Enterprise', to: '/' },
            { label: 'Agent Factory', to: '/agent-factory/overview' },
            { label: 'Kovern Governance', to: '/kovern/overview' },
          ],
        },
        {
          title: 'Use Cases',
          items: [
            { label: 'Multi-Team Deployment', to: '/agent-factory/use-case-multi-team' },
            { label: 'Multi-Cloud Governance', to: '/agent-factory/use-case-multi-cloud' },
            { label: 'Cost Runaway Prevention', to: '/kovern/use-case-cost-control' },
          ],
        },
        {
          title: 'Resources',
          items: [
            { label: 'GitHub', href: 'https://github.com/plate-platform/plate-platform' },
            { label: 'Kovern Operator', href: 'https://github.com/plate-platform/kovern' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Plate Platform. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['yaml', 'bash', 'typescript', 'go'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
