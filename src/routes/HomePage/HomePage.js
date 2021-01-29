import React, { Component } from 'react'
import CustomContext from '../../contexts/CustomContext';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './HomePage.css'

export default class HomePage extends Component {
  static contextType = CustomContext

  renderDocList({sectionName, sectionPath, data, message}) {
    return (
      <section>
        <h3>
          {sectionName}
        </h3>
        {(data?.length) ? data.map(r =>
          <Link
              to={sectionPath + r.id}
              key={sectionPath + r.id}
              type='button'
              className='list-item'
            ><h3>{r.name}</h3></Link>
        ) :
        <h3 className='default'>Please {message} a Document</h3> }
      </section>
    )
  }

  render() {
    const { docs = {} } = this.context
    return (
      <main className="main">
        <h3 className='default'>Mass edit is an app that allows you to 
          replace words or phrases in a text with better substitutions.
          These substitutions are then saved so you can use this template
          for another similar text.
          First create a project by clicking the button at the bottom right.
          Then edit it when it appears in the edit section.
          Any user (including you) can then judge if the text is valid.
          If it is validated, the final result will appear in the done section.</h3>
        {this.renderDocList({
          sectionName: 'Edit',
          sectionPath: '/edit/',
          data: docs?.original,
          message: 'create'
        })}
        {this.renderDocList({
          sectionName: 'Judge',
          sectionPath: '/judge/',
          data: docs?.edited,
          message: 'edit'
        })}
        {this.renderDocList({
          sectionName: 'Done',
          sectionPath: '/view/',
          data: docs?.approved,
          message: 'approve'
        })}
          <Link
              to='/add'
              type='button'
              className='add-button'
          ><FontAwesomeIcon icon={faPlus} className="icon"/></Link>
      </main>
    )
  }
}