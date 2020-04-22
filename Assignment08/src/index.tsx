import './style.scss'
import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {autorun} from "mobx";
import {observer} from "mobx-react"
import Button from '@material-ui/core/Button';
import {createMuiTheme, createStyles, makeStyles, MuiThemeProvider, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ShowChartIcon from '@material-ui/icons/ShowChart'
import SearchIcon from '@material-ui/icons/Search';
import Skeleton from '@material-ui/lab/Skeleton';
import {Grid, TextField} from "@material-ui/core";
import {LIMIT, querySearch, queryTrending, Response, ResponseData} from "./apiaccessor";
import CssBaseline from '@material-ui/core/CssBaseline';
import {PaginationControls} from "./PaginationControls";
import {CardWrapper} from "./CardWrapper";
import {Attribution} from "./Attribution";

autorun(() => {

})

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

function range(start, end) {
    return Array.from({length: end - start + 1}, (_, i) => i)
}

function roundPageNumber(pageNumber: number): number {
    const pageNumberRounded = Math.round(pageNumber);
    return pageNumberRounded < pageNumber ? Math.round(pageNumber + 1) : pageNumberRounded;
}

const TrendingTab = () => {
    const [gifs, setGifs] = useState(undefined);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    useEffect(() => {
        queryTrending(page)((response: Response) => {
            setGifs(response.data)
            setLastPage(roundPageNumber((response.pagination.total_count + 1) / LIMIT))
        });
    }, [page])
    return (<ResultsPane gifs={gifs} page={{current: page, setPage, lastPage: lastPage}}/>)
}
const SearchTab = () => {
    const classes = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                '& > *': {
                    margin: theme.spacing(1),
                    width: '24xs',
                },
            },
        }),
    )();
    const [searchString, setSearchString] = useState("");
    const [gifs, setGifs] = useState(undefined);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    useEffect(() => {
        querySearch(searchString, page)((response: Response) => {
            setGifs(response.data)
            setLastPage(roundPageNumber((response.pagination.total_count + 1) / LIMIT))
        });
    }, [searchString, page])
    return (<>
        <AppBar position="sticky" color="default">
            <Grid item xs={12}>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => {
                    e.preventDefault()
                }}>
                    <TextField fullWidth id="search" label="Search for Gifs!" variant="filled" value={searchString}
                               onChange={(e) => {
                                   setSearchString(e.target.value);
                                   console.log(e.target.value)
                               }}
                    />
                </form>
            </Grid>
        </AppBar>
        <ResultsPane gifs={gifs} page={{current: page, setPage, lastPage}}/>
    </>)
}

const ResultsPane = (props: { gifs: [ResponseData], page: { current: number, setPage: any, lastPage: number } }) => {
    if (props.gifs) {
        return (<>
                <Grid container direction="row" justify="center" alignItems="center">
                    {props.gifs.map((it: ResponseData) => <CardWrapper key={it.id} gif={it}/>)}
                </Grid>
                <PaginationControls page={props.page}/>
            </>
        )
    } else {
        return (
            <Grid container direction="row" justify="center" alignItems="center">
                {
                    [...range(0, 15)].map((_, index) =>
                        <Skeleton key={index} className="card" animation="wave" variant="rect" width={345}
                                  height={370}/>
                    )
                }
            </Grid>
        )
    }
}


const App = observer(() => {
    const [currentTab, setCurrentTab] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setCurrentTab(newValue);
    };

    return (
        <>
            <AppBar position="sticky" color="default">
                <Tabs value={currentTab} onChange={handleChange}
                      variant="fullWidth" indicatorColor="primary" textColor="secondary">
                    <Tab label="Trending" icon={<ShowChartIcon/>}/>
                    <Tab label="Search" icon={<SearchIcon/>}/>
                </Tabs>
            </AppBar>
            {currentTab ? <SearchTab/> : <TrendingTab/>}
            <Attribution/>
        </>
    );
});

ReactDOM.render(
    <MuiThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <App/>
    </MuiThemeProvider>, document.getElementById('root')
);

