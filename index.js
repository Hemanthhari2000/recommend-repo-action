const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
	try {
		const nameToGreet = core.getInput("who-to-greet");
		console.log(`Hello ${nameToGreet}!`);
		const time = new Date().toTimeString();
		core.setOutput("time", time);
		const payload = JSON.stringify(github.context.payload, undefined, 2);
		console.log(`The event payload: ${payload}`);

		const baseURL =
			"https://api.github.com/search/issues?q=is:open+issue+label:good-first-issue+bug";
		const is = "open issue".replace(" ", "+");
		const label = "good-first-issues bug".replace(" ", "+");
		const languages = github.context.payload.pull_request.base.repo.language;
		const searchQuery = `is:${is}+label:${label}+language:${languages}`;

		console.log(`language: ${languages} and type is ${typeof languages}`);
		console.log(`searchQuery ${searchQuery}`);
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();
