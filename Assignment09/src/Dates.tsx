import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import React, {useState} from "react";
import {Translations} from "./translations";
import {DisplayCard} from "./DisplayCard";
import {FormattedDate} from "react-intl";
import {lang, LocaleProps} from "./util";
import {CustomInput} from "./CustomInput";

export const Dates = (props: LocaleProps) => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
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
        }),
    );
    const classes = useStyles();
    const [date, setDate] = useState<Date>(new Date())
    return (<>
            <form className={classes.container} noValidate>
                <CustomInput
                    className={classes.fullWidthWithHorizontalMargin}
                    type="date"
                    labelTranslation={Translations.Dates_Input_Label}
                    value={date.toISOString().substr(0, 10)}
                    onChange={e => setDate(new Date(Date.parse(e.target.value)))}
                />
            </form>
            <div>
                <h3 className={classes.fullWidthWithHorizontalMargin}>{lang(Translations.Texts_Result)}</h3>
                <DisplayCard title={lang(Translations.Dates_No_Style)}
                             result={<FormattedDate value={date}/>}
                />
                <DisplayCard title={lang(Translations.Dates_WeekdayLong_MonthLong_DayNumeric)}
                             result={<FormattedDate value={date} day="numeric" month="long" weekday="long"/>}
                />
                <DisplayCard title={lang(Translations.Dates_No_Style_Time_LocaleString)}
                             result={date.toLocaleTimeString()}
                />
                <DisplayCard title={lang(Translations.Dates_WeekdayLong_MonthLong_DayNumeric_LocaleString)}
                             result={date.toLocaleString(props.locale, {
                                 weekday: 'long',
                                 month: 'long',
                                 day: 'numeric'
                             })}
                />
            </div>
        </>
    );
}
