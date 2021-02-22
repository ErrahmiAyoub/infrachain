import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from './Alert';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function CustomizedSnackbars({ show, type, message }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(show);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} elevation={6} variant="filled" type={type} message={message}></Alert>
            </Snackbar>
        </div>
    );
}
