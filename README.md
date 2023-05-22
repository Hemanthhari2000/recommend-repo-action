# recommend-repo-action

A Github action that recommends top 5 similar issues once a successful pull request is created. This can be really helpful for developers to find new issues once they are done contributing to an issue.

Any open source repository can add this Github action and whenever developers try to create a pull request then, the action will return top 5 recommendations of similar issues.

---

## Background

I occasionally contribute to open source, but I struggle to find the appropriate issue or repository to contribute to. I would spend days searching for a suitable issue that I can contribute to and once the contribution has been made, it's back to square one. I had to start my search for finding an issue that I can contribute to. I figured this process would be easier if I could get a few recommendations as soon as I complete a pull request successfully. Github actions seemed to be a perfect tool to implement this idea since GitHub serves as a hub for numerous open-source projects, and having an automated trigger using github actions sounded convenient. Besides, it promotes motivation among individuals to continue their contributions to open-source projects.

## Usage

You can simply add `hemanthhari2000/recommend-repo-action@1.0.0` action to your `.github/workflows/main.yml` file. Combine `recommend-repo-action` with `add-pr-comment` to get recommendations in a card like format once your submit a PR.

An example yaml file is shown below:

```yaml
on:
  pull_request:
    types: [opened]

jobs:
  recommend_repo_job:
    runs-on: ubuntu-latest
    name: A job that recommends similar issues based on current pull request
    permissions:
      pull-requests: write
    steps:
      - name: Recommend repo action step
        id: recommend
        uses: hemanthhari2000/recommend-repo-action@v0.0.8

      - uses: mshick/add-pr-comment@v2
        with:
          message: |
            ${{ steps.recommend.outputs.recommendations }}
```

## Contributors

Special mention to the contributor for this application
[Antony Prince J](https://github.com/antoprince001) & [Sharmila S](https://github.com/SharmilaS22)
