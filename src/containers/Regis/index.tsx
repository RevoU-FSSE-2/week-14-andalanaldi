import { RegisForm as RegisFormProps, RegisResponse } from "../../types"
import { RegisForm } from "../../components"

const Regis = () => {

    const onSubmit = async (data: RegisFormProps) => {
        const fetching = await fetch('https://mock-api.arikmpt.com/api/user/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        const response: RegisResponse = await fetching.json()
        if(response) {
            localStorage.setItem('name', response.name)
            window.location.replace('/login')
        }
    }

    return (
        <RegisForm onSubmit={onSubmit}/>
    )
}

export default Regis