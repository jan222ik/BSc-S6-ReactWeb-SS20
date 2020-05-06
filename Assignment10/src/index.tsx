import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Pagination} from "./Pagination";
import {PaginatedList} from "./PaginatedList";

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

const App = () => {
    const [page, setPage] = useState(1);
    return (
        <>
            <PaginatedList page={page}/>
            <Pagination page={page} setPage={setPage}/>
        </>
    );
};

ReactDOM.render(
    <MuiThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <App/>
    </MuiThemeProvider>, document.getElementById('root')
);

