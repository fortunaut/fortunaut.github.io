import { useParams } from "react-router";
import { useEffect, useState } from "react";
import ItalicText from "components/ItalicText";
import "./Article.css";

const simpleComponents = {
  ItalicText: ItalicText,
  span: "span",
  p: "p",
  h3: "h3",
}

const parseDisplayContent = (contentArray) => {
  return (<>
    {contentArray.map((obj, index) => {
      const content = (!!obj.content && Array.isArray(obj.content)) ? parseDisplayContent(obj.content) : obj.content;
      if (Object.keys(simpleComponents).includes(obj.type)) {
        const Component = simpleComponents[obj.type];
        return <Component key={index}>{content}</Component>
      }
      if (obj.type === 'img') {
        return <div className="Article-image" key={index}>
          <img
            {...obj}
          />
        </div>
      }
    })}
  </>);
}

const Article = () => {

  const { title } = useParams();
  const [articleData, setArticleData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const jsonFilePath = `/articles/${title}.json`; // URL path from public root
    setIsLoading(true);
    setError(null); // clear out any error
    fetch(jsonFilePath).then(response => {
      if (!response.ok) {
        throw new Error(`Network request was no ok: ${response.statusText}`);
      }
      return response.json();
    }).then(data => {
      setArticleData(data);
    }).catch(error => {
      console.log("Fetch error", error);
      console.log("If you're seeing this, send me an email.")
      setError(error);
    }).finally(() => {
      setIsLoading(false);
    }
    )
  }, [title]);

  if (error) {
    return (<>There was an error! Navigate back or refresh the page.</>)
  }

  return (<>
    {isLoading ?
      <div>Loading...</div> :
      <div>
        {parseDisplayContent(articleData.content)}
      </div>}
  </>);
}

export default Article;