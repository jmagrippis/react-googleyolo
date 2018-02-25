import React, { Component } from 'react'

import GoogleyoloShape from '../googleyoloShape'

const withGoogleyolo = WrappedComponent =>
  class GoogleyoloWrapper extends Component {
    static contextTypes = {
      googleyolo: GoogleyoloShape,
    }

    render() {
      return (
        <WrappedComponent
          googleyolo={this.context.googleyolo}
          {...this.props}
        />
      )
    }
  }

export default withGoogleyolo
