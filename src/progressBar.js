import React, { Component } from 'react'

class ProgressBar extends Component {

	cssCalc () {
		// calculate the width of the graphic element
		console.log('this.props.barWidth', this.props.barWidth, this.props.integer)
		let widthCalc = () => {
			let calc = Math.round(this.props.barWidth * (this.props.integer/100))
			return calc >= 26 ? calc : 26
		}
		let width = widthCalc()
		let bgColor = 'rgb(110, 160, 47)'

		if(this.props.integer >= 100) {
			bgColor = 'rgb(226, 81, 85)'
		}

		return ({
			width: width,
			backgroundColor: bgColor
		})
	}

	render () {
		return (
			<div id={ this.props.barId } className='progress-bar'>
				<div className='progress-bar__component'>
					<div className='progress-bar__graphic-element' style={ this.cssCalc() }></div>
					<div className='progress-bar__percentage'>
						<p>{ this.props.integer }&#37;</p>
					</div>
				</div>
			</div>
		)
	}
}

export default ProgressBar