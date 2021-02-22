import React from "react";
// import PropTypes from "prop-types";
import { CCard, CCardBody, CRow, CCol, CButton, CAlert } from "@coreui/react";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "../custom_field/InputField";
import { observer } from "mobx-react";
import { useStore } from "src/stores/RootStore";
import Loading from "../loading/Loading";

// LoginForm.propTypes = {
//     onSubmit: PropTypes.func,
// };

// LoginForm.defaultProps = {
//     onSubmit: null,
// };

const LoginForm = observer(({ onSubmit }) => {
    const { userStore } = useStore();
    const loading = userStore.loading;
    const error = userStore.error;

    const initialValues = {
        email: "khanh@gmail.com",
        password: "khanh123456",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Email must be a valid email").required("This field is require"),
        password: Yup.string()
            .min(6, "Password is too short - should be 6 chars minimum.")
            .max(16, "Password is too long - should be 6-16 chars minimum.")
            .required("This field is require"),
    });

    return (
        <CCard className="p-4">
            <CCardBody>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {(formikProp) => {
                        return (
                            <Form>
                                <h1>Login</h1>
                                <p className="text-muted">Sign In to your account</p>

                                {error && <CAlert color="danger">{error}</CAlert>}

                                <FastField
                                    name="email"
                                    component={InputField}
                                    type="text"
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

                                <CRow>
                                    <CCol xs="6">
                                        <CButton type="submit" color="primary" className="px-4">
                                            {loading ? <Loading /> : "Login"}
                                        </CButton>
                                    </CCol>
                                    <CCol xs="6" className="text-right">
                                        <CButton color="link" className="px-0">
                                            Forgot password?
                                        </CButton>
                                    </CCol>
                                </CRow>
                            </Form>
                        );
                    }}
                </Formik>
            </CCardBody>
        </CCard>
    );
});

export default LoginForm;
