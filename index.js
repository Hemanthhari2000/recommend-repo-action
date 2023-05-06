const core = require("@actions/core");
const github = require("@actions/github");
const { default: axios } = require("axios");

async function run() {
	try {
		const nameToGreet = core.getInput("who-to-greet");
		console.log(`Hello ${nameToGreet}!`);
		const time = new Date().toTimeString();
		core.setOutput("time", time);
		const payload = JSON.stringify(github.context.payload, undefined, 2);
		console.log(`The event payload: ${payload}`);

		const baseURL = "https://api.github.com/search/issues?q=";
		const is = "open issue".replace(" ", "+");
		const label = "good-first-issue bug".replace(" ", "+");
		const language =
			github.context.payload.pull_request.base.repo.language.toLowerCase();
		const searchQuery = `is:${is}+label:${label}+language:${language}`;

		const issueResponse = await axios.get(baseURL + searchQuery);

		const recommendedIssues = [];

		if (issueResponse.status == 200) {
			issueResponse.data.items.slice(0, 5).forEach((element) => {
				recommendedIssues.push({
					url: element.html_url,
					title: element.title,
					labels: element.labels.map((element) => element.name),
					state: element.state,
					description: element.body.substring(0, 99) + "...",
				});
			});
		}
		console.log(recommendedIssues);
		core.setOutput("recommendations", JSON.stringify(recommendedIssues));
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();
