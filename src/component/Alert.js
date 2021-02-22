import React from 'react';
import { useStyles } from '../assets/jss/AlertStyle'
import { Alert, AlertTitle } from '@material-ui/lab';



export default function SimpleAlerts({ serverError, type, message, ...rest }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>

            <Alert severity={type} {...rest}>
                {serverError &&
                    <AlertTitle><strong>Error 503</strong></AlertTitle>
                }
                {message}
            </Alert >
        </div>
    );
}
