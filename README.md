# [GitHub Repository Release Tracker](https://tale97.github.io/github-repo-tracker/)

## Description

This web application is used to track the latest release or commit of GitHub repositories.

## Demo

Here's the [link to the web app](https://tale97.github.io/github-repo-tracker/) so you can try it for yourself!

## How to Use It

- To track a repo, simply type "{user}/{repository}" in the search box (ie. to track Microsoft's visual studio code, type in "microsoft/vscode")
- You can also switch from the search function to the filter function by clicking on the icon in the left part of the search box
- Hover over the floating icon on the bottom right to delete all repositories or refresh to check for updates
- Click on each repository's card to see a more details about the latest release/commit.

## Technologies used

- **Frontend**
  - React
  - HTML & CSS
  - JavaScript
  - SASS
- **Service**
  - GitHub
  - GitHub API

## About The Project

This is a take home assignment assigned to me by a company. While quite rudamentary at the moment, I believe that with some more crucial features that I plan to implement such as login and persisting data storage, it can be a pretty handy tool for those who likes tro track the latest update on certain repos. So Expect to see more features!

## Current Features

- Automatically track commit if the repo has no releases
- Automatically refresh every hour
- Can filter tracked repo by name

## Potential Upcoming Features by Priority

- User Login/Account creation (allow quick signup/login thru GitHub account)
- Add a "last updated X time ago" text
- A clear X button to clear search input
- Add confirmation dialogue for irreversible action like "untrack repo" or "delete all repo"
- An optional notification system to send notifs when there is an update for certain repos
- Periodically check for updates for repositories even when User doesn't have the app open
- More options to filter/sort repositories (by latest updates/alphabetical sorting/date added and so on)
- Better, more intuitive UI similar to Spotify's playlist UI
- improve release note visual (it's currently displaying GitHub's README markup in plain text, which is a bit hard to read)
- make responsive for use on mobile

## Setup

### `npm install`

### `npm start`

## Please Connect

Please do feel free to connect with me and give me feedback on this web app! I would love to hear criticisms so I can further improve the app. If you have any suggestion for a feature, also just let me know! I love adding new features :smile:
