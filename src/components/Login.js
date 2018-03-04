import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import withGoogleyolo from './withGoogleyolo'
import GoogleyoloShape from '../GoogleyoloShape'
import warnIfNotProd from '../warnIfNotProd'

export class Login extends PureComponent {
  static propTypes = {
    clientId: PropTypes.string.isRequired,
    children: PropTypes.node,
    googleyolo: GoogleyoloShape,
    node: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    onLoginError: PropTypes.func,
    onLoginSuccess: PropTypes.func,
    supportedAuthMethods: PropTypes.arrayOf(PropTypes.string),
  }

  static defaultProps = {
    children: 'login',
    node: 'button',
    supportedAuthMethods: [
      'googleyolo://id-and-password',
      'https://accounts.google.com',
    ],
  }

  onClick = () => {
    const { googleyolo, clientId, supportedAuthMethods } = this.props

    if (!googleyolo) {
      return warnIfNotProd(
        'googleyolo not defined; maybe the library is not loaded yet?'
      )
    }

    googleyolo
      .hint({
        supportedAuthMethods,
        supportedIdTokenProviders: [
          {
            clientId,
            uri: 'https://accounts.google.com',
          },
        ],
      })
      .then(
        credential => {
          const { onLoginSuccess } = this.props
          onLoginSuccess && onLoginSuccess(credential)
        },
        err => {
          const { onLoginError } = this.props
          onLoginError && onLoginError(err)
        }
      )
  }

  getRestProps({
    googleyolo,
    supportedAuthMethods,
    clientId,
    onLoginError,
    onLoginSuccess,
    node,
    ...restProps
  }) {
    return restProps
  }

  render() {
    const { node: Node } = this.props
    return <Node onClick={this.onClick} {...this.getRestProps(this.props)} />
  }
}

export default withGoogleyolo(Login)
