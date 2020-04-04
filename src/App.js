import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';
import listingsData from './ListingsData.js';
import Footer from './components/Footer.js';
import UpperFilters from './components/UpperFilters.js';
import styled from 'styled-components'


function App() {
  
  const [City, SetCity] = useState('All')
  const [HomeType, SetHomeType] = useState('All Homes')

  // if user select 1+ BR, output 
  const [Bedrooms, SetBedrooms] = useState(0)
  

  const [MinPrice, SetMinPrice] = useState(0);
  const [MaxPrice, SetMaxPrice] = useState(10000000);
  const [MinFloorSpace, SetMinFloorSpace] = useState(0);
  const [MaxFloorSpace, SetMaxFloorSpace] = useState(50000);

  
  const [Elevators, SetElevators] = useState(false);
  const [SwimmingPool, SetSwimmingPool] = useState(false);
  const [Basement, SetBasement] = useState(false);
  const [Gym, SetGym] = useState(false);

  // use this to map objects when option is 'All'
  let [FilteredData, SetFilteredData] = useState([])


  // user favorites
  let [UserFavorite,SetUserFavorite] = useState(false);
  let [UserColor,setUserColor] = useState('#FFF');  
  
  // User Search City (in upperfilter.js)
  let [UserSearchCity, setUserSearchCity] = useState('');

  // sort price as asc/desc
  let [PriceSort, setPriceSort] = useState('Lowest Price');


  const FilterData = ({data}, city, hometype, bedroom,
    minPrice, maxPrice, minFloorSpace, maxFloorSpace,
    elevators, swimmingpool, basement, gym
    ) => { 
     
    city = City;
    hometype = HomeType;
    bedroom = Bedrooms;
        
    minPrice = MinPrice;
    maxPrice = MaxPrice;    
    minFloorSpace=MinFloorSpace;
    maxFloorSpace=MaxFloorSpace;

    elevators=Elevators;
    swimmingpool=SwimmingPool;
    basement=Basement;
    gym=Gym;


    // take into account multiple option selection in the filter fields.


    useEffect(()=>{
      SetFilteredData(data)    
      
    },[data]);
    

    // map newData after when user made changes within filter section, so we can manipulate user selection

   
    if(city !== 'All'){
      FilteredData = FilteredData
      .filter(entry=>{return entry.city===city})
    }
    if(hometype !== 'All Homes'){
      FilteredData = FilteredData
      .filter(entry=>{return entry.homeType===hometype})
    }
    if(parseInt(bedroom) >= 0){
      FilteredData = FilteredData
      .filter(entry=>{return entry.rooms >= parseInt(bedroom)})
    }


    // price filter
    if((minPrice !== 0 && minPrice <= maxPrice) || (maxPrice !== 10000000 && minPrice <= maxPrice)){
      FilteredData = FilteredData
      .filter(entry=>{return entry.price >= minPrice && entry.price <= maxPrice})
    }
    // floorspace filter
    if((minFloorSpace !== 0 && minFloorSpace <= maxFloorSpace) || (maxFloorSpace !== 10000000 && minFloorSpace <= maxFloorSpace)){
      FilteredData = FilteredData
      .filter(entry=>{return entry.floorSpace >= minFloorSpace && entry.floorSpace <= maxFloorSpace})
    }
    

    // extras
    if(elevators !== false){
      FilteredData = FilteredData
      .filter(entry=>{return entry.extras[0]==='elevator'})
    }
    if(swimmingpool !== false){
      FilteredData = FilteredData
      .filter(entry=>{return entry.extras[0]==='pool'})
    }
    if(basement !== false){
      FilteredData = FilteredData
      .filter(entry=>{return entry.extras[1]==='basement'})
    }
    if(gym !== false){
      FilteredData = FilteredData
      .filter(entry=>{return entry.extras[1]==='gym'})
    }


    // process the state change here
    if(UserSearchCity !== ''){
      FilteredData = FilteredData
      .filter(entry=>{return entry.city.includes(UserSearchCity)})
    }
    // price sort
    if(PriceSort === 'Lowest Price'){
      FilteredData = FilteredData
      .sort((a,b)=>{return a.price-b.price})
    }else if(PriceSort === 'Highest Price'){
      FilteredData = FilteredData
      .sort((a,b)=>{return b.price-a.price})
    }
    
    
    
    
    
    // create a condition where if a user select multiple option fields, the filter needs to check thru all the parameters to validate which Home to display in the view.
    // e.g. compare user input for price with newData's price to get the filter result.

    if(FilteredData.length !== 0){
      
      return(        
        FilteredData
        .map((entry,key)=>(
          <ul className="data-all" key={key}>
            <li key={key} className="data-all-images" style={{background: `url("${entry.image}") no-repeat center`}}>              
            
                <label id="data-address">{entry.address}</label>

                <div className="data-overlay">                                        
                    {/* <svg onClick={HandleFavorite} className="favList" id={'fav'+key} width="30" height="30" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g fill={UserColor}><path d="M26.95 11.863a5.193 5.193 0 0 1-1.53 3.69l-1.913 1.912-7.373 7.373-7.371-7.373-1.912-1.912a5.214 5.214 0 1 1 7.377-7.366l1.906 1.907 1.908-1.908a5.214 5.214 0 0 1 8.908 3.677z" fill-opacity=".4" fill={UserColor}></path><path d="M26.95 11.863a5.214 5.214 0 0 0-8.908-3.677l-1.908 1.908-1.906-1.908a5.214 5.214 0 1 0-7.377 7.366l1.912 1.913 7.371 7.373 7.373-7.373 1.912-1.912a5.193 5.193 0 0 0 1.53-3.69zM16.157 6.31A7.874 7.874 0 1 1 27.3 17.433l-1.913 1.913-9.254 9.254-1.88-1.88-7.373-7.374-1.91-1.91a7.874 7.874 0 1 1 11.137-11.13l.027.025.022-.022z" fill={UserColor}></path></g></svg> */}
                    {/* <svg width="30" height="30" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path d="M26.95 11.863a5.193 5.193 0 0 1-1.53 3.69l-1.913 1.912-7.373 7.373-7.371-7.373-1.912-1.912a5.214 5.214 0 1 1 7.377-7.366l1.906 1.907 1.908-1.908a5.214 5.214 0 0 1 8.908 3.677z" fill-opacity=".4" fill="#000"></path><path d="M26.95 11.863a5.214 5.214 0 0 0-8.908-3.677l-1.908 1.908-1.906-1.908a5.214 5.214 0 1 0-7.377 7.366l1.912 1.913 7.371 7.373 7.373-7.373 1.912-1.912a5.193 5.193 0 0 0 1.53-3.69zM16.157 6.31A7.874 7.874 0 1 1 27.3 17.433l-1.913 1.913-9.254 9.254-1.88-1.88-7.373-7.374-1.91-1.91a7.874 7.874 0 1 1 11.137-11.13l.027.025.022-.022z" fill="#FFF"></path></g></svg> */}
                                        
                    <div className="user-details">
                      <span>Brian Lam</span><br />
                      <span>04/02/2020</span><br />
                      <br />
                      <span><i class="far fa-square"></i> {entry.floorSpace} {' '} {'ft'}{String.fromCharCode(178)}</span><br />
                      <span><i class="fas fa-bed"></i> {entry.rooms} {' '} {'bedrooms'} </span>
                    </div>
                </div>          

            </li>
            
            <p className="img-price">{'$'}{entry.price}</p>
            
            <span className="img-info">
              <i class="fas fa-map-marker-alt"></i>
              {' '} {entry.city} {', '} {entry.state}              
            </span>
            
            
          </ul>
          
        ))
      );
    }
    
    return <h3 style={{color: 'red'}}>Sorry your filter did not match any listing.</h3>
        
// end of FilterData functional component. 
}


// when user clicks favorite button, set it to True and replace it with red heart
const HandleFavorite = (event) => {
  
  SetUserFavorite(event.target.value);
  const getID = event.currentTarget.id;

  if(UserFavorite !== true)
  {
  console.log(getID);

    SetUserFavorite(true);
    setUserColor('#ff5e3f')
    return(UserFavorite);

  }else{
    SetUserFavorite(false);
    setUserColor('#FFF')
    return(UserFavorite);
  }  
}


// use selects a filter option, the state wil be passed down to FilteredData component for processing.
  return (
    <div className="App">
      
        <input value={UserSearchCity} onChange={(event)=>setUserSearchCity(event.target.value)} type="text" placeholder="Search By City" id="search-city-nav" />
        
      <span className="upper-filters">          
        <DropdownButton id="dropdowns-sort" title={PriceSort}
            onSelect={event => setPriceSort(event)}>
            <Dropdown.Item eventKey="Lowest Price" >Lowest Price</Dropdown.Item>          
            <Dropdown.Item eventKey="Highest Price" >Highest Price</Dropdown.Item>
        </DropdownButton>  
      </span>

      <br /><br />



      {/* content-area is a wrapper for all the components within it. */}
      <div className="content-area">
          <div className="Filter-Section">
          <label>City</label>
          <DropdownButton id="dropdowns" title={City}
            onSelect={event => SetCity(event)}>
            <Dropdown.Item eventKey="All" >All</Dropdown.Item>          
            <Dropdown.Item eventKey="Ridgewood" >Ridgewood</Dropdown.Item>
            <Dropdown.Item eventKey="Orlando" >Orlando</Dropdown.Item>
            <Dropdown.Item eventKey="Sacramento">Sacramento</Dropdown.Item>
            <Dropdown.Item eventKey="Woodcrest">Woodcrest</Dropdown.Item>
            <Dropdown.Item eventKey="San Francisco">San Francisco</Dropdown.Item>
            <Dropdown.Item eventKey="Long Beach">Long Beach</Dropdown.Item>
          </DropdownButton>

          <label>Home Type</label>
          <DropdownButton className="dropdowns" title={HomeType}
          onSelect={event => SetHomeType(event)}>
            <Dropdown.Item eventKey="All Homes" >All Homes</Dropdown.Item>
            <Dropdown.Item eventKey="Apartment" >Apartment</Dropdown.Item>
            <Dropdown.Item eventKey="Condo" >Condo</Dropdown.Item>
            <Dropdown.Item eventKey="Loft">Loft</Dropdown.Item>
            <Dropdown.Item eventKey="Room">Room</Dropdown.Item>
            <Dropdown.Item eventKey="Studio">Studio</Dropdown.Item>            
          </DropdownButton>

          <label>Bedrooms</label>
          <DropdownButton className="dropdowns" title={Bedrooms}
          onSelect={event => SetBedrooms(event)}>
            <Dropdown.Item eventKey={0} >0+ BR</Dropdown.Item>
            <Dropdown.Item eventKey={1} >1+ BR</Dropdown.Item>
            <Dropdown.Item eventKey={2}>2+ BR</Dropdown.Item>
            <Dropdown.Item eventKey={3}>3+ BR</Dropdown.Item>
            <Dropdown.Item eventKey={4}>4+ BR</Dropdown.Item>            
          </DropdownButton>     



          <br />
          <div className="Price-Section">
            <span>
              <label >Price</label><br />
              <input
                id="minPrice"
                type="text"
                value={MinPrice}
                onChange={event => SetMinPrice(event.target.value)}
              />
              {"    "}
              <input
                type="text"
                value={MaxPrice}
                id="maxPrice"
                onChange={event => SetMaxPrice(event.target.value)}
              />
            </span>
          </div>
          <div className="Floorspace-Section">
            <span>
              <label >Floor Space</label><br />
              <input
                id="minPrice"
                type="text"
                value={MinFloorSpace}
                onChange={event => SetMinFloorSpace(event.target.value)}
              />
              {"    "}
              <input
                type="text"
                value={MaxFloorSpace}
                id="maxPrice"
                onChange={event => SetMaxFloorSpace(event.target.value)}
              />
            </span>
          </div>





          <br />
          <div className="Extras-Section">
            <label>Extras</label>
            <label>Elevators<input value={Elevators} onClick={event=>SetElevators(event.target.checked)} type="checkbox" name="" /></label>
            <label>Swimming Pool<input value={SwimmingPool} onClick={event=>SetSwimmingPool(event.target.checked)} type="checkbox" name="" /></label>
            <label>Finished Basement<input value={Basement} onClick={event=>SetBasement(event.target.checked)} type="checkbox" name="" /></label>
            <label>Gym<input value={Gym} onClick={event=>SetGym(event.target.checked)} type="checkbox" name="" /></label>
          </div>

          

          {/* within content-area we can move the components around using position: absolute. */}
          <section className="listings-result">   
                            
              {/* user would select their options, and these options would be passed down to the FilterData component below. */}
                <FilterData 
                  data={listingsData} 

                  city={City} 
                  hometype={HomeType} 
                  bedroom={Bedrooms} 

                  minPrice={MinPrice}
                  maxPrice={MaxPrice}
                  minFloorSpace={MinFloorSpace}
                  maxFloorSpace={MaxFloorSpace}

                  elevators={Elevators}
                  swimmingpool={SwimmingPool}
                  basement={Basement}
                  gym={Gym}
                  
                />

                <Footer />
          </section>
        </div>

      </div>
      

    </div>
  );
}

export default App;
