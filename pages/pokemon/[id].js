import { useRouter } from 'next/router'

const PokeDetails = () => {
	const router = useRouter()
	console.log(router)
 	const {id} = router.query

 	return (
 		<div>
 	 		pokeDetails Id: {id}
 	 	</div>
 	 	)
}

export default PokeDetails