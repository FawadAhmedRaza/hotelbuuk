'use client';


import { AuthContext } from './auth-context';

export function AuthConsumer({ children }) {
  return (
    <AuthContext.Consumer>
      {(auth) => (auth.loading ? <>Loading...</> : children)}
    </AuthContext.Consumer>
  );
}
