export interface NavItem {
  id: string;
  abbr: string;
  label: string;
  href: string;
}

export const navigationItems: NavItem[] = [
  { id: 'chainmoray', abbr: 'CM', label: 'CHAIN MORAY', href: '#chainmoray' },
  { id: 'waterline', abbr: 'W', label: 'WATERLINE', href: '#waterline' },
  { id: 'mynetwork', abbr: 'MN', label: 'MY NETWORK', href: '#mynetwork' },
  { id: 'qnet', abbr: 'Q', label: 'QNET', href: '#qnet' },
  { id: 'stylies', abbr: 'S', label: 'STYLIES', href: '#stylies' },
];
