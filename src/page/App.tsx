import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Home from '@Component/Home';

import compose from '@Helpers/compose';
import { action } from '@Redux/index';

const AppWrapper = styled.div`
  color: #F77;
`;

const App = (props) => {
  console.log('app props', props);

  const { fetchVerifyToken } = props;

  useEffect(() => {
    fetchVerifyToken();
  }, []);

  return (
    <AppWrapper>
      Typescript App
      <Home />
    </AppWrapper>
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
