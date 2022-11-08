import { useState } from "react";
import MkTypeahead from "../mk-typeahead/mk-typeahead";

const MkSearchbox = ({ placeholder, setComments }) => {
  const [query, setQuery] = useState("");
  const [queryError, setQueryError] = useState(false);
  const emptyComments = [
    {
      body: "nessun elemento trovato",
    },
  ];
  async function fetchData(query) {
    const comments = await fetch(
      `https://jsonplaceholder.typicode.com/comments?q=${query}&_limit=20`
    )
      .then((response) => response.json())
      .then((comments) => {
        comments.length > 0
          ? setComments(comments)
          : setComments(emptyComments);
      });

    return comments;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.length > 2) {
      fetchData(query);
      setQuery("");
    } else {
      checkQueryLength();
      setQuery("");
      setComments([]);
    }
  };
  const checkQueryLength = () => {
    if (query.length < 3) {
      setQueryError(true);
    }
  };
  return (
    <>
      <div className="mt-5 " data-testid="mk-searchbox">
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-12 grid-cols-4 gap-2">
            <div className="md:col-span-11 col-span-3">
              <input
                className="w-[100%] text-base h-11 text-center focus:border-transparent"
                type="text"
                data-testid="mk-searchbox-input"
                placeholder={placeholder}
                value={query}
                onChange={(e) => {
                  setQueryError(false);
                  setQuery(e.target.value);
                }}
              />
              {queryError && (
                <span
                  className="text-red-400 text-sm"
                  data-testid="mk-searchbox-query-error"
                >
                  Minimun characters for search: 3
                </span>
              )}
              <MkTypeahead query={query} setQuery={setQuery} />
            </div>
            <input
              data-testid="mk-searchbox-search-button"
              className="px-4 h-11 text-base"
              type="submit"
              value="search"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default MkSearchbox;
