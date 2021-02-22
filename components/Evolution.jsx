import {useState, useEffect} from 'react'
import axios from 'axios'
import Link from 'next/link'

const Evolution = ({chainURL, baseColor, pokeID}) => 
{
	window.scrollTo(0, 0)
	let [chainInfo, setChainInfo] = useState(null)

	useEffect(() => {
		axios.get(chainURL).then(res => setChainInfo(res.data.chain))			
	}, [chainURL])


	const prepareData = () => 
	{
		let evolutionChainPrepared = [];
		do {
			const evolutionDetails = chainInfo.evolution_details[0]
			let evolutionReason = null
			for(let reason in evolutionDetails)
				{
					if(evolutionDetails[reason])
						{
						    evolutionReason = reason
							break
						}
				}
			evolutionChainPrepared.push({
					"species_name": chainInfo.species.name,
					"min_level": !evolutionDetails ? null : evolutionDetails.min_level,
					"evolution_reason": evolutionReason,
					"trigger_name": !evolutionDetails ? null : evolutionDetails.trigger.name,
					"url": chainInfo.species.url,
					"item": !evolutionDetails ? null : evolutionDetails.item
				});
			chainInfo = chainInfo.evolves_to[0];
		} while (chainInfo && chainInfo.hasOwnProperty('evolves_to'));

		return (
				<div className='md:px-8 md:mt-0 flex justify-around items-center flex-wrap'>
					{evolutionChainPrepared.map(pokemon => {
						const id = pokemon.url.split('/')[6]
						const p_id = id.padStart(3, '0')
						return (
							<div className='mt-8 md:mt-0 flex items-center justify-center bg-white shadow-sm cursor-pointer hover:shadow-2xl p-8 transition-shadow duration-500 rounded-md' key={id}>
								<Link href={`/pokemon/${id}`}>
									<div>
										<img src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/thumbnails-compressed/${p_id}.png`} alt="evo-images" />
										<h1 className={`${baseColor} px-2 py-1 mt-3 text-gray-100 text-center rounded-md tracking-wide`}>{pokemon.species_name}</h1>
									</div>
								</Link>
							</div>)
						})
					}
				</div>)
	}


	const show = () => {
		switch(pokeID)
		{
			case '133' : 
			case '134' : 
			case '135' : 
			case '136' : 
			case '196' : 
			case '197' : 
			case '470' : 
			case '471' : 
			case '700' : 

			{
				const id = chainInfo.species.url.split('/')[6]
				const p_id = id.padStart(3, '0')
				return (
					<div className='flex justify-between flex-col'>
						<div className='flex justify-center my-6'>
							<Link href={`/pokemon/${id}`} >
								<div className='bg-white shadow-sm cursor-pointer hover:shadow-2xl p-8 transition-shadow duration-500 rounded-md'>
									<img  src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/thumbnails-compressed/${p_id}.png`} alt="evo-images" />
									<h1 className={`${baseColor} px-2 py-1 mt-3 text-gray-100 text-center rounded-md tracking-wide`}>{chainInfo.species.name}</h1>
								</div>
							</Link>
						</div>
						<div className='flex justify-center flex-wrap mt-4'>{chainInfo.evolves_to.map(e => {
							const id = e.species.url.split('/')[6]
							const p_id = id.padStart(3, '0')
							return (
								<div className='bg-white shadow-sm cursor-pointer hover:shadow-2xl p-4 mx-2 transition-shadow duration-500 rounded-md' key={id}>
									<Link href={`/pokemon/${id}`}>
										<div>
											<img  src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/thumbnails-compressed/${p_id}.png`} alt="evo-images" />
											<h1 className={`${baseColor} px-2 py-1 mt-3 text-gray-100 text-center rounded-md tracking-wide`}>{e.species.name}</h1>
										</div>
									</Link>
								</div>
								)
							})}
						</div>
					</div>
					)
			}

			case '79': {
				const id = chainInfo.species.url.split('/')[6]
				const p_id = id.padStart(3, '0')
				return (
					<div className='flex justify-between flex-col'>
						<div className='flex justify-center '>
							<Link href={`/pokemon/${id}`} className='bg-white shadow-sm cursor-pointer hover:shadow-2xl p-8 transition-shadow duration-500 rounded-md'>
								<div>
									<img  src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/thumbnails-compressed/${p_id}.png`} alt="evo-images" />
									<h1 className={`${baseColor} px-2 py-1 mt-3 text-gray-100 text-center rounded-md tracking-wide`}>{chainInfo.species.name}</h1>
								</div>
							</Link>
						</div>
						<div className='flex justify-around flex-wrap mt-4'>{chainInfo.evolves_to.map(e => {
							const id = e.species.url.split('/')[6]
							const p_id = id.padStart(3, '0')
							return (
								<div className='bg-white shadow-sm cursor-pointer hover:shadow-2xl p-8 transition-shadow duration-500 rounded-md' key={id}>
									<Link href={`/pokemon/${id}`}>
										<div>
											<img  src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/thumbnails-compressed/${p_id}.png`} alt="evo-images" />
											<h1 className={`${baseColor} px-2 py-1 mt-3 text-gray-100 text-center rounded-md tracking-wide`}>{e.species.name}</h1>
										</div>
									</Link>
								</div>
								)
							})}
						</div>
					</div>
					)
			}

			case '789':
			case '790':
			case '791':
			case '792':
			 {
				const secondLayer = chainInfo.evolves_to[0].species
				const thirdLayer = chainInfo.evolves_to[0].evolves_to

				const id = chainInfo.species.url.split('/')[6]
				const p_id = id.padStart(3, '0')

				return (
					<div className='flex justify-around items-center flex-col md:flex-row'>
						<Link href={`/pokemon/${id}`}>
							<div className='bg-white shadow-sm cursor-pointer hover:shadow-2xl p-8 transition-shadow duration-500 rounded-md'>
								<img  src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/thumbnails-compressed/${p_id}.png`} alt="evo-images" />
								<h1 className={`${baseColor} px-2 py-1 mt-3 text-gray-100 text-center rounded-md tracking-wide`}>{chainInfo.species.name}</h1>
							</div>
						</Link>
						<Link href={`/pokemon/${secondLayer.url.split('/')[6]}`} >
							<div className='bg-white shadow-sm cursor-pointer hover:shadow-2xl p-8 transition-shadow duration-500 rounded-md mt-4 md:mt-0'>
								<img  src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/thumbnails-compressed/${secondLayer.url.split('/')[6].padStart(3, '0')}.png`} alt="evo-images" />
								<h1 className={`${baseColor} px-2 py-1 mt-3 text-gray-100 text-center rounded-md tracking-wide`}>{secondLayer.name}</h1>
							</div>
						</Link>
						<div>
							{thirdLayer.map(e => 
									<Link href={`/pokemon/${e.species.url.split('/')[6]}`} key={e.species.name}>
										<div className='bg-white shadow-sm cursor-pointer hover:shadow-2xl p-8 transition-shadow duration-500 rounded-md m-6'>
											<img  src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/thumbnails-compressed/${e.species.url.split('/')[6].padStart(3, '0')}.png`} alt="evo-images" />
											<h1 className={`${baseColor} px-2 py-1 mt-3 text-gray-100 text-center rounded-md tracking-wide`}>{e.species.name}</h1>
										</div>
									</Link>
								)}
						</div>
					</div>
					)
			}

			default: 
			{
				const finalChain = prepareData()
				return <div className='my-12'>{finalChain}</div>
			}
		}
	}

	return (
		<div className='my-16 capitalize w-full overflow-hidden'>
			<div className='flex justify-center items-center my-3'>
				<h1 className={`${baseColor} text-gray-100 px-2 py-1 rounded-md text-3xl`}>Evolution Chain</h1>
			</div>
			{chainInfo && show()}
		</div>
	)
}

export default Evolution

