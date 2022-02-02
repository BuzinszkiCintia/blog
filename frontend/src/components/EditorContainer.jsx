import { useState } from "react";
import Editor from "./Editor";

async function postBlogpost(payload) {
  const url = "http://localhost:3000/posts";
  const body = JSON.stringify(payload);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body,
  });

  const data = await response.json();
  return data;
}
//put: update a backenden meglévő adatot
async function putBlogpost(id, payload) {
  const url = "http://localhost:3000/posts/" + id;
  const body = JSON.stringify(payload);
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body,
  });

  const data = await response.json();
  return data;
}

const EditorContainer = (props) => {
  const [loading, setLoading] = useState(false);
  const handleSave = async (payload) => {
    setLoading(true);

    if (props.blogpost) {
      await putBlogpost(props.blogpost.id, payload);
    } else {
      await postBlogpost(payload); // ez adja vissza a repsonse-t
    }
    setLoading(false);
  };
  return (
    <Editor onSave={handleSave} loading={loading} blogpost={props.blogpost} />
  );
};
export default EditorContainer;
