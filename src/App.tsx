import { useEffect, useState } from 'react';

function App() {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/pikachu') //요청 보냄
      .then((res) => res.json()) // 응답을 json으로 변환
      .then((data) => setPokemon(data)); // 변환된 데이터를 상태에 저장
  }, []);

  console.log(pokemon);

  return (
    <div>
      <h1>포켓몬 도감</h1>
      {pokemon ? (
        <div>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>{pokemon.name}</p>
        </div>
      ) : (
        <p>불러오는 중 ... </p>
      )}
    </div>
  );
}
export default App;
