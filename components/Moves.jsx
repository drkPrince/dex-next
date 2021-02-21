import {allMoves} from '../utils/allMoves'
import axios from 'axios'
import {useState} from 'react'

const Moves = ({moves, baseColor}) => 
{
	const [selectedGame, setGame] = useState('ultra-sun-ultra-moon')
	const [learnMethod, setMethod] = useState('level-up')
	const [moveData, setMoveData] = useState(null)
	const [modal, setModal] = useState(false)

	let gameList = ["red-blue", "yellow", "gold-silver", "crystal", "ruby-sapphire", "emerald", "firered-leafgreen", "diamond-pearl", "platinum", "heartgold-soulsilver", "black-white", "black-2-white-2", "x-y", "omega-ruby-alpha-sapphire", "sun-moon", "ultra-sun-ultra-moon"]

	const bringMovesData = (e, moveURL) => {
		setModal(true)
		axios.get(moveURL).then(res => {
			const englishFTE = res.data.flavor_text_entries.filter(ft => ft.language.name === 'en' && ft.version_group.name === 'ultra-sun-ultra-moon')
			setMoveData({data: res.data, fte: englishFTE})
		})
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
			<div className='flex w-full text-sm text-gray-700 py-2 cursor-pointer hover:bg-gray-200 transition-all duration-300' key={name} onClick={(e) => bringMovesData(e, moveURL)}>
				<div className='w-1/6 pl-4'>{name}</div>
				<div className='w-1/6'>{methodAndLevel[0].level_learned_at}</div>
				<div className='w-1/6'>{power}</div>
				<div className='w-1/6'>{pp}</div>
				<div className='w-1/6'>{accuracy}</div>
				<div className='w-1/6'>
					<div className={`icon ${type.toLowerCase()} w-20 flex`}>
						<img src={`/icons/${type.toLowerCase()}.svg`} alt="type-icon"/>
					</div>
				</div>
			</div>
			)
		else return null
	})

	const Modal = () => {
		const closeModal = () => {
			setMoveData(null)
			setModal(false)
		}
		return (
			<div className='fixed bg-opacity-50 bg-black flex justify-center items-center h-screen w-screen top-0 left-0 z-50'>
				<div className='w-1/2 h-1/2 bg-white shadow-2xl flex justify-center items-center flex-col py-8 px-12 rounded'>
					{moveData ? 
						<div className='w-full text-center capitalize flex-1'>
							<h1 className='text-3xl text-gray-800'>{moveData.data.name}</h1>
							<h2 className='text-gray-700 mt-1'>{moveData.data.type.name} type move</h2>
							<div className='flex justify-between w-full mt-6 text-gray-700'>
								<div className='text-center'>
									<h3>Accuracy</h3>
									<h4>{moveData.data.accuracy}</h4>
								</div>
								<div className='text-center'>
									<h3>Power</h3>
									<h4>{moveData.data.power}</h4>
								</div>
								<div className='text-center'>
									<h3>PP</h3>
									<h4>{moveData.data.pp}</h4>
								</div>
								<div className='text-center'>
									<h3>Priority</h3>
									<h4>{moveData.data.priority}</h4>
								</div>
							</div>
							<div className='mt-6'>
								<p className='text-gray-600'>{moveData.fte[0].flavor_text}</p>
							</div>
							<button className='bg-red-500 rounded px-2 py-1 text-white mt-6 hover:bg-red-600' onClick={closeModal}>Close</button>
						</div>
						: null
					}
				</div>
			</div>
			)
	}


	return (
		<div className='pb-12'>
			{modal && <Modal />}
			<div className='flex justify-center items-center'>
				<h1 className={`${baseColor} text-gray-100 px-2 py-1 rounded-md text-2xl`}>Move Pool</h1>
			</div>
			<div className='flex justify-center mb-3 text-gray-900 w-full mt-12'>
				<div className={`mx-4 rounded-full px-2 py-1 cursor-pointer text-gray-100 hover:shadow-2xl transition-shadow duration-500 ${baseColor} ${learnMethod === 'level-up' ? 'selected' : null}`} onClick={() => setMethod('level-up')}>Level Up</div>
				<div className={`mx-4 rounded-full px-2 py-1 cursor-pointer text-gray-100 hover:shadow-2xl transition-shadow duration-500 ${baseColor} ${learnMethod === 'tutor' ? 'selected' : null}`} onClick={() => setMethod('tutor')}>Tutor</div>
				<div className={`mx-4 rounded-full px-2 py-1 cursor-pointer text-gray-100 hover:shadow-2xl transition-shadow duration-500 ${baseColor} ${learnMethod === 'machine' ? 'selected' : null}`} onClick={() => setMethod('machine')}>Machine</div>
			</div>
			<div className="divTable px-16">
				<div className="body flex flex-col">
					<div className={`row flex w-full border-b-2 shadow-2xl pr-4 font-bold ${baseColor}-color`}>
						<div className="w-1/6 pl-4">Name</div>
						<div className="w-1/6">Level Learned</div>
						<div className="w-1/6">Power</div>
						<div className="w-1/6">PP</div>
						<div className="w-1/6">Accuracy</div>
						<div className="w-1/6">Type</div>
					</div>
					<div style={{height: '70vh'}} className='overflow-scroll py-3 bg-gray-50'>{finalMoves}</div>
				</div>
			</div>
			<div className='flex flex-wrap mt-4 justify-center'>
				{gameList.map(x => <h1 key={x} className={`text-gray-100 mr-4 rounded-full px-2 py-1 mb-2 capitalize hover:shadow-2xl transition-shadow duration-500 cursor-pointer ${baseColor} ${selectedGame === x ? 'selected' : null}`} onClick={() => setGame(x)}>{x.replace('-', ' ')}</h1>)}
			</div>
		</div>
	)
}

export default Moves