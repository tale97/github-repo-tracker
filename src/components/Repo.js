import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "../styles/Repo.scss";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import BeenhereIcon from "@material-ui/icons/Beenhere";

class Repo extends React.Component {
  isHighlighted = (repoName) => {
    const { highlightedRepoList } = this.props;
    return highlightedRepoList.includes(repoName) ? `highlighted` : ``;
  };
  render() {
    const { repo, onClickCheckMark, onClickTrashIcon } = this.props;
    return (
      <Card className={`repo ${this.isHighlighted(repo.name)}`}>
        <Grid container direction="row" alignItems="center" spacing={2}>
          <Grid item className="card-content">
            <CardContent>
              <b>{repo.name}</b>
              <br />
              version: {repo.tagName}
              <br />
              release:{" "}
              {repo.releaseDate.split("T").join(" at ").split("Z").join(" UTC")}
            </CardContent>
          </Grid>
          <Grid item className="card-control">
            <IconButton
              aria-label="delete"
              onClick={() => onClickTrashIcon(repo)}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              aria-label="check"
              onClick={() => onClickCheckMark(repo.name)}
            >
              <BeenhereIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Card>
    );
  }
}

export default Repo;
