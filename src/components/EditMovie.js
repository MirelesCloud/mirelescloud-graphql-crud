import React, { useState } from 'react'
import { UPDATE_MOVIE, GET_MOVIE } from '../query'
import { useMutation, useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'

//import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
//import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const useForm = (props) => {
  const [values, setValues] = useState(props)
  return [
    values,
    function(e) {
      setValues({
        ...values,
        [e.target.id]: e.target.value
      })
    }
  ]
}

const EditMovie = ({ match }) => {
  const classes = useStyles()
  let history = useHistory()

  const [field, setField] = useForm({
    name: '',
    producer: '',
    rating: 0
  })

  const [updateMovie] = useMutation(UPDATE_MOVIE)

  const {loading, error, data } = useQuery(GET_MOVIE, {
    variables: {
      id: match.params.id
    }
  } )

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error :(</div>
  console.log(data)
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Typography component="h2" color="primary" variant="h6">Edit Movie</Typography>
        <form className={classes.form} noValidate
          onSubmit={e => {
            e.preventDefault();
            history.push('/')
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Title"
                autoFocus
                value={field.name}
                onChange={setField}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                name="producer"
                variant="outlined"
                required
                fullWidth
                id="producer"
                label="Producer"
                autoFocus
                value={field.producer}
                onChange={setField}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                type="number"
                name="rating"
                variant="outlined"
                required
                fullWidth
                id="rating"
                label="Rating"
                autoFocus
                value={(field.rating)}
                onChange={setField}
              />
            </Grid>
            <Button 
              type="submit"
              size="medium"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Update
            </Button>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default EditMovie