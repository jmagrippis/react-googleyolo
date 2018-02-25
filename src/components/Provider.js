import { Children, PureComponent } from 'react'
import PropTypes from 'prop-types'

import GoogleyoloShape from '../GoogleyoloShape'

const GOOGLEYOLO_SRC = 'https://smartlock.google.com/client'

class Provider extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  static childContextTypes = {
    googleyolo: GoogleyoloShape,
  }

  state = {}

  getChildContext() {
    const { googleyolo } = this.state
    return { googleyolo }
  }

  onGoogleYoloLoad = googleyolo => {
    this.setState({ googleyolo })
  }

  componentWillMount() {
    const el = document.createElement('script')
    el.async = true
    el.defer = true
    el.type = 'text/javascript'
    el.src = GOOGLEYOLO_SRC

    document.getElementsByTagName('body')[0].appendChild(el)

    window.onGoogleYoloLoad = this.onGoogleYoloLoad
  }

  render() {
    return Children.only(this.props.children)
  }
}

export default Provider
