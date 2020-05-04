import {FormattedMessage} from "react-intl";
import React from "react";

export type LocaleProps = { locale: any }

export const lang = (id: number) => <FormattedMessage id={id.toString()}/> // toString needed; otherwise lookup for key 0 fails

export const langString = (id: number, intl: any) => {return intl.formatMessage({id: id.toString()})}
