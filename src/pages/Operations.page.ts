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
        await console.log("Frames avaialble on UI : [", framesData.length, "] :", framesData)
    }

    async fillValueInEmailField() {
        /** Comment */

        const frame = this._page.frame({ name: "firstFr" });
        if (frame != null) {
            await frame.fill("input[name='fname']", "Shivam");
            await frame.fill("input[name='lname']", "Rana");

            // inner frame
            const frames = frame.childFrames();
            console.log('No. of inner frames: ' + frames.length);
            console.log("Frames Array: " + frames);
            if (frames != null) {
                await frames[0].locator("input[name='email']").fill("TestData");
                await frames[1].locator("input[name='email']").fill("TestData");
            }
            else {
                console.log("Wrong frame");
            }
            const parent = frames[0].parentFrame()
            await frame.fill("input[name='lname']", "Shivam_Rana");
            await parent?.fill("input[name='lname']", "Youtube");
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