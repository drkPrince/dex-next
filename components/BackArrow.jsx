
import {forwardRef} from 'react'

const BackArrow = forwardRef(({ onClick, href }, ref) => {
	
  return (
    <a href={href} onClick={onClick} ref={ref}>
      	<div>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width='28' ><path fill="none" d="M0 0h24v24H0z"/><path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z" fill="white"/></svg>
		</div>
    </a>
  )
})


export default BackArrow