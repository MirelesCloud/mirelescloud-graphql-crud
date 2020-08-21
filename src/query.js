import { gql } from '@apollo/client'

export const GET_MOVIES = gql`
  query GetAllMovies {
    movies {
      id
      name
      producer
      rating
    }
  }
`

export const GET_MOVIE = gql`
  query GetMovie($id: ID!) {
    movie(id: $id) {
      id
      name
      producer
      rating
    }
  }
`

export const ADD_MOVIE = gql`
  mutation AddMovie($name: String!, $producer: String!, $rating: Int!) {
    addMovie(name: $name, producer: $producer, rating: $rating) {
      id
      name
      producer
      rating
    }
  }
`

export const DELETE_MOVIE = gql`
  mutation DeleteMovie($id: ID!) {
    deleteMovie(id: $id) {
      id
    }
  }
`

export const UPDATE_MOVIE = gql`
  mutation UpdateMovie($name: String!, $producer: String!, $rating: Int!) {
    updateMovie(name: $name, producer: $producer, rating: $rating) {
      id
      name
      producer
      rating
    }
  }
`