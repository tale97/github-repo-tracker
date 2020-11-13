import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import "../styles/Repo.scss";
import Grid from "@material-ui/core/Grid";
import ToolBar from "./ToolBar";
import RepoDialog from "./RepoDialog";

class Repo extends React.Component {
  constructor() {
    super();
    this.state = {
      openDialog: false,
    };
  }

  isHighlighted = (repoName) => {
    const { highlightedRepoList } = this.props;
    return highlightedRepoList.includes(repoName) ? `highlighted` : ``;
  };

  toggleDialogVisibility = () => {
    this.setState({ openDialog: !this.state.openDialog });
  };

  render() {
    const { repo, onClickTrashIcon, onClickCheckMark } = this.props;
    return (
      <div>
        <Card className={`repo ${this.isHighlighted(repo.name)}`}>
          <CardActionArea onClick={this.toggleDialogVisibility}>
            <Grid container direction="row" alignItems="center" spacing={2}>
              <Grid item className="card-content">
                <CardContent>
                  <h2>{repo.name}</h2>
                  version: {repo.tagName}
                  <br />
                  release:{" "}
                  {repo.releaseDate
                    .split("T")
                    .join(" at ")
                    .split("Z")
                    .join(" UTC")}
                </CardContent>
              </Grid>
            </Grid>
          </CardActionArea>
        </Card>
        <ToolBar
          onClickTrashIcon={onClickTrashIcon}
          onClickCheckMark={onClickCheckMark}
          repo={repo}
        />
        <RepoDialog
          open={this.state.openDialog}
          toggleDialogVisibility={this.toggleDialogVisibility}
          repo={repo}
        />
      </div>
    );
  }
}

export default Repo;
