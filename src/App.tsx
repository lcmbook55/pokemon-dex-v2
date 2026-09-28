import { useEffect, useState } from 'react';

function App() {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/pikachu') //요청 보냄
      .then((res) => res.json()) // 응답을 json으로 변환
      .then((data) => setPokemon(data)); // 변환된 데이터를 상태에 저장
  }, []);

  console.log(pokemon);

  return <div>포켓몬 도감</div>;
}
export default App;
