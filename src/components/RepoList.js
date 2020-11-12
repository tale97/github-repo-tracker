import React from "react";
import Repo from "./Repo";
import Grid from "@material-ui/core/Grid";

class RepoList extends React.Component {
  render() {
    const repolist = [<Repo />, <Repo />];

    return (
      <div>
        <Grid container justify="center" spacing="2" />
        {repolist}
        <Grid />
      </div>
    );
  }
}

export default RepoList;
