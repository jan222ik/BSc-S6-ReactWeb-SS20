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
import {FormattedMessage, IntlProvider, useIntl} from "react-intl";
import {English, German, Translations} from "./translations";
import {DisplayCard} from "./DisplayCard";

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
    const language = useLocation().search.split('=')[1];
    if (language != undefined && availableLanguages.indexOf(language) >= 0) {
        return language
    } else {
        return defaultLang
    }

};

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

const lang = (id: number) => <FormattedMessage id={id.toString()}/> // toString needed; otherwise lookup for key 0 fails
const langString = (id: number, intl: any) => {
    return intl.formatMessage({id: id.toString()})
}

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
                                                     label={lang(Translations.Language)} variant="outlined"
                                                     color={"secondary"}/>
    const changePath = (newPath: string) => ({pathname: newPath, search: props.history.location.search})

    return <AppBar position="sticky" color="default">
        <Tabs value={index} variant="fullWidth" indicatorColor="primary" textColor="secondary">
            <Tab label={lang(Translations.Tab_Numbers)} icon={IconNumber} component={Link} to={changePath(ROUTES.NUMBERS)}/>
            <Tab label={lang(Translations.Tab_Dates)} icon={IconCalender} component={Link} to={changePath(ROUTES.DATES)}/>
            <Tab label={lang(Translations.Tab_Texts)} icon={IconText} component={Link} to={changePath(ROUTES.TEXTS)}/>
        </Tabs>
        <Autocomplete renderInput={dropDownSearchBox}
                      className={classes.root}
                      options={availableLanguages}
                      getOptionLabel={option => messages[option][Translations.Lang_Name]}
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

type LocaleProps = {locale: any}
const Texts = (props: LocaleProps) => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                marginRight: theme.spacing(1),
                marginLeft: theme.spacing(1),
                marginBottom: theme.spacing(1)
            },
            textField: {
                marginTop: theme.spacing(1)
            },
            container: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            fullWidthWithHorizontalMargin: {
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(1),
                width: "100vw"
            },
        })
    );
    const classes = useStyles();
    const dropDownSearchBox = (params) => <TextField className={classes.textField} {...params}
                                                     label={lang(Translations.Gender)} variant="outlined"
                                                     color={"secondary"}/>
    const [number, setNumber] = useState(0);
    const [gender, setGender] = useState(Translations.Gender_Female);
    const intl = useIntl();
    return (
        <div>
            <Autocomplete key={props.locale} // Needed for automatic update
                          renderInput={dropDownSearchBox}
                          className={classes.root}
                          options={[Translations.Gender_Female, Translations.Gender_Male, Translations.Gender_Other]}
                          getOptionLabel={option => langString(option, intl)}
                          value={gender}
                          onChange={(event: any, newValue: number ) => {
                             setGender(newValue)
                          }}
            />
            <form className={classes.container} noValidate>
                <TextField
                    key={props.locale}
                    label={langString(Translations.Item_Count, intl)}
                    type="number"
                    color="secondary" variant="outlined"
                    className={classes.fullWidthWithHorizontalMargin}
                    value={number}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={e => setNumber(Number.parseInt(e.target.value))}
                />
            </form>
            <div>
                <h3 className={classes.fullWidthWithHorizontalMargin}>{lang(Translations.Texts_Result)}</h3>
                <DisplayCard title={lang(Translations.Texts_Amount_Label)} result={<FormattedMessage id={Translations.Texts_Amount.toString()} values={{itemCount: number}}/>} interestingValues={langString(Translations.Texts_Amount_Interesting_Values, intl)}/>
                <DisplayCard title={lang(Translations.Texts_Gender_Label)} result={<FormattedMessage id={Translations.Texts_Gender.toString()} values={{gender: gender}}/>} />
                <DisplayCard title={lang(Translations.Texts_Gender_Amount_Label)} result={<FormattedMessage id={Translations.Texts_Gender_Amount.toString()} values={{itemCount: number, gender: gender}}/>} />
            </div>
        </div>
    )
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
                    <Texts locale={locale}/>
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

