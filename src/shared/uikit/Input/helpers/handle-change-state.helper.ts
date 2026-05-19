import type { HandleChangeStateArgs } from '../interfaces';

export const handleChangeState = ({ e, state, setState }: HandleChangeStateArgs) => {
  const { name, value } = e.target;
  setState({
    ...state,
    [name]: value,
  });
};
