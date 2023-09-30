import { Button, Card, Input, Typography } from "antd"
import { useFormik } from "formik"
import { RegisForm as RegisFormProps } from "../../types"
import { initialValues, validationSchema } from "./regisFormSchema"

interface Props {
    onSubmit: (values: RegisFormProps) => void
}

const RegisForm = ({ onSubmit } : Props) => {

    const handleSubmit = (values: RegisFormProps) => {
        onSubmit(values)
    }

    const formMik = useFormik({
        initialValues: initialValues,
        onSubmit: handleSubmit,
        validationSchema: validationSchema
    })

    return (
        <Card title={"Registration Page"} bordered style={{ width: 350 }}>
            <form onSubmit={formMik.handleSubmit}>
                <div>
                    <Typography.Paragraph>{'Name'}</Typography.Paragraph>
                    <Input name={'Name'}
                        value={formMik.values.name} 
                        onChange={formMik.handleChange('name')}
                        status={formMik.errors.name && 'error'}
                        placeholder={'Enter your name'}
                    />
                    {formMik.errors.name && (
                        <Typography.Paragraph>{formMik.errors.name}</Typography.Paragraph>
                    )}
                </div>
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
                        type={'password'}
                        placeholder={'Input your password'}
                    />
                    {formMik.errors.password && (
                        <Typography.Paragraph>{formMik.errors.password}</Typography.Paragraph>
                    )}
                </div>
                <Button type={'primary'} htmlType={"submit"}>Submit</Button>
            </form>
        </Card>
    )

}

export default RegisForm