export function loginFormView(type = "student") {
    const isStudent = type === "student";

    return `
    <section aria-labelledby="login-heading" class="center">
        <h2 id="login-heading">Sign in to your ${isStudent ? "student" : "admin"} account</h2>
        <form class="auth">
           <div class="auth-toggle">
             <a href="/login" class="${isStudent ? "active" : ""}">Student</a>
             <a href="/admin-login" class="${!isStudent ? "active" : ""}">Admin</a>
           </div>

           <label for="username">Username: </label>
           <input id="username" name="username">
           <label for="password">Password: </label>
           <input id="password" name="password" type="password">
           <button>Sign in</button>
        </form>

        ${
            isStudent ?
            `<p>Don't have an account? <a href="/register">Sign up here</a></p>`
            : ""
        }
    </section>
    `
}


export function registrationFormView() {
    return `
    <section aria-labelledby="register-heading" class="center">
        <h2 id="register-heading">Create an account</h2>
        <p>Already have an account? <a href="/login">Sign in here</a></p>
        <form class="auth">
           <label for="username">Username: </label>
           <input id="username" name="username">
           <label for="password">Password: </label>
           <input id="password" name="password" type="password">
           <label for="confirm">Confirm Password: </label>
           <input id="confirm" type="password">
           <button>Sign up</button>
        </form>
    </section>
    `
}