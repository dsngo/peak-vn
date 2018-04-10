import combineReducers from 'redux/es/combineReducers';

const DEFAULT_STATE = {
  siteStatus: '',
};

const siteStatus = () => DEFAULT_STATE.siteStatus;

export default combineReducers({ siteStatus });
