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
      // .map(fetch..)에 await가 없음. 20개 요청이 도시에 나가고 promise배열이 만들어짐
      const detailedList = await Promise.all(detailPromises);
      // promise.all 20개가 전부 끝날때까지 기다렸다가 실제 데이터 배열로 바꿔주는 로직

      setPokemonList(detailedList);
    }
    loadPokemon();
  }, []);

  return (
    <div>
      <h1>포켓몬 도감</h1>
      <ul className="pokemon-grid">
        {pokemonList.map((p) => (
          <li className="pokemon-card" key={p.name}>
            <img src={p.sprites.front_default} alt={p.name} />
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
