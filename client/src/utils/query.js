// NU Module 21. 20
// https://www.apollographql.com/tutorials/fullstack-quickstart/fetching-data-with-queries  - jump to "Display the Profile Page"
import { gql } from '@apollo/client';

export const GET_ME = gql`
{
  me {
    _id
    username
    email
    saveBooks {
      bookId
      authors
      description
      title
      image
      link
    }
  }
}
`;