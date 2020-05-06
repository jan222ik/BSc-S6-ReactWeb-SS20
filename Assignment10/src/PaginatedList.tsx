import React from "react";
import {getPaginatedContent} from "./repository";

export const PaginatedList = ({page}: { page: number }) =>
    <ul>{getPaginatedContent(page).map((it, index) => <li id={"item" + index} key={it}>{it}</li>)}</ul>
