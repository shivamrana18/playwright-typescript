import { Page } from '@playwright/test'

if (process.env.Env == 'Test') var xpaths = require('../utilities/xpaths/testEnv.ts');
else if (process.env.Env == 'Prod') var xpaths = require('../utilities/xpaths/prodEnv.ts');

let d;

export class Input {
    constructor(private _page: Page) {
        this._page = _page
    }

    async validateBorderOfField() {
        /** Comment */
        let element = await this._page.getByPlaceholder('Enter first & last name').evaluate((ele) => getComputedStyle(ele).borderColor)
        await console.log("Border color :", element)
        if (element == 'rgb(250, 124, 145)') return true
        return false
    }

    async isFieldDisabled() {
        /** Comment */
        let status = await this._page.isDisabled(xpaths.disabledField)
        await console.log("Is field disbaled :", status)
        return status
    }
}

export class Select {
    constructor(private _page: Page) {
        this._page = _page
    }

    async selectFromDropdown(option) {
        /** Comment */
        let select = await this._page.locator('select#fruits')
        select.selectOption({ value: option })
        await console.log("Message on UI : ", await this._page.innerText(xpaths.selectionMessage))
    }
}

export class Alert {
    constructor(private _page: Page) {
        this._page = _page
    }

    async validateConfirmAlert() {
        /** Comment */
        await this._page.once('dialog', (dialog) => {
            console.log("Type of Dialog :", dialog.type())
            console.log("Message in Dialog :", dialog.message())
            this._page.waitForTimeout(3000)
            dialog.dismiss()
        })
        await this._page.click('button#confirm')
    }

    async validatePromptAlert() {
        /** Comment */
        await this._page.once('dialog', (dialog) => {
            console.log("Type of Dialog :", dialog.type())
            console.log("Message in Dialog :", dialog.message())
            this._page.waitForTimeout(3000)
            dialog.accept('Shivam Rana !!!')
        })
        await this._page.click('button#prompt')
        await console.log("Prompt message printed on UI :", await this._page.innerText(xpaths.promptText))
    }
}

export class Frame {
    constructor(private _page: Page) {
        this._page = _page
    }

    async getCountOfFrames() {
        /** Comment */
        let framesData = await this._page.frames()
        await console.log("Frames avaialble on UI :", framesData)
    }

    async fillValueInEmailField() {
        /** Comment */
        const frame = await this._page.frameLocator("iframe[src='innerFrame']")
        await frame.locator(xpaths.emailText).fill('demo@gmail.com')
        await console.log("Email-Id filled :", await frame.locator(xpaths.emailText).inputValue())
    }
}