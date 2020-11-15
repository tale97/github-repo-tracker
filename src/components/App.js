import React from "react";
import "../styles/App.scss";
import SearchField from "./SearchField";
import FilterBar from "./FilterBar";
import RepoList from "./RepoList";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

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
    this.setState(
      {
        githubUser: inputArray[0],
        githubRepo: inputArray[1],
      },
      this.getRepoLatestRelease
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

  getAllReposLatestReleases = () => {};

  getRepoLatestRelease = () => {
    const { githubUser, githubRepo } = this.state;
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

  onClickRefresh = () => {
    this.getRepoLatestRelease();
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
          <Alert severity="success" onClose={this.onCloseAlert}>
            Added a new repo for tracking
          </Alert>
        );
      case "new release":
        return <Alert severity="success">Found new release(s)</Alert>;
      case "no new release":
        return (
          <Alert severity="info" onClose={this.onCloseAlert}>
            There is no new update for these repositories
          </Alert>
        );
      case "error":
        return (
          <Alert severity="error" onClose={this.onCloseAlert}>
            Please check that you have the right user name and repository
          </Alert>
        );
      default:
        return (
          <Alert severity="info" onClose={this.onCloseAlert}>
            {`Enter the GitHub user followed by a '/' and the name of the repository`}
          </Alert>
        );
    }
  };

  onCloseAlert = () => {
    this.setState({ isAlertDisplayed: false });
  };

  render() {
    const { repoList, filterInput } = this.state;
    return (
      <div>
        <Snackbar
          open={this.state.isAlertDisplayed}
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
          <Grid item className="search-bar">
            <SearchField
              searchFieldInput={this.searchFieldInput}
              handleOnSubmit={this.handleOnSubmit}
              onClickRefresh={this.onClickRefresh}
            />
          </Grid>
          <Grid item className="filter-bar">
            <FilterBar filterFieldInput={this.filterFieldInput} />
          </Grid>
          <Grid item>
            <RepoList
              repoList={this.filterRepoList(repoList, filterInput)}
              onClickTrashIcon={this.onClickTrashIcon}
              onClickCheckMark={this.onClickCheckMark}
              highlightedRepoList={this.state.highlightedRepoList}
              ref={this.repoListRef}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
