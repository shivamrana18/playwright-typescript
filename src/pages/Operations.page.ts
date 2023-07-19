import { BrowserContext, Page } from '@playwright/test'

if (process.env.Env == 'Test') var xpaths = require('xpaths/testEnv.ts');
else if (process.env.Env == 'Prod') var xpaths = require('xpaths/prodEnv.ts');
let context: BrowserContext;

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

    async selectFromDropdown(option: string) {
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
        await console.log("Frames avaialble on UI : [", framesData.length, "]")
    }

    async fillValueInEmailField() {
        /** Comment */

        const frame = this._page.frame({ name: "firstFr" });
        if (frame != null) {
            await frame.fill("input[name='fname']", "Shivam");
            await frame.fill("input[name='lname']", "Rana");

            // inner frame
            const innerFrame = frame.frameLocator("iframe.has-background-white")
            await innerFrame.locator("input[name='email']").type("shivamrana@lala.com")
            await frame.locator("input[name='fname']").type("koushik")
        } else throw new Error("No such frame")
    }
}

export class RadioOrCheckbox {
    constructor(private _page: Page) {
        this._page = _page
    }

    async validateRadioOrCheckboxes() {
        /** Comment */
        let isMayBeButtonChecked = await this._page.locator(xpaths.mayBeButton).isChecked()
        let isRemeberMeCheckboxChecked = await this._page.locator(xpaths.remeberMeCheckbox).isChecked()

        await this._page.locator(xpaths.notGoingButton).check()
        let isNotGoingButtonChecked = await this._page.locator(xpaths.notGoingButton).isChecked()

        await this._page.locator(xpaths.iAgreeCheckBox).check()
        let isIAgreeCheckboxChecked = await this._page.locator(xpaths.iAgreeCheckBox).isChecked()

        await console.log(`isMayBeButtonChecked : ${isMayBeButtonChecked}
        \nisRemeberMeCheckboxChecked : ${isRemeberMeCheckboxChecked}
        \nisNotGoingButtonChecked : ${isNotGoingButtonChecked}
        \nisIAgreeCheckboxChecked : ${isIAgreeCheckboxChecked}`)
        return [isMayBeButtonChecked, isRemeberMeCheckboxChecked, isNotGoingButtonChecked, isIAgreeCheckboxChecked]
    }
}

export class Windows {
    constructor(private _page: Page) {
        this._page = _page
    }

    async InitializeContext(getContext: BrowserContext) {
        /** This function will initialize browser context, which would be used later while handling multiple windows */
        context = getContext;
    }

    async getUrlOfNewWindow() {
        /** Comment */
        let context1: BrowserContext = context

        const tab = context1.waitForEvent('page')
        await this._page.click(xpaths.multiTabButton)
        await console.log("New Tab URL :", await (await tab).url())
        const tabCount = await (await tab).context().pages()
        await console.log("Promt Alert :", tabCount.length)

        tabCount.forEach(page => {
            console.log("URL :", page.url())
        })

        await tabCount[1].bringToFront()
        tabCount[1].on('dialog', (dialog) => {
            console.log("Type of Alert :", dialog.type()),
                console.log("Default value of Alert :", dialog.defaultValue()),
                console.log("Prompt Alert message :", dialog.message()),
                dialog.accept("Hello!!! Shivam Rana this side.")
        })
        await tabCount[1].click(xpaths.promptAlertButton)
    }
}