import decode from 'jwt-decode';

// takes care of leavign remnant data
class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    // use type coersion to check if token is NOT undefined and the token is NOT expired
    // converts to boolean
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      // if expiration is less than current date
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      //if error return false
      return false;
    }
  }
  //get from local storage
  getToken() {
    return localStorage.getItem('id_token');
  }

  //save to localstorage
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  // remove from localstorage
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/'); // reset application
  }
}

export default new AuthService();
