import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  plateSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Why Plate for Enterprise?',
    },
    {
      type: 'category',
      label: '🏭 Agent Factory',
      collapsible: false,
      items: [
        'agent-factory/overview',
        'agent-factory/use-case-multi-team',
        'agent-factory/use-case-multi-cloud',
        'agent-factory/use-case-federated-catalog',
      ],
    },
    {
      type: 'category',
      label: '🛡️ Kovern Governance',
      collapsible: false,
      items: [
        'kovern/overview',
        'kovern/use-case-cost-control',
        'kovern/use-case-livelock',
        'kovern/use-case-compliance',
      ],
    },
  ],
};

export default sidebars;
