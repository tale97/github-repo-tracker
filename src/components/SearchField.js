import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class SearchField extends React.Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
    };
  }

  onCloseSearchFunction = () => {
    this.setState({ anchorEl: null });
  };

  onClickSearchFunction = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  render() {
    return (
      <form onSubmit={this.props.handleOnSubmit}>
        <Menu
          id="search-function-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.onCloseSearchFunction}
        >
          <MenuItem onClick={this.props.onClickFilterFunction}>Filter</MenuItem>
          <MenuItem onClick={this.props.onClickSearchFucntion}>
            Add Repo
          </MenuItem>
        </Menu>
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
              label="Add a repository to tracking list"
              placeholder="user / repository"
              onChange={this.props.searchFieldInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      aria-controls="search-type-menu"
                      aria-haspopup="true"
                      onClick={this.onClickSearchFunction}
                    >
                      <PlaylistAddIcon color="primary" />
                    </IconButton>
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
              style={{ color: "white" }}
            >
              Add Repo
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default SearchField;
