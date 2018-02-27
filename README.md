# React googleyolo

Simple googleyolo `Provider` and `withGoogleyolo` connector-style method that fishes it out of the context and passes it to the given component as a prop.

[Googleyolo] is of course what google calls its smartlock / one-tap sign-up and sign-in library.

## Usage

Feel free to look at the source code for the simplest of examples!

You'll be using it somewhat like ...

```js
// somewhere near your app's entry point: index.js, app.js etc.

import YoloProvider from 'react-googleyolo'

class App extends PureComponent {
  render() {
    return (
      <YoloProvider>
        <TheRestOfYourApp />
      </YoloProvider>
    )
  }
}
```

```js
// in a component that needs googleyolo

import { withGoogleyolo } from 'react-googleyolo'
// ...
import { authenticateWithYourBackend } from '../api'

class Header extends PureComponent {
  state = { isLoading: true }
  componentDidMount() {
    googleyolo.retrieve().then(
      credential => {
        this.setState({ isLoading: false })

        // imaginary method, where you hit your backend with the idToken
        // to verify it really is a valid and sign him in and get his object back
        authenticateWithYourBackend(credential.idToken).then(user => {
          this.setState(user)
        })
      },
      error => {
        this.setState({ isLoading: false })
      }
    )
  }

  render() {
    const { isLoading, user } = this.state
    if (isLoading) {
      return <div>Loading auth...</div>
    }

    if (user) {
      return <div>You are logged in as {user.firstName}</div>
    }

    // Imaginary component that signs you in
    // It probably also uses `googleyolo` to call `.hint()`!
    return <GoogleLogin />
  }
}

export default withGoogleyolo(Header)
```

We expose a `Provider`, which loads the `googleyolo` client library. All this came about because google didn't seem to be an npm package for it! The `Provider` simply puts the `googleyolo` object in the context for any component further down the tree to use.

We also expose a `withGoogleyolo` helper method to fish out `googleyolo` from the context, without you going into the hassle of defining context types.

But because defining a context type is all that "connect" method does, we also provide a `GoogleyoloShape` in case you are comfortable with your components using things straight out of context.

### Automatic Retrieval

In case the above seems like too much work, you may also provide a `clientId` string and an `onRetrieveSuccess` method to the `Provider`, and it will do the retrieve call for you, calling your method with the received credential!

```js
return (
  <YoloProvider
    clientId={process.env.REACT_APP_GOOGLE_CREDENTIALS_CLIENT_ID}
    onRetrieveSuccess={this.onRetrieveSuccess}
    onRetrieveFailure={this.onRetrieveFailure}
  >
    <Home />
  </YoloProvider>
)
```

### User Signout

Finally, we expose a `Logout` component you can customize to your heart's content. All it really does is `googleyolo.disableAutoSignIn()` for you on click and then call its `onAutoSignInDisabled` you optionally gave it.

```js
return <Logout />

// feel free to pass in children

return <Logout>Click here to logout forever</Logout>

// Or specify a different type of node if you don't want it to be a button

return <Logout node="span" />
```

[googleyolo]: https://developers.google.com/identity/one-tap/web/get-started 'I can only assume it stands for You Only Login Once'
