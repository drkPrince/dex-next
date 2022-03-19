import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { data } from "../utils/allPoke";

export default function Home({ allPokemonData }) {
  const [pokemons, setPokemons] = useState(allPokemonData);

  const search = (term) =>
    setPokemons(
      allPokemonData.filter((d) =>
        d.name.toLowerCase().includes(term.toLowerCase())
      )
    );

  return (
    <div>
      <Head>
        <title>Pokédex</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 w-full h-1"></div>

      <main className="px-4 pt-12 pb-4 bg-gradient-to-r from-red-50 to-green-50 via-blue-50 min-h-screen">
        <div className="flex justify-center items-center">
          <div className="w-12 h-12">
            <img src="/pokedex.png" alt="pokeball" />
          </div>
          <h1 className="text-4xl md:text-6xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text text-center ml-2">
            Pokédex
          </h1>
        </div>
        <div className="mt-12 block sm:flex sm:justify-end sm:items-center sm:mr-12">
          <div className="flex justify-between items-center rounded pl-1 pr-3 mx-4 py-1 border-b border-gray-600">
            <input
              type="text"
              onChange={(e) => search(e.target.value)}
              className="bg-transparent outline-none"
            />
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"
                  fill="rgba(0,0,0,0.92)"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center flex-wrap w-full mt-8">
          {pokemons.length === 0 ? (
            <h3 className="text-gray-800 gn">Not found</h3>
          ) : (
            pokemons.map((pokemon) => {
              const poke_id = pokemon.url.split("/")[6];
              const padded_poke_id = poke_id.padStart(3, "0");
              return (
                <Link href={`/pokemon/${poke_id}`} key={poke_id}>
                  <div className="w-24 md:w-28 bg-white p-3 m-1 sm:m-2 rounded text-center cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-300">
                    <div className="w-20 h-20 md:w-24 md:h-24 flex justify-center items-center">
                      <img
                        src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/thumbnails-compressed/${padded_poke_id}.png`}
                        alt="pokemon-thumbnail"
                        className="w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="capitalize mt-2 text-gray-600 text-center text-xs w-full sm:text-sm">
                      {pokemon.name}
                    </h3>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </main>

      <footer className="px-12 pb-12 text-left mt-20 text-xs md:text-base gn font-bold tracking-wide text-gray-600 leading-loose space-y-3">
        <h3>
          Disclaimer - Pokemon and Pokédex are registered trademarks of their
          respective owners. No infringement intended. This is just a fun little
          side project.
        </h3>
        <h3 className="">
          Made with NextJS, TailwindCSS, PokeAPI and a lot of wonderful
          childhood memories. Deployed on Vercel.
        </h3>
        <div className="flex text-gray-800">
          <a
            className="hover:underline"
            href="https://github.com/drkPrince/dex-next"
          >
            Check out the code on Github
          </a>
          <svg
            className="mx-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z"
              fill="rgba(0,0,0,0.97)"
            />
          </svg>
        </div>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      allPokemonData: data,
    },
  };
}
