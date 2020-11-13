import React from "react";
import "../styles/App.scss";
import SearchField from "./SearchField";
import RepoList from "./RepoList";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      githubUser: null,
      githubRepo: null,
      repoList: [],
      highlightedRepoList: [],
      headers: {
        Authorization: `Token a6397b9f1bf0a5dd23ba6c4d516e13a852334b96`,
      },
    };
    this.repoListRef = React.createRef();
  }

  componentDidMount = () => {};

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

  getRepoLatestRelease = () => {
    const { githubUser, githubRepo } = this.state;
    fetch(
      `https://api.github.com/repos/${githubUser}/${githubRepo}/releases/latest`,
      {
        method: "GET",
        headers: this.state.headers,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const repoReleaseInfo = {
          releaseDate: data.published_at,
          tagName: data.tag_name,
          message: data.message,
          body: data.body,
          title: data.name,
          author: data.author.login,
        };
        this.getRepoGeneralInfo(repoReleaseInfo);
      });
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
    console.log("check");
    var newHighlightedRepoList = this.state.highlightedRepoList;
    var indexOfRepo = newHighlightedRepoList.indexOf(repoName);
    if (indexOfRepo > -1) {
      newHighlightedRepoList.splice(indexOfRepo, 1);
    }
    this.setState({ highlightedRepoList: newHighlightedRepoList });
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
        if (
          !this.isRepoAlreadyTracked(repoReleaseInfo) &&
          repoReleaseInfo.message !== "Not Found"
        ) {
          newRepoList = this.state.repoList;
          newRepoList.push(repoReleaseInfo);
          newHighlightedRepoList = this.state.highlightedRepoList;
          newHighlightedRepoList.push(repoReleaseInfo.name);
          this.setState({
            repoList: newRepoList,
            alert: "success",
            highlightedRepoList: newHighlightedRepoList,
          });
        } else if (
          this.isRepoAlreadyTracked &&
          this.isRepoGotNewRelease(repoReleaseInfo)
        ) {
          newRepoList = this.state.repoList;
          newRepoList = this.deleteOutdatedRepo(newRepoList, repoReleaseInfo);
          newHighlightedRepoList = this.state.highlightedRepoList;
          newHighlightedRepoList.push(repoReleaseInfo.name);
          this.setState({
            repoList: newRepoList,
            alert: "new release",
            highlightedRepoList: newHighlightedRepoList,
          });
        } else if (this.isRepoAlreadyTracked(repoReleaseInfo)) {
          this.setState({ alert: "already tracked" });
        } else if (repoReleaseInfo.message === "Not Found") {
          this.setState({ alert: "error" });
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

  onClickRefresh = () => {
    this.getRepoLatestRelease();
  };

  displayAlert = () => {
    switch (this.state.alert) {
      case "success":
        return <Alert severity="success">Added a new repo for tracking</Alert>;
      case "new release":
        return <Alert severity="success">Success: found new releass(s)</Alert>;
      case "already tracked":
        return (
          <Alert severity="warning">
            You are already tracking this repository
          </Alert>
        );
      case "error":
        return (
          <Alert severity="error">
            Please check that you have the right user name and repository
          </Alert>
        );
      default:
        return (
          <Alert severity="info">
            Enter the user name followed by a / and then the repository name
          </Alert>
        );
    }
  };

  render() {
    return (
      <div>
        {this.displayAlert()}
        <Grid
          container
          alignItems="center"
          spacing={5}
          direction="column"
          className="main-content"
        >
          <Grid item className="empty-space"></Grid>
          <Grid item className="search-box">
            <SearchField
              searchFieldInput={this.searchFieldInput}
              handleOnSubmit={this.handleOnSubmit}
              onClickRefresh={this.onClickRefresh}
            />
          </Grid>
          <Grid item>
            <RepoList
              repoList={this.state.repoList}
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
