import React from 'react'
import {
    Grid,
    Typography,
} from '@material-ui/core';
import { css } from "@emotion/react";
import MoonLoader from "react-spinners/MoonLoader";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const BuyingStatusForm = () => {
    return (
        <Grid>
            <Typography>Kupowanie...</Typography>
            <MoonLoader loading={true} css={override} size={50} />
        </Grid>
    );
}

export default BuyingStatusForm;