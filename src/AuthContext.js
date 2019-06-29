import React from 'react';
import axios from 'axios';
const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      userId: null,
    };
  }

  login = async () => {
    try {
      const user = await axios.get('/api/auth/me');
      this.setState(
        {
          isAuth: true,
          userId: Number(user.data.user),
        },
        () => {
          console.log(user.data.user);
        },
      );
    } catch (err) {
      console.error(err);
    }
  };

  logout = async () => {
    this.setState(
      {
        isAuth: false,
        userId: null,
      },
      async () => await axios.post('/api/users/logout'),
    );
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          userId: this.state.userId,
          login: this.login,
          logout: this.logout,
        }}
      >
        {' '}
        {this.props.children}{' '}
      </AuthContext.Provider>
    );
  }
}

export { AuthProvider };
export default AuthContext;
