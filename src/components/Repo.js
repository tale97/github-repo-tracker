import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "../styles/Repo.scss";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";

class Repo extends React.Component {
  testFunc = () => {
    console.log("hi");
  };
  render() {
    const { repo } = this.props;
    if (repo.releaseDate) {
      if (repo.message === "Not Found") {
        return (
          <Card className="repo">
            <CardContent>
              <b>{repo.name}</b>
              <br />
              {"Not Found :("}
            </CardContent>
          </Card>
        );
      }
      return (
        <Card className="repo">
          <Grid container direction="row" alignItems="center" spacing={2}>
            <Grid item className="card-content">
              <CardContent>
                <b>{repo.name}</b>
                <br />
                {repo.tagName}
                <br />
                {repo.releaseDate
                  .split("T")
                  .join(" at ")
                  .split("Z")
                  .join(" UTC")}
              </CardContent>
            </Grid>
            <Grid item className="card-control">
              <IconButton
                aria-label="delete"
                onClick={() => this.props.onClickTrashIcon(repo)}
                // onClick={() => this.testFunc()}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Card>
      );
    } else {
      return null;
    }
  }
}

export default Repo;
