import React, { useState } from "react";
import { Blocker, BlockerFunction, Link, useBlocker } from "react-router-dom";

const ConfirmNavigation = ({ blocker }: { blocker: Blocker }) => {
  if (blocker.state === "blocked") {
    return (
      <>
        <p style={{ color: "red" }}>
          Blocked the last navigation to {blocker.location.pathname}
        </p>
        <button onClick={() => blocker.proceed?.()}>Let me through</button>
        <button onClick={() => blocker.reset?.()}>Keep me here</button>
      </>
    );
  }

  if (blocker.state === "proceeding") {
    return (
      <p style={{ color: "orange" }}>Proceeding through blocked navigation</p>
    );
  }

  return <p style={{ color: "green" }}>Blocker is currently unblocked</p>;
};

export function Page1() {
  const [value, setValue] = React.useState("");
  // Allow the submission navigation to the same route to go through
  const shouldBlock = React.useCallback<BlockerFunction>(
    ({ currentLocation, nextLocation }) =>
      value !== "" && currentLocation.pathname !== nextLocation.pathname,
    [value]
  );
  const blocker = useBlocker(shouldBlock);

  return (
    <>
      <div>Page 1 from App1</div>
      <Link to="/page-2">Go to Page 2</Link>
      <br />
      <input
        name="data"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {blocker.state === "blocked" && <ConfirmNavigation blocker={blocker} />}
    </>
  );
}
