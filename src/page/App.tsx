import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Home from '@Component/Home';

import compose from '@Helpers/compose';
import { action } from '@Redux/index';

// import compose from '../helpers/compose';

// import Home from '../component/Home';

const App = (props) => {
  console.log('app props', props);

  const { fetchVerifyToken } = props;

  useEffect(() => {
    fetchVerifyToken();
  }, []);

  return (
    <div>
      Typescript App
      <Home />
    </div>
  );
};

const mapStateToProps = (state) => ({ ...state });

const mapDispatchToProps = (dispatch) => {
  const {
    fetchVerifyToken,
  } = action;

  return {
    ...bindActionCreators({
      fetchVerifyToken,
    }, dispatch),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(App);
