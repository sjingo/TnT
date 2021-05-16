import LoginForm from './../loginForm'
import { Divider } from 'semantic-ui-react'
import Menus from './../menus'
const Main = () => (
    <>
        <LoginForm db={db} />
        <Divider />
        <Menus />
        <Divider />
    </>
)

export default Main
