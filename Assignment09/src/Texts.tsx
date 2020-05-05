import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";
import {Translations} from "./translations";
import React, {useState} from "react";
import {FormattedMessage, useIntl} from "react-intl";
import {Autocomplete} from "@material-ui/lab";
import {DisplayCard} from "./DisplayCard";
import {lang, langString, LocaleProps} from "./util";
import {CustomInput} from "./CustomInput";

export const Texts = (props: LocaleProps) => {
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
                          onChange={(event: any, newValue: number) => {
                              setGender(newValue)
                          }}
            />
            <form className={classes.container} noValidate>
                <CustomInput
                    className={classes.fullWidthWithHorizontalMargin}
                    key={props.locale}
                    labelTranslation={Translations.Guest_Count}
                    value={number}
                    onChange={e => {
                        let parseInt = Number.parseInt(e.target.value);
                        parseInt = (parseInt) ? Math.max(0, parseInt) : 0;
                        setNumber(parseInt);
                    }}
                />
            </form>
            <div>
                <h3 className={classes.fullWidthWithHorizontalMargin}>{lang(Translations.Texts_Result)}</h3>
                <DisplayCard title={lang(Translations.Texts_Amount_Label)}
                             result={<FormattedMessage id={Translations.Texts_Amount.toString()}
                                                       values={{itemCount: number}}/>}
                             interestingValues={langString(Translations.Texts_Amount_Interesting_Values, intl)}
                />
                <DisplayCard title={lang(Translations.Texts_Gender_Label)}
                             result={<FormattedMessage id={Translations.Texts_Gender.toString()}
                                                       values={{gender: gender}}/>}
                />
                <DisplayCard title={lang(Translations.Texts_Gender_Amount_Label)}
                             result={<FormattedMessage id={Translations.Texts_Gender_Amount.toString()}
                                                       values={{itemCount: number, gender: gender}}/>}
                />
            </div>
        </div>
    )
}
