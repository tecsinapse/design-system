export const selectOptions = [
  { label: 'Brasil', value: 'brasil' },
  { label: 'Alemanha', value: 'alemanha' },
  { label: 'Japão', value: 'japao' },
  { label: 'Canadá', value: 'canada' },
  { label: 'Austrália', value: 'australia' },
  { label: 'França', value: 'franca' },
  { label: 'Itália', value: 'italia' },
  { label: 'México', value: 'mexico' },
  { label: 'Portugal', value: 'portugal' },
  { label: 'Argentina', value: 'argentina' },
];

export const groupedOptions = new Map([
  [
    'América do Sul',
    [
      { label: 'Brasil', value: 'brasil' },
      { label: 'Argentina', value: 'argentina' },
    ],
  ],
  [
    'Europa',
    [
      { label: 'Alemanha', value: 'alemanha' },
      { label: 'França', value: 'franca' },
      { label: 'Itália', value: 'italia' },
    ],
  ],
  ['Ásia', [{ label: 'Japão', value: 'japao' }]],
  ['África', [{ label: 'África do Sul', value: 'africa-do-sul' }]],
  ['Oceania', [{ label: 'Austrália', value: 'australia' }]],
]);
