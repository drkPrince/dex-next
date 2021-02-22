import {allMoves} from '../utils/allMoves'
import axios from 'axios'
import {useState} from 'react'
import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import Loader from './Loader'



const Moves = ({moves, baseColor}) => 
{
	const [selectedGame, setGame] = useState('ultra-sun-ultra-moon')
	const [learnMethod, setMethod] = useState('level-up')
	const [moveData, setMoveData] = useState(null)
	const [modal, setModal] = useState(false)

	let gameList = ["red-blue", "yellow", "gold-silver", "crystal", "ruby-sapphire", "emerald", "firered-leafgreen", "diamond-pearl", "platinum", "heartgold-soulsilver", "black-white", "black-2-white-2", "x-y", "omega-ruby-alpha-sapphire", "sun-moon", "ultra-sun-ultra-moon"]

	const bringMovesData = (e, moveURL) => {
		setModal(true)
		axios.get(moveURL)
			.then(res => {
				const englishFTE = res.data.flavor_text_entries.filter(ft => ft.language.name === 'en' && ft.version_group.name === 'ultra-sun-ultra-moon')
				setMoveData({data: res.data, fte: englishFTE})
			})
			.catch(e => console.log(e))
	}

	const finalMoves = moves.map(singleMoveFromAPI => {
		const moveStatsFromBigFat = allMoves.filter(bigFatMove => bigFatMove.ename.toLowerCase().replace(' ', '') === singleMoveFromAPI.move.name.replace('-', ''))

		const moveURL = singleMoveFromAPI.move.url
		
		const gamesWithThisMove = []
		const gamesInWhichItsPresent_learnMethod_levelLearned = []
		singleMoveFromAPI.version_group_details.forEach((gameDetails => {
			gamesWithThisMove.push(gameDetails.version_group.name)
			const obj = {'game_name': gameDetails.version_group.name, 'learn_method': gameDetails.move_learn_method.name, 'level_learned_at': gameDetails.level_learned_at }
			gamesInWhichItsPresent_learnMethod_levelLearned.push(obj)
		}))

		const methodAndLevel = gamesInWhichItsPresent_learnMethod_levelLearned.filter(x => x.game_name === selectedGame)

		const ml = moveStatsFromBigFat.length
		const name = ml && moveStatsFromBigFat[0].ename ? (moveStatsFromBigFat[0].ename) : (null)
		const power = ml && moveStatsFromBigFat[0].power ? (moveStatsFromBigFat[0].power) : ("-")
		const accuracy = ml && moveStatsFromBigFat[0].accuracy ? (moveStatsFromBigFat[0].accuracy) : ("-")
		const pp = ml && moveStatsFromBigFat[0].pp ? (moveStatsFromBigFat[0].pp) : ("-")
		const type = ml && moveStatsFromBigFat[0].type ? (moveStatsFromBigFat[0].type) : ('normal')

		if(gamesWithThisMove.includes(selectedGame) && methodAndLevel[0].learn_method === learnMethod  && name) 
			return (
			<div className='flex w-full justify-between text-xs lg:text-sm text-gray-700 py-2 cursor-pointer hover:bg-gray-300 transition-colors duration-400 items-center' key={name} onClick={(e) => bringMovesData(e, moveURL)}>
				<div className='lg:pl-4 w-2/12 overflow-hidden'>{name}</div>
				<div className='w-2/12 '>{methodAndLevel[0].level_learned_at}</div>
				<div className='w-1/12'>{power}</div>
				<div className='w-1/12'>{pp}</div>
				<div className='w-1/12'>{accuracy}</div>
				<div className='w-1/12'>
					<div className={`icon ${type.toLowerCase()} w-20 flex`}>
						<img src={`/icons/${type.toLowerCase()}.svg`} alt="type-icon"/>
					</div>
				</div>
			</div>
			)
		else return null
	})

	const Modal = () => {
		const close = () => {
			setModal(false)
			setMoveData(null)
		}
		
		return (
			<Dialog isOpen={modal} onDismiss={close} aria-label='Pokemon Move Information'>
				<div className='bg-white w-full leading-relaxed text-center md:py-8 md:px-12 rounded'>
					{moveData ? 
						<div className='w-full h-full text-center capitalize flex-1'>
							<h1 className={`text-4xl text-gray-800 ${baseColor}-color`}>{moveData.data.name}</h1>
							<h2 className='text-gray-500 mt-1'>{moveData.data.type.name} type move</h2>
							<div className='flex justify-between w-full mt-12 text-gray-700'>
								<div className='text-center'>
									<h3>Accuracy</h3>
									<h4>{moveData.data.accuracy ? moveData.data.accuracy : '-'}</h4>
								</div>
								<div className='text-center'>
									<h3>Power</h3>
									<h4>{moveData.data.power ? moveData.data.power : '-'}</h4>
								</div>
								<div className='text-center'>
									<h3>PP</h3>
									<h4>{moveData.data.pp ? moveData.data.pp : '-'}</h4>
								</div>
								<div className='text-center'>
									<h3>Priority</h3>
									<h4>{moveData.data.priority ? moveData.data.priority : '-'}</h4>
								</div>
							</div>
							<div className='my-6'>
								<p className='text-gray-600'>{moveData.fte[0].flavor_text}</p>
							</div>
							<span className='bg-red-500 rounded px-3 py-2 text-white hover:bg-red-600 cursor-pointer' onClick={close}>Close</span>
						</div>
						: <Loader />
					}
				</div>
		    </Dialog>
			)
	}


	return (
		<div className='pb-12 hidden sm:block'>
			<Modal />	
			<div className='flex justify-center items-center'>
				<h1 className={`${baseColor} text-gray-100 px-2 py-1 rounded-md text-3xl`}>Move Pool</h1>
			</div>
			<div className='flex justify-center mb-3 text-gray-900 w-full mt-8'>
				<div className={`mx-4 rounded-full px-2 py-1 cursor-pointer text-gray-100 hover:shadow-2xl transition-shadow duration-500 text-sm tracking-wide ${baseColor} ${learnMethod === 'level-up' ? 'selected' : null}`} onClick={() => setMethod('level-up')}>Level Up</div>
				<div className={`mx-4 rounded-full px-2 py-1 cursor-pointer text-gray-100 hover:shadow-2xl transition-shadow duration-500 text-sm tracking-wide ${baseColor} ${learnMethod === 'tutor' ? 'selected' : null}`} onClick={() => setMethod('tutor')}>Tutor</div>
				<div className={`mx-4 rounded-full px-2 py-1 cursor-pointer text-gray-100 hover:shadow-2xl transition-shadow duration-500 text-sm tracking-wide ${baseColor} ${learnMethod === 'machine' ? 'selected' : null}`} onClick={() => setMethod('machine')}>Machine</div>
			</div>
			<div className="divTable lg:px-16 my-10">
				<div className="body flex flex-col">
					<div className={`row flex justify-between w-full border-b-2 shadow-2xl pr-4 font-bold ${baseColor}-color text-sm lg:text-lg`}>
						<div className="w-2/12 lg:pl-4">Name</div>
						<div className="w-2/12">Level Learned</div>
						<div className="w-1/12">Power</div>
						<div className="w-1/12">PP</div>
						<div className="w-1/12">Accuracy</div>
						<div className="w-1/12">Type</div>
					</div>
					<div style={{height: '55vh'}} className='overflow-y-scroll overflow-x-hidden py-3 bg-transparent border-b border-gray-300'>{finalMoves}</div>
				</div>
			</div>
			
			<div className='flex justify-center'>
				<label htmlFor="game-selection" className='mr-4'>Select Game: </label>
				<select name="game-selection" value={selectedGame} onChange={(e)=>setGame(e.target.value)} >
					{gameList.map(x => <option key={x} value={x} className='capitalize text-xs'>{x.replace('-', ' ')}</option>)}
				</select>
			</div>
		</div>
	)
}

export default Moves