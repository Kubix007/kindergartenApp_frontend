import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';
import * as d3 from "d3";

const ButtonSetCloth = ({ clothes, setOpenPopup, isEquipped, setIsEquipped, otherItems, setOtherItems }) => {


    const checkUsedClothes = () => {
        let className = clothes.name.replaceAll(" ", "");
        var el = document.getElementById('character').querySelectorAll('g');
        el = Array.from(el).map(x => x.className.baseVal);
        console.log(el);
        if (typeof el.find(x => x === className) !== "undefined") {
            setIsEquipped(prevState => !prevState);
            setOtherItems(prevState => !prevState);
        }

    }

    useEffect(() => {
        checkUsedClothes();
    }, []);

    const test = () => {
        var el = document.getElementById('character').querySelector('svg');
        var className = clothes.name.replaceAll(" ", "");
        var shapeGroup = d3.select(el).append("g").attr("class", className);
        const clothesDetails = clothes.clothes_details;
        for (var i = 0; i < clothesDetails.length; i++) {
            if (clothesDetails[i].type === "rect") {
                shapeGroup.append(clothesDetails[i].type).attr("transform", clothesDetails[i].transform).attr("height", clothesDetails[i].height).attr("width", clothesDetails[i].width).attr("y", clothesDetails[i].y).attr("x", clothesDetails[i].x).attr("stroke-width", clothesDetails[i].stroke_width).attr("stroke", clothesDetails[i].stroke).style("fill", clothesDetails[i].fill);
            }
            else if (clothesDetails[i].type === "ellipse") {
                shapeGroup.append(clothesDetails[i].type).attr("cx", clothesDetails[i].cx).attr("cy", clothesDetails[i].cy).attr("rx", clothesDetails[i].x2).attr("ry", clothesDetails[i].y2).attr("y", clothesDetails[i].y).attr("x", clothesDetails[i].x).attr("stroke-width", clothesDetails[i].stroke_width).attr("stroke", clothesDetails[i].stroke).style("fill", clothesDetails[i].fill);

            }
        }
    }

    const handleClick = () => {
        test();
        setIsEquipped(prevState => !prevState);
        setOtherItems(prevState => !prevState);
    }
    return (
        <>
            <Button
                variant="contained"
                size='small'
                color="primary"
                onClick={handleClick}
                disabled={Boolean(isEquipped) || otherItems ? true : false}
            >
                Dodaj
            </Button>
        </>

    );
}

export default ButtonSetCloth;