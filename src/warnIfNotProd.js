function warnIfNotProd(warning) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(warning)
  }
}

export default warnIfNotProd
