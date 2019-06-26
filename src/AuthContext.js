import React from 'react';

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      userId: null,
    };
  }

  login = async userId => {
    await this.setState({
      isAuth: true,
      userId,
    });
  };

  logout = () => {
    this.setState({
      isAuth: false,
      userId: null,
    });
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
