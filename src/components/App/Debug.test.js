import React from 'react'
import { shallow } from 'enzyme'

import Debug from './Debug'

it('renders without crashing', () => {
  const component = shallow(
    <Debug
      type="cascadeAppeal"
      message="Your imports should be sorted by character length"
    />
  )
  expect(component.length).toBe(1)
})
