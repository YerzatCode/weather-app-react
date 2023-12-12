import React from 'react'

const city = [
	{
		name: 'Алматы',
		color: {
			// backgroundImage: 'linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)',
		},
	},
	{
		name: 'Тараз',
		color: {
			// backgroundImage: 'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)',
		},
	},
	{
		name: 'Нур-Султан',
		color: {
			// backgroundImage: 'linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)',
		},
	},
]
function Background({ name }) {
	return (
		<div>
			{name ? (
				city.map((item) => {
					if (item.name == name) {
						return (
							<div
								key={item.name}
								className='background_city'
								style={item.color}
							/>
						)
					} else {
						return <div key={item.name} className='background' />
					}
				})
			) : (
				<div className='background' />
			)}
		</div>
	)
}

export default Background
