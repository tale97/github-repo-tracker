import React from "react";
import "../styles/App.css";
import SearchField from "./SearchField";
import RepoList from "./RepoList";
import Grid from "@material-ui/core/Grid";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  searchFieldInput = () => {
    console.log("hi");
  };

  render() {
    return (
      <div className="App">
        <Grid className="main-content">
          <Grid item>
            <SearchField searchFieldInput={this.searchFieldInput} />
          </Grid>
          <Grid item>
            <RepoList />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
