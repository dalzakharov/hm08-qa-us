exports.config = {
    runner: 'local',
    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 1,
    capabilities: [
    {
        maxInstances: 1,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
    args: process.env.CI
        ? ['--headless=new', '--no-sandbox', '--disable-dev-shm-usage']
        : []
        }
    }
],
    logLevel: 'error',
    bail: 0,
    baseUrl: 'https://cnt-1297b4a9-4263-441f-8ac2-a5d5e300e62f.containerhub.tripleten-services.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
        'chromedriver', 
        'intercept', 
    ],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
}