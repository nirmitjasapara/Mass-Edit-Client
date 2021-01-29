import React, { Component } from 'react'
import { Section, Input, Button, Required } from '../../components/Utils/Utils'
import CustomContext from '../../contexts/CustomContext';
import ApiService from '../../services/api-service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faMinusCircle, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import './SubstitutionPage.css'

export default class SubstitutionPage extends Component {
  static contextType = CustomContext
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  state = { error: null ,
    selection: '',
    substitutes: [ { from: "", to: "" } ]}

  renderSubstitutes() {
    const { substitutes } = this.state
    return (
      <div className='new-option'>
        <div className='name'>
          <label htmlFor='AddTemplate__name'>
            Name <Required />
          </label>
          <Input
            name='name'
            type='text'
            required
            id='AddTemplate__name'>
          </Input>
        </div>
        {substitutes.map((x, i) =>
          <div key={'substitutes ' + i} className='sub_box'>
            <Input
              name='from'
              placeholder="From"
              type='text'
              required
              value={x.from}
              onChange={e => this.handleInputChange(e, i)}
              style={{"display": "inline"}}
              id={'substitutes_from' + i}>
            </Input>
            <FontAwesomeIcon icon={faLongArrowAltRight} className="icons"/>
            <Input
              name='to'
              placeholder="To"
              type='text'
              required
              value={x.to}
              onChange={e => this.handleInputChange(e, i)}
              style={{"display": "inline"}}
              id={'substitutes_to' + i}>
            </Input>
            <span className="btn_box">
              {substitutes.length > 1 && 
                <button onClick={() => this.handleRemoveClick(i)}>
                  <FontAwesomeIcon icon={faMinusCircle}/>
                </button>
              }
              {substitutes.length - 1 === i && 
                <button onClick={() => this.handleAddClick()}>
                  <FontAwesomeIcon icon={faPlusCircle}/>
                </button>
              }
            </span>
          </div>)}
        </div>)
  }

  renderOptions() {
    const { templates } = this.context
    return (
    <select className='template-select' value={this.state.selection} onChange={e => this.handleSelectChange(e)}>
      {templates.map((x, i) =>
      <option key={'template_' + i} value={x.id}>{x.name}</option>
      )}
      <option key='template_default' value={''}>Create template</option>
    </select>)
  }

  // handle select change
  handleSelectChange(e) {
    this.setState({ selection: e.target.value })
  }

  // handle input change
  handleInputChange(e, i) {
    const { substitutes } = this.state
    const { name, value } = e.target;
    const list = [...substitutes];
    list[i][name] = value;
    this.setState({ substitutes: list })
  }
 
  // handle click event of the Remove button
  handleRemoveClick (i) {
    const { substitutes } = this.state
    const list = [...substitutes];
    list.splice(i, 1);
    this.setState({ substitutes: list })
  }
 
  // handle click event of the Add button
  handleAddClick () {
    const { substitutes } = this.state
    this.setState({ substitutes: [...substitutes, { from: "", to: "" }] })
  }

  handleAddSuccess = user => {
    const { history } = this.props
    history.push('/')
  }

  handleSubmit = ev => {
    ev.preventDefault()
    this.setState({ error: null })
    const { substitutes, selection } = this.state
    const { name } = ev.target

    console.log(substitutes);
    ApiService.substitute({
      doc_id: this.props.match.params.id,
      name: name.value,
      selection,
      substitutes
    })
      .then(res => {
        this.setState({ 
          selection: '', substitutes: [ { from: "", to: "" } ] })
        this.handleAddSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    return (
      <main className="main">
        <Section className='AddPage'>
          <h2>Substitution</h2>
          <p>Please add two words to substitute one with the other.
             You may also click the plus button to add more replacements,
             or the minus (for 2+ substitutions) to delete one.
          </p>
          <p className='text-box'>
            {this.context.getOriginal(Number(this.props.match.params.id))?.text}
          </p>
          <form
            className='SubstitutionForm'
            onSubmit={this.handleSubmit}
          >
            <div className='options'>
              {this.renderOptions()}
            </div>
            {
              (this.state.selection) ? '' :
                this.renderSubstitutes()
            }
            <Button className='greenbg' type='submit'>
              Submit
            </Button>
            <Button className='redbg'
                onClick={() => this.handleAddSuccess()}
                type='button'>
              Leave
            </Button>

          </form>
        </Section>
      </main>
    )
  }
}