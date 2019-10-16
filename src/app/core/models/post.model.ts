export interface Post {
    body: string;
    forEvent:string;
    keyOfOwner:string;
    time: string;
    user: User
  }
  interface User {
    avatar: string;
    userName: string
  }