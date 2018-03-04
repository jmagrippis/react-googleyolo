import React from 'react'
import { shallow } from 'enzyme'

import Info from './Info'

it('renders without crashing', () => {
  const component = shallow(<Info setCredential={jest.fn()} />)
  expect(component.length).toBe(1)
})
