
const Stats = ({speciesInfo: si, baseColor}) => 
{
	const calculateGender = (rate) => {
		if(rate === -1) return 'Genderless'
		return `${(1-rate/8)*100}% male, ${rate/8*100}% female.`
	}


	return (
		<div className='my-20 w-full overflow-hidden'>
			<div className='flex justify-center items-center mb-12'>
				<h1 className={`${baseColor} text-gray-100 px-2 py-1 rounded-md text-3xl`}>Species Data</h1>
			</div>
			<div className="flex flex-wrap justify-center">
				<div className='p-4 w-full bg-white md:w-64 shadow-md rounded-md md:m-3 mt-3  '>
					<h1 className='lg:text-xl text-gray-600 mb-1'>Base Happiness </h1>
					<p className='text-sm text-gray-500 tracking-wide gn font-bold mb-2'>The happiness when caught by a normal Pokéball; up to 255.</p>
					<span className={`text-xl text-white ${baseColor}-color py-1 rounded`}>{si.base_happiness}</span>
				</div>
				<div className='p-4 w-full bg-white md:w-64 shadow-md rounded-md md:m-3 mt-3  '>
					<h1 className='lg:text-xl text-gray-600 mb-1 '>Capture Rate </h1>
					<p className='text-sm text-gray-500 tracking-wide gn font-bold mb-2'>The higher the number, the easier the catch (upto 255).</p>
					<span className={`text-xl text-white ${baseColor}-color py-1 rounded`}>{si.capture_rate}</span>
				</div>
				<div className='p-4 w-full bg-white md:w-64 shadow-md rounded-md md:m-3 mt-3 '>
					<h1 className='lg:text-xl text-gray-600 mb-1'>Egg Group </h1>
					<p className='text-sm text-gray-500 tracking-wide gn font-bold'>A list of egg groups this species is a member of.</p>
					{si.egg_groups.map(e => <span key={e.name} className={`text-xl ${baseColor}-color py-1 capitalize mr-3 inline-block`}>{e.name}</span>)}
				</div>
				<div className='p-4 w-full bg-white md:w-64 shadow-md rounded-md md:m-3 mt-3  '>
					<h1 className='lg:text-xl text-gray-600 mb-1'>Growth </h1>
					<p className='text-sm text-gray-500 tracking-wide gn font-bold mb-2'>The rate at which this Pokémon species gains levels in a game.</p>
					<span className={`text-xl text-white ${baseColor}-color py-1 rounded capitalize`}>{si.growth_rate.name}</span>
				</div>
				<div className='p-4 w-full bg-white md:w-64 shadow-md rounded-md md:m-3 mt-3  '>
					<h1 className='lg:text-xl text-gray-600 mb-1'>Generation </h1>
					<p className='text-sm text-gray-500 tracking-wide gn font-bold mb-2'>The generation this Pokémon species was introduced in.</p>
					<span className={`text-xl text-white ${baseColor}-color py-1 rounded`}>{si.generation.url.split('/')[6]}</span>
				</div>
				<div className='p-4 w-full bg-white md:w-64 shadow-md rounded-md md:m-3 mt-3  '>
					<h1 className='lg:text-xl text-gray-600 mb-1'>Mythical </h1>
					<p className='text-sm text-gray-500 tracking-wide gn font-bold mb-2'>Whether or not this is a mythical Pokémon.</p>
					<span className={`text-xl text-white ${baseColor}-color py-1 rounded`}>{si.is_mythical ? "Yes" : 'No'}</span>
				</div>
				<div className='p-4 w-full bg-white md:w-64 shadow-md rounded-md md:m-3 mt-3  '>
					<h1 className='lg:text-xl text-gray-600 mb-1'>Habitat </h1>
					<p className='text-sm text-gray-500 tracking-wide gn font-bold mb-2'>The habitat this species can be encountered in a game.</p>
					<span className={`text-xl text-white ${baseColor}-color py-1 rounded capitalize`}>{si.habitat ? si.habitat.name : 'No Habitat'}</span>
				</div>
				<div className='p-4 w-full bg-white md:w-64 shadow-md rounded-md md:m-3 mt-3  '>
					<h1 className='lg:text-xl text-gray-600 mb-1'>Shape </h1>
					<p className='text-sm text-gray-500 tracking-wide gn font-bold mb-2'>The shape of this Pokémon for Pokédex search.</p>
					<span className={`text-xl text-white ${baseColor}-color py-1 rounded capitalize`}>{si.shape.name}</span>
				</div>
				<div className='p-4 w-full bg-white md:w-64 shadow-md rounded-md md:m-3 mt-3  '>
					<h1 className='lg:text-xl text-gray-600 mb-1'>Gender </h1>
					<p className='text-sm text-gray-500 tracking-wide gn font-bold mb-2'>Gender distibution of this pokemon.</p>
					<span className={`text-xl text-white ${baseColor}-color py-1 rounded capitalize`}>{calculateGender(si.gender_rate)}</span>
				</div>
			</div>
			
		</div>
	)
}

export default Stats