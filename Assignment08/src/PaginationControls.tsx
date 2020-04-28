import {BottomNavigation, BottomNavigationAction, TextField} from "@material-ui/core";
import React, {useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {IconArrowForward, IconArrowPrevious} from "./Icons";
import {cancelLoad} from "./apiaccessor";

const useStyle = () => makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }),
)();

const PaginationControls = (props: { page: { pageNr: number, setPage: any, lastPage: number } }) => {
    const classes = useStyle();
    const [hasError, setHasError] = useState(false)
    const [localPage, setLocalPage] = useState(props.page.pageNr)
    const [localPageString, setLocalPageString] = useState(props.page.pageNr.toString())

    return (<BottomNavigation
        value={1}
        showLabels
        className={classes.root + " stickBottom"}
    >
        <BottomNavigationAction disabled={(localPage - 1) < 1}
                                label={(localPage - 1) > 0 && "Previous"}
                                icon={(localPage - 1) > 0 && IconArrowPrevious}
                                onClick={() => {
                                    let dec = localPage - 1;
                                    setLocalPageString(dec.toString())
                                    setLocalPage(dec)
                                    props.page.setPage(dec)
                                    cancelLoad()
                                }}
        />
        <form className={classes.root} noValidate autoComplete="off" onSubmit={e => e.preventDefault()}>
            <TextField value={localPageString}
                       error={hasError}
                       label={hasError ? (localPage <= props.page.lastPage ? "Unrecognised Character" : "Last Page is " + props.page.lastPage) : undefined}
                       onKeyPress={(e) => {
                           if (e.key === 'Enter') {
                               props.page.setPage(localPage);
                               cancelLoad()
                           }
                       }}
                       onChange={(e) => {
                           let parsedInt = parseInt(e.target.value);
                           let mappedParsedInt = parsedInt ? parsedInt : undefined;
                           setLocalPage(mappedParsedInt)
                           setLocalPageString((parsedInt ? parsedInt.toString() : ""))
                           let b = mappedParsedInt != undefined && parseInt(e.target.value) <= props.page.lastPage;
                           console.log(mappedParsedInt + " Has error: " + b)
                           setHasError(!b)
                       }
                       }/>
        </form>
        <BottomNavigationAction
            disabled={(localPage + 1) > props.page.lastPage}
            label={(localPage + 1) <= props.page.lastPage && "Next"}
            icon={(localPage + 1) <= props.page.lastPage && IconArrowForward}
            onClick={() => {
                let inc = localPage + 1;
                setLocalPageString(inc.toString())
                setLocalPage(inc)
                props.page.setPage(inc)
                cancelLoad()
            }}/>
    </BottomNavigation>)
};

export {PaginationControls}
