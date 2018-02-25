import React, { PureComponent, Fragment } from 'react'

import withGoogleyolo from './withGoogleyolo'

class Login extends PureComponent {
  render() {
    const { googleyolo } = this.props
    return (
      <Fragment>
        <div>`googleyolo` status: {googleyolo ? 'loaded' : 'loading'}</div>
        <div>{JSON.stringify(googleyolo)}</div>
      </Fragment>
    )
  }
}

export default withGoogleyolo(Login)
