import {ResponseData} from "./apiaccessor";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        width: 345,
        height: 375
    },
    media: {
        height: 200,
    },
});

const CardWrapper = (props: { gif: ResponseData }) => {
    const classes = useStyles();
    return (<Card variant={"outlined"} className={classes.root + " card"}>
        <CardActionArea>
            <CardMedia
                className={classes.media}
                image={props.gif.images.fixed_height.url}
                title={props.gif.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.gif.title}
                </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" variant={"outlined"} color="inherit"
                    onClick={() => window.open(props.gif.url, "_blank")}>
                View on Giphy
            </Button>
        </CardActions>
    </Card>)
}

export {CardWrapper}
