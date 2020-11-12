import React from "react";
import "../styles/App.scss";
import SearchField from "./SearchField";
import RepoList from "./RepoList";
import Grid from "@material-ui/core/Grid";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      githubUser: null,
      githubRepo: null,
      repoList: new Set(),
      headers: {
        Authorization: `Token a6397b9f1bf0a5dd23ba6c4d516e13a852334b96`,
      },
    };
    this.repoListRef = React.createRef();
  }

  componentDidMount = () => {
    this.getRepoLatestRelease();
  };

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
    newRepoList = [...newRepoList].filter((repoObject) => {
      return repoObject !== repo;
    });
    this.setState({ repoList: new Set(newRepoList) });
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
        this.getRepoGeneralInfo(data.published_at, data.tag_name, data.message);
      });
  };

  isRepoAlreadyTracked = (repo) => {
    const { repoList } = this.state;
    repoList.forEach((trackedRepo) => {
      if (
        trackedRepo.name === repo.name &&
        trackedRepo.tagName === repo.tagName
      ) {
        return true;
      }
    });
    return false;
  };

  getRepoGeneralInfo = (publishDate, tagName, message) => {
    const { githubUser, githubRepo } = this.state;
    fetch(`https://api.github.com/repos/${githubUser}/${githubRepo}`, {
      method: "GET",
      headers: this.state.headers,
    })
      .then((response) => response.json())
      .then((data) => {
        const newRepo = {
          name: data.name,
          description: data.description,
          releaseDate: publishDate,
          tagName: tagName,
          message: message,
        };
        if (!this.isRepoAlreadyTracked(newRepo)) {
          var newRepoList = this.state.repoList;
          newRepoList.add(newRepo);
          this.setState({ repoList: newRepoList });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  searchFieldInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  render() {
    return (
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
          />
        </Grid>
        <Grid item>
          <RepoList
            repoList={this.state.repoList}
            onClickTrashIcon={this.onClickTrashIcon}
            ref={this.repoListRef}
          />
        </Grid>
      </Grid>
    );
  }
}

export default App;
