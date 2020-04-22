import {observable} from "mobx";
import {ResponseData} from "./apiaccessor";

class Store {
    @observable currentTabGifs: [ResponseData]
}

const store = new Store();

export {store}
