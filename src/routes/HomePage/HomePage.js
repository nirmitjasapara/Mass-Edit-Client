import React, { Component } from 'react'
import CustomContext from '../../contexts/CustomContext';
import ApiService from '../../services/api-service';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import TokenService from '../../services/token-service';
import './HomePage.css'

export default class HomePage extends Component {
  static contextType = CustomContext

  renderDocList({sectionName, sectionPath, data, message}) {
    return (
      <section>
        <h3>
          {sectionName}
        </h3>
        {(data) ? data.map(r =>
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