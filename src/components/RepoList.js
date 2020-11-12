import React from "react";
import Repo from "./Repo";
import Grid from "@material-ui/core/Grid";

class RepoList extends React.Component {
  constructor(props) {
    super(props);

    const { repoList } = props;
    repoList.forEach((repo, index) => {
      this[`repo-${index}`] = React.createRef();
    });
  }

  render() {
    const { repoList, onClickTrashIcon } = this.props;
    var repoComponents = [...repoList].map((repo, index) => {
      return repo.releaseDate ? (
        <Grid item key={index}>
          <Repo
            repo={repo}
            onClickTrashIcon={onClickTrashIcon}
            ref={this[`repo-${index}`]}
          />
        </Grid>
      ) : null;
    });

    return (
      <Grid container justify="center" spacing={5} alignItems="center">
        {repoComponents}
      </Grid>
    );
  }
}

export default RepoList;
