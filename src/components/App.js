import React, { PureComponent } from 'react'

import withGoogleyolo from './withGoogleyolo'
import YoloProvider from './Provider'
import Info from './Info'

class App extends PureComponent {
  state = {
    isLoadingAuth: true,
  }

  setCredential = credential => {
    this.setState({ credential, isLoadingAuth: false })
  }

  onRetrieveError = err => {
    this.setState({ isLoadingAuth: false })
    console.log(err)
  }

  render() {
    const { credential, isLoadingAuth } = this.state
    return (
      <YoloProvider
        clientId={process.env.REACT_APP_GOOGLE_CREDENTIALS_CLIENT_ID}
        onRetrieveSuccess={this.setCredential}
        onRetrieveError={this.onRetrieveError}
      >
        <Info
          credential={credential}
          setCredential={this.setCredential}
          isLoadingAuth={isLoadingAuth}
        />
      </YoloProvider>
    )
  }
}

export default withGoogleyolo(App)
