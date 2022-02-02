import { useState } from "react";

const Editor = (props) => {
  const [title, setTitle] = useState(props?.blogpost?.title ?? ""); //?. =optional chaning= ha nem létezik a blogpost vagy nincs title akkor üres legyen egyéb esetben annak az értékét adja be
  const [body, setBody] = useState(props?.blogpost?.body ?? "");
  const [author, setAuthor] = useState(props?.blogpost?.author ?? "");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };
  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title === "" || author === "" || body === "") {
      return;
    }
    const payload = { title: title, author: author, body: body }; //ez lesz a bodyja a hálózati kérésnek

    setTitle("");
    setBody("");
    setAuthor("");

    props.onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="title of blogpost"
        value={title}
        onChange={handleTitleChange}
      />
      <input
        type="text"
        placeholder="author of blogpost"
        value={author}
        onChange={handleAuthorChange}
      />
      <textarea
        placeholder="body of blogpost"
        onChange={handleBodyChange}
        value={body}
      ></textarea>
      <button disabled={props.loading} type="submit">
        {props.loading ? "Loading" : "Save"}
      </button>
    </form>
  );
};
//diasbled={loading ? true:false} ugyanaz mint ami a buttonbe van
export default Editor;

// import { useState } from "react";

// async function postBlogPost(payload) {
//   const url = "http://localhost:3000/posts";
//   const body = JSON.stringify(payload); //payload-ot olyanra alakítja amit eltudsz küldeni a szervernek
//   const response = await fetch(url, {
//     method: "POST", //ezzel állítjuk be hogy ez milyen fajta kommunikáció
//     headers: {
//       "content-type": "application/json", //ezze ismertetem a szerverrel a kommunikációs formámat
//     },
//     body, // shorthandje a body:body-nak
//   });
//   const data = await response.json();
//   return data;
// }

// const Editor = () => {
//   const [title, setTitle] = useState("");
//   const [body, setBody] = useState("");
//   const [author, setAuthor] = useState("");

//   function handleTitleChange(e) {
//     setTitle(e.target.value); // itt állítod be, hogy minek az értékét akarod állítani
//   }
//   function handleAuthorChange(e) {
//     setAuthor(e.target.value);
//   }
//   function handleBodyChange(e) {
//     setBody(e.target.value);
//   }

//   async function handleSubmit(e) {
//     e.preventDefault(); //megakadályozod hogy ne submitálja magától
//     const payload = {
//       title,
//       body,
//       author, //title: useState, title:title
//     };
//     const data = await postBlogPost(payload);
//     console.log(data);
//   }
//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Title of blogpost"
//         value={title}
//         onChange={handleTitleChange}
//       />
//       <input
//         type="text"
//         placeholder="Author of blogpost"
//         value={author}
//         onChange={handleAuthorChange}
//       />
//       <textarea placeholder="body" onChange={handleBodyChange} value={body} />

//       <button type="submit">Save</button>
//     </form>
//   );
// };

// export default Editor;
