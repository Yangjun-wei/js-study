import routes from './routes';

export default {
  base: '/',
  publicPath: '/static/',
  hash: false,
  history: {
    type: 'browser',
  },
  routes,
};
