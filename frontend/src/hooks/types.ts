export interface User {
  id: string;
  name: string;
  email: string;
  posts: Blog[];
}

export interface Blog {
  author: {
    name: string;
  };
  title: string;
  content: string;
  id: string;
  postedOn: string;
  published: boolean;
  authorId: string;
}
