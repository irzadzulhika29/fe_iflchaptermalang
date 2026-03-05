export const rememberMe = (mail, pass, isRemember) => {
  var now = new Date();
  var time = now.getTime();
  time += 3600 * 1000;
  now.setTime(time);
  if (isRemember) {
    sessionStorage.setItem("pass", pass);
    sessionStorage.setItem("mail", mail);
    sessionStorage.setItem("isRemember", isRemember);
  }
};
