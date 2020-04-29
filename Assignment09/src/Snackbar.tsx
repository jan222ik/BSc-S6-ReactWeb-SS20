import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps, Color} from '@material-ui/lab/Alert';
import {makeStyles, Theme} from '@material-ui/core/styles';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    snackbar: {
        bottom: 100,
    },
}));

type NotificationType = "NO_CONTENT" | "INTERNAL_ERROR";

const NotificationSnackbar = (props: {type: NotificationType}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason !== 'clickaway') {
            setOpen(false);
        }
    };
    let msg: string;
    let severity: Color;
    switch (props.type) {
        case undefined: return <></>;
        case "NO_CONTENT":
            msg = "No Results found for your request!"
            severity = 'warning'
            break;
        case "INTERNAL_ERROR":
            msg = "A internal error occurred!"
            severity = "error"
            break;
        default:
            console.log("Unknown type: " + props.type)
    }

    return (
        <div className={classes.root}>
            <Snackbar className={classes.snackbar} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} open={open} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    {msg}
                </Alert>
            </Snackbar>
        </div>
    );
}

export {NotificationSnackbar, NotificationType}
