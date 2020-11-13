import React from "react";
import Repo from "./Repo";
import Grid from "@material-ui/core/Grid";

class RepoList extends React.Component {
  constructor(props) {
    super(props);

    const { repoList } = props;
    repoList.forEach((_, index) => {
      this[`repo-${index}`] = React.createRef();
    });
  }

  render() {
    const {
      repoList,
      onClickTrashIcon,
      onClickCheckMark,
      highlightedRepoList,
    } = this.props;
    var repoComponents = repoList.map((repo, index) => {
      return repo.releaseDate ? (
        <Grid item key={index}>
          <Repo
            repo={repo}
            onClickTrashIcon={onClickTrashIcon}
            onClickCheckMark={onClickCheckMark}
            highlightedRepoList={highlightedRepoList}
            ref={this[`repo-${index}`]}
          />
        </Grid>
      ) : null;
    });

    return (
      <Grid
        container
        justify="center"
        spacing={2}
        alignItems="center"
        direction="column"
      >
        {repoComponents}
      </Grid>
    );
  }
}

export default RepoList;
