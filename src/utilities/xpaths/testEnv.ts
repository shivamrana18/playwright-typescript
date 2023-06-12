module.exports = {

    /** Xpaths related to landing page */
    signInButton: "//*[text()='Sign up']",
    logInButton: "//*[text()='Log in']",

    /**Xpaths related to login page */
    emailField: "input[name='email'][placeholder='Enter registered email']",
    passwordField: "input[name='password'][placeholder='Enter password']",
    login: "//*[text()='LOGIN']",

    /** Xpaths related to Home page */
    welcomeToastMsg: "*[role='alertdialog']",

    /** Xpaths related to Work-space */
    editButton: "//p[normalize-space()='Input']/parent::header/following-sibling::footer/a[text()='Edit']",
    dropdownButton: "//p[normalize-space()='Select']/parent::header/following-sibling::footer/a[text()='Drop-Down']",
    alertButton: "//p[normalize-space()='Alert']/parent::header/following-sibling::footer/a[text()='Dialog']",
    frameButton: "//p[normalize-space()='Frame']/parent::header/following-sibling::footer/a[text()='Inner HTML']",
    radioButton: "//p[normalize-space()='Radio']/parent::header/following-sibling::footer/a[text()='Toggle']",

    /** Xpaths related to 'Input' */
    inputTextHeader: "//h1[normalize-space()='Input']",
    disabledField: "input#noEdit",

    /** Xpaths related to 'Select' */
    dropdownTextHeader: "//h1[normalize-space()='Dropdown']",
    selectionMessage: "div.content p.subtitle",

    /** Xpaths related to 'Alert' */
    dialogTextHeader: "//h1[normalize-space()='Alert']",
    promptText: "p#myName",

    /** Xpaths related to 'Alert' */
    frameTextHeader: "//h1[normalize-space()='Frame']",
    emailText: "//input[@name='email']",

    /** Xpaths related to 'Alert' */
    radioTextHeader: "//h1[normalize-space()='Radio & Checkbox']",
    notGoingButton: "//input[@id='notG']",
    mayBeButton: "//input[@id='maybe']",
    remeberMeCheckbox: "//*[contains(text(),'Remember me')]/input",
    iAgreeCheckBox: "//*[contains(text(),'I agree to the')]/input"

}