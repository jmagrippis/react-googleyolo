import React, { PureComponent, Fragment } from 'react'

import withGoogleyolo from './withGoogleyolo'
import Logout from './Logout'
import Login from './Login'

class Info extends PureComponent {
  onAutoSignInDisabled = () => {
    const { setCredential } = this.props
    setCredential()
  }

  render() {
    const { googleyolo, credential, setCredential, isLoadingAuth } = this.props
    return (
      <Fragment>
        <div>`googleyolo` status: {googleyolo ? 'loaded' : 'loading'}</div>
        {credential ? (
          <div>
            <div>
              Logged in as: <strong>{credential.displayName}</strong>
            </div>
            <Logout onAutoSignInDisabled={this.onAutoSignInDisabled} />
          </div>
        ) : !isLoadingAuth ? (
          <Login
            clientId={process.env.REACT_APP_GOOGLE_CREDENTIALS_CLIENT_ID}
            onLoginSuccess={setCredential}
          />
        ) : null}
      </Fragment>
    )
  }
}

export default withGoogleyolo(Info)
