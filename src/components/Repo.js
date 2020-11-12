import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class Repo extends React.Component {
  render() {
    return (
      <Card className="repo">
        <CardContent>
          Repo Name
          <br />
          Repo Info
        </CardContent>
      </Card>
    );
  }
}

export default Repo;
