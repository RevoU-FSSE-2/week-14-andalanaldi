import { Button, Card, Input, Typography } from "antd"
import { useFormik } from "formik"
import { LoginForm as LoginFormProps } from "../../types"
import { initialValues, validationSchema } from "./loginFormSchema"
import { useNavigate } from "react-router-dom";

interface Props {
    onSubmit: (values: LoginFormProps) => void
}

const LoginForm = ({ onSubmit } : Props) => {

    const handleSubmit = (values: LoginFormProps) => {
        onSubmit(values)
    }

    const formMik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit,
        validationSchema: validationSchema
    })

    const navigate = useNavigate();
    const handleRegis = () => {
        navigate('/register')
    }

    return (
        <Card title={"Login Page"} bordered style={{ width: 350 }}>
            <form onSubmit={formMik.handleSubmit}>
                <div>
                    <Typography.Paragraph>{'Email'}</Typography.Paragraph>
                    <Input name={'email'}
                        value={formMik.values.email} 
                        onChange={formMik.handleChange('email')}
                        status={formMik.errors.email && 'error'}
                        placeholder={'Enter your email'}
                    />
                    {formMik.errors.email && (
                        <Typography.Paragraph>{formMik.errors.email}</Typography.Paragraph>
                    )}
                </div>
                <div>
                    <Typography.Paragraph>{'Password'}</Typography.Paragraph>
                    <Input name={'password'}
                        value={formMik.values.password} 
                        onChange={formMik.handleChange('password')}
                        status={formMik.errors.password && 'error'}
                        placeholder={'Enter your password'}
                    />
                    {formMik.errors.password && (
                        <Typography.Paragraph>{formMik.errors.password}</Typography.Paragraph>
                    )}
                </div>
                <Button type={'primary'} htmlType={"submit"}>Submit</Button>
                <br></br>
                <Typography.Paragraph>{'New user? you can register first (It is free!)'}</Typography.Paragraph>
                <Button type={'primary'} onClick={handleRegis}>Register</Button>
            </form>
        </Card>
    )
}

export default LoginForm