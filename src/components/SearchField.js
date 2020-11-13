import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import InputAdornment from "@material-ui/core/InputAdornment";

class SearchField extends React.Component {
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PlaylistAddIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              size="large"
            >
              Add Repo
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              size="large"
              onClick={() => this.props.onClickRefresh()}
            >
              Refresh
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default SearchField;
