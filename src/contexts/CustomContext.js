import React, { Component } from 'react'

const CustomContext = React.createContext({
  docs: null,
  templates: [],
  error: null,
  setError: () => {},
  clearError: () => { },
  setTemplates: () => {},
  clearTemplates: () => {},
  setDocs: () => {},
  clearDocs: () => {},
  getOriginal: () => {},
  getEdited: () => {},
  getApproved: () => {}
})

export default CustomContext

export class CustomProvider extends Component {
  state = {
    docs: null,
    templates: [],
    error: null,
  };

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }
  setDocs = docs => {
    this.setState({ docs })
  }
  clearDocs = () => {
    this.setState({ docs: null })
  }
  setTemplates = templates => {
    this.setState({ templates })
  }
  clearTemplates = () => {
    this.setState({ templates: [] })
  }
  getOriginal = id => {
    return this.state.docs?.original.find(i => i.id===id)
  }
  getEdited = id => {
    return this.state.docs?.edited.find(i => i.id===id)
  }
  getApproved = id => {
    return this.state.docs?.approved.find(i => i.id===id)
  }
  render() {
    const value = {
      docs: this.state.docs,
      templates: this.state.templates,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setTemplates: this.setTemplates,
      clearTemplates: this.clearTemplates,
      setDocs: this.setDocs,
      clearDocs: this.clearDocs,
      getOriginal: this.getOriginal,
      getEdited: this.getEdited,
      getApproved: this.getApproved
    }
    return (
      <CustomContext.Provider value={value}>
        {this.props.children}
      </CustomContext.Provider>
    )
  }
}