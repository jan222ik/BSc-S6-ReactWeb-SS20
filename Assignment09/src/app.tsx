import {availableLanguages, messages} from "./translations";
import {IntlProvider} from "react-intl";
import {NavBar} from "./NavBar";
import {Numbers} from "./Numbers";
import {Dates} from "./Dates";
import {Texts} from "./Texts";
import React from "react";
import {Redirect, Route, Switch, useLocation} from "react-router-dom";

export const ROUTES = {
    NUMBERS: "/numbers",
    DATES: "/dates",
    TEXTS: "/texts"
}

const getLocale = (): string => {
    const language = useLocation().search.split('=')[1];
    if (language != undefined && availableLanguages.indexOf(language) >= 0) {
        return language
    } else {
        return availableLanguages[0]

    }

};


export const App = () => {
    let locale = getLocale();
    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <NavBar locale={locale}/>
            <Switch>
                <Route exact path={ROUTES.NUMBERS}>
                    <Numbers locale={locale}/>
                </Route>
                <Route exact path={ROUTES.DATES}>
                    <Dates/>
                </Route>
                <Route exact path={ROUTES.TEXTS}>
                    <Texts locale={locale}/>
                </Route>
                <Route exact path="*">
                    <Redirect to={ROUTES.NUMBERS}/>
                </Route>
            </Switch>
        </IntlProvider>
    );
};
