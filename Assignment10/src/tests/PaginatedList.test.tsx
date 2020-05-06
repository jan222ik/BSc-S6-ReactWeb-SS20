/* eslint-disable no-undef */
import React from "react";
import {mount} from 'enzyme';
import {PaginatedList} from "./PaginatedList";

test('Check List Page', () => {
    for (let init = 1; init < 2; init++) {
        const component = mount(
            <PaginatedList page={init}/>
        );

        for (let i = 0; i < 12; i++) {
            const text = ((init - 1) * 12 + i + 1).toString();
            let props = '#item' + i;
            expect(component.find(props).text()).toEqual(text);
        }
        expect(component.find("#item12").exists()).toBeFalsy()
    }
});

