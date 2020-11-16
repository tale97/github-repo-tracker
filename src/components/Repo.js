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

  isHighlighted = () => {
    const { highlightedRepoList, repo } = this.props;
    return highlightedRepoList.includes(repo.gitHubRepo) ? `highlighted` : ``;
  };

  toggleDialogVisibility = () => {
    this.setState({ openDialog: !this.state.openDialog });
  };

  render() {
    const { repo, onClickTrashIcon, onClickCheckMark } = this.props;
    return (
      <div>
        <Card className={`repo ${this.isHighlighted(repo.gitHubRepo)}`}>
          <CardActionArea onClick={this.toggleDialogVisibility}>
            <Grid container direction="row" alignItems="center" spacing={2}>
              <Grid item className="card-content">
                <CardContent>
                  <h2>
                    {repo.gitHubUser}/{repo.gitHubRepo}
                  </h2>
                  Latest version: {repo.tagName}
                  <br />
                  Latest {`${repo.trackingType}`}:{" "}
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
          isHighlighted={this.isHighlighted()}
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
