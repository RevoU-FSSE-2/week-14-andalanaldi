import * as yup from 'yup'

export const initialValues = {
    email: '',
    password: ''
}

export const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string()
                 .required()
                 .min(8, 'Password is too short - should be 8 characters at least.')
                //  .matches(/^(?=.*\d)(?=.*[a-zA-Z]).+$/, 'Password can only contain latin letters & numbers.')
})