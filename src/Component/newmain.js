import { useState, useEffect } from 'react';
import Aside from './Aside';
import clear from '../assets/clear.png' ;
import clouds from '../assets/clouds.png' ;
import drizzle from '../assets/drizzle.png' ; 
import mist from '../assets/mist.png';
import rain from '../assets/rain.png';
import snow from '../assets/snow.png';
import humidity from '../assets/humidity.png';
import wind from '../assets/wind.png';


const Main2 = () =>{
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const day = ["Sunday","Monday","Tuesday","Wednesday","Thusday","Friday","Sataurday"];

    
    const dateTime = new Date()
    // const tommorow = day[dateTime.getDay() + 1]
    // const [weatherCity, setWeatherCity] = useState('')
    const [Weather, setWeather] = useState([])
    const [Forecast, setforecast] = useState([])
    const fetchItems = (city) =>{
        const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=7&appid=25af674f7bf77755ab4c79cc57509d96&units=metric`
        fetch(weatherUrl)
        .then((response) => response.json())
        .then((json) =>{
            // console.log([json].map(item => item))
            setWeather([json])
        });
    }
    
    const currentCity = (city) =>{
        fetchItems(city);
    }


    const fetchItems2 = (city) =>{
        const weatherUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/abohar?unitGroup=metric&include=days&key=MR74L6385F3K2DXH3G225U68L&contentType=json`
        fetch(weatherUrl)
        .then((response) => response.json())
        .then((json) =>{
           const forecast = [json].map(item => item.days)
            const today = forecast[0].shift()
            setforecast(forecast)
        });
    }
    fetchItems2()

    return (
        <>
            <main>
                <Aside 
                    currentCity = {currentCity}
                />
                <section className="weathercontainer">
                    <div className="TodayWeather">
                        <div className="wrapper">
                            {Weather.length ?(
                                <>
                                    {Weather.map(item => (
                                        <>
                                        <h2>{item.address}</h2>
                                        <h2>{item.days[0].temp} °C</h2>
                                        <img src={item.days[0].icon === "clear-day" || "clear-night" ? `${clear}`: item.days[0].icon === "partly-cloudy-day" ? `${mist}` : item.days[0].icon ==  "cloudy" || "partly-cloudy-night" ? `${clouds}` : item.days[0].icon == "showers-day" || "showers-night" || "fog" ? `${drizzle}` : item.days[0].icon == "snow" || "snow-showers-day" || "snow-showers-night" ? `${snow}` : `${rain}`}  alt="this is an weather"/>
                                        <p>{item.days[0].conditions}</p>
                                        </>
                                    ))}
                                </>
                            ):(
                                <>
                                    <h2>City</h2>
                                    <h2>-- °C</h2>
                                    <img src={clear}  alt="this is an weather"/>
                                    <p>Clear</p>
                                </>
                                
                            )}
                        
                            <p>{day[dateTime.getDay()]}  {dateTime.getDate()}  {month[dateTime.getMonth()]}</p>
                        </div>
                    </div>
                    
                    <div className="Wind_humidity">
                        <div className="wrapper">
                            <div className="wind">
                                <img src={wind} alt="this is an weather "/>
                                {Weather.length ?(
                                    <>
                                        {Weather.map(item => (
                                            <h2>{item.days[0].windspeed} Km/h <span>Speed</span></h2>
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
                                        {Weather.map(item => (
                                            <h2>Humidity {item.days[0].humidity} %</h2>
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
                            {Weather.length ? (
                                <>
                                {Weather.map(item => (
                                <div className='wrapper'> 
                                        <img src={item.list[1].weather[0].main === "Clear" ? `${clear}`: item.list[1].weather[0].main === "Mist" ? `${mist}` : item.list[1].weather[0].main == "Clouds" ? `${clouds}` : item.list[1].weather[0].main == "Haze" ? `${drizzle}` : item.list[1].weather[0].main == "Snow" ? `${snow}` : `${rain}`}  alt="this is an weather"/>
                                        <p>{item.days[1].temp} °C</p>
                                        <p>{item.days[1].conditions}</p>
                                        
                                    </div>
                                ))}
                                    
                                </>
                                
                                ):(
                                    <p>-- °C</p>
                                )}
                            </li>
                            <li className="forcast">
                                <div className='wrapper'>
                                {Weather.length ? (
                                    <> 
                                        {Weather.map(item => (
                                            <>
                                                <img src={item.list[2].weather[0].main === "Clear" ? `${clear}`: item.list[2].weather[0].main === "Mist" ? `${mist}` : item.list[2].weather[0].main == "Clouds" ? `${clouds}` : item.list[2].weather[0].main == "Haze" ? `${drizzle}` : item.list[2].weather[0].main == "Snow" ? `${snow}` : `${rain}`}  alt="this is an weather"/>
                                                <p>{item.days[2].temp} °C</p>
                                                <p>{item.days[2].conditions}</p>
                                            </>
                                        ))}
                                    </>
                                ):(
                                    <p>-- °C</p>
                                )}
                                </div>
                            </li>
                            <li className="forcast">
                                <div className='wrapper'> 
                                {Weather.length ? (
                                    <>
                                        {Weather.map(item => (
                                            <>
                                                <img src={item.list[3].weather[0].main === "Clear" ? `${clear}`: item.list[3].weather[0].main === "Mist" ? `${mist}` : item.list[3].weather[0].main == "Clouds" ? `${clouds}` : item.list[3].weather[0].main == "Haze" ? `${drizzle}` : item.list[3].weather[0].main == "Snow" ? `${snow}` : `${rain}`}  alt="this is an weather"/>
                                                <p>{item.days[3].temp} °C</p>
                                                <p>{item.days[3].conditions}</p>
                                            </>
                                        ))}
                                    </>
                                ):(
                                    <p>-- °C</p>
                                )}
                                </div>
                            </li>
                            <li className="forcast">
                                <div className='wrapper'> 
                                {Weather.length ? (
                                    <>
                                        {Weather.map(item => (
                                            <>
                                                <img src={item.list[4].weather[0].main === "Clear" ? `${clear}`: item.list[4].weather[0].main === "Mist" ? `${mist}` : item.list[4].weather[0].main == "Clouds" ? `${clouds}` : item.list[4].weather[0].main == "Haze" ? `${drizzle}` : item.list[4].weather[0].main == "Snow" ? `${snow}` : `${rain}`}  alt="this is an weather"/>
                                                <p>{item.days[4].temp} °C</p>
                                                <p>{item.days[4].conditions}</p>
                                            </>
                                        ))}
                                    </>
                                ):(
                                    <p>-- °C</p>
                                )}
                                </div>
                            </li>
                            <li className="forcast">
                                <div className='wrapper'> 
                                {Weather.length ? (
                                    <>
                                        {Weather.map(item => (
                                            <>
                                                <img src={item.days[5].icon === "clear-day" || "clear-night" ? `${clear}`: item.days[5].icon === "partly-cloudy-day" ? `${mist}` : item.days[5].icon ==  "cloudy" || "partly-cloudy-night" ? `${clouds}` : item.days[5].icon == "showers-day" || "showers-night" || "fog" ? `${drizzle}` : item.days[5].icon == "snow" || "snow-showers-day" || "snow-showers-night" ? `${snow}` : `${rain}`}  alt="this is an weather"/>
                                                <p>{item.days[5].temp} °C</p>
                                                <p>{item.days[5].conditions}</p>
                                            </>
                                        ))}
                                    </>
                                ):(
                                    <p>-- °C</p>
                                )}
                                </div>
                            </li>
                            <li className="forcast">
                                <div className='wrapper'> 
                                {Weather.length ? (
                                    <>
                                        {Weather.map(item => (
                                            <>
                                                <img src={item.days[6].icon === "clear-day" || "clear-night" ? `${clear}`: item.days[6].icon === "partly-cloudy-day" ? `${mist}` : item.days[6].icon ==  "cloudy" || "partly-cloudy-night" ? `${clouds}` : item.days[6].icon == "showers-day" || "showers-night" || "fog" ? `${drizzle}` : item.days[6].icon == "snow" || "snow-showers-day" || "snow-showers-night" ? `${snow}` : `${rain}`}  alt="this is an weather"/>
                                                <p>{item.days[6].temp} °C</p>
                                                <p>{item.list[6].weather[0].main}</p>
                                            </>
                                        ))}
                                     </>
                                ):(
                                    <p>-- °C</p>
                                )}
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Main2;