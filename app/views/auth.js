import { fragments } from "./errors.js";

export function loginFormView({type = "student", errors = { username: {}, password: {} } }) {
    const isStudent = type === "student";

    const { username, password } = fragments(errors);

    return `
    <section aria-labelledby="login-heading" class="center">
        <h2 id="login-heading">Sign in to your ${isStudent ? "student" : "admin"} account</h2>
        <form method="POST" class="auth">
           <div class="auth-toggle">
             <a href="/student-login" class="${isStudent ? "active" : ""}">Student</a>
             <a href="/admin-login" class="${!isStudent ? "active" : ""}">Admin</a>
           </div>

           <label for="username">Username: </label>
           <div class="input-group">
             <input id="username" name="username"${username.value}>
             ${username.message}
           </div>

           <label for="password">Password: </label>
           <div class="input-group">
             <input id="password" name="password" type="password"${password.value}>
             ${password.message}
           </div>

           <button>Sign in</button>
        </form>

        ${
            isStudent ?
            `<p>Don't have an account? <a href="/sign-up">Sign up here</a></p>`
            : ""
        }
    </section>
    `
}


export function signUpView({ errors = { username: {}, password: {} } }) {
    const { username, password } = fragments(errors);

    return `
    <section aria-labelledby="register-heading" class="center">
        <h2 id="register-heading">Create an account</h2>
        <p>Already have an account? <a href="/student-login">Sign in here</a></p>
        <form method="POST" class="auth">
           <label for="username">Username: </label>
           <div class="input-group">
             <input id="username" name="username"${username.value}>
             ${username.message}
           </div>

           <label for="password">Password: </label>
           <div class="input-group">
             <input id="password" name="password" type="password"${password.value}>
             ${password.message}
           </div>
           
           <label for="confirm">Confirm Password: </label>
           <input id="confirm" type="password">
           <button>Sign up</button>
        </form>
        <script type="module" src="/assets/confirmPassword.js"></script>
    </section>
    `
}