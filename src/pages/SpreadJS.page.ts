import { Page } from "@playwright/test";

export class SpreadJS{
    constructor(private _page: Page) {
        this._page = _page
    }

    async getAccessOfSpreadJSSheet(){
        /* This function will get the access of SpreadJS sheet */
        await this._page.evaluate(`window.TS.sheets.length`); // to get the number of work sheets in SpreadJS
        await this._page.evaluate(`window.TS = new GC.Spread.Sheets.findControl(document.getElementById('put you sheet's xpath here'))`); // get access of SpreadJS sheet element from DOM
        await this._page.evaluate(`window.TS.getSheetIndex('Enter your worksheet name here')`); // to get access of specific worksheet[string in single quotes]
        await this._page.evaluate(`window.TS.setActiveSheetIndex(Enter worksheet index here);`); // to open a specific sheet based on its index values
        await this._page.evaluate(`window.TS.getActiveSheet().getDataSource()`); // to get data of the active worksheet
    }

    async applyLogicToSpreadJS(){
        await this._page.evaluate(`var rowCount =window.TS.getActiveSheet().getRowCount();
        for(var i =0; i <rowCount; i++){
            var cell = window.TS.getActiveSheet().getCell(i, 0, GC.Spread.Sheets.SheetArea.rowHeader);
            if (cell.cellType() instanceof GC.Spread.Sheets.CellTypes.CheckBox) {
                cell.value(true);
                break;
            }
        }`); // to select a checkbox in SpreadJS sheet [currently selects first checkbox]


        await this._page.evaluate(`window.TS.getActiveSheet().getValue(2, 74, GC.Spread.Sheets.SheetArea.colHeader)`); // to get the value of a specific cell

        await this._page.evaluate(`
        var noOfLines =window.TS.getActiveSheet().getRowCount();
        var columnCount =window.TS.getActiveSheet().getColumnCount();
        var newArray=[];
        for(var i =0;i<noOfLines ;i++){
            var newArray1 =window.TS.getActiveSheet().getArray(i, 2, noOfLines, columnCount, true); 
            newArray.push(newArray1)
        };
        const dataSource = window.TS.getActiveSheet().getDataSource();
        var lastIndex= Object.keys(dataSource[0]).length;
        var firstOccuranceIndex=Object.keys(dataSource[0]).indexOf('Month1');`);

        await this._page.evaluate(`
        var rowCount =window.TS.getActiveSheet().getRowCount();
        var cell = window.TS.getActiveSheet().getCell(rowCount-1, 0, GC.Spread.Sheets.SheetArea.rowHeader);
        if (cell.cellType() instanceof GC.Spread.Sheets.CellTypes.CheckBox) {
            cell.value(true);
        }`);

        await this._page.evaluate(`var rowCount =window.TS.getActiveSheet().getRowCount();
        var columnCount =window.TS.getActiveSheet().getColumnCount();
        for(var i =73; i <columnCount; i++){ 
            window.TS.getActiveSheet().setValue(rowCount-1, i, 30+i)
        };`); // to set value in a specific cell

        await this._page.evaluate(`window.TS.getActiveSheet().getFormatter(1,33,GC.Spread.Sheets.SheetArea.viewport);`); // Returns the cell formatter string or object for the specified cell. [Row, Column, SheetArea]

        await this._page.evaluate(`window.TS.getActiveSheet().getColumnVisible(0, GC.Spread.Sheets.SheetArea.viewport);`); // Returns a value that indicates whether the specified column is visible. [true if visible, else false] [Row, Column, SheetArea]
    
        await this._page.evaluate(`
        var totalRowCount =window.TS.getActiveSheet().getRowCount();
        var totalColumnCount =window.TS.getActiveSheet().getColumnCount();
        window.TS.getActiveSheet().setFormula(rowCount-1,77,"=SUM(100+200)",GC.Spread.Sheets.SheetArea.viewport);`); // to set formula in a specific cell

        await this._page.evaluate(`window.TS.getActiveSheet().getFormula(rowCount-1,77);`); // to get formula of a specific cell

        await this._page.evaluate(`window.TS.getActiveSheet().getValue(rowCount-1,76);`); // to get value of a specific cell



    }
}