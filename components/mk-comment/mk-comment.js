const MkComment = ({ name, email, body }) => {
  return (
    <div
      data-testid="mk-searchbox-comment"
      className=" m-2 p-4 ml-5 w-max-lg sm:ml-20 mr-5 sm:mr-20 rounded-2xl shadow-2xl hover:shadow-red-500"
    >
      {name && (
        <p data-testid="mk-searchbox-comment-name">
          <b>name:</b>
          {name}
        </p>
      )}
      {email && (
        <p data-testid="mk-searchbox-comment-email">
          <b>email:</b>
          {email}
        </p>
      )}
      <p data-testid="mk-searchbox-comment-body" className="mt-4">
        {body.substring(0, 64)}...
      </p>
    </div>
  );
};

export default MkComment;
