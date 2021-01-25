import React, { Component } from 'react'
import { Section, Button } from '../../components/Utils/Utils'
import ApiService from '../../services/api-service'
import CustomContext from '../../contexts/CustomContext';
import './JudgePage.css'

export default class JudgePage extends Component {
  static contextType = CustomContext
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  state = { error: null }

  handleVoteSuccess = user => {
    const { history } = this.props
    history.push('/')
  }

  handleVote = approved => {
    this.setState({ error: null })

    ApiService.judge({
      approved,
      doc_id: this.props.match.params.id,
    })
      .then(res => {
        this.handleVoteSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    return (
      <main className="main">
        <Section className='judgePage'>
          <h2>Judge</h2>
          <p>Please judge whether the text is legible and correct</p>
          <div className='text'>
            <label htmlFor='text'>
              Edited Text
            </label>
            <p className='text-box'>
              {this.context.getEdited(Number(this.props.match.params.id))?.text}
            </p>
          </div>
          <Button className='greenbg'
              onClick={() => this.handleVote(true)}>
            Approve
          </Button>
          <Button className='yellowbg'
              onClick={() => this.handleVote(false)}>
            Reject
          </Button>
          <Button className='redbg'
              onClick={() => this.handleVoteSuccess()}
              type='button'>
            Leave
          </Button>
        </Section>
      </main>
    )
  }
}