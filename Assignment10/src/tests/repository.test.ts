/* eslint-disable no-undef */
import {getPaginatedContent} from "./repository";

test('Check Paginated Content Generation', () => {
    const arr = getPaginatedContent(1);
    expect(arr.length).toBe(12);
    for (let i = 0; i < 12; i++) {
        expect(arr[i]).toBe(i + 1);
    }
});
