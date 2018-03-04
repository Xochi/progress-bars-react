import React, { Component } from 'react'

class Controls extends Component {
  
  render () {
    return(
      <div className='progress-bar__controls-container'>
        <div className='progress-bar__controls-select'>
          <select onChange={ this.props.selectedBar } value={ this.props.selected } className='progress-bar__select' name='progress-bar-select' id='progressBar__select'>
            <option value='none selected'>Select a bar</option>
            {
              this.props.items.map((item, i) => {
                let optName = 'bar' + i
                return <option key={ i } value={ optName }>{ optName }</option>
              })
            }
          </select>
        </div>
        <div className="progress-bar__buttons">
        { 
          this.props.buttons.map((item, i) => {
            return <button key={ i } type="button" onClick={ this.props.updateBar }>{ item }</button>
          }) 
        }
        </div>
      </div>
    )
  }
}

export default Controls