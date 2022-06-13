enum QueryActionKind {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

interface QueryAction {
  type: QueryActionKind;
  payload: any;
}

interface QueryState {
  data: any;
  loading: false;
  error: string;
}

export const initialState = {
  data: undefined,
  loading: false,
  error: undefined,
};

export const reducer = (state: QueryState, action: QueryAction) => {
  const { type, payload } = action;
  switch (type) {
    case 'LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'SUCCESS':
      return {
        ...state,
        data: payload,
      };
    case 'ERROR':
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
