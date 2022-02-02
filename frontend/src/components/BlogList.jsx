import Blogpost from "./Blogpost";
import useAsync from "../hooks/useAsync";

const fetchBlogposts = async () => {
  const url = "http://localhost:3000/posts";
  const response = await fetch(url);
  const posts = await response.json(); //ebbe rakja a fetch által lekért cuccokat
  return posts;
};

const BlogList = () => {
  const [data, loading] = useAsync(fetchBlogposts); // a useAsynnak az fn egyenlo lesz a fecthblogpost-al és ez egyenlo a const-al
  if (loading) {
    return <section>Loading...</section>;
  }
  return (
    <section>
      {data.map((item) => (
        <Blogpost
          key={item.id}
          author={item.author}
          body={item.body}
          title={item.title}
          id={item.id}
        />
      ))}
    </section>
  );
};
export default BlogList;
