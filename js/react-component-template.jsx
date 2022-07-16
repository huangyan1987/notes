import React from 'react'
import './TK.scss'

const TK = ({}) => (<div></div>)
export default TK

/**************** OR *********/

import React from 'react'
import './TK.scss'

class TK extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (<div></div>)
  }
}

export default TK