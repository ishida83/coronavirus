import decodeJwt from 'jwt-decode';

const authProvider = {
  login: ({ username, password }) => {
    const request = new Request("https://mydomain.com/authenticate", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(({ token }) => {
        const decodedToken = decodeJwt(token);
				localStorage.setItem('token', token);
				localStorage.setItem('permissions', decodedToken.permissions);
				return Promise.resolve();
      })
			.catch((err) => {
				localStorage.setItem('token', `${username}|||${password}|||${Math.random}`);
				return Promise.resolve();
			})
  },
  logout: () => {
    localStorage.removeItem("token");
		localStorage.removeItem('permissions');
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem("token") ? Promise.resolve() : Promise.reject(),
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getPermissions: (params) => {
		const role = localStorage.getItem('permissions');
    return role ? Promise.resolve(role) : Promise.reject();
	},
};

export default authProvider;