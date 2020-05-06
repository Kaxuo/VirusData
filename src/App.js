import React, { useState, useEffect } from 'react';
import {Cards,Chart,CountryPicker} from './components'
import styles from './App.module.css';
import { fetchdata } from './api'
import image from './images/image.png'

function App() {
const [state, setstate] = useState({
  data :{},
  country:'',
})

// always remember to use target value and stuff for handlechang
const handleCountryChange = async (country) => {
  // the same as in useEffect but this time we need the country to update data , AND DONT FORGET THE FETCHDATA IN COUNTRY
  const  fetchData  = await fetchdata(country)
  console.log(fetchData)
  setstate({data : fetchData,country : country})
  //fetch the data
}
  useEffect(() =>  {
    const runEffect = async () => {
      const  fetchData  = await fetchdata()
      // console.log(fetchData)
      setstate({data: fetchData})
    }
    runEffect()
  }, []);

const { data , country} = state 
  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} alt="COVID-19"/>
      <Cards data ={data}/>
      <CountryPicker handleCountryChange={handleCountryChange}/>
      <Chart data={data} country={country}/>
    </div>
  );
}

export default App;
