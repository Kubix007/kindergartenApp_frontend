import React, { useState } from 'react'
import SingleClothCard from './SingleClothCard';
import { Grid, List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    pageContent: {
        justifyContent: "center",
        alignItems: "center",
        overflow: "auto",
        maxWidth: 700,
    },
    listTest: {
        overflowX: "scroll",
    }
}))


const ClothesCardList = ({ clothes }) => {
    const classes = useStyles();
    const [isBlouse, setIsBlouse] = useState(false);
    const [isHat, setIsHat] = useState(false);
    const [isPants, setIsPants] = useState(false);

    return (
        <Grid>
            <Grid item xs={11}>
                <List component={Grid} direction="row" className={classes.listTest}>
                    <ListItem>
                        {clothes.map((cloth) => {
                            return (
                                <SingleClothCard
                                    key={cloth.id}
                                    cloth={cloth}
                                    isBlouse={isBlouse}
                                    isPants={isPants}
                                    isHat={isHat}
                                    setIsBlouse={setIsBlouse}
                                    setIsHat={setIsHat}
                                    setIsPants={setIsPants}
                                />)
                        })}
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    );
}

export default ClothesCardList;