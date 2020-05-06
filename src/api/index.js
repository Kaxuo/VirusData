import axios from 'axios'

    const url = 'https://covid19.mathdro.id/api';
    // we need to set the parameters country in the end, to make it change
export const fetchdata = async (country) => {
    let changeableUrl = url;
    // at first, if no country , then url is the basis !, but there is a country called, then we call changeableUrl !!!!!!! and then the data below ( with try and stuff ) will fit the data
    if (country){
        // same as below, we we need the country iteself now
        changeableUrl = `${url}/countries/${country}`
    }
        // try if fetch is successful , else it's error
        try {
            // by destructuring, it allows us to make less line
            const { data: {confirmed, recovered,deaths, lastUpdate} } = await axios.get(changeableUrl)
            // const modifiedData ={  confirmed,recovered,deaths, lastUpdate,
                // confirmed:data.confirmed,
                // recovered:data.recovered,
                // deaths:data.deaths,
                // lastUpdate:data.lastUpdate,}
            return { confirmed,recovered,deaths, lastUpdate}

        } catch (error) {
        }
    }

export const fetchDailyData = async () => {
    try {
        const {data} = await axios.get(`${url}/daily`)
        // console.log(data)
        // since the data is an array , we need to loop trough it , and return and  object, to do that , check below
        const modifiedData = data.map((dailyData) => ({
            confirmed:dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date:dailyData.reportDate,
        }))
        return modifiedData

    } catch(error){

    }
}

export const fetchCountries = async () => {
    try {
        const {data : {countries }} = await axios.get(`${url}/countries`)
        return countries.map((country) => country.name)
    } catch (error) {
        console.log(error)
    }
}