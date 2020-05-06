import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api'
import { Line, Bar } from "react-chartjs-2"
import styles from './Chart.module.css'


function Chart({ data:{confirmed,deaths,recovered}, country }) {
    // you made a mistake below, you will received an array so after usestate , it should be [] and not {}
    const [dailyData, setDailyData] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            setDailyData(await fetchDailyData())
        }
        fetchApi()
    }, []);

    // you forgot to add map after dailydata to go through the array and return the content
    const lineChart = (
        // when things load , we don't have it right away , so we make a conditinal , do we have the data of the first day ?
        dailyData.length ? (
            <Line data={{
                // for labels and dataset, if you don't put anything in it, then react will put undefined error, both of them need to be an array ! , that's why we destructure them , and then return date, mainl in label, map and return an array of all the data !!!
                // the label is the horizontal bar 
                labels: dailyData.map(({ date }) => date),
                // we have 2 datasets because the api doesn't provide dailydata for recovered
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: "Infected",
                    borderColor: "#3333ff",
                    // fill space below that chart
                    fill: true,
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: "Deaths",
                    borderColor: "red",
                    backgroundColor: "rgba(255,0,0,0.5)",
                    // fill space below that chart
                    fill: true,

                }],
            }} />) : null
    )

    // console.log(confirmed, recovered, deaths)
    const barChart = (
        confirmed ?
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: [
                            'rgba(0,0,255,0.5)',
                            'rgba(0,255,0,0.5)',
                            'rgba(255,0,0,0.5)',
                        ],
                        data:[confirmed.value,recovered.value,deaths.value]

                    }]
                }}
                options={{
                    // legend = false mean we don't need it, it's not a map
                    legend: { display: false },
                    title: { display: true, text: `Current State in ${country}` }
                }}
            />
            : null
    )
    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart;
