import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import withGoogleyolo from './withGoogleyolo'
import GoogleyoloShape from '../GoogleyoloShape'
import warnIfNotProd from '../warnIfNotProd'

export class Logout extends PureComponent {
  static propTypes = {
    googleyolo: GoogleyoloShape,
    children: PropTypes.node,
    node: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    onAutoSignInDisabled: PropTypes.func,
    onLogoutError: PropTypes.func,
  }

  static defaultProps = {
    children: 'logout',
    node: 'button',
  }

  onClick = () => {
    const { googleyolo, onAutoSignInDisabled } = this.props

    if (!googleyolo) {
      return warnIfNotProd(
        'googleyolo not defined; maybe the library is not loaded yet?'
      )
    }

    googleyolo.disableAutoSignIn().then(
      result => {
        onAutoSignInDisabled && onAutoSignInDisabled(result)
      },
      err => {
        const { onLogoutError } = this.props
        onLogoutError && onLogoutError(err)
      }
    )
  }

  render() {
    const {
      googleyolo,
      onAutoSignInDisabled,
      node: Node,
      ...restProps
    } = this.props
    return <Node onClick={this.onClick} {...restProps} />
  }
}

export default withGoogleyolo(Logout)
