import { test } from '@playwright/test'


test(`Navigate to website and modify API requests`, async ({ page }) => {

    /*<-------------------------------------------------------------------->*/
    await page.route('**/*', (route) => { // block all API requests which has resourceType as images (block all images)
        return route.request().resourceType() === 'image'
            ? route.abort()
            : route.continue()
    })
    await page.goto('https://danube-web.shop/')
    await page.screenshot({ path: 'src/utilities/Output/S1.png', fullPage: true }) // store screen-shot at given location

    /*<-------------------------------------------------------------------->*/

    await page.route('**/*', (route) => { // block all CSS styling API requests 
        return route.request().resourceType() === 'stylesheet'
            ? route.abort()
            : route.continue()
    })
    await page.goto('https://danube-web.shop/')
    await page.screenshot({ path: 'src/utilities/Output/S2.png' }) // store screen-shot at given location

    /*<-------------------------------------------------------------------->*/

    const mockResponseObject = [
        {
            id: 1,
            title: 'How to Mock a Response-1',
            author: 'Shivam',
            genre: 'Business',
            price: '0.00',
            rating: '★★★★★',
            stock: 65535
        },
        {
            id: 2,
            title: 'How to Mock a Response-2',
            author: 'Rana',
            genre: 'College',
            price: '0.00',
            rating: '★★★',
            stock: 65535
        }
    ]

    await page.route('https://danube-web.shop/api/books', (route) => // return mock response instead of original response
        route.fulfill({
            contentType: 'application/json',
            status: 200,
            body: JSON.stringify(mockResponseObject)
        })
    )
    await page.goto('https://danube-web.shop/')
    await page.screenshot({ path: 'src/utilities/Output/S3.png' }) // store screen-shot at given location
})
