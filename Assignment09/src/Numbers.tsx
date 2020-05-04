import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import React, {useState} from "react";
import {FormattedNumber, useIntl} from "react-intl";
import {TextField} from "@material-ui/core";
import {Translations} from "./translations";
import {DisplayCard} from "./DisplayCard";
import {lang, langString, LocaleProps} from "./util";

export const Numbers = (props: LocaleProps) => {
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
                marginTop: theme.spacing(1)
            },
            fullWidthWithHorizontalMargin: {
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(1),
                width: "100vw"
            },
        })
    );
    const classes = useStyles();
    const [number, setNumber] = useState(0);
    const intl = useIntl()
    return (
        <>
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
                    onChange={e => setNumber(Number.parseFloat(e.target.value))}
                />
            </form>
            <div>
                <h3 className={classes.fullWidthWithHorizontalMargin}>{lang(Translations.Texts_Result)}</h3>
                <DisplayCard title={lang(Translations.Numbers_No_Style)}
                             result={<FormattedNumber value={number}/>}
                />
                <DisplayCard title={lang(Translations.Numbers_Currency_Label)}
                             result={<FormattedNumber value={number} style="currency" currency="EUR"/>}
                />
                <DisplayCard title={lang(Translations.Numbers_Currency_MinFrac_Label)}
                             result={<FormattedNumber value={number} style="currency" currency="EUR"
                                                      minimumFractionDigits={4}/>}
                />
                <DisplayCard title={lang(Translations.Numbers_KByte_Label)}
                             result={<FormattedNumber value={number} style="unit" unit="kilobyte"/>}
                />
                <DisplayCard title={lang(Translations.Numbers_Percentage_Label)}
                             result={<FormattedNumber value={number} style="unit" unit="percent" minimumFractionDigits={1}/>}
                />
            </div>
        </>
    )
}
