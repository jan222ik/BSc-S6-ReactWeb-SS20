import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {cancelLoad, LIMIT, querySearch, queryTrending, Response, ResponseData} from "./apiaccessor";
import {CardSkeleton, CardWrapper} from "./CardWrapper";
import {range, roundNextHighest} from "./util";
import {Grid, TextField} from "@material-ui/core";
import {PaginationControls} from "./PaginationControls";
import React, {useEffect, useState} from "react";
import AppBar from "@material-ui/core/AppBar";
import {NotificationSnackbar} from "./Snackbar";

// TYPES:
type MediaProps = { items: [ResponseData], setGifs: any };
type PaginationProps = { pageNr: number, setPage: any, lastPage: number, setLastPage: any };
type TabProps = { gif: MediaProps, pagination: PaginationProps, currentTab: number | undefined, notification: any | undefined };

// RESULT PANE

const makeResultPaneClasses = makeStyles(() =>
    createStyles({
        root: {
            marginBottom: 56,
        },
    }),
)

const ResultsPane = (props: TabProps) => {
    const classes = makeResultPaneClasses();
    const items = props.gif.items;
    let cards;
    if (items != undefined && items.length < 1) {
        cards = undefined;
    } else {
        if (items) {
            cards = items.map((it: ResponseData) => <CardWrapper key={it.id} gif={it}/>);
        } else {
            cards = range(0, LIMIT).map((_, index) => <CardSkeleton key={index}/>);
        }
    }
    /* eslint-disable react/no-children-prop */
    return (
        <>
            <Grid classes={classes} container direction="row" justify="center" alignItems="center" children={cards}/>
            {items ? <PaginationControls page={{...props.pagination}}/> : undefined}
        </>
    )
}
// Network Result handle
const handleNetworkFinish = (gifSetter: any, lastPageSetter: any, nextEmptySetter: any) =>
    (response: Response) => {
        if (response.pagination.total_count > 0) {
            cancelLoad()
            gifSetter(response.data)
            lastPageSetter(roundNextHighest((response.pagination.total_count + 1) / LIMIT))
            nextEmptySetter(undefined)
        } else {
            nextEmptySetter('NO_CONTENT')
        }
    }

// TRENDING TAB
const TrendingTab = (props: TabProps) => {
    useEffect(() => {
        queryTrending(props.pagination.pageNr)(
            handleNetworkFinish(props.gif.setGifs, props.pagination.setLastPage, props.notification)
        );
    }, [props.pagination.pageNr])
    return <ResultsPane gif={props.gif} pagination={{...props.pagination}} currentTab={props.currentTab}
                        notification={undefined}/>
}

// SEARCH TAB
const createSearchTabClasses = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '24xs',
            },
        },
    }),
);
const SearchTab = (props: TabProps) => {
    const classes = createSearchTabClasses();
    const [searchString, setSearchString] = useState("");
    useEffect(() => {
        if (searchString !== "") {
            cancelLoad()
            querySearch(searchString, props.pagination.pageNr)(handleNetworkFinish(props.gif.setGifs, props.pagination.setLastPage, props.notification));
        } else {
            props.gif.setGifs([]);
        }
    }, [searchString, props.pagination.pageNr])
    return (<>
        <AppBar position="sticky" color="default">
            <Grid item xs={12}>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={e => e.preventDefault()}>
                    <TextField fullWidth
                               id="search"
                               label="Search for Gifs!"
                               variant="filled"
                               value={searchString}
                               color="secondary"
                               onChange={e => setSearchString(e.target.value)}
                    />
                </form>
            </Grid>
        </AppBar>
        <ResultsPane gif={props.gif} pagination={{...props.pagination}} currentTab={props.currentTab}
                     notification={undefined}/>
    </>)
}

// TAB PANE
const TabPane = (props: { currentTab: number }) => {
    const [gifs, setGifs] = useState(undefined);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [notification, setNotification] = useState(undefined)
    let media: MediaProps = {items: gifs, "setGifs": setGifs}

    useEffect(() => {
        setGifs([]);
        setPage(1);
        setLastPage(1);
        console.log("Changed Tab " + page)
    }, [props.currentTab])

    // No idea why necessary, otherwise funky behavior
    useEffect(() => {
        media = {items: gifs, "setGifs": setGifs}
        console.log("Changed " + page)
    }, [page, lastPage, gifs])
    return <>
        {props.currentTab ?
            <SearchTab
                gif={media}
                pagination={{pageNr: page, "setPage": setPage, lastPage: lastPage, "setLastPage": setLastPage}}
                currentTab={props.currentTab}
                notification={setNotification}/>
            : <TrendingTab
                key={page}
                gif={media}
                pagination={{pageNr: page, "setPage": setPage, lastPage: lastPage, "setLastPage": setLastPage}}
                currentTab={props.currentTab}
                notification={setNotification}/>
        }
        {notification ? <NotificationSnackbar type={notification}/> : undefined}
    </>
}

export {ResultsPane, TabPane, SearchTab, TrendingTab}
