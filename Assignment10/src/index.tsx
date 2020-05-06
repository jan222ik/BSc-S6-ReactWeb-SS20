import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {Pagination} from "./Pagination";
import {PaginatedList} from "./PaginatedList";

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
    <App/>, document.getElementById('root')
);

