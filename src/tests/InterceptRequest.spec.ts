import { test } from '@playwright/test'


test(`Navigate to www.google.com and get data of all API requests made by page`, async ({ page }) => {

    // For a successful response, the sequence of events is 'request' -> 'response' -> 'requestfinished'

    await page.context().newPage()
    page.on('request', (req) => {
        if (req.url().includes('https://www.google.com')) { // check for string in API request URLs
            console.log("\nURL :", req.url()),
                console.log("Methods :", req.method()),
                console.log("ResourceType :", req.resourceType())
        }
    })

    page.on('response', async (res) => {
        await res.finished()
        console.log("\nResponse-URL :", res.url())
        console.log("\nResponse-JSON :", (await res.body()).toString())
    })

    await Promise.all([
        page.goto('https://www.google.com/', { waitUntil: 'domcontentloaded' }),
        page.waitForTimeout(30_000)
    ]).then(async () => {
        await page.waitForSelector('.CcAdNb')
    })

})
