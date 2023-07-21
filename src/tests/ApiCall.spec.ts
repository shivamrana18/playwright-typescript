import { test } from '@playwright/test'

test.describe.parallel(`Basic API Calls`, () => {

    test.use({ baseURL: 'https://reqres.in' })

    test(`GET call`, async ({ request, baseURL }) => {
        await console.log(`<<<<<<<<<< GET >>>>>>>>>>`)
        await console.time(`One`)
        const response = await request.get(`${baseURL}/api/users/2`)
        await console.log(`GET status code : ${await response.ok()}`)
        await console.log(`GET body : ${await response.body()}`)
        await console.log(`GET status : ${await response.status()}`)
        await console.log(`GET url : ${response.url()}`)
        await console.timeEnd(`One`)
    })

    test(`POST call`, async ({ request, baseURL }) => {
        await console.log(`<<<<<<<<<< POST >>>>>>>>>>`)
        await console.time(`Two`)
        const response = await request.post(`${baseURL}/api/users`, {
            data: {
                "name": "shivam",
                "job": "rana"
            }
        })
        await console.log(`\nPOST status code : ${await response.ok()}`)
        await console.log(`POST body : ${await response.body()}`)
        await console.log(`POST status : ${await response.status()}`)
        await console.log(`POST url : ${response.url()}`)
        await console.timeEnd(`Two`)
    })

    test(`PUT call`, async ({ request, baseURL }) => {
        await console.log(`<<<<<<<<<< PUT >>>>>>>>>>`)
        await console.time(`Three`)
        const response = await request.post(`${baseURL}/api/users`, {
            data: {
                "name": "shivam_put",
                "job": "rana_put"
            }
        })
        await console.log(`\nPUT status code : ${await response.ok()}`)
        await console.log(`PUT body : ${await response.body()}`)
        await console.log(`PUT status : ${await response.status()}`)
        await console.log(`PUT url : ${response.url()}`)
        await console.timeEnd(`Three`)
    })
})