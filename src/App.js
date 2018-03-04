import React, { Component } from 'react'
import ProgressBar from './progressBar'
import Controls from './controls'
import './App.css'
import debounce from 'debounce'

class App extends Component {
  constructor(props) {
    super(props)

    // Event listener for window size
    window.addEventListener('resize', debounce(this.setWindowSize, 500))

    this.progressBars = false
    this.buttonControls = false
    this.selectedEl = null
    this.windowSizeIsMobile = this.getWindowSize()

    // set initial state
    this.state = {
      buttons: false,
      bars: false,
      selected: 'none selected',
      isMobile: this.windowSizeIsMobile,
      barWidth: this.windowSizeIsMobile ? 280 : 420
    }
  }

  componentDidMount () {
    // Get data from endpoints
    fetch('https://frontend-exercise.apps.b.cld.gov.au/bars').then((response) => {
      if(response.status !== 200) {
        console.log(response.status, ' - error retrieving data') 
        return
      }
      return response.json()
    }).then((data) => {
      // console.table(data)
      let bars = this.progressBarSetRef(data.bars)
      // set state from fetched data
      this.setState({
        bars: bars,
        buttons: data.buttons
      })
      
      console.table(this.state)
    })
  }

  componentWillUpdate (nextProps, nextState) {
    console.log('componentWillUpdate called')

    // Find reference for the currently selected progress bar and add/remove focus
    if (nextState.selected === 'none selected') {
      // console.log('reached none selected')
      this.selectedEl = null
      if (this.state.bars) this.progressBarSelectHandler(this.state.bars)
    } else {
      this.selectedEl = document.getElementById(nextState.selected)
      this.progressBarSelectHandler(this.state.bars)
      this.selectedEl.querySelector('.progress-bar__component').classList.add('--focus')
    }
  }

  getWindowSize () {
    // console.log('windowSizeHandler called')
    if (window.matchMedia('(max-width: 520px)').matches) {
      return true
    } else {
      return false
    }
  }

  setWindowSize = () => {
    this.windowSizeIsMobile = this.getWindowSize()
    this.setState({ 
      isMobile: this.getWindowSize(),
      barWidth: this.windowSizeIsMobile ? 280 : 420
    })
  }

  progressBarSetRef (array) {
    return array.map((item, i) => {
      return {id: 'bar' + i, value: item, initValue: item}
    })
  }

  progressBarSelectHandler (array) {
    array.forEach(element => {
      let el = document.getElementById(element.id).querySelector('.progress-bar__component')

      if(el.classList.contains('--focus')) {
        el.classList.remove('--focus')
      }
    });
  }

  returnHeader () {
    return (
      <header className="App-header">
        <h1 className="App-title">Progress Bars</h1>
        <p>by Christopher Rodriguez</p>
      </header>
    )
  }

  updateBarHandler = (event) => {
    let integer = parseInt(event.target.textContent, 10)

    if(this.selectedEl !== null) {
      let bars = this.state.bars.map(item => {
        // traverse array and search in object for the correct bar to update
        if(item.id === this.state.selected) {
          console.log('found item', item, item.value)
          item.value += integer
          item.value = item.value < 0 ? 0 : item.value
        }
        return item
      })
      this.setState({
        bars
      })
    }
  }

  selectChange = (event) => {
    this.setState({ selected: event.target.value })
  }

  render () {
    // console.log('this.state.bars', this.state.bars)
    this.progressBars = this.state.bars
    this.buttonControls = this.state.buttons

    if (this.progressBars) {
      return (
        <div className="App">
          { this.returnHeader() }
          { 
            this.progressBars.map((item, i) => {
              return (
                <ProgressBar 
                  barId={ 'bar' + i } 
                  integer={ this.state.bars[i].value } 
                  barWidth={ this.state.barWidth } 
                  key={ i } >
                </ProgressBar>
              )
            })
          }
          <Controls 
            items={ this.progressBars } 
            buttons={ this.buttonControls } 
            selectedBar={ this.selectChange } 
            updateBar={ this.updateBarHandler }>
          </Controls>
        </div>
      )
    } else {
      return (
        <div className="App">{ this.returnHeader() }</div>
      )
    }
  }
}

export default App
