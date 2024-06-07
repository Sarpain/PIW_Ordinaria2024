
const Logout = () => {
    const onLogOut = () => {
      document.cookie = "auth=; path=/;";
      window.location.href = "/login";
    };
  
    return <a onClick={onLogOut} >Logout</a>;
  };
  
  export default Logout;