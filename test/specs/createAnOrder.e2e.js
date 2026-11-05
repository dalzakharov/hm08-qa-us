
const page = require('../../page');
const helper = require('../../helper');

const fromAddress = 'East 2nd Street, 601';
const toAddress = '1300 1st St';

// Open Urban Routes and enter addresses
async function openTaxiOrder() {
    await browser.url('/');
    await page.fillAddresses(fromAddress, toAddress);
}

// Select the Supportive plan
async function selectSupportivePlan() {
    const supportivePlan = await $(page.supportivePlan);
    await supportivePlan.waitForDisplayed();
    await supportivePlan.click();

    await expect(supportivePlan).toHaveAttributeContaining('class', 'active');
}

// Enter and confirm the phone number
async function savePhoneNumber() {
    const phoneNumber = helper.getPhoneNumber('+1');
    await page.submitPhoneNumber(phoneNumber);

    await expect(
        await helper.getElementByText(phoneNumber)
    ).toBeExisting();
}

// Add a credit card
async function addCreditCard() {
    const paymentMethodButton = await $(page.paymentMethodButton);
    await paymentMethodButton.waitForClickable();
    await paymentMethodButton.click();

    const paymentModal = await $('.payment-picker.open');
    await expect(paymentModal).toBeDisplayed();

    const addCardButton = await $(page.addCardButton);
    await addCardButton.waitForDisplayed();
    await addCardButton.click();

    const cardNumberInput = await $(page.cardNumberInput);
    await cardNumberInput.waitForDisplayed();
    await cardNumberInput.setValue('1234 5678 9012 3456');

    const cardCvvInput = await $(page.cardCvvInput);
    await cardCvvInput.waitForDisplayed();
    await cardCvvInput.setValue('123');
    await browser.keys('Tab');

    const linkCardButton = await $(page.linkCardButton);
    await linkCardButton.waitForClickable();
    await linkCardButton.click();

    const closeCardModalButton = await $(page.closeCardModalButton);
    await closeCardModalButton.waitForClickable();
    await closeCardModalButton.click();

    // Verify that Card replaced Cash
    await expect($('.pp-value-text')).toHaveText('Card');
}

// Enter a message for the driver
async function writeDriverMessage() {
    const driverMessageInput = await $(page.driverMessageInput);
    await driverMessageInput.waitForDisplayed();
    await driverMessageInput.setValue('Please wait near the entrance');

    await expect(driverMessageInput).toHaveValue(
        'Please wait near the entrance'
    );
}

// Select blanket and handkerchiefs
async function orderBlanketAndHandkerchiefs() {
    const blanketSwitch = await $(page.blanketSwitch);

    if (!(await blanketSwitch.isSelected())) {
        await blanketSwitch.parentElement().click();
    }

    await expect(blanketSwitch).toBeSelected();
}

// Add two ice creams
async function orderTwoIceCreams() {
    const iceCreamPlusButton = await $(page.iceCreamPlusButton);
    await iceCreamPlusButton.waitForClickable();
    await iceCreamPlusButton.click();
    await iceCreamPlusButton.click();

    const iceCreamCounter = await $(page.iceCreamCounter);
    await expect(iceCreamCounter).toHaveText('2');
}

describe('Create an order', () => {

    it('Setting the addresses', async () => {
        await openTaxiOrder();
        // Address values are verified in page.fillAddresses()
    });

    it('Selecting Supportive plan', async () => {
        await openTaxiOrder();
        await selectSupportivePlan();
    });

    it('Filling in the phone number', async () => {
        await openTaxiOrder();
        await savePhoneNumber();
    });

    it('Adding a credit card', async () => {
        await openTaxiOrder();
        await savePhoneNumber();
        await addCreditCard();
    });

    it('Writing a message for the driver', async () => {
        await openTaxiOrder();
        await writeDriverMessage();
    });

    it('Ordering a Blanket and handkerchiefs', async () => {
        await openTaxiOrder();
        await selectSupportivePlan();
        await orderBlanketAndHandkerchiefs();
    });

    it('Ordering 2 Ice creams', async () => {
        await openTaxiOrder();
        await selectSupportivePlan();
        await orderTwoIceCreams();
    });

    it('The car search modal appears', async () => {
        await openTaxiOrder();
        await selectSupportivePlan();
        await savePhoneNumber();
        await addCreditCard();
        await writeDriverMessage();
        await orderBlanketAndHandkerchiefs();
        await orderTwoIceCreams();

        const orderButton = await $(page.orderButton);
        await orderButton.waitForClickable();
        await expect(orderButton).toHaveTextContaining('Order');
        await orderButton.click();

        const carSearchTitle = await $(page.carSearchTitle);
        await expect(carSearchTitle).toHaveText('Car search', {
            wait: 10000
        });
    });

});
