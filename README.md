# Urban Routes — Automated Taxi Order Tests

## Project description

This project contains automated end-to-end tests for the **Urban Routes** web application. The tests check the user flow for booking a taxi, from entering pickup and destination addresses to submitting an order and verifying that the car search starts.

## Technologies and techniques

- **JavaScript** and **Node.js** for test development and execution
- **WebdriverIO 8** for browser automation
- **Mocha** for organizing test cases
- **ChromeDriver** for running tests in Google Chrome
- **WebdriverIO assertions** to verify application behavior
- **Page Object approach** to keep element selectors and reusable actions in `page.js`
- **CSS, ID, XPath, and text-based selectors** to locate page elements
- **Explicit waits** to interact with elements when they are ready
- **HTTP request interception** to retrieve the phone verification code in the test environment

## Test coverage

The test suite checks that:

1. The phone number dialog opens.
2. A phone number can be submitted and confirmed.
3. A user can complete the taxi-ordering scenario:
   - Enter pickup and destination addresses.
   - Select the **Supportive** tariff.
   - Confirm a phone number.
   - Add a payment card.
   - Enter a message for the driver.
   - Enable **Blanket and handkerchiefs**.
   - Add **two ice creams**.
   - Click **Order** and verify that **Car search** appears.

## Getting started

### Prerequisites

- Node.js and npm
- Google Chrome
- Access to the Urban Routes test application

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Run the tests

```bash
npm run wdio
```

This command runs the WebdriverIO configuration defined in `wdio.conf.js`. The tests use the `baseUrl` configured there.

## Project structure

- `test/specs/createAnOrder.e2e.js` — end-to-end test cases for ordering a taxi
- `page.js` — element selectors and reusable page actions
- `helper.js` — helper utilities used by the tests
- `wdio.conf.js` — WebdriverIO configuration
- `package.json` — dependencies and npm scripts

## Notes

The tests are intended for the Urban Routes training environment. Test card details and phone verification are used for automated testing, not real transactions.
