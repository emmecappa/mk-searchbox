import { useState, useEffect } from "react";

const MkTypeahead = ({ query, setQuery }) => {
  const [typeahead, setTypeaHead] = useState([]);
  const findQueryInComment = (email, name, body, query) => {
    if (email.toLowerCase().includes(query.toLowerCase())) {
      return (
        <>
          {email} | contains <b>{query}</b> in email |
        </>
      );
    } else if (name.toLowerCase().includes(query.toLowerCase())) {
      return (
        <>
          {email} | contains <b>{query}</b> in name |
        </>
      );
    } else if (body.toLowerCase().includes(query.toLowerCase())) {
      return (
        <>
          {email} | contains <b>{query}</b> in body |
        </>
      );
    }
  };

  const fetchDataTypeaHead = async (query) => {
    const comments = await fetch(
      `https://jsonplaceholder.typicode.com/comments?q=${query}&_limit=5`
    ).then((response) => response.json());
    setTypeaHead(comments);

    return comments;
  };

  useEffect(() => {
    query.length > 1 ? fetchDataTypeaHead(query) : setTypeaHead([]);
  }, [query]);

  return (
    <div
      className="mt-2 bg-white  rounded-2xl shadow-red-400 shadow-2xl"
      data-testid="mk-searchbox-typeahead"
    >
      {typeahead &&
        typeahead.map((comment, id) => {
          const { email, name, body } = comment;
          {
            return (
              <div
                data-testid="mk-searchbox-typeahead-element"
                key={id}
                className="text-base p-4  text-gray-400 hover:text-gray-700"
                onClick={() => {
                  setQuery(comment.email);
                  setTypeaHead([]);
                }}
              >
                {findQueryInComment(email, name, body, query)}
              </div>
            );
          }
        })}
    </div>
  );
};

export default MkTypeahead;
