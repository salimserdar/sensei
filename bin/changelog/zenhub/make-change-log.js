'use strict';
const chalk = require( 'chalk' );
const promptly = require( 'promptly' );
const { pkg } = require( '../config' );
const { make } = require( '../common' );
const { fetchAllPullRequests } = require( './requests' );

/* eslint no-console: 0 */

const makeChangeLog = async () => {
	console.log(
		chalk.yellow(
			'This program requires an api token from Github and Zenhub. You can create one here: '
		) +
			'https://github.com/settings/tokens' +
			' and https://app.zenhub.com/dashboard/tokens'
	);
	console.log( '' );
	console.log(
		chalk.yellow(
			'Token scope for Github will require read permissions on public_repo, admin:org, and user.'
		)
	);
	console.log( '' );
	console.log(
		chalk.yellow(
			'Export the github token as variable called GH_API_TOKEN and the Zenhub token as a variable called ZH_API_KEY from your bash profile.'
		)
	);
	console.log( '' );

	const ready = await promptly.confirm( 'Are you ready to continue? ' );

	if ( ready ) {
		console.log( '' );
		console.log(
			chalk.yellow(
				'In order to generate the changelog, you will have to provide the Zenhub release ID to retrieve the PRs from. You can get that from `release` param value in the url of the release report page.'
			)
		);
		console.log( '' );
		const releaseId = await promptly.prompt( 'Release Id: ' );
		console.log( '' );
		console.log(
			chalk.green(
				'Here is the generated changelog. Be sure to remove entries ' +
					`not intended for a ${ pkg.title } release. All entries with the ${ pkg.changelog.skipLabel } label have been skipped`
			)
		);
		console.log( '' );
		make( fetchAllPullRequests, releaseId );
	} else {
		console.log( '' );
		console.log( chalk.yellow( 'Ok, see you soon.' ) );
		console.log( '' );
	}
};

module.exports = {
	makeChangeLog,
};
