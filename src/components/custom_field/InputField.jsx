import React from "react";
import PropTypes from "prop-types";
import {
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CInvalidFeedback,
    CLabel,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { ErrorMessage } from "formik";

InputField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,

    iconClass: PropTypes.string,
};

InputField.defaultProps = {
    type: "text",
    label: "",
    placeholder: "",
    disabled: false,

    iconClass: "",
};

function InputField(props) {
    const { field, form, type, label, placeholder, disabled, iconClass } = props;
    const { name } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    return (
        <>
            {label && <CLabel htmlFor="text-input">{label}</CLabel>}
            <CInputGroup className="mb-3">
                {iconClass && (
                    <CInputGroupPrepend>
                        <CInputGroupText>
                            <CIcon name={iconClass} />
                        </CInputGroupText>
                    </CInputGroupPrepend>
                )}
                <CInput
                    type={type}
                    placeholder={placeholder}
                    autoComplete={name}
                    disabled={disabled}
                    {...field}
                    invalid={showError === undefined ? false : true}
                />

                <ErrorMessage name={name} component={CInvalidFeedback} />
            </CInputGroup>
        </>
    );
}

export default InputField;
