import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button';
import * as d3 from "d3";

const ButtonSetCloth = ({ clothes, isEquipped, setIsEquipped, otherItems, setOtherItems }) => {


    const checkUsedClothes = () => {
        let className = clothes.name.replaceAll(" ", "");
        var equippedClothes = document.getElementById('character').querySelectorAll('g');
        equippedClothes = Array.from(equippedClothes).map(x => x.className.baseVal);
        if (typeof equippedClothes.find(x => x === className) !== "undefined") {
            setIsEquipped(prevState => !prevState);
            setOtherItems(prevState => !prevState);
        }
    }

    useEffect(() => {
        checkUsedClothes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setClothes = () => {
        var svgImage = document.getElementById('character').querySelector('svg');
        var className = clothes.name.replaceAll(" ", "");
        var shapeGroup = d3.select(svgImage).append("g").attr("class", className).attr("transform", "translate(209.37 94.977)");
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
        setClothes();
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