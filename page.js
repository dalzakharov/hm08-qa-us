module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportivePlan: 'div.tcard:has(img[alt="Supportive"])',
    paymentMethodButton: '.pp-text',
    addCardButton: '//div[contains(@class, "payment-picker") and contains(@class, "open")]//div[contains(@class, "pp-row")][.//div[contains(@class, "pp-title") and normalize-space()="Add card"]]',    
    cardNumberInput: '#number',
    cardCvvInput: '.card-code-input input#code',
    linkCardButton: '//button[@type="submit" and contains(concat(" ", normalize-space(@class), " "), " full ") and normalize-space()="Link"]',    // Modals
    closeCardModalButton: '.payment-picker.open .section.active > button.close-button.section-close',    
    driverMessageInput: '#comment',
    blanketSwitch: '//div[contains(@class, "r-type-switch")][.//div[normalize-space()="Blanket and handkerchiefs"]]//input[@type="checkbox"]',
    iceCreamPlusButton: '//div[contains(@class, "r-counter-container")][.//div[normalize-space()="Ice cream"]]//div[contains(@class, "counter-plus") and normalize-space()="+"]',
    iceCreamCounter: '//div[contains(@class, "r-counter-container")][.//div[normalize-space()="Ice cream"]]//div[contains(@class, "counter-value")]',
    phoneNumberModal: '.modal',
    orderButton: '.smart-button-wrapper > button.smart-button',
    carSearchTitle: '.order.shown .order-header-title',
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        await expect(fromField).toHaveValue(from);
        await expect(toField).toHaveValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
};