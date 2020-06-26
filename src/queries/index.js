import { gql } from 'apollo-boost';

export const ADD_USER = gql`
    mutation CreateUser($email: String!, $name: String!) {
        createUser(input: { email: $email, name: $name }) {
            email
            name
            id
        }
    }
`

export const GET_USERS = gql`
    query Users($skip: Int!, $limit: Int!) {
        users(skip: $skip, limit: $limit) {
            email
            name
            id
        }
    }
`

export const USER_QUERY = gql`
    query User($id: ID!) {
        user(id: $id) {
            email
            name
            id
        }
    }
`

export const DELETE_USER = gql`
    mutation DeleteUser($id: ID!) {
        deleteUser(id: $id) {
            id
        }
    }
`

export const UPDATE_USER = gql`
    mutation UpdateUser($id: ID!, $email: String!, $name: String!) {
        updateUser(id: $id, input: { email: $email, name: $name }) {
            email
            name
            id
        }
    }
`