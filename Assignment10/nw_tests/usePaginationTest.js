/* eslint-disable no-undef */
const PREV_BTN_ID = '#page-prev';
const NEXT_BTN_ID = '#page-next';
const CURRENT_PAGE_ID = '#page-current';
const LAST_ITEM_ID = '#item11';
describe('Main Scenario', function() {

    before(browser => browser.url('http://localhost:8080/'));

    test('Click Next to see next page', function (browser) {
        browser
            .waitForElementVisible('body')
            .assert.titleContains('Jest and Nightwach Testing')
            .assert.containsText(LAST_ITEM_ID, "12")
            .assert.containsText(CURRENT_PAGE_ID, "1")
            .assert.visible(PREV_BTN_ID)
            .click(PREV_BTN_ID)
            .assert.containsText(CURRENT_PAGE_ID, "1")
            .assert.containsText(LAST_ITEM_ID, "12")
            .assert.visible(NEXT_BTN_ID)
            .click(NEXT_BTN_ID)
            .assert.containsText(CURRENT_PAGE_ID, "2")
            .assert.containsText(LAST_ITEM_ID, "24")
            .click(PREV_BTN_ID)
            .assert.containsText(CURRENT_PAGE_ID, "1")
            .assert.containsText(LAST_ITEM_ID, "12")
    });

    after(browser => browser.end());
});
