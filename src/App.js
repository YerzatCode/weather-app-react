import axios from 'axios'
import { Cloud, CloudFog, Sun, Wind } from 'lucide-react'
import { useState } from 'react'
import './App.css'
import Background from './components/Background'

const API_KEY = 'c7b5ca10aac885cb9585693719b4135b'

const sky = [
	{
		main: 'overcast clouds',
		icon: <Cloud size={64} />,
	},
	{
		main: 'Mist',
		icon: <CloudFog size={64} />,
	},
	{
		main: 'Clear',
		icon: <Sun size={64} />,
	},
	{
		main: 'Dust',
		icon: <Wind size={64} />,
	},
]

function App() {
	const [data, setData] = useState(null)
	const [city, setCity] = useState('')
	const [errorMsg, setErrorMsg] = useState()
	const searchCity = (e) => {
		if (e.key === 'Enter') {
			axios
				.get(
					`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}&lang=ru`
				)
				.then((res) => {
					setData(res.data)
					setErrorMsg('')
				})
				.catch((err) => {
					console.log(err)
					setErrorMsg(err?.response.data.message)
					setCity('')
				})
			setCity('')
		}
	}
	return (
		<div className='container'>
			<Background name={data?.name} />
			<div className='dec'>
				<input
					className='searchInput'
					placeholder='Напиши город'
					onChange={(e) => setCity(e.target.value)}
					value={city}
					onKeyPress={searchCity}
					type='text'
				/>
				<div className='information_panel'>
					{errorMsg ? (
						<h1>Такого города не существует!!!</h1>
					) : (
						<>
							{data ? (
								<div className='weather'>
									<div className='weather_info'>
										<div className='weather_city'>
											<h1>{data?.name}</h1>

											{data &&
												sky.map((item) => {
													if (data?.weather[0].main === item.main) {
														return (
															<div key={item.description}>{item.icon} </div>
														)
													}
												})}
										</div>
										<h2 className='weather_name'>
											{data?.weather[0].description}
										</h2>
									</div>
									<div className='panel'>
										<div>
											<p>{data?.main.feels_like}&#176;</p>
											<strong>Чувствуется</strong>
										</div>
										<div>
											<p>{data?.main.temp}&#176;</p>
											<strong>Температура</strong>
										</div>
										<div>
											<p>{data?.main.humidity}%</p>
											<strong>Влажност</strong>
										</div>
										<div>
											<p>{data?.wind.speed}М/c</p>
											<strong>Скорость</strong>
										</div>
									</div>
								</div>
							) : (
								<h1>Напиши название города</h1>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default App
