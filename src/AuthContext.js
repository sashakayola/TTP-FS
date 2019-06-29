import React from 'react';
import axios from 'axios';
const AuthContext = React.createContext();

// context to authorize user (login & logout)
class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      userId: null,
    };
  }

  // see if the user is authorized
  authorize = async () => {
    try {
      let user = await axios.get('/api/auth/me');
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

  // log out user & set authorized to false
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
          authorize: this.authorize,
          logout: this.logout,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export { AuthProvider };
export default AuthContext;
