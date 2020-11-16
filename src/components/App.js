import React from "react";
import "../styles/App.scss";
import SearchFunction from "./SearchFunction";
import RepoList from "./RepoList";
import Alert from "@material-ui/lab/Alert";
import { Snackbar, Grid } from "@material-ui/core";
import SpeedDialControl from "./SpeedDialControl";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      filterInput: "",
      gitHubUser: null,
      gitHubRepo: null,
      repoList: [],
      highlightedRepoList: [],
      repoListOrderedByDateAdded: [],
      repoListOrderedByName: [],
      isAlertDisplayed: false,
      searchFunctionType: "search",
      headers: {
        Authorization: `Token a6397b9f1bf0a5dd23ba6c4d516e13a852334b96`,
      },
    };
    this.repoListRef = React.createRef();
  }

  sortReposByLatestUpdate = () => {};

  handleOnSubmit = (event) => {
    event.preventDefault();
    this.parseSearchInput(this.state.searchInput);
  };

  parseSearchInput = (input) => {
    const inputArray = input.split(" ").join("").split("/");
    const gitHubUser = inputArray[0];
    const gitHubRepo = inputArray[1];
    this.setState(
      {
        gitHubUser: gitHubUser,
        gitHubRepo: gitHubRepo,
      },
      this.getRepoLatestRelease(gitHubUser, gitHubRepo)
    );
  };

  onClickTrashIcon = (repo) => {
    var newRepoList = this.state.repoList;
    newRepoList = newRepoList.filter((repoObject) => {
      return repoObject !== repo;
    });
    this.setState({ repoList: newRepoList });
  };

  isRepoAlreadyTracked = (repo) => {
    const { repoList } = this.state;
    for (var trackedRepo of repoList) {
      if (
        trackedRepo.gitHubUser === repo.gitHubUser &&
        trackedRepo.gitHubRepo === repo.gitHubRepo
      ) {
        return true;
      }
    }
    return false;
  };

  onClickCheckMark = (repoName) => {
    var newHighlightedRepoList = this.state.highlightedRepoList;
    var indexOfRepo = newHighlightedRepoList.indexOf(repoName);
    if (indexOfRepo > -1) {
      newHighlightedRepoList.splice(indexOfRepo, 1);
    }
    this.setState({ highlightedRepoList: newHighlightedRepoList });
  };

  deleteAllRepos = () => {
    this.setState({
      repoList: [],
      highlightedRepoList: [],
      repoListOrderedByDateAdded: [],
      repoListOrderedByName: [],
    });
  };

  getAllReposLatestReleases = () => {
    const { repoList } = this.state;
    for (var repo of repoList) {
      this.getRepoLatestRelease(repo.gitHubUser, repo.gitHubRepo);
    }
  };

  getRepoLatestRelease = (gitHubUser, gitHubRepo) => {
    var repoReleaseInfo = null;
    var gitHubAPIRequestUrl = `https://api.github.com/repos/${gitHubUser}/${gitHubRepo}/releases/latest`;
    fetch(gitHubAPIRequestUrl, {
      method: "GET",
      headers: this.state.headers,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.html_url !== undefined && data.html_url !== null) {
          repoReleaseInfo = {
            trackingType: "release",
            gitHubUser: gitHubUser,
            gitHubRepo: gitHubRepo,
            releaseDate: data.published_at,
            tagName: data.tag_name,
            message: data.message,
            body: data.body,
            title: data.name,
            author: data.author.login,
            githubLink: data.html_url,
          };
          this.getRepoGeneralInfo(repoReleaseInfo);
        } else {
          this.getRepoLatestCommit(gitHubUser, gitHubRepo);
        }
      })
      .catch((error) => {
        console.log(error);
        // attempt to get latest commit instead
        this.getRepoLatestCommit(gitHubUser, gitHubRepo);
      });
  };

  getRepoLatestCommit = (gitHubUser, gitHubRepo) => {
    var repoReleaseInfo = null;
    var gitHubAPIRequestUrl = `https://api.github.com/repos/${gitHubUser}/${gitHubRepo}/commits`;

    fetch(gitHubAPIRequestUrl, {
      method: "GET",
      headers: this.state.headers,
    })
      .then((response) => response.json())
      .then((data) => {
        var latestCommit = data[0];
        if (latestCommit.sha !== undefined && latestCommit.sha !== null) {
          repoReleaseInfo = {
            trackingType: "commit",
            gitHubUser: gitHubUser,
            gitHubRepo: gitHubRepo,
            releaseDate: latestCommit.commit.committer.date,
            tagName: "N/A",
            message: latestCommit.commit.message,
            body: latestCommit.commit.message,
            title: "N/A",
            author: latestCommit.commit.author.name,
            githubLink: latestCommit.html_url,
          };
          this.getRepoGeneralInfo(repoReleaseInfo, gitHubUser, gitHubRepo);
        } else {
          this.setState({ alert: "error", isAlertDisplayed: true });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ alert: "internal_error", isAlertDisplayed: true });
      });
  };

  getRepoGeneralInfo = (repoReleaseInfo, gitHubUser, gitHubRepo) => {
    const { repoList, highlightedRepoList } = this.state;
    var newRepoList = repoList;
    var newHighlightedRepoList = [];
    fetch(`https://api.github.com/repos/${gitHubUser}/${gitHubRepo}`, {
      method: "GET",
      headers: this.state.headers,
    })
      .then((response) => response.json())
      .then((data) => {
        repoReleaseInfo.name = data.name;
        repoReleaseInfo.description = data.description;
        if (!this.isRepoAlreadyTracked(repoReleaseInfo)) {
          // if repo is not already tracked
          newRepoList.push(repoReleaseInfo);
          newHighlightedRepoList = highlightedRepoList;
          newHighlightedRepoList.push(repoReleaseInfo.gitHubRepo);
          this.setState({
            repoList: newRepoList,
            alert: "success",
            highlightedRepoList: newHighlightedRepoList,
            isAlertDisplayed: true,
          });
        } else {
          if (this.isRepoGotNewUpdate(repoReleaseInfo)) {
            // if repo is already tracked but has new updates
            newRepoList = this.deleteOutdatedRepo(newRepoList, repoReleaseInfo);
            console.log(
              `Adding ${repoReleaseInfo.gitHubUser}/${repoReleaseInfo.gitHubRepo} ${repoReleaseInfo.name}`
            );
            newRepoList.push(repoReleaseInfo);
            newHighlightedRepoList = highlightedRepoList;
            newHighlightedRepoList.push(repoReleaseInfo.name);
            this.setState({
              repoList: newRepoList,
              alert: `new ${repoReleaseInfo.trackingType}`,
              highlightedRepoList: newHighlightedRepoList,
              isAlertDisplayed: true,
            });
          } else {
            // if repo is already being tracked and there is no new updates
            this.setState({ alert: "no new release", isAlertDisplayed: true });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  printRepoList = (repoList) => {
    console.log("------");
    for (var repo of repoList) {
      console.log(`${repo.gitHubUser}/${repo.gitHubRepo}`);
    }
    console.log("------");
  };

  isRepoGotNewUpdate = (newRepo) => {
    const { repoList } = this.state;

    for (var trackedRepo of repoList) {
      if (
        trackedRepo.gitHubUser === newRepo.gitHubUser &&
        trackedRepo.gitHubRepo === newRepo.gitHubRepo &&
        trackedRepo.releaseDate !== newRepo.releaseDate
      ) {
        console.log(
          `new update for ${newRepo.gitHubUser}/${newRepo.gitHubRepo} old data: ${trackedRepo.releaseDate}, new data: ${newRepo.releaseDate}`
        );
        return true;
      }
    }
    return false;
  };

  deleteOutdatedRepo = (repoList, repoToBeDeleted) => {
    // only keep repos that doesn't share gitHubName & gitHubRepo
    this.printRepoList(repoList);
    const filteredRepoList = repoList.filter((trackedRepo) => {
      return !(
        trackedRepo.gitHubUser === repoToBeDeleted.gitHubUser &&
        trackedRepo.gitHubRepo === repoToBeDeleted.gitHubRepo
      );
    });
    let difference = repoList.filter((x) => !filteredRepoList.includes(x));
    console.log(`DELETED ${difference[0].gitHubRepo}`);
    if (difference.length > 1) {
      console.log(`DELETED ${difference[1].gitHubRepo}`);
    }
    return filteredRepoList;
  };

  searchFieldInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  filterFieldInput = (event) => {
    this.setState({
      filterInput: event.target.value,
    });
  };

  filterRepoList = (repoList, filterWord) => {
    var filteredRepoList = repoList.filter((repo) => {
      return repo.gitHubRepo.includes(filterWord);
    });
    return filteredRepoList;
  };

  displayAlert = () => {
    switch (this.state.alert) {
      case "success":
        return (
          <Alert
            severity="success"
            variant="filled"
            onClose={this.onCloseAlert}
          >
            Added a new repo for tracking
          </Alert>
        );
      case "new commit":
        return (
          <Alert
            severity="success"
            variant="filled"
            onClose={this.onCloseAlert}
          >
            Found new commit(s)
          </Alert>
        );
      case "new release":
        return (
          <Alert
            severity="success"
            variant="filled"
            onClose={this.onCloseAlert}
          >
            Found new release(s)
          </Alert>
        );
      case "no new release":
        return (
          <Alert severity="info" variant="filled" onClose={this.onCloseAlert}>
            There is no new update for these repositories
          </Alert>
        );
      case "error":
        return (
          <Alert severity="error" variant="filled" onClose={this.onCloseAlert}>
            Please check that you have the right user name and repository
          </Alert>
        );
      case "internal_error":
        return (
          <Alert severity="error" variant="filled" onClose={this.onCloseAlert}>
            Apologies! Apparently we can't get any info about releases or
            commits for this repository. Make sure that you have the correct
            "user/repository"
          </Alert>
        );
      default:
        return (
          <Alert severity="info" variant="filled" onClose={this.onCloseAlert}>
            {`Enter the GitHub user followed by a '/' and the name of the repository`}
          </Alert>
        );
    }
  };

  onCloseAlert = () => {
    this.setState({ isAlertDisplayed: false });
  };

  onClickFilterFunction = () => {
    this.setState({ searchFunctionType: "filter" });
  };

  onClickSearchFunction = () => {
    this.setState({ searchFunctionType: "search" });
  };

  render() {
    const {
      repoList,
      filterInput,
      searchFunctionType,
      highlightedRepoList,
      isAlertDisplayed,
    } = this.state;

    return (
      <div>
        <SpeedDialControl
          getAllReposLatestReleases={this.getAllReposLatestReleases}
          deleteAllRepos={this.deleteAllRepos}
        />
        <Snackbar
          open={isAlertDisplayed}
          autoHideDuration={6000}
          onClose={this.onCloseAlert}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          {this.displayAlert()}
        </Snackbar>
        <Grid
          container
          alignItems="center"
          spacing={5}
          direction="column"
          className="main-content"
        >
          <Grid item className="empty-space"></Grid>
          <Grid item className="search-function">
            <SearchFunction
              searchFieldInput={this.searchFieldInput}
              handleOnSubmit={this.handleOnSubmit}
              filterFieldInput={this.filterFieldInput}
              onClickFilterFunction={this.onClickFilterFunction}
              onClickSearchFunction={this.onClickSearchFunction}
              searchFunctionType={searchFunctionType}
            />
          </Grid>
          <Grid item>
            <RepoList
              repoList={this.filterRepoList(repoList, filterInput).reverse()}
              onClickTrashIcon={this.onClickTrashIcon}
              onClickCheckMark={this.onClickCheckMark}
              highlightedRepoList={highlightedRepoList}
              ref={this.repoListRef}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
