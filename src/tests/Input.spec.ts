import { test, Page } from '@playwright/test'
import { Navigation } from '../pages/Navigation.page'
import { Input, Select, Alert, Frame } from '../pages/Operations.page'
const valueFromParameterJson = require('../resources/parameters')

test.describe.serial(`Lets Automate it !!!`, async () => {

    let page: Page
    let navigate: Navigation
    let input: Input
    let select: Select
    let alert: Alert
    let frame: Frame

    test.beforeAll(async ({ browser }) => {
        let context = await browser.newContext()
        page = await context.newPage()
        navigate = new Navigation(page)
        input = new Input(page)
        select = new Select(page)
        alert = new Alert(page)
        frame = new Frame(page)
    })

    test.describe(`Input-Edit`, async () => {
        test(`Step-1 : Navigate to 'Input' section`, async () => {
            await navigate.browseUrl()
            await navigate._navigateToInputPage()
        })

        test(`Step-2 : Validate fields in 'Input' section`, async () => {
            await input.validateBorderOfField()
            await input.isFieldDisabled()
        })
    })

    test.describe(`Select-Dropdown`, async () => {
        test(`Step-1 : Navigate to 'Select' section`, async () => {
            await navigate.browseUrl()
            await navigate._navigateToSelectPage()
        })

        test(`Step-2 : Validate fields in 'Select' section`, async () => {
            await select.selectFromDropdown('3')
        })
    })

    test.describe(`Alert-Dialog`, async () => {
        test(`Step-1 : Navigate to 'Alert' section`, async () => {
            await navigate.browseUrl()
            await navigate._navigateToAlertPage()
        })

        test(`Step-2 : Validate fields in 'Alert' section`, async () => {
            await alert.validateConfirmAlert()
            await alert.validatePromptAlert()
        })
    })

    test.describe(`Frame-Iframe`, async () => {
        test(`Step-1 : Navigate to 'Frame' section`, async () => {
            await navigate.browseUrl()
            await navigate._navigateToFramePage()
        })

        test(`Step-2 : Fill email in 'Frame' section`, async () => {
            await frame.getCountOfFrames()
            await frame.fillValueInEmailField()
        })
    })


})