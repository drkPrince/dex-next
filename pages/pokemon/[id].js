import { useRouter } from 'next/router'
import axios from 'axios'
import {useState, useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'

import Basics from '../../components/Basics'
import Evolution from '../../components/Evolution'
import Stats from '../../components/Stats'
import Moves from '../../components/Moves'
import Loader from '../../components/Loader'
import BackArrow from '../../components/BackArrow'

const PokeDetails = () => {
	const router = useRouter()
 	const {id} = router.query

 	const [pokeInfo, setPokeInfo] = useState(null)
	const [speciesInfo, setSpeciesInfo] = useState(null)
	const [baseColor, setColor] = useState('')

 	useEffect(() => {
		setPokeInfo(null)
		setSpeciesInfo(null)
		axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
			.then(res => {
				setPokeInfo(res.data)
		    	setColor(`${res.data.types[0].type.name}`)	
			    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
			    	.then(res => setSpeciesInfo(res.data))
		})
	}, [id])


 	return (
 		<div className='bg-gradient-to-tr from-gray-200 via-gray-100 to-gray-50 w-full overflow-hidden'>
 			<Head>
		        <title>Pokémon - {id}</title>
		        <link rel="icon" href="/favicon.png" />
		        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
		    </Head>
			{pokeInfo && speciesInfo ? 
				<div className=''>
					<div className={`${baseColor} w-full flex justify-center items-center`}>
						<div className='absolute left-8 sm:left-10 md:left-20'>
							<Link href='/' passHref>
								<BackArrow width={28} />
							</Link>
						</div>
						<h1 className={`gb capitalize text-gray-100 py-2 rounded-md text-4xl`}>{pokeInfo.name}</h1>
					</div>
					<div className='text-gray-800 px-12 pb-20'>
						<Basics id={id} name={pokeInfo.name} baseColor={baseColor} isLegendary={speciesInfo.is_legendary} types={pokeInfo.types} abilities={pokeInfo.abilities} genus={speciesInfo.genera[7].genus} weight={pokeInfo.weight} height={pokeInfo.height} fte={speciesInfo.flavor_text_entries} varieties={speciesInfo.varieties}/>
						<Evolution chainURL={speciesInfo.evolution_chain.url} baseColor={baseColor} pokeID={id}/>
						<Stats speciesInfo={speciesInfo} baseColor={baseColor} />
						<Moves moves={pokeInfo.moves} baseColor={baseColor} />
						<div className={`${baseColor} px-4 py-2 rounded text-white text-center inline-flex items-center`} >
							<span className='mr-2'>
								<BackArrow  />
							</span>
							<span>
								<Link href='/'>Back to Home.</Link>
							</span>
						</div>
					</div>
				</div>
			: 
				<div className='h-screen'>
					<Loader />
				</div>
			}
		</div>
 	 	)
}

export default PokeDetails



