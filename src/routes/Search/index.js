import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'search',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Container = require('./containers/SearchContainer').default
      const reducer = require('./modules/counter').default

      injectReducer(store, { key: 'bart', reducer })

      /*  Return getComponent   */
      cb(null, Container)

    /* Webpack named bundle   */
    }, 'search')
  }
})
