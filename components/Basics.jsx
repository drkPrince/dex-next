import axios from 'axios'
import {useState, useEffect} from 'react'
import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import Loader from './Loader'


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
			<Dialog isOpen={modal} onDismiss={closeModal} aria-label='Ability Information' >
				<div className='bg-white w-full leading-loose text-center md:py-8 md:px-12 rounded'>
					{abilityDesc ?
						<div>
							<h1 className='capitalize text-2xl text-gray-800'>{abilityDesc.name}</h1>
							<p className='text-xs md:text-base my-6 text-gray-600'>{abilityDesc.desc}</p>
							<span className='bg-red-500 rounded px-3 py-2 text-white hover:bg-red-600 cursor-pointer' onClick={closeModal}>Close</span>
						</div>
					: <Loader />}
				</div>
      		</Dialog>
			)
	}


	return (
		<div className='flex flex-col items-center py-5 px-4 h-full w-full overflow-hidden'>
			<Modal />
			<div className='flex justify-center items-center w-full mt-8 flex-col lg:flex-row h-full'> 

				<div className='w-3/4 lg:w-4/12 h-full flex justify-center lg:block'>
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
								<div className=" divTableCell w-2/3">
									<div className='flex flex-wrap'>
										{pokeTypes.map(type => 
											<div className={`flex items-center capitalize mb-2 mr-2 ${type} justify-center text-white rounded px-1`} key={type}>
												<span className={`icon mr-2`}>
													<img src={`/icons/${type}.svg`} alt='type'/>
												</span>
												<span className=''>{type}</span>
											</div>
										)}
									</div>
								</div>
							</div>
							<div className="divTableRow flex mb-4">
								<div className="divTableCell w-20 text-gray-600 text-right mr-6">Ability</div>
								<div className=" w-2/3 divTableCell flex justify-start flex-wrap">
									{abilities.map(x => <h1 onClick={(e)=>bringAbilityDesc(e, x.ability.url)} className={`hover:scale-110 transform transition-transform capitalize mr-2 text-gray-100 px-2 rounded cursor-pointer mb-3 ${baseColor}`} key={x.ability.name}>{x.ability.name}</h1>)}
								</div>
							</div>
							<div className="divTableRow flex">
								<div className="divTableCell w-20 text-gray-600 text-right mr-6">Forms</div>
								<div className=" w-2/3 divTableCell">
									<div className='flex flex-wrap justify-start'>
										{varieties.map(v => {
											const isDefault = v.is_default
											return <h2 className={`${baseColor} hover:scale-110 transform transition-transform capitalize rounded px-2  inline-block mr-4 text-gray-100 cursor-pointer mb-3`} key={v.pokemon.name} onClick={(e) => changeForm(e, isDefault)}>{v.pokemon.name}</h2>
										})}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='w-full lg:w-4/12 h-full fade-in mt-8 lg:mt-0 px-4 lg:px-0'>
					<img src={`https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${paddedID}${varietyToBeShown}.png`} alt="mainImage" />
				</div>

				<div className='w-full lg:w-4/12 h-full lg:pl-12 text-center mt-8 lg:mt-0 lg:text-right leading-relaxed'>
					{isLegendary ? <div className='rounded-full bg-purple-500 px-3 py-1 inline-block text-gray-100 text-sm shadow-xl'>Legendary</div> : null}
					<div className="mt-3">
						<h1 className='text-xl text-gray-600'>{genus}</h1>
						<h1 className='text-md text-gray-500 gn font-bold tracking-wide'>{extractFTE()}</h1>
					</div>
				</div>

			</div>
		</div>
	)
}

export default Basics


