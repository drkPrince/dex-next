import axios from 'axios'
import {useState, useEffect} from 'react'


const Basics = ({id, name, weight, height, genus, types, abilities, fte, varieties, baseColor, isLegendary}) => 
{
	const [modal, setModal] = useState(false)
	const [abilityDesc, setAbility] = useState(null)
	const [varietyToBeShown, setVariety] = useState('')
	const paddedID = id.toString().padStart(3, '0')

	const pokeTypes = []
	types.map( t => pokeTypes.push(t.type.name))

	const extractFTE = () => {
		const englishFlavorTexts = []
		fte.forEach(ft => {
			if (ft.language.name === 'en') {
				englishFlavorTexts.push(ft.flavor_text)
			}
		})
		const arLen = englishFlavorTexts.length
		return englishFlavorTexts[arLen-1]
	}

	const changeForm = (e, isDefault) => {
		if(isDefault){
			setVariety('')
			return
		}
		const form_name = e.target.textContent
		const sliced = form_name.slice(form_name.indexOf('-') + 1)
		const split = sliced.split('-')
		if(split[0].startsWith('g')){
			setVariety('-Gigantamax')
			return
		}
		const cap = split.map(word => word[0].toUpperCase() + word.slice(1))
		setVariety(`-${cap.join('-')}`)
	}

	const bringAbilityDesc = (e, abilityURL) => {
		setModal(true)
		axios.get(abilityURL)
		.then(res => {
			res.data.effect_entries.forEach(a => {
				if(a.language.name==='en'){
					setAbility({name: e.target.textContent, desc: a.effect})
					return
			}})
		})
	}

	const Modal = () => {
		const closeModal = () => {
			setAbility(null)
			setModal(false)
		}
		return (
			<div className='fixed bg-opacity-50 bg-black flex justify-center items-center h-screen w-screen top-0 left-0 backdrop'>
				<div className='bg-white w-1/2 shadow-2xl text-center py-8 px-12 rounded'>
					{abilityDesc ?
						<div>
							<h1 className='capitalize text-2xl text-gray-800'>{abilityDesc.name}</h1>
							<p className='flex-1 mt-6 text-gray-700'>{abilityDesc.desc}</p>
							<button className='bg-red-500 border-2 border-red-500 rounded px-2 py-1 text-white mt-6 hover:bg-red-600' onClick={closeModal}>Close</button>
						</div>
					: <h1 className='w-full h-full'>Loading</h1>}
				</div>
			</div>				
			)
	}

	return (
		<div className='flex flex-col items-center py-5 px-4'>
			{modal && <Modal />}
			<div className='flex justify-center items-center w-full mt-8'> 

				<div className='w-4/12'>
					<div className="divTable text-gray-700 gl">
						<div className="divTableBody">
							<div className="divTableRow flex mb-5">
								<div className="divTableCell w-20 text-gray-600 text-right mr-6">ID</div>
								<div className=" w-2/3 divTableCell">#{id}</div>
							</div>
							<div className="divTableRow flex mb-5">
								<div className="divTableCell w-20 text-gray-600 text-right mr-6">Height</div>
								<div className=" w-2/3 divTableCell">{height/10} m</div>
							</div>
							<div className="divTableRow flex mb-5">
								<div className="divTableCell w-20 text-gray-600 text-right mr-6">Weight</div>
								<div className=" w-2/3 divTableCell">{weight/10} kgs</div>
							</div>
							<div className="divTableRow flex mb-4">
								<div className="divTableCell w-20 text-gray-600 text-right mr-6">Type</div>
								<div className=" w-2/3 divTableCell">
									{pokeTypes.map(type => 
										<div className={`icon ${type}`} key={type}>
											<img src={`/icons/${type}.svg`} alt='type'/>
								    	</div>
									)}
								</div>
							</div>
							<div className="divTableRow flex mb-4">
								<div className="divTableCell w-20 text-gray-600 text-right mr-6">Ability</div>
								<div className=" w-2/3 divTableCell flex justify-start flex-wrap">
									{abilities.map(x => <h1 onClick={(e)=>bringAbilityDesc(e, x.ability.url)} className={`capitalize mr-2 text-gray-100 px-2 rounded cursor-pointer mb-3 ${baseColor}`} key={x.ability.name}>{x.ability.name}</h1>)}
								</div>
							</div>
							<div className="divTableRow flex">
								<div className="divTableCell w-20 text-gray-600 text-right mr-6">Forms</div>
								<div className=" w-2/3 divTableCell">
									<div className='flex flex-wrap justify-start'>
										{varieties.map(v => {
											const isDefault = v.is_default
											return <h2 className={`${baseColor} capitalize rounded px-2  inline-block mr-4 text-gray-100 cursor-pointer mb-3`} key={v.pokemon.name} onClick={(e) => changeForm(e, isDefault)}>{v.pokemon.name}</h2>
										})}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='w-4/12 fade-in'>
					<img src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${paddedID}${varietyToBeShown}.png`} alt="mainImage" />
				</div>

				<div className='w-4/12 pl-12 text-right leading-relaxed'>
					{isLegendary ? <div className='rounded-full bg-purple-500 px-3 py-1 inline-block text-gray-100 text-sm shadow-xl'>Legendary</div> : null}
					<div className="mt-3">
						<h1 className='text-lg text-gray-600'>{genus}</h1>
						<h1 className='text-gray-500'>{extractFTE()}</h1>
					</div>
				</div>

			</div>
		</div>
	)
}

export default Basics


