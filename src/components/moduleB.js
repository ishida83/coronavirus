import React from "react";

export class moduleB extends React.Component {
  render() {
    return (
      <div>
        <small>
          You are running this application in <b>{process.env.NODE_ENV}</b>{" "}
          mode.
        </small>
        <form>
          <input
            type="hidden"
            defaultValue={process.env.REACT_APP_NOT_SECRET_CODE}
          />
        </form>
      </div>
    );
  }
}
