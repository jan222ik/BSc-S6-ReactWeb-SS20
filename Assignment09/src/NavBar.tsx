import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";
import {availableLanguages, messages, Translations} from "./translations";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {IconCalender, IconNumber, IconText} from "./Icons";
import {Autocomplete} from "@material-ui/lab";
import React from "react";
import {lang} from "./util";
import {useLocation, withRouter, Link} from "react-router-dom"
import {ROUTES} from "./app";

export const NavBar = withRouter((props) => {
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
            <Tab label={lang(Translations.Tab_Numbers)} icon={IconNumber} component={Link}
                 to={changePath(ROUTES.NUMBERS)}/>
            <Tab label={lang(Translations.Tab_Dates)} icon={IconCalender} component={Link}
                 to={changePath(ROUTES.DATES)}/>
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
