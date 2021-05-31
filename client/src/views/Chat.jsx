import './chat.css'
import pp from '../images/002.png'
import { Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function ChatPage(){
    const user = useSelector((state) => state.user)
    let history = useHistory()
    const data = JSON.parse(localStorage.getItem('data'))

    function goHome(){
        // console.log(data);
        // console.log(user);
    }

    function goProfile(){
        history.push('/profile')
    }
    return(
        <>
            {/* <p>ini chat page</p> */}
            <section className="chat">
                <div className="row">
                    {/* list chat side */}
                    <div className="col-md-4 list__chat">
                        <div className="people__content">
                            <div className="another__people">
                                <div className="row">
                                    <div className="col-md-3">
                                        <img src={pp} className="people__photo"></img>
                                    </div>
                                    <div className="col-md-9  people__name">
                                        <p className="people__chat">John Doe</p>
                                    </div>
                                </div>
                            </div>
                            <div className="another__people">
                                <div className="row">
                                    <div className="col-md-3">
                                        <img src={pp} className="people__photo"></img>
                                    </div>
                                    <div className="col-md-9  people__name">
                                        <p className="people__chat">John Doe</p>
                                    </div>
                                </div>
                            </div>
                            <div className="another__people">
                                <div className="row">
                                    <div className="col-md-3">
                                        <img src={pp} className="people__photo"></img>
                                    </div>
                                    <div className="col-md-9  people__name">
                                        <p className="people__chat">John Doe</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* main chat */}
                    <div className="col-md-8 main__chat">
                        {/* <p>main chat box</p> */}
                        <div>
                            <a onClick={goHome} className="nav">Home</a>
                            <a onClick={goProfile} className="nav">Profile</a>
                        </div>
                        <div className="box__chat">
                        {/* ini nanti buat chat dari kita */}
                        {user.email === data.email && 
                            <div className="box__sent">
                                <div className="row">
                                    <div className="col-md-2">
                                        <img src={pp} className="profile__user__chat"/>
                                    </div>
                                    <div className="col-md-10 text__handle">
                                        <p className="text__chat">haii</p>
                                    </div>
                                </div>
                            </div>
                        }
                        {/* ini nanti buat dari orang lain */}
                        {user.email !== data.email &&
                            <div className="box__sent">
                                <div className="row">
                                    <div className="col-md-2">
                                        <img src={pp} className="profile__user__chat"/>
                                    </div>
                                    <div className="col-md-10 text__handle">
                                        <p className="text__chat">hai juga</p>
                                    </div>
                                </div>
                            </div>
                        }
                            
                            {/* <div className="box__sent">
                                <div className="row">
                                    <div className="col-md-2">
                                        <img src={pp} className="profile__user__chat"/>
                                    </div>
                                    <div className="col-md-10 text__handle">
                                        <p className="text__chat">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis modi nihil quibusdam, alias officiis corporis commodi consequuntur itaque mollitia nisi quos quis atque suscipit laudantium!</p>
                                    </div>
                                </div>
                            </div>
                            <div className="box__sent">
                                <div className="row">
                                    <div className="col-md-2">
                                        <img src={pp} className="profile__user__chat"/>
                                    </div>
                                    <div className="col-md-10 text__handle">
                                        <p className="text__chat">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis modi nihil quibusdam, alias officiis corporis commodi consequuntur itaque mollitia nisi quos quis atque suscipit laudantium!</p>
                                    </div>
                                </div>
                            </div> */}
                            <div className="text__input">
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        {/* <Form.Label>Email address</Form.Label> */}
                                        <Form.Control type="text" placeholder="type a message" className="input__message" />
                                        {/* <p>send</p> */}
                                    </Form.Group>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}