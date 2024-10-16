import { useState, useEffect } from 'react' ;

const Aside = ({currentCity, setWeather}) => {

    const [cityname , setCityName] = useState([])
    const [SearchCity, SetSearchCity] = useState('')
    const [recentItem , setRecentItem] = useState(JSON.parse(localStorage.getItem('RecentCities')) || [])

    useEffect( ()=>{
        const fetchItems = () => {
        fetch("https://countriesnow.space/api/v0.1/countries/population/cities")
        .then((response) => response.json())
        .then((json) => {
          let mydata = json;

          if (SearchCity.length >= 3) {
            const result = mydata.data.filter(city =>{
              return city.city.toLowerCase().includes(SearchCity.toLowerCase())
            })
            setCityName(result);
            console.log(result)
          } else {
            setCityName([]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchItems();
    },[SearchCity])

    
    // useMemo(()=>{ 
        
    //     if(SearchCity.length >=3){
            
    //         const result = items.filter((city) => {
    //             return city && city.name && city.name.toLowerCase().includes(SearchCity.toLowerCase())
    //             });
    //         setCityName(result)
    //     }else{
    //         setCityName([])
    //     }
    // },[items, SearchCity])

    const additem = (value)=>{
        const mynewItem = cityname.find( item => item.city === value)
        const newcity = [mynewItem]
        if(recentItem.map(item => item.city).includes(newcity.map(item => item.city))){ 
            SetSearchCity('')
            setCityName([])
        }else{
            currentCity(mynewItem.city)
            const recentcitys = [...recentItem, mynewItem]
            setRecentItem(recentcitys)
            localStorage.setItem('RecentCities', JSON.stringify(recentcitys))
            SetSearchCity('')
            setCityName([])
            
        }
    }

    const ItemDelete = (city) =>{
        const ListItems = recentItem.filter((Item) => Item.city !== city);
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
                                <li key={index} value={item.city}onClick={() => additem(item.city)} >{item.city}
                                <br /><span>{item.country}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='recentCity'>
                        <ul>
                        {recentItem.map((item, index) =>(
                                <li key={index} >
                                    <button className='delbutton' onClick={() =>ItemDelete(item.city)}>+</button>
                                    <p onClick={() => currentCity(item.city)}>
                                    {item.city}<br/>
                                    <span>   
                                    {item.country}</span>
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
