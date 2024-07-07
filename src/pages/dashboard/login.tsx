import { useState, ChangeEvent, FormEvent } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useAuth } from '../../hooks/UseAuth';

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login } = useAuth() 

    const emailHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
      }
      const passwordHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
      }
    
      const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const res = await fetch("http://localhost:8000/api/v1/login", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const data = await res.json()
        login(data.data)
      }

      const loginWithGoogle = useGoogleLogin({
        onSuccess: async codeResponse => {
          const res = await fetch("http://localhost:8000/api/v1/auth/google", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: codeResponse.code
            })
          })
          const data = await res.json()
          login(data.data)
        },
        onError: errorResponse => console.log(errorResponse),
        flow: 'auth-code'
      })

    return(
        <>
        <div className="box">
            <Form onSubmit={(e) => handleSubmit(e)}>
                <FormGroup>
                    <Label for="exampleEmail" hidden>Email</Label>
                    <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="Email"
                    type="email"
                    onChange={(e) => emailHandler(e)}
                    />
                </FormGroup>
                {' '}
                <FormGroup>
                    <Label for="examplePassword" hidden>Password</Label>
                    <Input
                    id="examplePassword"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={(e) => passwordHandler(e)}
                    />
                </FormGroup>
                {' '}
                <Button>Submit</Button>
                <Button onClick={() => loginWithGoogle()}>Login with Google</Button>
            </Form>
        </div>  
        </>
    )
}