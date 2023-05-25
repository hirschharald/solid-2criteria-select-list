import {
  Component,
  createMemo,
  createResource,
  For,
  Suspense,
  ErrorBoundary,
} from 'solid-js';
import { useStore } from './store';

import './App.css';

interface Pokemon {
  id: number;
  name: {
    english: string;
  };
  type: string[];
}

const url = 'https://pokemon-api.deno.dev/pokemon';
const fetcher = () =>
  fetch(url).then((res) => res.json() as Promise<Pokemon[]>);
/////////////////////////////////////////////////////////////////////////////////////
const FilterInput: Component = () => {
  const state = useStore();

  const handleChange = (e) => {
    useStore.setState({ filter: e.target.value });
  };

  return <input value={state.filter} onInput={handleChange} />;
};
///////////////////////////////////////////////////////////////////////////////////
const FilterType: Component = () => {
  const state = useStore();

  const handleChange = (e) => {
    useStore.setState({ selectedType: e.target.value });
  };

  return (
    <select onChange={handleChange}>
      <option value="">Select type...</option>
      <For each={state.types}>
        {(item) => <option value={item}>{item}</option>}
      </For>
    </select>
  );
};
////////////////////////////////////////////////////////////////////////
const PokemonTable: Component = () => {
  const [data] = createResource(fetcher);
  const state = useStore();

  const pokemonFiltered = createMemo(() => {
    return (
      data()?.filter((p) => {
        const hasText = p.name.english
          .toLowerCase()
          .includes(state.filter.toLowerCase());
        const hasType = p.type.includes(state.selectedType);

        if (state.selectedType) {
          return hasType && hasText;
        }

        return hasText;
      }) ?? []
    );
  });

  return (
    <table>
      <tbody>
        <For each={pokemonFiltered()}>
          {(p) => (
            <tr>
              <td>{p.name.english}</td>
              <td>{p.type.join(', ')}</td>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
};
////////////////////////////////////////////////////////////////////////////////
const App: Component = () => {
  return (
    <div class="App">
      <FilterInput />
      <FilterType />
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary fallback={<div>Fetch error</div>}>
          <PokemonTable />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};

export default App;
