import React, { useState, useContext, useRef } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { MyContext } from "../../context";

const Stage1 = () => {
  const textInput = useRef();
  const context = useContext(MyContext);
  const [error, setError] = useState([false, ""]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = textInput.current.value;
    const validate = validateInput(value);

    if (validate) {
      // if valid, add player
      setError([false, ""]);
      context.addPlayer(value);

      textInput.current.value = "";
    } else {
      console.log("ERROR BITCHES");
    }
  };

  const validateInput = (value) => {
    if (value === "") {
      setError([true, "Sorry, you need to input something"]);
      return false;
    }
    if (value.length <= 2) {
      setError([true, "You need to input at least 3 characters"]);
      return false;
    }
    return true;
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group>
          <Form.Control
            size="lg"
            type="text"
            placeholder="Add Name"
            name="name"
            ref={textInput}
          />
        </Form.Group>
        {error[0] ? <Alert variant="danger">{error[1]}</Alert> : null}
        <br />
        <div className="d-grid gap-2">
          <Button
            className="miami"
            style={{ textAlign: "center" }}
            size="lg"
            variant="info"
            type="submit"
          >
            Add Name
          </Button>
        </div>
        {context.state.players && context.state.players.length > 0 ? (
          <>
            <hr />
            <div>
              <ul className="list-group">
                {context.state.players.map((item, idx) => (
                  <li
                    key={idx}
                    className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                  >
                    {item}
                    <span
                      className="badge badge-danger"
                      onClick={() => context.removePlayer(idx)}
                    >
                      X
                    </span>
                  </li>
                ))}
              </ul>
              <div className="action_button" onClick={() => context.next()}>
                NEXT
              </div>
            </div>
          </>
        ) : null}
      </Form>
    </>
  );
};

export default Stage1;
