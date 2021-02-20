import Head from 'next/head'
import axios from 'axios'
import Link from 'next/link'

export default function Home({data}) {
    console.log(data)
    return (
        <div>
            <Head>
                <title>Pokedex</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className='px-4 py-12'>
                <h1 className='text-5xl text-green-500 text-center'>Pokedex - Gotta Catch em all!</h1>
                <div className='flex flex-wrap w-full justify-center mt-8'>
                    {data.results.map(pokemon => {

                        const poke_id = pokemon.url.split('/')[6]
                        const padded_poke_id = poke_id.padStart(3, '0')
                        return (
                            <Link href={`/pokemon/${poke_id}`} key={poke_id}>
                                <div className='mr-3 mb-4 bg-gray-200 p-3 rounded text-center cursor-pointer'>
                                    <div className='w-32'>
                                        <img src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/thumbnails-compressed/${padded_poke_id}.png`} alt="pokemon-img" loading='lazy'/>
                                    </div>
                                    <h3 className='capitalize mt-2'>{pokemon.name}</h3>
                                </div>
                            </Link>
                        )}
                        )
                    }
                </div>
            </main>
        </div>
    )
}



export async function getStaticProps(context) {
    const pokeData = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=150')
    return {
        props: {data: pokeData.data}, // will be passed to the page component as props
    }
}


//<img src={require(`../stuff/thumbnails-compressed/${padded_poke_id}.png`).default} alt="pokemon-img" loading='lazy'/>
