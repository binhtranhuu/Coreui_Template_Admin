import { CAlert, CButton, CCardBody } from "@coreui/react";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import React from "react";
import InputField from "../custom_field/InputField";
import { observer } from "mobx-react";
import { useStore } from "src/stores/RootStore";
import Loading from "../loading/Loading";

const RegisterForm = observer(({ onSubmit }) => {
    const { userStore } = useStore();
    const { loading, error } = userStore;

    const initialValues = {
        name: "khanh",
        email: "khanh@gmail.com",
        password: "khanh123456",
        confirm_password: "khanh123456",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("This field is require"),

        email: Yup.string().email("Email must be a valid email").required("This field is require"),

        password: Yup.string()
            .required("This field is require")
            .min(6, "Password is too short - should be 6 chars minimum.")
            .max(16, "Password is too long - should be 6-16 chars minimum.")
            .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
        confirm_password: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {(formikProps) => {
                return (
                    <CCardBody className="p-4">
                        <Form>
                            <h1>Register</h1>
                            <p className="text-muted">Create your account</p>

                            {error && <CAlert color="danger">{error}</CAlert>}

                            <FastField
                                name="name"
                                component={InputField}
                                type="text"
                                placeholder="Username"
                                iconClass="cil-user"
                            />

                            <FastField
                                name="email"
                                component={InputField}
                                type="email"
                                placeholder="Email"
                                iconClass="cil-paper-plane"
                            />

                            <FastField
                                name="password"
                                component={InputField}
                                type="password"
                                placeholder="Password"
                                iconClass="cil-lock-locked"
                            />

                            <FastField
                                name="confirm_password"
                                component={InputField}
                                type="password"
                                placeholder="Repeat password"
                                iconClass="cil-lock-locked"
                            />

                            <CButton type="submit" color="success" block>
                                {loading ? <Loading /> : "Create Account"}
                            </CButton>
                        </Form>
                    </CCardBody>
                );
            }}
        </Formik>
    );
});

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};

RegisterForm.defaultProps = {
    onSubmit: null,
};

export default RegisterForm;
