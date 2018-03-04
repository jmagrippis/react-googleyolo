import React from 'react'
import { mount } from 'enzyme'

import App from './App'

it('renders without crashing', () => {
  const component = mount(<App />)
  expect(component).toBeDefined()
})
