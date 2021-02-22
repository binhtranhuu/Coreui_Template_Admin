import React from "react";
import { observer } from "mobx-react";
import { CButton, CCard, CCardFooter, CCol, CContainer, CRow } from "@coreui/react";

import RegisterForm from "src/components/register/RegisterForm";
import { useStore } from "src/stores/RootStore";
import { useHistory } from "react-router-dom";

const Register = observer(() => {
    const history = useHistory();

    const {userStore} = useStore();

    const handleRegister = async (formValues) => {
        const res = await userStore.register(formValues);
        if(res === 201) {
            alert("Register success")
            history.push("/login");
        } 
    };

    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="9" lg="7" xl="6">
                        <CCard className="mx-4">

                            <RegisterForm onSubmit={handleRegister} />

                            <CCardFooter className="p-4">
                                <CRow>
                                    <CCol xs="12" sm="6">
                                        <CButton className="btn-facebook mb-1" block>
                                            <span>facebook</span>
                                        </CButton>
                                    </CCol>
                                    <CCol xs="12" sm="6">
                                        <CButton className="btn-twitter mb-1" block>
                                            <span>twitter</span>
                                        </CButton>
                                    </CCol>
                                </CRow>
                            </CCardFooter>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
});

export default Register;
