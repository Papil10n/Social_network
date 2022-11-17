import React from "react";
import {reduxForm} from "redux-form";
import {createField, Input} from "../common/Forms/Forms";
import {required} from "../../utils/Validators/validator";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import style from "./../common/Forms/Forms.module.css"

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField("Email", 'email', [required], Input)}
            {createField("Password", 'password', [required], Input, {type: 'password'})}
            {createField("null", 'rememberMe', [], Input, {type: 'checkbox'}, 'Remember me')}

            { captchaUrl && <img src={captchaUrl}/>}
            { captchaUrl && createField("Symbols from image", 'captcha', [required], Input, {})}

            {error && <div className={style.formSummaryError}>{error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (props.isAuth) {
        return <Navigate to={"/profile"}/>
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
})

export default connect(mapStateToProps, {login})(Login)