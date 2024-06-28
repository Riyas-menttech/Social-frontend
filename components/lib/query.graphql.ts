import { gql } from "@apollo/client";


export const FETCHUSERS = gql`
 query FindAllUsers {
  findAllUsers {
    Email
    Name
    Password
    id
  }
}
`
export const FETCHPOST = gql`
  query findAllPost {
    findAllPost {
      description
      dislikes
      likes
      video
      id
      image
      userId
    }
  }
`;