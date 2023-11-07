import { test as baseTest } from '@playwright/test'
import { Navigation } from '@pages/Navigation.page'
import { Input, Select, Alert, Frame, RadioOrCheckbox, Windows } from '@pages/Operations.page'

type importedClass = {
    navigation: Navigation,
    input: Input,
    select: Select,
    alert: Alert,
    frame: Frame,
    buttons: RadioOrCheckbox,
    windows: Windows
}

export const myTest = baseTest.extend<importedClass>({
    navigation: async ({ page }, run) => {
        await console.log("Setup")
        await run(new Navigation(page)) // initialize page instance
        await console.log("TearDown")
    },
    input: async ({ page }, run) => {
        await console.log("Setup")
        await run(new Input(page)) // initialize page instance
        await console.log("TearDown")
    },
    select: async ({ page }, run) => {
        await console.log("Setup")
        await run(new Select(page)) // initialize page instance
        await console.log("TearDown")
    },
    alert: async ({ page }, run) => {
        await console.log("Setup")
        await run(new Alert(page)) // initialize page instance
        await console.log("TearDown")
    },
    frame: async ({ page }, run) => {
        await console.log("Setup")
        await run(new Frame(page)) // initialize page instance
        await console.log("TearDown")
    },
    buttons: async ({ page }, run) => {
        await console.log("Setup")
        await run(new RadioOrCheckbox(page)) // initialize page instance
        await console.log("TearDown")
    },
    windows: async ({ page }, run) => {
        await console.log("Setup")
        await run(new Windows(page)) // initialize page instance
        await console.log("TearDown")
    }
})

export const expect = myTest.expect