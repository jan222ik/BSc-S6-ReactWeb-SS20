import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import React, {useState} from "react";
import {TextField} from "@material-ui/core";
import {Translations} from "./translations";
import {DisplayCard} from "./DisplayCard";
import {FormattedDate} from "react-intl";
import {lang} from "./util";

export const Dates = () => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            container: {
                display: 'flex',
                flexWrap: 'wrap',
                marginTop: theme.spacing(1)
            },
            textField: {
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(1),
                width: 200,
            },
            fullWidthWithHorizontalMargin: {
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(1),
                width: "100vw"
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
                    className={classes.fullWidthWithHorizontalMargin}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant='outlined'
                    onChange={e => setDate(new Date(Date.parse(e.target.value)))}
                />
            </form>
            <div>
                <h3 className={classes.fullWidthWithHorizontalMargin}>{lang(Translations.Texts_Result)}</h3>
                <DisplayCard title={lang(Translations.Numbers_No_Style)}
                             result={<FormattedDate value={date}/>}
                />
            </div>
        </>
    );
}
