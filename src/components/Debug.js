import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'

const NO_CREDENTIALS_AVAILABLE = 'noCredentialsAvailable'
const UNSUPPORTED_BROWSER = 'unsupportedBrowser'

const TROUBLESHOOTING_URL =
  'https://developers.google.com/identity/one-tap/web/troubleshooting'

class Debug extends PureComponent {
  static propTypes = {
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }

  static style = { color: '#666' }

  renderExplanation(type) {
    switch (type) {
      case UNSUPPORTED_BROWSER:
        return (
          <Fragment>
            <div>
              Google claims to be{' '}
              <a href={TROUBLESHOOTING_URL}>
                strict with the supported browsers
              </a>{' '}
              for this "security sensitive" library.
            </div>
            <div>
              However, this also happens when an up-to-date browser is blocking
              usage of `window.crypto.subtle`, usually because you are trying to
              make the request from an insecure origin.
            </div>
          </Fragment>
        )
      case NO_CREDENTIALS_AVAILABLE:
        return (
          <Fragment>
            <div>
              Usually means all you need to do is to actively initiate the
              signin flow using `hint`.
            </div>
            <div>
              Unfortunately also shows up for some different types of errors,
              such as not having set up the current origin as an authorized
              javascript origin.
            </div>
          </Fragment>
        )
      default:
        return null
    }
  }

  render() {
    const { message, type } = this.props
    return (
      <div style={Debug.style}>
        <div>{message}</div>
        {this.renderExplanation(type)}
      </div>
    )
  }
}

export default Debug
