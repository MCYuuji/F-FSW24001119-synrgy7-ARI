import { Form, FormGroup, FormText, Label, Input, Button } from "reactstrap";

export default function Register() {
    return(
        <>
        <div className="box">
            <Form>
                <FormGroup>
                    <Label for="Email">Email</Label>
                    <Input
                    id="email"
                    name="email"
                    placeholder="please enter your email"
                    type="email"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="Password">Password</Label>
                    <Input
                    id="password"
                    name="password"
                    placeholder="please enter your password"
                    type="password"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="Username">Username</Label>
                    <Input
                    id="username"
                    name="username"
                    placeholder="please enter your username"
                    type="text"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleFile">File</Label>
                    <Input
                    id="exampleFile"
                    name="file"
                    type="file"
                    />
                    <FormText>
                    This is some placeholder block-level help text for the above input. It‘s a bit lighter and easily wraps to a new line.
                    </FormText>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </div>
        </>
    )
}