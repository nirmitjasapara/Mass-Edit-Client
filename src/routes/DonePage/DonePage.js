import React, { Component } from 'react'
import { Section, Button } from '../../components/Utils/Utils'
import CustomContext from '../../contexts/CustomContext';
import './DonePage.css'

export default class DonePage extends Component {
  static contextType = CustomContext
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  state = { error: null }

  handleLeave = user => {
    const { history } = this.props
    history.push('/')
  }

  render() {
    return (
      <main className="main">
        <Section className='donePage'>
          <h2>Done</h2>
          <p>This is the result</p>
          <div className='text'>
            <label htmlFor='text'>
              Approved Text
            </label>
            <p className='text-box'>
              {this.context.getApproved(Number(this.props.match.params.id))?.text}
            </p>
          </div>
          <Button className='redbg'
              onClick={() => this.handleLeave()}
              type='button'>
            Leave
          </Button>
        </Section>
      </main>
    )
  }
}