/**
 Author
 Shivam Rana
 */

import { chromium } from '@playwright/test';
const valueFromParameterFile = require('../resources/parameters');

if (process.env.Env == 'Test')    var xpaths = require('../utilities/xpaths/testEnv.ts');
else if (process.env.Env == 'Prod')    var xpaths = require('../utilities/xpaths/prodEnv.ts');

module.exports = async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await console.log(process.env.Env, ": Performing First-Time Login...")
    await page.goto(valueFromParameterFile.baseUrl);
    await page.waitForSelector(xpaths.signInButton).then(() => console.log(process.env.Env, ": Page loaded successfully"))

    await page.click(xpaths.logInButton)
    await console.log(process.env.Env, ": Login button clicked")
    await page.waitForSelector(xpaths.emailField).then(() => console.log(process.env.Env, ": Login page loaded"))

    await page.fill(xpaths.emailField, valueFromParameterFile.email)
    await console.log(process.env.Env, ": Email Id filled")

    await page.fill(xpaths.passwordField, valueFromParameterFile.password)
    await console.log(process.env.Env, ": Password filled")

    await page.click(xpaths.login)
    await console.log(process.env.Env, ": Clicked on 'LOGIN' button")

    await page.waitForSelector(xpaths.welcomeToastMsg).then(() => console.log(process.env.Env, ": Welcome toast message visible"))

    await page.innerText(xpaths.welcomeToastMsg).then(async (text) => {
        if (text == `Welcome ${valueFromParameterFile.userFirstName} ${valueFromParameterFile.userLastName}`) await console.log(process.env.Env, `: Welcome toast message printed correctly : ${text}`)
        else await console.log(process.env.Env, `: Welcome toast message printed incorrectly : ${text}`)
    })

    await page.context().storageState({ path: 'storageState.json' });
    await browser.close();
}

