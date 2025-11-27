export const _options = [
  { key: '1', label: 'São Paulo' },
  { key: '2', label: 'Rio de Janeiro' },
  { key: '3', label: 'Campo Grande' },
  { key: '4', label: 'Goiania' },
  { key: '5', label: 'Uberlândia' },
  { key: '6', label: 'Salvador' },
  { key: '7', label: 'São Luis' },
  { key: '8', label: 'Manaus' },
  { key: '9', label: 'Rio Branco' },
];

export const map = new Map([
  [
    'São Paulo',
    [
      { key: 'SP1', label: 'São Paulo' },
      { key: 'SP2', label: 'Campinas' },
      { key: 'SP3', label: 'Santos' },
    ],
  ],
  [
    'Rio de Janeiro',
    [
      { key: 'RJ1', label: 'Rio de Janeiro' },
      { key: 'RJ2', label: 'Niterói' },
      { key: 'RJ3', label: 'Petrópolis' },
    ],
  ],
  [
    'Minas Gerais',
    [
      { key: 'MG1', label: 'Belo Horizonte' },
      { key: 'MG2', label: 'Uberlândia' },
      { key: 'MG3', label: 'Ouro Preto' },
    ],
  ],
  [
    'Bahia',
    [
      { key: 'BA1', label: 'Salvador' },
      { key: 'BA2', label: 'Feira de Santana' },
      { key: 'BA3', label: 'Ilhéus' },
    ],
  ],
  [
    'Paraná',
    [
      { key: 'PR1', label: 'Curitiba' },
      { key: 'PR2', label: 'Londrina' },
      { key: 'PR3', label: 'Maringá' },
    ],
  ],
]);

export type Option = { key: string; label: string };
