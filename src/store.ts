import create from 'solid-zustand';

interface FilterStore {
  filter: string;
  types: string[];
  selectedType: string;
}

export const useStore = create<FilterStore>(() => ({
  filter: '',
  types: [
    'Grass',
    'Poison',
    'Fire',
    'Flying',
    'Water',
    'Bug',
    'Normal',
    'Ground',
    'Fairy',
    'Fighting',
    'Rock',
    'Ground',
    'Psychic',
    'Electric',
    'Steel',
    'Ghost',
    'Ice',
    'Dragon',
    'Dark',
  ],
  selectedType: '',
}));
