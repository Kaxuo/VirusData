import React from 'react';
import {Card, CardContent,Typography,Grid} from '@material-ui/core'
import styles from './Cards.module.css'
import CountUp from "react-countup";
import cx from 'classnames'

// typography is same for p or h1 ; but more styled/// gutterbottom = nice padding bottom/// We used Card in the item component
// we got undefined , we forgot to add data(coming from the props in app.js) out of the confirmed, recovered ,....
function Cards({data : {confirmed, recovered, deaths, lastUpdate}}) {

    // you can refactor this, you create a new data, then loop through it (Infected , data .... )
    if (!confirmed){
        return "Loading..."
    }
    return (
        <div className={styles.container}>
            <Grid container spacing ={3} justify="center">
                <Grid item component={Card} xs={12} md={3} className={cx(styles.cards,styles.infected)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Infected</Typography>
                        {/* separator : how do you want to separate the numbers */}
                        <Typography variant="h5"><CountUp start={0} end={confirmed.value} duration={2.5} separator=","/></Typography>
                        {/* new date and todatestring allow you to make a readable date */}
                        <Typography color="textSecondary" >{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2" >Number of active cases of COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.cards,styles.recovered)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                        <Typography variant="h5"><CountUp start={0} end={recovered.value} duration={2.5} separator=","/></Typography>
                        <Typography color="textSecondary" >{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2" >Number of recoveries from COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.cards,styles.deaths)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                        <Typography variant="h5"><CountUp start={0} end={deaths.value} duration={2.5} separator=","/></Typography>
                        <Typography color="textSecondary" >{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2" >Number of deaths of COVID-19</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards;
