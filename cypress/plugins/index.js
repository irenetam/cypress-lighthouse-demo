/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars

const { lighthouse, prepareAudit } = require('cypress-audit');
const fs = require("fs");
module.exports = (on, config) => {
  	// `on` is used to hook into various events Cypress emits
	on('before:browser:launch', (browser = {}, launchOptions) => {
		prepareAudit(launchOptions);
	});

  	// `config` is the resolved Cypress config

	// Configure Lighthouse CLI and invoke the lighthouse process
	// on('task', {
	// 	lighthouse: lighthouse()
	// });

  	// Configure Lighthouse CLI, invoke the lighthouse process, access raw report
	on('task', {
		lighthouse: lighthouse((lighthouseReport) => {
		const dirPath = './PerfReports'
		if (!fs.existsSync(dirPath)) {
			fs.mkdirSync(dirPath)
		}

		console.log('URL day ne' + lighthouseReport.lhr.requestedUrl);
		const name = (lighthouseReport.lhr.requestedUrl).replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, function (x) { return '' }) + " - " + (lighthouseReport.lhr.fetchTime).split('T')[0]
		fs.writeFileSync(`${dirPath}/GLH-(${name}).json`, JSON.stringify(lighthouseReport, null, 2))
		}),
	});
}
