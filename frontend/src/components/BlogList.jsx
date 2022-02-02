import { useEffect, useState } from "react";
import Blogpost from "./Blogpost";

const fetchBlogposts = async () => {
  const url = "http://localhost:3000/posts";
  const response = await fetch(url);
  const posts = await response.json(); //ebbe rakja a fetch által lekért cuccokat
  return posts;
};

//custom hook
const useAsync = (fn) => {
  //paramétere egy function =fn
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // itt most azért true mert a rendzer alapállapota a töltés

  useEffect(() => {
    //amit átadok a useeffectnek azt sose tegyük asyncronná
    fn().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [fn]); //condition array: akkor fut le a useeffect hogyha ez ami a szögletes zárójelbe van megváltozik, de mivel ez egy function ami egy összetett dolog(így nem tudja összehaosnlítani), ezért a memóriacímét nézi meg. Röviden összetett típusoknál nem az értékét hanem a memóricímét nézi, ezért nem fut többször le a useeffect.
  return [data, loading];
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
        />
      ))}
    </section>
  );
};
export default BlogList;
