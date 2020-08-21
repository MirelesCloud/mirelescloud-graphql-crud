import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import MovieList from './components/MovieList'
import AddMovie from './components/AddMovie';
import EditMovie from './components/EditMovie'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'



function App() {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClose = () => {
    setAnchorEl(null);
  }
  return (
    <Router>
      <AppBar position="static" mb={2}>
        <Toolbar>
          <Typography  color="inherit">
            GraphQL-CRUD
          </Typography>
          <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={e => setAnchorEl(e.currentTarget)}>
            Menu
          </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem >
                <Link to="/" onClick={handleClose}>Home</Link>
              </MenuItem>
            <MenuItem>
              <Link to="/add" onClick={handleClose}>Add Movie</Link>
            </MenuItem>
            </Menu>
        </Toolbar>
      </AppBar>
      <div>
        <Route exact path="/" component={MovieList}/>
        <Route path="/add" component={AddMovie}/>
        <Route path="/edit/:id" component={EditMovie} />
      </div>
    </Router>
  );
}

export default App;
