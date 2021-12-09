import React from 'react'
import PageHeader from '../components/PageHeader';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

const Myitems = () => {
    return (
        <>
            <PageHeader
                title="Przedmioty"
                subTitle="Lista Twoich przedmiotów"
                icon={<ShoppingBagOutlinedIcon fontSize="large" />}
            />
        </>
    );
};
export default Myitems;