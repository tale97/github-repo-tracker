import React from "react";
import "../styles/App.css";
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
      repoList: [],
    };
  }

  componentDidUpdate = (_, prevState) => {
    const { searchInput, githubUser, githubRepo, repoList } = this.state;
    if (githubUser !== prevState.githubUser) {
      this.getRepoLatestRelease();
    }
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    console.log(this.state.searchInput);
    this.parseSearchInput(this.state.searchInput);
  };

  parseSearchInput = (input) => {
    const inputArray = input.split(" ").join("").split(",");
    this.setState({
      githubUser: inputArray[0],
      githubRepo: inputArray[1],
    });
  };

  getRepoLatestRelease = () => {
    const { githubUser, githubRepo } = this.state;
    fetch(
      `https://api.github.com/repos/${githubUser}/${githubRepo}/releases/latest`
    )
      .then((response) => response.json())
      .then((data) => {
        this.getRepoGeneralInfo(data.published_at, data.tag_name);
      });
  };

  getRepoGeneralInfo = (publishDate, tagName) => {
    const { githubUser, githubRepo } = this.state;
    fetch(`https://api.github.com/repos/${githubUser}/${githubRepo}`)
      .then((response) => response.json())
      .then((data) => {
        const newRepo = {
          name: data.name,
          description: data.description,
          releaseDate: publishDate,
          tagName: tagName,
        };
        var newRepoList = this.state.repoList;
        newRepoList.push(newRepo);
        this.setState({ repoList: newRepoList });
      });
  };

  searchFieldInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  render() {
    return (
      <div className="App">
        <Grid
          container
          justifyContent="center"
          spacing="5"
          direction="column"
          className="main-content"
        >
          <Grid item>
            <SearchField
              searchFieldInput={this.searchFieldInput}
              handleOnSubmit={this.handleOnSubmit}
            />
          </Grid>
          <Grid item>
            <RepoList repoList={this.state.repoList} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
