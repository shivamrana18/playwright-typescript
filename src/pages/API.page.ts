import { Page } from "@playwright/test";
const apiRequest = require('axios')

export class API {
    constructor(private _page: Page) {
        this._page = _page
    }

    public async createHttpService(httpMethod: HttpMethod, env: ENV, urlPostfix: URLPostfix, payload?: string, queryString?: object, Tokentext?: string): Promise<string> {
        /** This function will create a full end-point URL based on requirements and fetch API response */
        let apiResponse: string;
        await console.log(" in callHttpService what is QS " + queryString);
        await console.log(" in callHttpService what is stringified QS " + JSON.stringify(queryString));
        var options: HttpOptions = {
            url: await this.generateCompleteURL(env, urlPostfix),
            headers: {
                'User-Agent': 'Request-Promise',
                'x-correlation-id': '',
                'Authorization': ''
            },
            json: true, // Automatically parses the JSON string in the response
        };
        if (httpMethod === HttpMethod.Post) {
            options.method = HttpMethod.Post;
            options.data = JSON.parse(payload ?? '');
        }
        else if (httpMethod === HttpMethod.GetWithQS) {
            console.log('URL:' + options.url)
            options.params = queryString;
        }
        else if (httpMethod === HttpMethod.GetWithParams) {
            options.url += '(' + payload + ')';
        }
        else if (httpMethod === HttpMethod.Url) {
            options.url += '/' + payload;
        }
        apiResponse = await this.getResponse(options)
        return apiResponse;
    }

    public async generateCompleteURL(env: ENV, urlPostfix: URLPostfix): Promise<string> {
        /** This function will generate complete URL based on the environment */
        let completeURL: string = '';
        switch (env) {
            case 'Test': {
                completeURL = URLPrefix.Test + urlPostfix;
                break;
            }
            case 'Prod': {
                completeURL = URLPrefix.Prod + urlPostfix;
                break;
            }
            default: {
                console.log("Incorrect environment passed");
            }
        }
        return completeURL;
    }

    public async getResponse(options: HttpOptions): Promise<string> {
        /** This function will get the response from the API */
        let response: string = '';
        await apiRequest(options)
            .then(function (res: any) {
                response = JSON.stringify(res.data);
                console.log("Response is : " + response);
            })
            .catch(function (err: any) {
                console.log("Error is : " + err);
            });
        return response;
    }

    async demoAPICall(){
        /** This function will demonstrate a demo API call */
        let queryString = { name : "Shivam", job : "Rana"}
        let response = await this.createHttpService(HttpMethod.GetWithQS, ENV.Test, URLPostfix.User, '', queryString, '')
        await console.log("Response is : " + response)
    }
}

export type HttpOptions = {
    method?: string;
    url: string;
    params?: object,
    headers: { 'User-Agent': string; 'x-correlation-id': string; Authorization: any; };
    data?: any;
    json: boolean;
}
export enum HttpMethod {
    GetWithParams = 'GetWithParams',
    GetWithQS = 'get',
    Post = 'post',
    Url = 'Url',
}
export enum ENV {
    Test = 'Test',
    Prod = 'Prod',
}
export enum URLPrefix {
    Test = 'https://reqres.in/',
    Prod = 'https://reqres.in/',
}
export enum URLPostfix {
    User = 'api/users',
    UserWithID = 'api/users/2',
    CreateUser = 'api/users'
}