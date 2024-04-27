export function phoneIsValid(phone: string) {
  var phoneFormat =
    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
  if (phone.match(phoneFormat)) {
    return true;
  } else {
    return false;
  }
}
export function mailIsValid(email: string) {
  var mailformat =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(mailformat)) {
    return true;
  } else {
    return false;
  }
}
