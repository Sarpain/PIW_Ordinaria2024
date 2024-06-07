import { FunctionComponent } from "preact";

type Props = {
  message?: string;
};

const Login: FunctionComponent<Props> = ({ message }) => (
  <div>
    <h2>
      Login
    </h2>
    {message &&
      <p>{message}</p>}
    <form method="POST" action="/login" class={"Login-panel"}>
      <label for="email">Email</label>
      <input type="text" id="email" name="email" required />
      <label for="password">Password</label>
      <input type="password" id="password" name="password" required />
      <button type="submit">Login</button>
      <p>
        Don't have account? <a href="/register">Register</a>
      </p>
    </form>
  </div>
);

export default Login;
