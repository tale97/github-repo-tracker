import React from "react";
import "../styles/App.scss";
import SearchFunction from "./SearchFunction";
import RepoList from "./RepoList";
import Alert from "@material-ui/lab/Alert";
import { Snackbar, Grid, Button } from "@material-ui/core";
import SpeedDialControl from "./SpeedDialControl";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      filterInput: "",
      githubUser: null,
      githubRepo: null,
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

  handleOnSubmit = (event) => {
    event.preventDefault();
    this.parseSearchInput(this.state.searchInput);
  };

  parseSearchInput = (input) => {
    const inputArray = input.split(" ").join("").split("/");
    const githubUser = inputArray[0];
    const githubRepo = inputArray[1];
    this.setState(
      {
        githubUser: githubUser,
        githubRepo: githubRepo,
      },
      this.getRepoLatestRelease(githubUser, githubRepo)
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
        trackedRepo.name === repo.name &&
        trackedRepo.tagName === repo.tagName
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

  getRepoLatestRelease = (githubUser, githubRepo) => {
    var repoReleaseInfo = null;
    fetch(
      `https://api.github.com/repos/${githubUser}/${githubRepo}/releases/latest`,
      {
        method: "GET",
        headers: this.state.headers,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.name) {
          repoReleaseInfo = {
            gitHubUser: githubUser,
            gitHubRepo: githubRepo,
            releaseDate: data.published_at,
            tagName: data.tag_name,
            message: data.message,
            body: data.body,
            title: data.name,
            author: data.author.login,
            githubLink: data.html_url,
          };
          this.getRepoGeneralInfo(repoReleaseInfo);
        } else if (!data.name) {
          this.setState({ alert: "error", isAlertDisplayed: true });
        }
      });
  };

  getRepoGeneralInfo = (repoReleaseInfo) => {
    const { githubUser, githubRepo } = this.state;
    var newRepoList = [];
    var newHighlightedRepoList = [];
    fetch(`https://api.github.com/repos/${githubUser}/${githubRepo}`, {
      method: "GET",
      headers: this.state.headers,
    })
      .then((response) => response.json())
      .then((data) => {
        repoReleaseInfo.name = data.name;
        repoReleaseInfo.description = data.description;
        if (!this.isRepoAlreadyTracked(repoReleaseInfo)) {
          newRepoList = this.state.repoList;
          newRepoList.push(repoReleaseInfo);
          newHighlightedRepoList = this.state.highlightedRepoList;
          newHighlightedRepoList.push(repoReleaseInfo.name);
          this.setState({
            repoList: newRepoList,
            alert: "success",
            highlightedRepoList: newHighlightedRepoList,
            isAlertDisplayed: true,
          });
        } else {
          if (this.isRepoGotNewRelease(repoReleaseInfo)) {
            newRepoList = this.state.repoList;
            newRepoList = this.deleteOutdatedRepo(newRepoList, repoReleaseInfo);
            newHighlightedRepoList = this.state.highlightedRepoList;
            newHighlightedRepoList.push(repoReleaseInfo.name);
            this.setState({
              repoList: newRepoList,
              alert: "new release",
              highlightedRepoList: newHighlightedRepoList,
              isAlertDisplayed: true,
            });
          } else {
            this.setState({ alert: "no new release", isAlertDisplayed: true });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  isRepoGotNewRelease = (newRepo) => {
    const { repoList } = this.state;
    for (var trackedRepo of repoList) {
      if (
        trackedRepo.name === newRepo.name &&
        trackedRepo.tagName !== newRepo.tagName
      ) {
        return true;
      }
    }
    return false;
  };

  deleteOutdatedRepo = (repoList, repo) => {
    const filteredRepoList = repoList.filter((trackedRepo) => {
      return trackedRepo.name !== repo.name;
    });
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
      return repo.name.includes(filterWord);
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
              repoList={this.filterRepoList(repoList, filterInput)}
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
