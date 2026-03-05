const reloadPage = (time, url) => {
  if (url) {
    setTimeout(() => {
      window.location.href = url;
    }, time);
  } else {
    setTimeout(() => {
      window.location.reload();
    }, time);
  }
};
export default reloadPage;
