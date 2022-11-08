import { render, screen, fireEvent } from "@testing-library/react";
import { enableFetchMocks } from "jest-fetch-mock";
import "@testing-library/jest-dom";
import MkSearchbox from "../mk-searchbox";

describe("Searchbox", () => {
  beforeEach(() => {
    enableFetchMocks();
  });

  it("display a mk-searchbox with a custom placeholder", async () => {
    const mkSearchbox = render(<MkSearchbox placeholder="this is a test" />);

    const searchbox = await mkSearchbox.findByTestId("mk-searchbox-input");

    expect(searchbox.placeholder).toContain("this is a test");
  });

  it("type on searchbox", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({ email: "test", name: "test", body: "test" })
    );

    const mkSearchbox = render(<MkSearchbox placeholder="this is a test" />);

    const searchbox = await mkSearchbox.findByTestId("mk-searchbox-input");
    fireEvent.change(searchbox, { target: { value: "this is a test value" } });

    expect(
      screen.getByDisplayValue("this is a test value")
    ).toBeInTheDocument();
  });

  it("type empty on searchbox", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({ email: "test", name: "test", body: "test" })
    );

    const mkSearchbox = render(<MkSearchbox placeholder="this is a test" />);

    const searchbox = await mkSearchbox.findByTestId("mk-searchbox-input");
    fireEvent.change(searchbox, { target: { value: "" } });
    expect(screen.getByPlaceholderText("this is a test")).toBeInTheDocument();
  });

  it("check minimum lenght for query api", async () => {
    const mkSearchbox = render(
      <MkSearchbox placeholder="this is a test" setComments={() => {}} />
    );
    const searchbox = await mkSearchbox.findByTestId("mk-searchbox-input");

    const button = screen.getByTestId("mk-searchbox-search-button");
    fireEvent.change(searchbox, { target: { value: "m" } });
    fireEvent.click(button);
    expect(screen.getByTestId("mk-searchbox-query-error")).toBeInTheDocument();
    fireEvent.change(searchbox, { target: { value: "ma" } });
    fireEvent.click(button);
    expect(screen.getByTestId("mk-searchbox-query-error")).toBeInTheDocument();
  });
});
