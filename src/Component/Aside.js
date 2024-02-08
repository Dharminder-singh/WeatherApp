import { useState, useEffect, useMemo } from 'react' ;




const Aside = ({currentCity, setWeather}) => {

    const [items , setItems] = useState([])
    const [cityname , setCityName] = useState([])
    const [SearchCity, SetSearchCity] = useState('')
    const [recentItem , setRecentItem] = useState(JSON.parse(localStorage.getItem('RecentCities')) || [])

    // const Cities_API_Url = "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
    
    // var headers = new Headers();

    // headers.append("X-CSCAPI-KEY", "YWdtR3VmUXl6NEpGQWVwMHgzNFFSQmdIalZtdEtZNGR4eGZUdmh0dA==");

    // var requestOptions = {
    // method: 'GET',
    // headers: headers,
    // redirect: 'follow'
    // };

    // const fetchItems = useCallback(()=>{
    //         fetch("https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json")
    //         .then((response) => response.json())
    //         .then((json) =>{
    //             setItems(json)
    //         });
        
    // },[])

    
    useEffect( ()=>{
        const fetchItems = () =>{
        
            fetch("https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json")
            .then((response) => response.json())
            .then((json) =>{
                setItems(json)
            });
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
        if(recentItem.map(item => item.geonameid).includes(Number(newcity.map(item => item.id)))){ 
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
                    <input className="citySearch" id="searchinput" type="text" placeholder="Search Your City" autoComplete='off'  onChange={(e) => SetSearchCity(e.target.value)} />
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