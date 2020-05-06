import React, { useState, useEffect } from 'react';
import {NativeSelect, FormControl} from '@material-ui/core'
import styles from './CountryPicker.module.css'
import{fetchCountries } from '../../api'

function CountryPicker({handleCountryChange}) {
    const [fetchedData, setFetchedData] = useState([])
    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedData(await fetchCountries())
        }
        fetchAPI()
        // will change only when setfetchedcountries changes
    }, [setFetchedData]);

    // console.log(fetchedData)
    return (
        <FormControl className={styles.formControl}>
            {/* you need that line below !  */}
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                {/* at first, you had something in value, but you had to remove it since the value "global didn't exist" */}
                <option value="">Global</option>
                {fetchedData.map((country,index) => <option key={index} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;
