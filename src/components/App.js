import React, { PureComponent } from 'react'

import withGoogleyolo from './withGoogleyolo'
import Provider from './Provider'
import Login from './Login'

class App extends PureComponent {
  render() {
    return (
      <Provider>
        <Login />
      </Provider>
    )
  }
}

export default withGoogleyolo(App)
