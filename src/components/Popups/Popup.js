import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
} from '@material-ui/core';

const Popup = (props) => {

    const { title, children, openPopup, isTitle } = props;

    Popup.defaultProps = {
        isTitle: true,
    };

    return (
        <Dialog open={openPopup} xs={12} sm={6} md={4}>
            {isTitle ? <DialogTitle>
                <Typography align="center" variant="h5">
                    {title}
                </Typography>
            </DialogTitle> : null}
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    );
}

export default Popup;