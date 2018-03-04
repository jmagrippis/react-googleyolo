import React from 'react'
import { shallow } from 'enzyme'

import { Logout } from './Logout'
import warnIfNotProd from '../warnIfNotProd'

jest.mock('../warnIfNotProd', () => jest.fn())

describe('Logout', () => {
  let component

  beforeEach(() => {
    component = shallow(<Logout />)
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
    component.setProps({ onAutoSignInDisabled: jest.fn() })

    expect(component.prop('onAutoSignInDisabled')).toBeUndefined()
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
        hint: jest.fn(),
        retrieve: jest.fn(),
        cancelLastOperation: jest.fn(),
        disableAutoSignIn: jest.fn(() => Promise.resolve('result!')),
      }
      component.setProps({ googleyolo })
    })

    it('calls `disableAutoSignIn` of its googleyolo when clicked', () => {
      component.simulate('click')

      expect(googleyolo.disableAutoSignIn).toBeCalled()
    })

    it('calls its `onAutoSignInDisabled` with the acquired credential once the promise resolves', async () => {
      const onAutoSignInDisabled = jest.fn()

      component.setProps({ onAutoSignInDisabled })

      await component.simulate('click')

      expect(onAutoSignInDisabled).toBeCalledWith('result!')
    })

    it('calls its `onLogoutError` with the acquired credential if the promise rejects', async () => {
      googleyolo.disableAutoSignIn.mockReturnValue(Promise.reject('wrecked!'))

      const onLogoutError = jest.fn()

      component.setProps({ onLogoutError })

      await component.simulate('click')

      expect(onLogoutError).toBeCalledWith('wrecked!')
    })
  })
})
