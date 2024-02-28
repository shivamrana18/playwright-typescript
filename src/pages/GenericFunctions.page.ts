import { Page } from '@playwright/test'
const fs = require('fs');
const path = require('path');

export class FirstTimeLogin {
    constructor(private _page: Page) {
        this._page = _page
    }

    async setPageZoomSize(size: number){
        /** This function will set the zoom size of the page */
        await this._page.evaluate(`document.body.style.zoom=${size}`)
        await console.log("GenericFunctions.page.ts >> setPageZoomSize() >> Zoom size set to :", size)
    }

    async handleExportFile(downloadsPath:string){
        /** This function will handle the export file */
        const [download] = await Promise.all([ 
            this._page.waitForEvent('download').then(blobFile => {
                blobFile.saveAs(downloadsPath + "/" + blobFile.suggestedFilename())
                fs.readdirSync(downloadsPath).forEach(async file => {
                    if (file.startsWith("export") && file.endsWith(".xlsx")) {
                        let filepath = await (downloadsPath + '/' + file);
                        await console.log("File path is = " + filepath);
                    }
                });
            }),
            this._page.click("Put you xpath here"), // click on download button only after initialization of waitForEvent
            await this._page.waitForTimeout(3000),
            await console.log("Debug Point > Clicked On export"),
        ])
    }

    async deleteFileFromFolder(downloadsPath:string) {
        /* This function will check for the files in the download folder and delete them all */
        await fs.readdir(downloadsPath, (err, files) => {
            console.log("No.of file exists : " + files.length);
            files.forEach(file => {
                let cPath = downloadsPath + '\\' + file
                let ext = path.extname(cPath)
                if (ext == ".xlsx") {
                    console.log(cPath);
                    fs.unlinkSync(cPath);
                }
            });
            console.log("File Deleted");
        })
    }

    async renameFile(downloadsPath:string, name:string) {
        /**This function will rename a file */
        const copyFolder = downloadsPath;
        await fs.readdirSync(copyFolder).forEach(() => {
            let filenamepre = downloadsPath + "/export.xlsx";
            let RenamedFile = downloadsPath + '/updatedFileName.xlsx'
            fs.createReadStream(filenamepre).pipe(fs.createWriteStream(RenamedFile));
        });
        await console.log("Renaming Done");
    }

    async uploadFile(xpath: string, fileAddress: string){
        /* This function will upload a file */
        await this._page.setInputFiles(xpath, fileAddress)
        await console.log("File uploaded successfully")
    }

    async getBoundingBoxCoordinates(xpath: string){
        /* This function will get the bounding box coordinates of an xpath*/
        const boundingBox = await this._page.locator(xpath).boundingBox()
        await console.log("Bounding Box Coordinates are (x,y) : ", boundingBox?.x, boundingBox?.y)
        await console.log("Bounding Box Width/Height are : ", boundingBox?.height, boundingBox?.width)
    }
}