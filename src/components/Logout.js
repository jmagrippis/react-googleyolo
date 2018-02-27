import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import withGoogleyolo from './withGoogleyolo'
import GoogleyoloShape from '../GoogleyoloShape'

class Logout extends PureComponent {
  static propTypes = {
    googleyolo: GoogleyoloShape,
    onAutoSignInDisabled: PropTypes.func,
    children: PropTypes.node,
    node: PropTypes.node,
  }

  static defaultProps = {
    children: 'logout',
    node: 'button',
  }

  onClick = () => {
    const { googleyolo, onAutoSignInDisabled } = this.props
    googleyolo.disableAutoSignIn().then(result => {
      onAutoSignInDisabled && onAutoSignInDisabled(result)
    })
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
