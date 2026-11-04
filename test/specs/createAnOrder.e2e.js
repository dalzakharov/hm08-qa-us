
const page = require('../../page');
const helper = require('../../helper');

describe('Create an order', () => {

    it('should open phone number modal', async () => {
        await browser.url('/');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();

        const phoneNumberModal = await $(page.phoneNumberModal);
        await expect(phoneNumberModal).toBeDisplayed();
    });

    it('should save the phone', async () => {
        await browser.url('/');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        const phoneNumber = helper.getPhoneNumber('+1');
        await page.submitPhoneNumber(phoneNumber);

        await expect(
            await helper.getElementByText(phoneNumber)
        ).toBeExisting();
    });

    it('should select Supportive plan, save phone and add card', async () => {
        await browser.url('/');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        // Select Supportive plan
        const supportivePlan = await $(page.supportivePlan);
        await supportivePlan.waitForDisplayed();
        await supportivePlan.click();

        await expect(supportivePlan).toHaveAttributeContaining(
            'class',
            'active'
        );

        // Save phone number
        const phoneNumber = helper.getPhoneNumber('+1');
        await page.submitPhoneNumber(phoneNumber);
        await expect(
            await helper.getElementByText(phoneNumber)
        ).toBeExisting();

        // Open payment methods
        const paymentMethodButton = await $(page.paymentMethodButton);
        await paymentMethodButton.waitForClickable();
        await paymentMethodButton.click();

        // Wait for payment modal
        const paymentModal = await $('.payment-picker.open');
        await expect(paymentModal).toBeDisplayed();

        // Open Add card form
        const addCardButton = await $(page.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();

        // Enter card number
        const cardNumberInput = await $(page.cardNumberInput);
        await cardNumberInput.waitForDisplayed();
        await cardNumberInput.setValue('1234 5678 9012 3456');

        // Enter CVV
        const cardCvvInput = await $(page.cardCvvInput);
        await cardCvvInput.waitForDisplayed();
        await cardCvvInput.setValue('123');

        // Remove focus from CVV
        await browser.keys('Tab');

        // Link card
        const linkCardButton = await $(page.linkCardButton);
        await linkCardButton.waitForClickable();
        await linkCardButton.click();

        // Close the Add card modal
        const closeCardModalButton = await $(page.closeCardModalButton);
        await closeCardModalButton.waitForClickable();
        await closeCardModalButton.click();

        // Enter a message to the driver
        const driverMessageInput = await $(page.driverMessageInput);
        await driverMessageInput.waitForDisplayed();
        await driverMessageInput.setValue('Please wait near the entrance');

        await expect(driverMessageInput).toHaveValue('Please wait near the entrance');

        // Enable blanket and handkerchiefs
        const blanketSwitch = await $(page.blanketSwitch);

        if (!(await blanketSwitch.isSelected())) {
            await blanketSwitch.parentElement().click();
        }
        await expect(blanketSwitch).toBeSelected();

        // Add two ice creams
        const iceCreamPlusButton = await $(page.iceCreamPlusButton);
        await iceCreamPlusButton.waitForClickable();

        await iceCreamPlusButton.click();
        await iceCreamPlusButton.click();

        // Verify ice cream quantity
        const iceCreamCounter = await $(page.iceCreamCounter);
        await expect(iceCreamCounter).toHaveText('2');

        // Order a taxi
        const orderButton = await $(page.orderButton);
        await orderButton.waitForClickable();
        await expect(orderButton).toHaveTextContaining('Order');
        await orderButton.click();

        // Verify that car search has started
        const carSearchTitle = await $(page.carSearchTitle);
        await expect(carSearchTitle).toHaveText('Car search', {wait: 10000});
       
        });

});
