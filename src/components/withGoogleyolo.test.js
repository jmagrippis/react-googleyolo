import React from 'react'
import { shallow } from 'enzyme'

import withGoogleyolo from './withGoogleyolo'

describe('withGoogleYolo', () => {
  it('returns the given component', () => {
    const Awesome = () => <div>Awesome!</div>
    const WrappedAwesome = withGoogleyolo(Awesome)
    const component = shallow(<WrappedAwesome />)

    expect(component.type()).toBe(Awesome)
  })

  it('spreads given props to the root component', () => {
    const Awesome = props => <div {...props}>Awesome!</div>
    const WrappedAwesome = withGoogleyolo(Awesome)
    const props = { onClick: jest.fn(), 'data-hello': 'world' }

    const component = shallow(<WrappedAwesome {...props} />)

    expect(component.prop('onClick')).toBe(props.onClick)
    expect(component.prop('data-hello')).toBe('world')
  })

  it('takes googleyolo from the context and passes it as a prop', () => {
    const googleyolo = {
      hint: jest.fn(),
      retrieve: jest.fn(),
      cancelLastOperation: jest.fn(),
      disableAutoSignIn: jest.fn(() => Promise.resolve('result!')),
    }

    const Awesome = props => <div {...props}>Awesome!</div>
    const WrappedAwesome = withGoogleyolo(Awesome, { context: { googleyolo } })

    const component = shallow(<WrappedAwesome />, { context: { googleyolo } })

    expect(component.prop('googleyolo')).toBe(googleyolo)
  })
})
