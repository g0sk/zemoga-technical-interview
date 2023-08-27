import PostsApi from '../api/postApi';

export type Post = {
  id: number;
  user: number;
  title: string;
  body: string;
};

export async function getPosts(): Promise<Post[]> {
  const res = await PostsApi.getPosts();
  if (res) {
    return res.data;
  }
  return [];
}
