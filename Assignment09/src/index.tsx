import './style.scss'
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {createMuiTheme, createStyles, makeStyles, MuiThemeProvider, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CssBaseline from '@material-ui/core/CssBaseline';
import {IconCalender, IconNumber, IconText} from "./Icons";
import {HashRouter as Router, Link, Redirect, Route, Switch, useLocation, withRouter} from "react-router-dom";
import {Autocomplete} from "@material-ui/lab";
import {TextField} from "@material-ui/core";
import {FormattedMessage, IntlProvider} from "react-intl";
import {English, German, TranslationSchema} from "./translations";

const ROUTES = {
    NUMBERS: "/numbers",
    DATES: "/dates",
    TEXTS: "/texts"
}

const messages = {
    en: English,
    de: German
}

const availableLanguages = Object.keys(messages)
const defaultLang = availableLanguages[0];
const getLocale = (): string => {
    const l = useLocation().search.split('=')[1];
    if (l != undefined && availableLanguages.indexOf(l) >= 0) {
        return l
    } else {
        return defaultLang
    }

};

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

const lang = (id: string) => <FormattedMessage id={id}/>

const Navbar = withRouter((props) => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                marginRight: theme.spacing(1),
                marginLeft: theme.spacing(1),
                marginBottom: theme.spacing(1)
            },
            textField: {
                marginTop: theme.spacing(1)
            }
        })
    );
    const classes = useStyles();
    const pathname = useLocation().pathname;
    const index = pathname.indexOf(ROUTES.NUMBERS) >= 0 ? 0 : (pathname.indexOf(ROUTES.DATES) >= 0 ? 1 : 2);
    const dropDownSearchBox = (params) => <TextField className={classes.textField} {...params}
                                                     label={<FormattedMessage id="Language"/>} variant="outlined"
                                                     color={"secondary"}/>
    const changePath = (newPath: string) => ({pathname: newPath, search: props.history.location.search})

    return <AppBar position="sticky" color="default">
        <Tabs value={index} variant="fullWidth" indicatorColor="primary" textColor="secondary">
            <Tab label={lang("Tab_Numbers")} icon={IconNumber} component={Link} to={changePath(ROUTES.NUMBERS)}/>
            <Tab label={lang("Tab_Dates")} icon={IconCalender} component={Link} to={changePath(ROUTES.DATES)}/>
            <Tab label={lang("Tab_Texts")} icon={IconText} component={Link} to={changePath(ROUTES.TEXTS)}/>
        </Tabs>
        <Autocomplete renderInput={dropDownSearchBox}
                      className={classes.root}
                      options={availableLanguages}
                      getOptionLabel={option => messages[option].Lang_Name}
                      value={props.locale}
                      onChange={(event: any, newValue: string | null) => {
                          props.history.push({...props.history.location, search: "?lang=" + newValue})
                          console.log("Change Lang")
                      }}
        />
    </AppBar>;
})

const Numbers = () => {

}

const Dates = () => {
    console.log("Run")
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            container: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            textField: {
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(1),
                width: 200,
            },
        }),
    );
    const classes = useStyles();
    const [date, setDate] = useState<Date>(new Date())
    return (<>
            <form className={classes.container} noValidate>
                <TextField
                    id="date"
                    label="Enter a Date:"
                    type="date"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={e => setDate(new Date(Date.parse(e.target.value)))}
                />
            </form>
            <p>{date.toDateString()}</p>
        </>
    );
}

const Texts = () => {

}

const App = () => {
    let locale = getLocale();
    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <Navbar locale={locale}/>
            <Switch>
                <Route exact path={ROUTES.NUMBERS}>
                    Numbers
                </Route>
                <Route exact path={ROUTES.DATES}>
                    <Dates/>
                </Route>
                <Route exact path={ROUTES.TEXTS}>
                    Text
                </Route>
                <Route exact path="*">
                    <Redirect to={ROUTES.NUMBERS}/>
                </Route>
            </Switch>
        </IntlProvider>
    );
};

ReactDOM.render(
    <MuiThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <Router>
            <App/>
        </Router>
    </MuiThemeProvider>, document.getElementById('root')
);

