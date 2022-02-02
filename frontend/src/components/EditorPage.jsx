import { useCallback } from "react";
import { useParams } from "react-router-dom";
import useAsync from "../hooks/useAsync";
import EditorContainer from "./EditorContainer";

const fetchBlogpost = async (id) => {
  const url = "http://localhost:3000/posts/" + id;
  const response = await fetch(url);
  const post = await response.json(); //ebbe rakja a fetch által lekért cuccokat
  return post;
};

const EditorPage = () => {
  const params = useParams();
  const fecthById = useCallback(() => fetchBlogpost(params.id), [params.id]); //useCallBack: emlékezés, memorization; célja: valamilyen érték, aminél nekem szükséges hogy a memóriacíme ugyanez legyen eltárolja. reactnál a referenciák biztonságára használják.Ha újrarenderelünk akkor a usecallback emlkszik rá hogy már volt ez a function és előhúzza a memóriából és ha közbe módosul az id erre van a conditional array ([]), mert újrafuttatja a functiont.
  const [data, loading] = useAsync(fecthById);
  if (loading) {
    return <h1>Loading</h1>;
  }
  return <EditorContainer blogpost={data} />;
};

export default EditorPage;
