import React, { Component } from "react";
import { Button, Input, InputArea, Required } from "../Utils/Utils";
import ApiService from "../../services/api-service";
import "./AddForm.css";

export default class AddForm extends Component {
  static defaultProps = {
    onAddSuccess: () => {}
  };

  state = { error: null };

  handleSubmit = ev => {
    ev.preventDefault();
    this.setState({ error: null });
    const { name, text } = ev.target;

    ApiService.addDoc({
      name: name.value,
      text: text.value
    })
      .then(res => {
        name.value = "";
        text.value = "";
        this.props.onAddSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form className="AddForm" onSubmit={this.handleSubmit}>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <div className="name">
          <label htmlFor="AddForm__name">
            Name <Required />
          </label>
          <Input name="name" type="text" required id="AddForm__name"></Input>
        </div>
        <div className="text">
          <label htmlFor="AddForm__text">
            Unedited text <Required />
          </label>
          <InputArea
            name="text"
            type="text"
            required
            rows="4"
            cols="50"
            id="AddForm__text"
          ></InputArea>
        </div>
        <Button className="greenbg" type="submit">
          Submit
        </Button>
      </form>
    );
  }
}
