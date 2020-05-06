import React from "react";
import PrevIcon from '@material-ui/icons/ArrowBackIos';
import NextIcon from '@material-ui/icons/ArrowForwardIos';

export const Pagination = ({page, setPage}: { page: number, setPage: any }) => {
    const styleBtn = (disabled = false) => {
        const col = !disabled ? "white" : "grey"
        return {background: "inherit", border: "none", color: col}
    };
    return (
        <div>
            <button style={styleBtn(page < 2)} id="page-prev" disabled={page < 2} onClick={() => setPage(page - 1)}>
                <PrevIcon/></button>
            <span style={{fontSize: "1.5em"}} id="page-current">{page}</span>
            <button style={styleBtn()} id="page-next" onClick={() => setPage(page + 1)}><NextIcon/></button>
        </div>
    )
}
