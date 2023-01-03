import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { ListPokemonUseCase } from "../@core/application/pokemon/list-pokemon.use-case";
import { container, Registry } from "../@core/intra/container-registry";
import { PokemonList } from "../utils/models";

type HomeProps = {
  list: PokemonList[];
};

const Home: NextPage<HomeProps> = ({ list }) => {
  return (
    <div>
      <h1>Ecommerce teste</h1>
      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      <Image src="/palmeiras.png" alt="Palmeiras Logo" width={500} height={500} />
      <ul>
        {list.map((i) => (
          <li key={i.name}>
            <label>Nome:</label> {i.name}|
            <Link href={`/pokemon/${i.name}`} passHref>
              <a href="">Ver</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const useCase = container.get<ListPokemonUseCase>(
    Registry.ListPokemonUseCase
  );

  const items = await useCase.execute();

  return {
    props: {
      list: items.map((i) => {
        return { name: i.name, url: i.url };
      }),
    },
  };
};
