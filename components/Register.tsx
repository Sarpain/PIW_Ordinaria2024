import { FunctionComponent } from "preact";

type Props = {
  message?: string;
};


const Register:FunctionComponent<Props> = ({ message }) => (
  <div>
    <h2>Register</h2>
    {message &&
      <p>{message}</p>}
    <form action="/register" method="POST">
      <label for="name">Full Name</label>
      <input type="text" id="name" name="name" required />
      <label for="email">Email</label>
      <input type="text" id="email" name="email" required />
      <label for="password">Password</label>
      <input type="password" id="password" name="password" required />
      <button type="submit">Register</button>
      <p>
        Already have account? <a href="/login">Login</a>
      </p>
    </form>
  </div>
);

export default Register;
