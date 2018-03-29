# React googleyolo

Simple googleyolo `Provider` and `withGoogleyolo` HOC-style method that fishes the library out of the context and passes it to the "connected" components as a prop.

[Googleyolo] is of course what google calls its smartlock / one-tap sign-up and sign-in library.

[Live demo here]!

![3 second demo][demo]

## Usage

Feel free to look at the source code for the simplest of examples!

You'll be using it somewhat like ...

```js
// somewhere near your app's entry point: index.js, app.js etc.

import { YoloProvider } from 'react-googleyolo'
// import YoloProvider from 'react-googleyolo' // also works
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
  state = { isLoading: false }

  retrieve = googleyolo =>
    googleyolo.retrieve().then(
      credential => {
        this.setState({ isLoading: false })

        // imaginary method, where you hit your backend with the idToken
        // to verify it really is valid, then sign them in and get their User object back
        authenticateWithYourBackend(credential.idToken).then(user => {
          this.setState(user)
        })
      },
      error => {
        this.setState({ isLoading: false })
      }
    )

  componentDidMount() {
    const { googleyolo } = this.props
    if (googleyolo) {
      this.setState({ isLoading: true })
      this.retrieve(googleyolo)
    }
  }

  componentDidUpdate(prevProps) {
    const { googleyolo } = this.props
    const { isLoading } = this.state

    if (googleyolo && !isLoading && !prevProps.googleyolo) {
      this.setState({ isLoading: true })
      this.retrieve(googleyolo)
    }
  }

  render() {
    const { isLoading, user } = this.state
    if (isLoading) {
      return <div>Loading auth...</div>
    }

    if (user) {
      return <div>You are logged in as {user.displayName}</div>
    }

    // Imaginary component that signs you in
    // It probably also uses `googleyolo` to call `.hint()`!
    return <GoogleLogin />
  }
}

export default withGoogleyolo(Header)
```

We expose a `Provider`, which loads the `googleyolo` client library. All this came about because google didn't seem to publish an npm package for it! The `Provider` then simply puts the `googleyolo` object in the context for any component further down the tree to use.

We also expose a `withGoogleyolo` helper method to fish out `googleyolo` from the context, without you going into the hassle of defining context types.

But because defining a context type is all that "connect" method does, we also provide a `GoogleyoloShape` in case you are comfortable with your components using things straight out of context.

### Automatic Retrieval

In case the above seems like too much work, you may also provide a `clientId` string and an `onRetrieveSuccess` method to the `Provider`. This will make it do the retrieve call for you, calling your method afterwards with the received credential!

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

We also expose a handy `Logout` component you can customize to your heart's content. All it really does is `googleyolo.disableAutoSignIn()` for you on click, and then call its `onAutoSignInDisabled` you optionally gave it.

```js
return <Logout />

// feel free to pass in children

return <Logout>Click here to logout forever</Logout>

// Or specify a different type of node if you don't want it to be a button

return <Logout node="span" />
```

### User Signin re-prompt

Finally and due to popular demand, we now offer a similar `Login` button. Give it a `clientId` and it will make Google's official login flow appear. You may also give it something to do `onLoginSuccess`, or error, making this component a bit of a cross between the `Provider` and the `Logout` button.

```js
return <Login clientId="iGotThisFromGoogle" />

// feel free to pass in children

return (
  <Login
    clientId={process.env.REACT_APP_GOOGLE_CREDENTIALS_CLIENT_ID}
    onRetrieveSuccess={this.onLoginSuccess}
    onLoginFailure={this.onRetrieveFailure}
  >
    Would you like to login?
  </Login>
)

// Or specify a different type of node if you don't want it to be a button

return <Login node="span" clientId="somanyapikeys" />
```

[live demo here]: https://react-googleyolo.netlify.com/ 'Automatically deploys on pushes on master'
[demo]: https://media.giphy.com/media/paM2Qm42krXGyB7RJs/giphy.gif 'https://react-googleyolo.netlify.com/'
[googleyolo]: https://developers.google.com/identity/one-tap/web/get-started 'I can only assume it stands for You Only Login Once'
