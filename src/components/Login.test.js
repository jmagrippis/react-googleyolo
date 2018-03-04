import React from 'react'
import { shallow } from 'enzyme'

import { Login } from './Login'
import warnIfNotProd from '../warnIfNotProd'

jest.mock('../warnIfNotProd', () => jest.fn())

describe('Login', () => {
  let component

  beforeEach(() => {
    component = shallow(<Login clientId="myToken.apps.com" />)
  })

  it('renders without crashing', () => {
    expect(component).toBeDefined()
  })

  it('renders a custom root node', () => {
    expect(component.type()).toBe('button')

    component.setProps({ node: 'div' })

    expect(component.type()).toBe('div')
  })

  it('allows for custom React components as root nodes', () => {
    const MyFancyButton = props => (
      <li {...props}>
        <span>click here</span>
      </li>
    )

    component.setProps({ node: MyFancyButton })

    expect(component.type()).toBe(MyFancyButton)
  })

  it('spreads custom props to the root component', () => {
    component.setProps({ random: 'prop', answer: 42 })

    expect(component.prop('random')).toBe('prop')
    expect(component.prop('answer')).toBe(42)
  })

  it('consumes the props it needs for itself', () => {
    expect(component.prop('clientId')).toBeUndefined()

    component.setProps({ onLoginSuccess: jest.fn() })

    expect(component.prop('onLoginSuccess')).toBeUndefined()
  })

  it('does not break if clicked before `googleyolo` is available, but calls to warn', () => {
    expect(() => {
      component.simulate('click')
    }).not.toThrow()

    expect(warnIfNotProd).toBeCalledWith(
      'googleyolo not defined; maybe the library is not loaded yet?'
    )
  })

  describe('onClick', () => {
    let googleyolo

    beforeEach(() => {
      googleyolo = {
        hint: jest.fn(() => Promise.resolve('credential!')),
        retrieve: jest.fn(),
        cancelLastOperation: jest.fn(),
        disableAutoSignIn: jest.fn(),
      }
      component.setProps({ googleyolo })
    })

    it('calls `hint` of its googleyolo when clicked, with a specific payload according to its props', () => {
      component.simulate('click')

      expect(googleyolo.hint).toBeCalledWith({
        supportedAuthMethods: [
          'googleyolo://id-and-password',
          'https://accounts.google.com',
        ],
        supportedIdTokenProviders: [
          { clientId: 'myToken.apps.com', uri: 'https://accounts.google.com' },
        ],
      })

      const supportedAuthMethods = ['facebook.questionmark']
      component.setProps({ supportedAuthMethods, clientId: 'some-id' })

      component.simulate('click')

      expect(googleyolo.hint).toBeCalledWith({
        supportedAuthMethods,
        supportedIdTokenProviders: [
          { clientId: 'some-id', uri: 'https://accounts.google.com' },
        ],
      })
    })

    it('calls its `onLoginSuccess` with the acquired credential once the promise resolves', async () => {
      const onLoginSuccess = jest.fn()

      component.setProps({ onLoginSuccess })

      await component.simulate('click')

      expect(onLoginSuccess).toBeCalledWith('credential!')
    })

    it('calls its `onLoginError` with the acquired credential if the promise rejects', async () => {
      googleyolo.hint.mockReturnValue(Promise.reject('wrecked!'))

      const onLoginError = jest.fn()

      component.setProps({ onLoginError })

      await component.simulate('click')

      expect(onLoginError).toBeCalledWith('wrecked!')
    })
  })
})
