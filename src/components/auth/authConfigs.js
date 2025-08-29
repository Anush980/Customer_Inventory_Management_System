const authConfigs ={

    login:{
    title: "Welcome Back",
    subTitle: "Sign in to your account",
    fields: [
      { label: "Email Address", type: "email", placeholder: "Enter your Email" },
      { label: "Password", type: "password", placeholder: "Enter your Password" }
    ],
    buttonText: "Sign In",
    dividerText:"or continue with",
    footerText: "Don't have an account?",
    switchLink: { text: "Register", to: "/register" }
},

register:{
    title: "Create Account",
    subTitle: "Get started with your free account",
    fields: [
      { label: "Email Address", type: "email", placeholder: "Enter your Email" },
      { label: "Password", type: "password", placeholder: "Enter your Password" },
      { label: "Confirm Password", type: "password", placeholder: "Confirm your Password" }
    ],
    buttonText: "Create Account",
    dividerText:"or sign up with",
    footerText: "Already have an account?",
    switchLink: { text: "Sign in", to: "/login" }
}
,
reset:{
    title:"Reset Password",
    subTitle:"Create a new password",
    fields: [
      { label: "New Password", type: "password", placeholder: "Enter new Password" },
      { label: "Confirm Password", type: "password", placeholder: "Confirm your Password" }
    ],
    buttonText: "Create Account",
    footerText: "Remember your password?",
    switchLink: { text: "Sign in", to: "/login" }
}
}
export default authConfigs;