import React from 'react'
import Button from '@material-ui/core/Button';
import * as d3 from "d3";

const ButtonRemoveCloth = ({ clothes, setOpenPopup, isEquipped, setIsEquipped, otherItems, setOtherItems }) => {

    const test = () => {
        var className = clothes.name.replaceAll(" ", "");
        var el = document.getElementById('character').querySelector(`g.${className}`);
        d3.select(el).remove();
    }

    const handleClick = () => {
        test();
        setIsEquipped(prevState => !prevState)
        setOtherItems(prevState => !prevState)
    }
    return (
        <Button
            variant="contained"
            color="primary"
            size='small'
            onClick={handleClick}
            disabled={!Boolean(isEquipped)}
        >
            Usuń
        </Button>

    );
}

export default ButtonRemoveCloth;