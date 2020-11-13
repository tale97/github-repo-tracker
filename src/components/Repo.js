import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import "../styles/Repo.scss";
import Grid from "@material-ui/core/Grid";
import ToolBar from "./ToolBar";

class Repo extends React.Component {
  isHighlighted = (repoName) => {
    const { highlightedRepoList } = this.props;
    return highlightedRepoList.includes(repoName) ? `highlighted` : ``;
  };
  render() {
    const { repo, onClickTrashIcon, onClickCheckMark } = this.props;
    return (
      <div>
        <Card className={`repo ${this.isHighlighted(repo.name)}`}>
          <CardActionArea>
            <Grid container direction="row" alignItems="center" spacing={2}>
              <Grid item className="card-content">
                <CardContent>
                  <b>{repo.name}</b>
                  <br />
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
      </div>
    );
  }
}

export default Repo;
