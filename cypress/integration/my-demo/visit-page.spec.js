const pages = [
        { testcase: 'Visits the Kitchen Sink', url: 'https://example.cypress.io', title: 'Visits the Kitchen Sink', 
            thesholds: {
                performance: 50,
                accessibility: 50,
                seo: 70,
                'first-contentful-paint': 2000,
                'largest-contentful-paint': 3000,
                'cumulative-layout-shift': 0.1,
                'total-blocking-time': 500
            }
        },
            { testcase: 'Visits the home cypress', url: 'https://docs.cypress.io', title: 'Visits the home cypress' },
            { testcase: 'Google website', url: 'https://www.google.co.in', title: 'should run lighthouse performance audits using custom thresholds' }
        ];

const customThresholds = {
        performance: 50,
        accessibility: 50,
        seo: 70,
        'first-contentful-paint': 2000,
        'largest-contentful-paint': 3000,
        'cumulative-layout-shift': 0.1,
        'total-blocking-time': 500,
    };
const desktopConfig = {
        formFactor: 'desktop',
        screenEmulation: {disabled: true},
    };

pages.forEach(element => {
    describe(element.testcase, () => {

            it(element.title, () => {
                cy.visit(element.url);
                
                if(element.thesholds != null || element.thesholds != undefined) {
                    cy.lighthouse(element.thesholds, desktopConfig);
                } else {
                    cy.lighthouse(customThresholds, desktopConfig);
                }
            })
        });
})