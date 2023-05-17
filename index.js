const core = require("@actions/core");
const github = require("@actions/github");
const { default: axios } = require("axios");

function getUserAndRepoForTheURL(url) {
	const urlParts = url.split("/");
	const user = urlParts[3];
	const repo = urlParts[4];
	return { user, repo };
}

async function run() {
	try {
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
				const { githubUser, githubRepo } = getUserAndRepoForTheURL(
					element.html_url
				);
				recommendedIssues.push(
					`[![${element.title}](https://github-readme-stats.vercel.app/api/pin/?username=${githubUser}&repo=${githubRepo})](${element.html_url})`
				);
			});
		}
		console.log(`Recommendations:  ${recommendedIssues}`);
		core.setOutput(
			"recommendations",
			JSON.stringify(recommendedIssues, undefined, 2)
		);
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();
