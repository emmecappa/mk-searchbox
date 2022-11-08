import { render } from "@testing-library/react";
import MkComment from "../mk-comment";

describe("Comment", () => {
  it("display a mk-comment with all values", async () => {
    const mkComment = render(
      <MkComment name="Test name" email="Test email" body="Test body short" />
    );

    const comment = await mkComment.findByTestId("mk-searchbox-comment");
    const commentName = await mkComment.findByTestId(
      "mk-searchbox-comment-name"
    );
    const commentEmail = await mkComment.findByTestId(
      "mk-searchbox-comment-email"
    );
    const commentBody = await mkComment.findByTestId(
      "mk-searchbox-comment-body"
    );

    expect(comment).toBeInTheDocument;
    expect(commentName).toBeInTheDocument;
    expect(commentEmail).toBeInTheDocument;
    expect(commentBody).toBeInTheDocument;
  });
  it("display a mk-comment without name", async () => {
    const mkComment = render(
      <MkComment email="Test email" body="Test body short" />
    );

    const comment = await mkComment.findByTestId("mk-searchbox-comment");
    const commentEmail = await mkComment.findByTestId(
      "mk-searchbox-comment-email"
    );
    const commentBody = await mkComment.findByTestId(
      "mk-searchbox-comment-body"
    );
    expect(comment).toBeInTheDocument;
    expect(commentEmail).toBeInTheDocument;
    expect(commentBody).toBeInTheDocument;
  });
});
