import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}`;


export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user{
            _id
            username
        }
    }
}`;

export const SAVE_BOOK = gql`
    mutation saveBook($input: bookData!) {
      saveBook(input: $input) {
        token { 
        bookData{ 
            description
            title
            bookId
            image
            link
            authors
         }
      }  
    }`;

    export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $String) {
            bookId
            authors
            description
            title
            image
            link
        }
    }
    `;

