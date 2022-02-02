import { Link } from "react-router-dom";
import styled from "styled-components";

const Article = styled.article`
  background-color: grey;
  width: 90%;
  margin: 5rem auto;
  border-radius: 2rem;
  text-align: center;
`;
const Header = styled.header`
  border: 1px solid black;
  border-radius: 2rem;
`;

const Title = styled.h1`
  font-weight: bold;
`;
const Author = styled.h2`
  font-weight: bold;
  font-size: 90%;
`;

const Body = styled.p`
  padding: 2rem;
`;

const Button = styled.button`
  padding: 1rem;
  margin: 1rem;
  border-radius: 1rem;
  width: 10rem;
`;

const Blogpost = (props) => {
  return (
    <Article>
      <Header>
        <Title>{props.title}</Title>
        <Author>{props.author}</Author>
      </Header>
      <Body>{props.body}</Body>
      <Link to={"/edit/" + props.id}>
        <Button>Edit</Button>
      </Link>
    </Article>
  );
};

export default Blogpost;
