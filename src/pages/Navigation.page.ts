import { Page } from '@playwright/test'
const valueFromParameterJson = require('../resources/parameters')

if (process.env.Env == 'Test') var xpaths = require('xpaths/testEnv.ts');
else if (process.env.Env == 'Prod') var xpaths = require('xpaths/prodEnv.ts');

export class Navigation {
    constructor(private _page: Page) {
        this._page = _page
    }

    async browseUrl() {
        await console.log("URL to launch :", valueFromParameterJson.testURL)
        await this._page.goto(valueFromParameterJson.testURL, { waitUntil: 'domcontentloaded' })
        await console.log("Title of page is :", await this._page.title())
    }

    async _navigateToInputPage() {
        /** This function will click on 'Edit' button, and navigate us to 'Input' section */
        try {
            await this._page.waitForSelector(xpaths.editButton)
            await this._page.dblclick(xpaths.editButton, { force: true }).then(() => console.log("Clicked on 'Edit' button"))
            await this._page.waitForSelector(xpaths.inputTextHeader).then(() => console.log("'Input' page loaded successfully"))
        }
        catch (errors) { return false }
    }

    async _navigateToSelectPage() {
        /** This function will click on 'Select' button, and navigate us to 'Dropdown' section */
        try {
            await this._page.waitForSelector(xpaths.dropdownButton)
            await this._page.dblclick(xpaths.dropdownButton, { force: true }).then(() => console.log("Clicked on 'Drop-Down' button"))
            await this._page.waitForSelector(xpaths.dropdownTextHeader).then(() => console.log("'Dropdown' page loaded successfully"))
        }
        catch (errors) { return false }
    }

    async _navigateToAlertPage() {
        /** Comments */
        try {
            await this._page.waitForSelector(xpaths.alertButton)
            await this._page.dblclick(xpaths.alertButton, { force: true }).then(() => console.log("Clicked on 'Dialog' button"))
            await this._page.waitForSelector(xpaths.dialogTextHeader).then(() => console.log("'Alert' page loaded successfully"))
        }
        catch (errors) { return false }
    }

    async _navigateToFramePage() {
        /** Comments */
        try {
            await this._page.waitForSelector(xpaths.frameButton)
            await this._page.dblclick(xpaths.frameButton, { force: true }).then(() => console.log("Clicked on 'Frame' button"))
            await this._page.waitForSelector(xpaths.frameTextHeader).then(() => console.log("'Frame' page loaded successfully"))
        }
        catch (errors) { return false }
    }

    async _navigateToRadioPage() {
        /** Comments */
        try {
            await this._page.waitForSelector(xpaths.radioButton)
            await this._page.dblclick(xpaths.radioButton, { force: true }).then(() => console.log("Clicked on 'Radio' button"))
            await this._page.waitForSelector(xpaths.radioTextHeader).then(() => console.log("'Radio' page loaded successfully"))
        }
        catch (errors) { return false }
    }

    async _navigateToWindowPage() {
        /** Comments */
        try {
            await this._page.waitForSelector(xpaths.windowButton)
            await this._page.dblclick(xpaths.windowButton, { force: true }).then(() => console.log("Clicked on 'Tabs' button"))
            await this._page.waitForSelector(xpaths.windowTextHeader).then(() => console.log("'Windows' page loaded successfully"))
        }
        catch (errors) { return false }
    }
}
