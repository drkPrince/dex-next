import Head from 'next/head'
import Link from 'next/link'
import {data} from '../utils/allPoke'
import {useState} from 'react'

export default function Home() {
    const [pokemons, setPokemons] = useState(data)
    const [term, setTerm] = useState('')

    const search = () => {
        const filtered = data.filter(d => d.name.toLowerCase().includes(term.toLowerCase()))
        setPokemons(filtered)
    }

    const clear = () => {
        setTerm('')
        setPokemons(data)
    }

    return (
        <div>
            <Head>
                <title>Pokédex</title>
                <link rel="icon" href="/favicon.png" />
            </Head>

            <div className='bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 w-full h-1'>
                
            </div>

            <main className='px-4 py-12 bg-gradient-to-r from-red-50 to-green-50 via-blue-50'>
                <div className='flex justify-center items-center'>
                    <div className='w-12 h-12 --rotate-12 transform'>
                        <img src="/pokedex.png" alt="pokeball" />
                    </div>
                    <h1 className='text-4xl md:text-5xl text-red-400 text-center ml-2'>Pokédex</h1>
                </div>
                <div className='mt-12 block sm:flex sm:justify-end sm:items-center sm:mr-12'>
                    {(term || pokemons.length!==807) && <div onClick={clear} className='cursor-pointer py-1 bg-green-500 text-white px-2 rounded mb-4 sm:mb-0 text-center'>Clear filters</div>}
                    <div className='border-b border-gray-600 flex justify-between items-center rounded pl-1 pr-3 mx-4 py-1'>
                        <input type="text" value={term} onChange={(e)=>setTerm(e.target.value)} className=' bg-transparent outline-none ' />
                        <div onClick={search}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20"><path fill="none" d="M0 0h24v24H0z"/><path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" fill="rgba(0,0,0,0.92)"/></svg>
                        </div>
                    </div>
                </div>
              
                <div className='flex flex-wrap w-full justify-center mt-8'>
                    {pokemons.length === 0 ? 
                        <div className='flex items-center justify-center text-2xl'>
                            '{term}' is not Found.
                            <img className='ml-4' src="/pika.png" alt="pikachu" />
                        </div>
                        :
                        pokemons.map(pokemon => {
                        const poke_id = pokemon.url.split('/')[6]
                        const padded_poke_id = poke_id.padStart(3, '0')
                        return (
                            <Link href={`/pokemon/${poke_id}`} key={poke_id}>
                                <div className='mr-5 mb-4 bg-white p-3 rounded text-center cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-300'>
                                    <div className='w-24 h-24 flex justify-center items-center'>
                                        <img
                                            src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/thumbnails-compressed/${padded_poke_id}.png`}
                                            alt="pokemon-thumbnail"
                                            className='w-full h-full'
                                            loading='lazy'
                                        />
                                    </div>
                                    <h3 className='capitalize mt-2 text-gray-600'>{pokemon.name}</h3>
                                </div>
                            </Link>
                        )}
                        )
                    }
                </div>
                <div className="flex justify-center px-12 text-center my-20">
                    <h3 className='text-xl text-gray-500'>Disclaimer - Pokemon and Pokédex are registered trademarks of their respective owners. No infringement intended. This is just a fun little side project. Thanks to PokeAPI.</h3>
                </div>
            </main>
        </div>
    )
}

