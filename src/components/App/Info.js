import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'

import {
  Login,
  Logout,
  withGoogleyolo,
  GoogleyoloShape,
} from '../../react-googleyolo'
import Debug from './Debug'

const GoogleyoloErrorShape = PropTypes.shape({
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
})

const GoogleyoloCredentialShape = PropTypes.shape({
  authMethod: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  idToken: PropTypes.string.isRequired,
  profilePicture: PropTypes.string.isRequired,
})

class Info extends PureComponent {
  static propTypes = {
    setCredential: PropTypes.func.isRequired,
    isLoadingAuth: PropTypes.bool.isRequired,
    credential: GoogleyoloCredentialShape,
    googleyolo: GoogleyoloShape,
    err: GoogleyoloErrorShape,
  }

  onAutoSignInDisabled = () => {
    const { setCredential } = this.props
    setCredential()
  }

  render() {
    const {
      googleyolo,
      credential,
      setCredential,
      isLoadingAuth,
      err,
    } = this.props
    return (
      <Fragment>
        <div>`googleyolo` status: {googleyolo ? 'loaded' : 'loading'}</div>
        {credential ? (
          <Fragment>
            <div>
              Logged in as: <strong>{credential.displayName}</strong>
            </div>
            <Logout onAutoSignInDisabled={this.onAutoSignInDisabled} />
          </Fragment>
        ) : !isLoadingAuth ? (
          <Fragment>
            <Login
              clientId={process.env.REACT_APP_GOOGLE_CREDENTIALS_CLIENT_ID}
              onLoginSuccess={setCredential}
            />
            {err && <Debug message={err.message} type={err.type} />}
          </Fragment>
        ) : null}
      </Fragment>
    )
  }
}

export default withGoogleyolo(Info)
