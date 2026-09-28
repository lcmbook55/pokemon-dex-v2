import { useEffect, useState } from 'react';
interface pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

interface PokemonListItem {
  name: string;
  url: string;
}

function App() {
  const [pokemonList, setPokemonList] = useState<pokemon[]>([]);

  useEffect(() => {
    async function loadPokemon() {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20'); // async 함수로 데이터를 가져와서 await로 기다렸다가 처리
      const data = (await res.json()) as { results: PokemonListItem[] }; // 포켓몬 리스트아이템 배열로 데이터를 상태에 저장

      // fetch('https://pokeapi.co/api/v2/pokemon/pikachu') //요청 보냄
      //   .then((res) => res.json()) // 응답을 json으로 변환
      //   .then((data) => setPokemon(data)); // 변환된 데이터를 상태에 저장
      const detailPromises = data.results.map((item) => fetch(item.url).then((res) => res.json()));
      const detailedList = await Promise.all(detailPromises);

      setPokemonList(detailedList);
    }
    loadPokemon();
  }, []);

  return (
    <div>
      <h1>포켓몬 도감</h1>
      <ul>
        {pokemonList.map((p) => (
          <li key={p.name}>
            <img src={p.sprites.front_default} alt={p.name} />
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
