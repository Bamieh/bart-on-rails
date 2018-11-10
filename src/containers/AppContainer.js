import React, { Component, PropTypes } from 'react'
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import registerEvents from 'serviceworker-webpack-plugin/lib/browser/registerEvents';
import applyUpdate from 'serviceworker-webpack-plugin/lib/browser/applyUpdate';

import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'

const propTypes = {
  routes : PropTypes.object.isRequired,
  store  : PropTypes.object.isRequired
}
class AppContainer extends Component {
  componentDidMount() {
    console.log('the main JS thread was loaded');
    if ('serviceWorker' in navigator && (window.location.protocol === 'https:' ||
      window.location.hostname === 'localhost')
    ) {
      console.log('ok..')
      const registration = runtime.register({Scope: '/'});

      registerEvents(registration, {
        onInstalled: () => {
          console.log('a new serviceworker was installed');
        },
        onUpdateReady: () => {
          console.log('a new serviceworker update is ready');
        },
        onUpdating: () => {
          console.log('a new serviceworker is updating');
        },
        onUpdateFailed: () => {
          console.log('a new serviceworker update failed');
        },
        onUpdated: () => {
          console.log('a new serviceworker was updated');
        },
      });
    } else {
      console.log('serviceWorker not available');
    }
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={browserHistory} children={routes} />
        </div>
      </Provider>
    )
  }
}
AppContainer.propTypes = propTypes;

export default AppContainer
