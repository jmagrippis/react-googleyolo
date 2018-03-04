import warnIfNotProd from './warnIfNotProd'

describe('warnIfNotProd', () => {
  const ogConsoleWarn = console.warn
  const ogNodeEnv = process.env.NODE_ENV

  beforeEach(() => {
    console.warn = jest.fn()
  })

  afterAll(() => {
    console.warn = ogConsoleWarn
    process.env.NODE_ENV = ogNodeEnv
  })

  it('`console.warn`s with the given message if the environment is not production', () => {
    warnIfNotProd('Check yourself...')

    expect(console.warn).toBeCalledWith('Check yourself...')

    warnIfNotProd('...before you wreck yourself.')

    expect(console.warn).toBeCalledWith('...before you wreck yourself.')
  })

  it('does not warn if the environment is production', () => {
    process.env.NODE_ENV = 'production'

    warnIfNotProd('Check yourself...')

    expect(console.warn).not.toBeCalledWith()
  })
})
