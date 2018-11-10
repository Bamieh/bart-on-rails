import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'schedule/:arrivalStation/:destinationStation/:stamp',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Schedule = require('./containers/ScheduleContainer').default
      const reducer = require('./modules/scheduleReducer').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'schedule', reducer })

      /*  Return getComponent   */
      cb(null, Schedule)

    /* Webpack named bundle   */
    }, 'schedule')
  }
})
