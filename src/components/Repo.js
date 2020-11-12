import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class Repo extends React.Component {
  render() {
    const { repo } = this.props;
    console.log(`DEBUG ${repo}`);

    return (
      <Card className="repo">
        <CardContent>
          {repo.name}
          <br />
          {repo.releaseDate.split("T").join(" at ").split("Z").join(" UTC")}
          <br />
          {repo.tagName}
        </CardContent>
      </Card>
    );
  }
}

export default Repo;
