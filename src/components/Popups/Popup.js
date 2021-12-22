import React from 'react'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
} from '@material-ui/core';

const Popup = (props) => {

    const { title, children, openPopup, isTitle, maxWidth, onClose } = props;

    Popup.defaultProps = {
        isTitle: true,
    };

    return (
        <Dialog open={openPopup} maxWidth={maxWidth} xs={12} sm={6} md={4}>
            {isTitle ? <DialogTitle> {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
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