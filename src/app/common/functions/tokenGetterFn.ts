export function tokenGetterFn() {
  const token = JSON.parse(localStorage.getItem('currentUser'));
  if (token === null) {
    return null;
  }
  else
    return token['accessToken'];
}

