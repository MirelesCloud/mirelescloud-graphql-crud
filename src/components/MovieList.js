import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { GET_MOVIES, DELETE_MOVIE } from '../query'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

const MovieList = () => {
  const { data, loading, error } = useQuery(GET_MOVIES)

  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    update(cache, { data: { deleteMovie }}) {
      const { movies } = cache.readQuery({ query: GET_MOVIES});
      const newList = movies.filter(movie => movie.id !== deleteMovie.id)
   
      cache.writeQuery({
        query: GET_MOVIES,
        data: { movies: newList},
      })
    }
  })

  const List = () => {
    return data.movies.map(movie => (
      <TableRow key={movie.id}>
        <TableCell>{movie.name}</TableCell>
        <TableCell>{movie.producer}</TableCell>
        <TableCell>{movie.rating}</TableCell>
        <TableCell>
        
        <Link to={`edit/${movie.id}`} style={{textDecoration: "none"}}>
          <Button color="primary" size="small">Edit</Button>
        </Link>{" "}
        <Button color="secondary" size="small" onClick={() => deleteMovie({
          variables: {
            id: movie.id
          }
        }) }>Delete</Button> 
      </TableCell>
     
      </TableRow>
    ))
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error!!!</div>
  return (
    <>
      <CssBaseline/>
      <Box mt={2}>
        <Container maxWidth="md" >
          <Typography component="div">
          <Typography component="h1" variant="h5" color="primary" gutterBottom>
            Movie List
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Title</strong></TableCell>
                <TableCell><strong>Producer</strong></TableCell>
                <TableCell><strong>Rating</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            <List/>
            </TableBody>
          </Table>
          </Typography>
        </Container>
      </Box>
    </>
  )
}

export default MovieList