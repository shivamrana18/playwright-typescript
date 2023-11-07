import { Page, BrowserContext } from '@playwright/test'
import {myTest, expect} from '@pages/Fixture.page'
var context: BrowserContext

myTest.describe.serial(`Lets Automate it !!!`, async () => {

    let page: Page
   

    myTest.beforeAll(async ({ browser }) => {
        context = await browser.newContext()
        page = await context.newPage()
    })

    myTest.describe(`Input-Edit`, async () => {
        myTest(`Step-1 : Navigate to 'Input' section`, async ({navigation}) => {
            await navigation.browseUrl()
            await navigation._navigateToInputPage()
        })

        myTest(`Step-2 : Validate fields in 'Input' section`, async ({input}) => {
            await input.validateBorderOfField()
            await input.isFieldDisabled()
        })
    })

    myTest.describe(`Select-Dropdown`, async () => {
        myTest(`Step-1 : Navigate to 'Select' section`, async ({navigation}) => {
            await navigation.browseUrl()
            await navigation._navigateToSelectPage()
        })

        myTest(`Step-2 : Validate fields in 'Select' section`, async ({select}) => {
            await select.selectFromDropdown('3')
        })
    })

    myTest.describe(`Alert-Dialog`, async () => {
        myTest(`Step-1 : Navigate to 'Alert' section`, async ({navigation}) => {
            await navigation.browseUrl()
            await navigation._navigateToAlertPage()
        })

        myTest(`Step-2 : Validate fields in 'Alert' section`, async ({alert}) => {
            await alert.validateConfirmAlert()
            await alert.validatePromptAlert()
        })
    })

    myTest.describe(`Frame-Iframe`, async () => {
        myTest(`Step-1 : Navigate to 'Frame' section`, async ({navigation}) => {
            await navigation.browseUrl()
            await navigation._navigateToFramePage()
        })

        myTest(`Step-2 : Fill email in 'Frame' section`, async ({frame}) => {
            await frame.getCountOfFrames()
            await frame.fillValueInEmailField()
        })
    })

    myTest.describe(`Radio-CheckBoxes`, async () => {
        myTest(`Step-1 : Navigate to 'Radio' section`, async ({navigation}) => {
            await navigation.browseUrl()
            await navigation._navigateToRadioPage()
        })

        myTest(`Step-2 : Validate 'Radio' section`, async ({buttons}) => {
            let [isMayBeButtonChecked, isRemeberMeCheckboxChecked, isNotGoingButtonChecked, isIAgreeCheckboxChecked]
                = await buttons.validateRadioOrCheckboxes()

            expect.soft(isMayBeButtonChecked).toEqual(false)
            expect.soft(isRemeberMeCheckboxChecked).toEqual(true)
            expect.soft(isNotGoingButtonChecked).toEqual(true)
            expect.soft(isIAgreeCheckboxChecked).toEqual(true)
        })
    })

    myTest.describe(`Windows-Tab Handling`, async () => {
        myTest(`Step-1 : Navigate to 'Windows' section`, async ({navigation}) => {
            await navigation.browseUrl()
            await navigation._navigateToWindowPage()
        })

        myTest(`Step-2 : Handle multiple windows`, async ({windows}) => {
            await windows.InitializeContext(context)
            await windows.getUrlOfNewWindow()
        })
    })
})