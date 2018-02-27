import React, { PureComponent, Fragment } from 'react'

import withGoogleyolo from './withGoogleyolo'
import Logout from './Logout'

class Info extends PureComponent {
  render() {
    const { googleyolo, credential } = this.props
    return (
      <Fragment>
        <div>`googleyolo` status: {googleyolo ? 'loaded' : 'loading'}</div>
        {credential ? (
          <div>
            <div>
              Logged in as: <strong>{credential.displayName}</strong>
            </div>
            <Logout />
          </div>
        ) : (
          ''
        )}
      </Fragment>
    )
  }
}

export default withGoogleyolo(Info)
