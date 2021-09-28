import React, { ReactNode, FC, useContext } from 'react';
import Login from '../pages/Login';
import { sessionContext } from '../App';

type Props = {
    children:ReactNode,
};

const AuthContainer: FC<Props> = ({ children }) => {
    const session = useContext(sessionContext);
    return (
      <>
        {
          !session
          ? <Login />
          : <>{ children }</>
      }
      </>
    );
};

export default AuthContainer;
