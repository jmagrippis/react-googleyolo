import { Children, PureComponent } from 'react'
import PropTypes from 'prop-types'

import GoogleyoloShape from '../GoogleyoloShape'

const GOOGLEYOLO_SRC = 'https://smartlock.google.com/client'

class Provider extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
    clientId: PropTypes.string,
    onRetrieveSuccess: PropTypes.func,
    onRetrieveError: PropTypes.func,
    supportedAuthMethods: PropTypes.arrayOf(PropTypes.string),
  }

  static childContextTypes = {
    googleyolo: GoogleyoloShape,
  }

  static defaultProps = {
    supportedAuthMethods: [
      'https://accounts.google.com',
      'googleyolo://id-and-password',
    ],
  }

  state = {}

  getChildContext() {
    const { googleyolo } = this.state
    return { googleyolo }
  }

  onGoogleYoloLoad = googleyolo => {
    this.setState({ googleyolo })

    if (this.shouldRetrieve(this.props)) {
      this.retrieve(googleyolo)
    }
  }

  shouldRetrieve({ clientId, onRetrieveSuccess, onRetrieveError }) {
    return clientId && !!(onRetrieveSuccess || onRetrieveError)
  }

  retrieve = googleyolo => {
    const {
      clientId,
      onRetrieveSuccess,
      onRetrieveError,
      supportedAuthMethods,
    } = this.props
    return googleyolo
      .retrieve({
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
          onRetrieveSuccess && onRetrieveSuccess(credential)
        },
        err => {
          onRetrieveError && onRetrieveError(err)
        }
      )
  }

  componentDidMount() {
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
