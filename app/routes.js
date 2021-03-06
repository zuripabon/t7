// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  const routes = [
    // {
    //   path: '/',
    //   onEnter: (nextState, replace) => replace('/ws')
    // },
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        System.import('containers/HomePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      }
    },
    {
      path: '/workspace',
      name: 'workspace',
      getComponent(nextState, cb) {
        System.import('containers/WorkSpace')
          .then(loadModule(cb))
          .catch(errorLoading);
      }
    },
    // {
    //   path: '/notebook',
    //   name: 'notebook',
    //   // Remove redirection in line below when setting a default notebook page
    //   // onEnter: (nextState, replace) => replace('/notebook/js'),
    //   getComponent(nextState, cb) {
    //     System.import('containers/NotebookPage')
    //       .then(loadModule(cb))
    //       .catch(errorLoading);
    //   },
    //   childRoutes: [
    //     {
    //       path: '/notebook/js',
    //       name: 'notebook_js',
    //       getComponent(nextState, cb) {
    //         System.import('containers/NotebookPageJS')
    //           .then(loadModule(cb))
    //           .catch(errorLoading);
    //       },
    //     }
    //   ]
    // },
    // {
    //   path: '/',
    //   name: 'home',
    //   getComponent(nextState, cb) {
    //     const importModules = Promise.all([
    //       System.import('containers/HomePage/reducer'),
    //       System.import('containers/HomePage/sagas'),
    //       System.import('containers/HomePage'),
    //     ]);
    //
    //     const renderRoute = loadModule(cb);
    //
    //     importModules.then(([reducer, sagas, component]) => {
    //
    //       injectReducer('home', reducer.default);
    //       injectSagas(sagas.default);
    //
    //       renderRoute(component);
    //     });
    //
    //     importModules.catch(errorLoading);
    //   },
    // },
    {
      path: '/features',
      name: 'features',
      getComponent(nextState, cb) {
        System.import('containers/FeaturePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
  //@todo this is just to check if running in electron or not (remove if it should go in a differetn file)
  if(process.env.NODE_ENV === 'desktop') routes.pop();
  return routes;
}
