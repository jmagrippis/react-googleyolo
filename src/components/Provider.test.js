import React from 'react'
import { shallow } from 'enzyme'

import Provider from './Provider'

describe('Provider', () => {
  let component
  let RestOfMyApp

  beforeEach(() => {
    RestOfMyApp = () => <div>Hello, world!</div>
    component = shallow(
      <Provider>
        <RestOfMyApp />
      </Provider>
    )
  })

  it('renders without crashing', () => {
    expect(component).toBeDefined()
  })

  it('renders the given child', () => {
    expect(component.find(RestOfMyApp).length).toBe(1)
  })

  it('adds a script to load the googleyolo library', () => {
    expect(
      document.querySelector(
        'script[src="https://smartlock.google.com/client"]'
      )
    ).not.toBeNull()
  })

  describe('onGoogleYoloLoad', () => {
    it('puts the given `googleyolo` into its state', () => {
      const googleyolo = { i: { will: { be: 'an object' } } }
      component.instance().onGoogleYoloLoad(googleyolo)
      expect(component.state('googleyolo')).toBe(googleyolo)
    })

    it('does not delegate to retrieve when it does not have a clientId', () => {
      const googleyolo = {}
      const retrieveMock = jest.fn()
      component.setProps({
        onRetrieveSuccess: jest.fn(),
        onRetrieveError: jest.fn(),
      })
      component.instance().retrieve = retrieveMock

      component.instance().onGoogleYoloLoad(googleyolo)

      expect(retrieveMock).not.toBeCalled()
    })

    it('does not delegate to retrieve when it does not have something to do after', () => {
      const googleyolo = {}
      const retrieveMock = jest.fn()
      component.instance().retrieve = retrieveMock

      component.setProps({ clientId: 'abc' })
      component.instance().onGoogleYoloLoad(googleyolo)

      expect(retrieveMock).not.toBeCalled()
    })

    it('delegates to retrieve when it has a clientId and something to do after', () => {
      const googleyolo = {}
      const retrieveMock = jest.fn()
      component.setProps({
        clientId: 'abc',
        onRetrieveSuccess: jest.fn(),
      })
      component.instance().retrieve = retrieveMock

      component.instance().onGoogleYoloLoad(googleyolo)

      expect(retrieveMock).toBeCalledWith(googleyolo)

      retrieveMock.mockClear()
      component.setProps({
        onRetrieveSuccess: undefined,
        onRetrieveError: jest.fn(),
      })

      component.instance().onGoogleYoloLoad(googleyolo)

      expect(retrieveMock).toBeCalledWith(googleyolo)
    })
  })

  describe('retrieve', () => {
    it('calls `googleyolo.retrieve` according to its props', () => {
      const googleyolo = { retrieve: jest.fn(() => Promise.resolve()) }
      const supportedAuthMethods = ['google!']
      component.setProps({ supportedAuthMethods, clientId: 'abc' })

      component.instance().retrieve(googleyolo)

      expect(googleyolo.retrieve).toBeCalledWith({
        supportedAuthMethods,
        supportedIdTokenProviders: [
          { clientId: 'abc', uri: 'https://accounts.google.com' },
        ],
      })
    })

    it('calls its `onRetrieveSuccess` with what the promise resolves to', async () => {
      const credential = { displayName: 'Charge Blade OP' }
      const googleyolo = {
        retrieve: jest.fn(() => Promise.resolve(credential)),
      }
      const onRetrieveSuccess = jest.fn()
      component.setProps({ onRetrieveSuccess })

      await component.instance().retrieve(googleyolo)

      expect(onRetrieveSuccess).toBeCalledWith(credential)
    })

    it('does not crash if it does not have an `onRetrieveSuccess`', async () => {
      const googleyolo = { retrieve: jest.fn(() => Promise.resolve()) }

      const result = await component.instance().retrieve(googleyolo)

      expect(result).toBeUndefined()
    })

    it('calls its `onRetrieveSuccess` with what the promise resolves to', async () => {
      const err = { type: 'noCredentialsAvailable' }
      const googleyolo = { retrieve: jest.fn(() => Promise.reject(err)) }
      const onRetrieveError = jest.fn()
      component.setProps({ onRetrieveError })

      await component.instance().retrieve(googleyolo)

      expect(onRetrieveError).toBeCalledWith(err)
    })

    it('does not crash if it does not have an `onRetrieveSuccess`', async () => {
      const googleyolo = { retrieve: jest.fn(() => Promise.reject()) }

      const result = await component.instance().retrieve(googleyolo)

      expect(result).toBeUndefined()
    })
  })
})
