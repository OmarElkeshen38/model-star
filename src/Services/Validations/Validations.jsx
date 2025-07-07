import { useTranslation } from "react-i18next";

export const getEmailValidation = (t) => ({
    required: t('validations.email_required'),
    pattern: {
        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        message: t('validations.email_invalid'),
    }
});

export const getNameValidation = (t) => ({
    required: t('validations.name_required'),
    minLength: {
        value: 4,
        message: t('validations.name_min'),
    },
    pattern: {
        value: /^[a-zA-Z0-9]+([a-zA-Z0-9]|\s)*$/,
        message: t('validations.name_pattern'),
    }
});

export const getPhoneValidation = (t) => ({
    required: t('validations.phone_required'),
    pattern: {
        value: /^01[0-9]{9}$/,
        message: t('validations.phone_invalid'),
    }
});


export const getPasswordValidation = (t) => ({
    required: {
        value: true,
        message: t('validations.password_required')
    },
    // minLength: {
    //     value: 8,
    //     message: t('validations.password_min'),
    // },
    // pattern: {
    //     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?:{}|<>])/,
    //     message: t('validations.password_pattern'),
    // }
});