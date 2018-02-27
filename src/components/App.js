import React, { PureComponent } from 'react'

import withGoogleyolo from './withGoogleyolo'
import YoloProvider from './Provider'
import Info from './Info'

class App extends PureComponent {
  state = {}
  onRetrieveSuccess = credential => {
    this.setState({ credential })
  }
  render() {
    const { credential } = this.state
    return (
      <YoloProvider
        clientId={process.env.REACT_APP_GOOGLE_CREDENTIALS_CLIENT_ID}
        onRetrieveSuccess={this.onRetrieveSuccess}
      >
        <Info credential={credential} />
      </YoloProvider>
    )
  }
}

export default withGoogleyolo(App)
