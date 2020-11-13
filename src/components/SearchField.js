import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

class SearchField extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form onSubmit={this.props.handleOnSubmit}>
        <Grid
          container
          justify="center"
          direction="row"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="user / repository"
              onChange={this.props.searchFieldInput}
            />
          </Grid>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              size="large"
            >
              Track Repo
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default SearchField;
