import { useState } from 'react';
import Aside from './Aside';
import clear from '../assets/clear.png' ;
import clouds from '../assets/clouds.png' ;
import drizzle from '../assets/drizzle.png' ; 
import mist from '../assets/mist.png';
import rain from '../assets/rain.png';
import snow from '../assets/snow.png';
import humidity from '../assets/humidity.png';
import wind from '../assets/wind.png';


const Main = () =>{
    function getWeekDay(date) {
        let days = ["Sunday","Monday","Tuesday","Wednesday","Thusday","Friday","Saturday"]
         return days[date.getDay()];
        }
        
    const dateTime = new Date()
    
    const Date1 = new Date( dateTime.getFullYear() , dateTime.getMonth(), dateTime.getDate() + 1 )
    const Date2 = new Date( dateTime.getFullYear() , dateTime.getMonth(), dateTime.getDate() + 2 )
    const Date3 = new Date( dateTime.getFullYear() , dateTime.getMonth(), dateTime.getDate() + 3 )
    const Date4 = new Date( dateTime.getFullYear() , dateTime.getMonth(), dateTime.getDate() + 4 )
    const Date5 = new Date( dateTime.getFullYear() , dateTime.getMonth(), dateTime.getDate() + 5 )

    const day1 = getWeekDay(Date1)
    const day2 = getWeekDay(Date2)
    const day3 = getWeekDay(Date3)
    const day4 = getWeekDay(Date4)
    const day5 = getWeekDay(Date5)
    const [Weather, setWeather] = useState(JSON.parse(localStorage.getItem('Recentweather')) || [])
    
    const fetchItems = async (city) =>{
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=40&appid=25af674f7bf77755ab4c79cc57509d96&units=metric`
       try{
        const response = await fetch(weatherUrl)
        if(!response.ok) throw Error('Weather for This city Not found')
        const data = await response.json()
        setWeather([data])
        localStorage.setItem('Recentweather', JSON.stringify([data]))
        }catch (error){
        alert(error.message);
    }
    }
    
    const currentCity = (city) =>{
        fetchItems(city);
    }

    
    return (
        <>
            <main>
                <Aside 
                    currentCity = {currentCity}
                    setWeather={setWeather}
                />
                <section className="weathercontainer">
                    <div className="TodayWeather">
                        
                            {Weather.length ?(
                                <>
                                    {Weather.map(item => (
                                        <div className="wrapper" key={item.list[0].dt_txt}>
                                            <h2>{item.city.name}</h2>
                                            <h2>{item.list[0].main.temp} °C</h2>
                                            <img src={item.list[0].weather[0].main === "Clear" ? `${clear}`: item.list[0].weather[0].main === "Mist" ? `${mist}` : item.list[0].weather[0].main === "Clouds" ? `${clouds}` : item.list[0].weather[0].main === "Haze" ? `${drizzle}` : item.list[0].weather[0].main === "Snow" ? `${snow}` : `${rain}`}  alt="this is an weather"/>
                                            <p>{item.list[0].weather[0].main}</p>
                                            <p>{dateTime.toDateString()}</p>
                                        </div>
                                    ))}
                                </>
                            ):(
                                <div className='wrapper'>
                                    <h2>City</h2>
                                    <h2>-- °C</h2>
                                    <img src={clear}  alt="this is an weather"/>
                                    <p>Clear</p>
                                    <p>{dateTime.toDateString()}</p>
                                </div>
                                
                            )}
                        </div>
                    
                    
                    <div className="Wind_humidity">
                        <div className="wrapper">
                            <div className="wind">
                                <img src={wind} alt="this is an weather "/>
                                {Weather.length ?(
                                    <>
                                        {Weather.map((item, index) => (
                                            <h2 key={index}>{item.list[0].wind.speed} Km/h <span>Speed</span></h2>
                                        ))}
                                    </>
                                ):(
                                    <h2>-- Km/h <span>Speed</span></h2>
                                )} 
                            </div>
                            <div className="humidity">
                                <img src={humidity} alt="this is an weather "/>
                                {Weather.length ?(
                                    <>
                                        {Weather.map((item, index) => (
                                            <h2 key={index}>Humidity {item.list[0].main.humidity} %</h2>
                                        ))}
                                    </>
                                ):(
                                    <h2>Humidity -- %</h2>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="weekforcast">
                        <ul>
                            <li className="forcast">
                                <div className='wrapper'> 
                                {Weather.length ? (
                                    <>
                                        {Weather.map(item => (
                                            <div className='wrapper' key={item.list[8].dt_txt}>
                                                <img  src={item.list[8].weather[0].main === "Clear" ? `${clear}`: item.list[8].weather[0].main === "Mist" ? `${mist}` : item.list[8].weather[0].main === "Clouds" ? `${clouds}` : item.list[8].weather[0].main === "Haze" ? `${drizzle}` : item.list[8].weather[0].main === "Snow" ? `${snow}` : `${rain}`}  alt="this is an weather"/>
                                                <p>{item.list[8].main.temp} °C</p>
                                                <span>{item.list[8].weather[0].main}</span>
                                                
                                            </div>
                                        ))}
                                    </>
                                ):(
                                    <p>-- °C</p>
                                )}
                                    <p>{day1}</p>
                                </div>
                            </li>
                            <li className="forcast">
                                <div className='wrapper'>
                                {Weather.length ? (
                                    <> 
                                        {Weather.map(item => (
                                            <div className='wrapper' key={item.list[16].dt_txt}>
                                                <img  src={item.list[16].weather[0].main === "Clear" ? `${clear}`: item.list[16].weather[0].main === "Mist" ? `${mist}` : item.list[16].weather[0].main === "Clouds" ? `${clouds}` : item.list[16].weather[0].main === "Haze" ? `${drizzle}` : item.list[16].weather[0].main === "Snow" ? `${snow}` : `${rain}`}  alt="this is an weather"/>
                                                <p>{item.list[16].main.temp} °C</p>
                                                <span>{item.list[16].weather[0].main}</span>
                                                
                                            </div>
                                        ))}
                                    </>
                                ):(
                                    <p>-- °C</p>
                                )}
                                <p>{day2}</p>
                                </div>
                            </li>
                            <li className="forcast">
                                <div className='wrapper'> 
                                {Weather.length ? (
                                    <>
                                        {Weather.map(item => (
                                            <div className='wrapper' key={item.list[24].dt_txt}>
                                                <img  src={item.list[24].weather[0].main === "Clear" ? `${clear}`: item.list[24].weather[0].main === "Mist" ? `${mist}` : item.list[24].weather[0].main === "Clouds" ? `${clouds}` : item.list[24].weather[0].main === "Haze" ? `${drizzle}` : item.list[24].weather[0].main === "Snow" ? `${snow}` : `${rain}`}  alt="this is an weather"/>
                                                <p>{item.list[24].main.temp} °C</p>
                                                <span>{item.list[24].weather[0].main}</span>
                                                
                                            </div>
                                        ))}
                                    </>
                                ):(
                                    <p>-- °C</p>
                                )}
                                <p>{day3}</p>
                                </div>
                            </li>
                            <li className="forcast">
                                <div className='wrapper'> 
                                {Weather.length ? (
                                    <>
                                        {Weather.map(item => (
                                            <div className='wrapper' key={item.list[32].dt_txt}>
                                                <img  src={item.list[32].weather[0].main === "Clear" ? `${clear}`: item.list[32].weather[0].main === "Mist" ? `${mist}` : item.list[32].weather[0].main === "Clouds" ? `${clouds}` : item.list[32].weather[0].main === "Haze" ? `${drizzle}` : item.list[32].weather[0].main === "Snow" ? `${snow}` : `${rain}`}  alt="this is an weather"/>
                                                <p>{item.list[32].main.temp} °C</p>
                                                <span>{item.list[32].weather[0].main}</span>
                                                
                                            </div>
                                        ))}
                                    </>
                                ):(
                                    <p>-- °C</p>
                                )}
                                <p>{day4}</p>
                                </div>
                            </li>
                            <li className="forcast">
                                <div className='wrapper'> 
                                {Weather.length ? (
                                    <>
                                        {Weather.map(item => (
                                            <div className='wrapper' key={item.list[39].dt_txt}>
                                                <img  src={item.list[39].weather[0].main === "Clear" ? `${clear}`: item.list[39].weather[0].main === "Mist" ? `${mist}` : item.list[39].weather[0].main === "Clouds" ? `${clouds}` : item.list[39].weather[0].main === "Haze" ? `${drizzle}` : item.list[39].weather[0].main === "Snow" ? `${snow}` : `${rain}`}  alt="this is an weather"/>
                                                <p>{item.list[39].main.temp} °C</p>
                                                <span>{item.list[39].weather[0].main}</span>
                                                
                                            </div>
                                        ))}
                                    </>
                                ):(
                                    <p>-- °C</p>
                                )}
                                <p>{day5}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Main;
