/* eslint-disable no-undef */
import React from "react";
import {Pagination} from "../Pagination";
import {mount} from 'enzyme';

const PREV_BTN_ID = '#page-prev';
const NEXT_BTN_ID = '#page-next';
const CURRENT_PAGE_ID = '#page-current';

test('Click next button', () => {
    const init = 1;
    const spy = jest.fn();
    const component = mount(
        <Pagination page={init} setPage={spy}/>
    );

    expect(
        component.find(CURRENT_PAGE_ID).text()
    ).toBe(init.toString());
    component.find(NEXT_BTN_ID).simulate('click');
    expect(
        spy
    ).toBeCalledTimes(1);
    expect(
        spy
    ).lastCalledWith(2);
});

test('Click prev button - disabled', () => {
    const init = 1;
    const spy = jest.fn();
    const component = mount(
        <Pagination page={init} setPage={spy}/>
    );

    expect(
        component.find(CURRENT_PAGE_ID).text()
    ).toBe(init.toString());
    component.find(PREV_BTN_ID).simulate('click');
    expect(
        spy
    ).toBeCalledTimes(0);
    expect(
        component.find(PREV_BTN_ID).prop('disabled')
    ).toBeTruthy();
});

test('Click prev button - success', () => {
    const init = 2;
    const spy = jest.fn();
    const component = mount(
        <Pagination page={init} setPage={spy}/>
    );

    expect(
        component.find(CURRENT_PAGE_ID).text()
    ).toBe(init.toString())
    component.find(PREV_BTN_ID).simulate('click');
    expect(
        spy
    ).toBeCalledTimes(1);
    expect(
        spy
    ).lastCalledWith(1);
});
