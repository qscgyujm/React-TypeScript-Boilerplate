import { bindActionCreators, Dispatch } from 'redux';

import { action } from '@Redux/index';

interface State {
  dataList: any[];
  isError: boolean;
  isFetching: boolean;
}

export const mapStateToProps = (state: State) => ({ ...state });

export const mapDispatchToProps = (dispatch: Dispatch) => {
  const {
    fetchAPI,
  } = action;

  return {
    ...bindActionCreators({
      fetchAPI,
    }, dispatch),
  };
};

type ReduxConnectedProps = (
  ReturnType<typeof mapStateToProps>
  & ReturnType<typeof mapDispatchToProps>
)

export type AppProps = Pick<ReduxConnectedProps,
  'dataList'
  | 'isError'
  | 'isFetching'
  | 'fetchAPI'>;
