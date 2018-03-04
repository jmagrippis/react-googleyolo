import React, { PureComponent } from 'react'

import { YoloProvider, withGoogleyolo } from '../../react-googleyolo'
import Info from './Info'

class App extends PureComponent {
  state = {
    isLoadingAuth: true,
  }

  setCredential = credential => {
    this.setState({ credential, isLoadingAuth: false, err: undefined })
  }

  onRetrieveError = err => {
    this.setState({ err, isLoadingAuth: false })
    console.log(err)
  }

  render() {
    const { credential, err, isLoadingAuth } = this.state
    return (
      <YoloProvider
        clientId={process.env.REACT_APP_GOOGLE_CREDENTIALS_CLIENT_ID}
        onRetrieveSuccess={this.setCredential}
        onRetrieveError={this.onRetrieveError}
      >
        <Info
          credential={credential}
          err={err}
          setCredential={this.setCredential}
          isLoadingAuth={isLoadingAuth}
        />
      </YoloProvider>
    )
  }
}

export default withGoogleyolo(App)
