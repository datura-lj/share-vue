export default  {
  getTime (state, n) {
    const timer = setInterval(function(){
      n ++;
      state.timeNow = new Date(parseInt(n) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ').substring(10);
    },1000);
  }
};
