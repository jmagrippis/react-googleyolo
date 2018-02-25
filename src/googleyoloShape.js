import PropTypes from 'prop-types'

const GoogleyoloShape = PropTypes.shape({
  retrieve: PropTypes.func.isRequired,
  cancelLastOperation: PropTypes.func.isRequired,
  hint: PropTypes.func.isRequired,
  disableAutoSignIn: PropTypes.func.isRequired,
})

export default GoogleyoloShape
