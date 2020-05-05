import {TextField} from "@material-ui/core";
import {langString} from "./util";
import {useIntl} from "react-intl";
import React from "react";

export type CustomInputProps = { className: any, type?: any, value: any, onChange: (e: any) => void, labelTranslation: number}
export const CustomInput = ({className, type, value, onChange, labelTranslation}: CustomInputProps) => {
    return (
        <TextField
            color='secondary'
            variant='outlined'
            className={className}
            InputLabelProps={{
                shrink: true,
            }}
            type={type ? type : 'number'}
            label={langString(labelTranslation, useIntl())}
            value={value}
            onChange={onChange}
        />
    )
}
