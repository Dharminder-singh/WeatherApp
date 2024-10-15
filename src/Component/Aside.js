import { useState, useEffect, useMemo } from 'react' ;




const Aside = ({currentCity, setWeather}) => {

    const [items , setItems] = useState([])
    const [cityname , setCityName] = useState([])
    const [SearchCity, SetSearchCity] = useState('')
    const [recentItem , setRecentItem] = useState(JSON.parse(localStorage.getItem('RecentCities')) || [])

    useEffect( ()=>{
        const fetchItems = () =>{
        
            fetch("https://countriesnow.space/api/v0.1/countries/population/cities")
            .then((response) => response.json())
            .then((json) =>{ setItems(json)
                            console.log(json)
                })
            .catch((error) => {
                console.log(error);
            })
        }
        fetchItems();
    },[SearchCity])

    
    useMemo(()=>{ 
        
        if(SearchCity.length >=3){
            
            const result = items.filter((city) => {
                return city && city.name && city.name.toLowerCase().includes(SearchCity.toLowerCase())
                });
            setCityName(result)
        }else{
            setCityName([])
        }
    },[items, SearchCity])

    const additem = (value)=>{
        const mynewItem = cityname.find( item => item.id === value)
        const newcity = [mynewItem]
        if(recentItem.map(item => item.id).includes(Number(newcity.map(item => item.id)))){ 
            SetSearchCity('')
            setCityName([])
        }else{
            currentCity(mynewItem.name)
            const recentcitys = [...recentItem, mynewItem]
            setRecentItem(recentcitys)
            localStorage.setItem('RecentCities', JSON.stringify(recentcitys))
            SetSearchCity('')
            setCityName([])
            
        }
    }

    const ItemDelete = (id) =>{
        const ListItems = recentItem.filter((Item) => Item.id !== id);
        setRecentItem(ListItems)
        localStorage.setItem('RecentCities' , JSON.stringify(ListItems))
        
    }
    useEffect(()=>{
        if(!recentItem.length){
            setWeather([])
        }
    },[recentItem , setWeather])
    return(
        <>
        <aside className="sidebar">
                    <form onSubmit={(e)=> e.preventDefault() }>
                    <input className="citySearch" id="searchinput" type="text" placeholder="Search Your City" autoComplete='off' value={SearchCity}  onChange={(e) => SetSearchCity(e.target.value)} />
                    </form>
                    <div className='resultBox'>
                        <ul>
                            {cityname.map((item, index) =>(
                                <li key={index} value={item.name}onClick={() => additem(item.id)} >{item.name}
                                <br /><span>{item.state_name} , {item.country_name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='recentCity'>
                        <ul>
                        {recentItem.map((item, index) =>(
                                <li key={index} >
                                    <button className='delbutton' onClick={() =>ItemDelete(item.id)}>+</button>
                                    <p onClick={() => currentCity(item.name)}>
                                    {item.name}<br/>
                                    <span>{item.state_name} , {item.country_name}</span>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
        </>

    )
}

export default Aside ;
