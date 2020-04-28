import {loadImg, ResponseData} from "./apiaccessor";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import {CircularProgress} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    root: {
        width: 345,
        height: 375,
        margin: 10
    },
    media: {
        maxWidth: 343,
        height: 200,
    },
});

const CardWrapper = (props: { gif: ResponseData }) => {
    const classes = useStyles();
    const [img, setImg] = useState(undefined);
    useEffect(() => {
        loadImg(props.gif.images.fixed_height.url, setImg);
        return () => {}
    }, [props.gif.images.fixed_height.url])
    return (<Card variant={"outlined"} className={classes.root}>
        <CardActionArea>
            { img ?
            <CardMedia
                className={classes.media}
                image={img}
                title={props.gif.title}
            />:  <Grid className={classes.media} container justify={"center"} alignContent={"center"}><CircularProgress color="secondary" /></Grid>}
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

const CardSkeleton = () => <Skeleton className={useStyles().root} animation="wave" variant="rect" width={345} height={370}/>


export {CardWrapper, CardSkeleton}
