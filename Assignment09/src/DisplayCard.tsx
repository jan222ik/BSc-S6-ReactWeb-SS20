import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            marginTop: theme.spacing(1)
        }
    })
);

export type DisplayCardProps = { title: any, result: any, interestingValues?: string }

export function DisplayCard(props: DisplayCardProps) {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="body2" component="h5">{props.title}</Typography>
                <Typography variant="h5" component="h2">{props.result}</Typography>
                {props.interestingValues ? <Typography variant="body2" component="p">{props.interestingValues}</Typography> : undefined}
            </CardContent>
        </Card>
    );
}
