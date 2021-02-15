import React, { Component } from "react";
import AddForm from "../../components/AddForm/AddForm";
import { Section, Button } from "../../components/Utils/Utils";
import "./AddPage.css";

export default class AddPage extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  handleAddSuccess = user => {
    const { history } = this.props;
    history.push("/");
  };

  render() {
    return (
      <main className="main">
        <Section className="AddPage">
          <h2>Add Some Unedited Text</h2>
          <AddForm onAddSuccess={this.handleAddSuccess} />
          <Button
            className="redbg"
            onClick={() => this.handleAddSuccess()}
            type="button"
          >
            Leave
          </Button>
        </Section>
      </main>
    );
  }
}
