import { useRouter } from 'next/router'
import axios from 'axios'
import {useState, useEffect} from 'react'

import Basics from '../../components/Basics'


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
 		<div className=''>
			{pokeInfo && speciesInfo ? 
				<div className=''>
					<div className={`${baseColor} w-full flex justify-center items-center`}>
						<h1 className={`gb capitalize text-gray-100 py-2 rounded-md text-4xl`}>{pokeInfo.name}</h1>
					</div>
					<div className='text-gray-800 px-12'>
						<Basics id={id} name={pokeInfo.name} baseColor={baseColor} isLegendary={speciesInfo.is_legendary} types={pokeInfo.types} abilities={pokeInfo.abilities} genus={speciesInfo.genera[7].genus} weight={pokeInfo.weight} height={pokeInfo.height} fte={speciesInfo.flavor_text_entries} varieties={speciesInfo.varieties}/>
					</div>
				</div>
			: <div className='animate-pulse h-2/12 w-2/12 flex justify-center items-center w-full mt-64'>
				Loading...
			</div>}
		</div>
 	 	)
}

export default PokeDetails



