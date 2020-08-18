import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import compose from '@Helpers/compose';

import Home from '@Component/App/view/Home';

import { mapStateToProps, mapDispatchToProps, AppProps } from './ts';

const Index: React.FC<AppProps> = (props) => {
  const { fetchAPI } = props;

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div>
      Typescript App
      <Home />
    </div>
  );
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Index);
