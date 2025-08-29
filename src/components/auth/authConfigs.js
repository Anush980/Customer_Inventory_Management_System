const authConfigs ={

    login:{
    title: "Welcome Back",
    subTitle: "Sign in to your account",
    buttonText: "Sign In",
    dividerText:"or continue with",
    footerText: "Don't have an account?",
    switchLink: { text: "Register", to: "/register" }
},

register:{
    title: "Create Account",
    subTitle: "Get started with your free account",
    buttonText: "Create Account",
    dividerText:"or sign up with",
    footerText: "Already have an account?",
    switchLink: { text: "Sign in", to: "/login" }
},

reset:{
    title:"Reset Password",
    subTitle:"Create a new password",
    buttonText: "Create Account",
    footerText: "Remember your password?",
    switchLink: { text: "Sign in", to: "/login" }
}
}
export default authConfigs;