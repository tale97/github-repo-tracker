import React from "react";
import Repo from "./Repo";
import Grid from "@material-ui/core/Grid";

class RepoList extends React.Component {
  render() {
    const { repoList } = this.props;
    var repoComponents = repoList.map((repo, idx) => {
      return (
        <Grid item key={idx}>
          <Repo repo={repo} />
        </Grid>
      );
    });

    return (
      <div>
        <Grid container justify="center" spacing="2" />
        {repoComponents}
        <Grid />
      </div>
    );
  }
}

export default RepoList;
