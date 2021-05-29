import './chat.css'
import pp from '../images/002.png'
export default function ChatPage(){
    return(
        <>
            {/* <p>ini chat page</p> */}
            <section className="chat">
                <div className="row">
                    {/* list chat */}
                    <div className="col-md-4 list__chat">
                        <div className="another__people">
                            <div className="row">
                                <div className="col-md-4">
                                    <img src={pp}></img>
                                </div>
                                <div className="col-md-8">
                                    <p>list chat</p>
                                </div>
                            </div>
                        </div>
                        <div className="another__people">
                            <p>list chat</p>
                        </div>
                        <div className="another__people">
                            <p>list chat</p>
                        </div>
                        <div className="another__people">
                            <p>list chat</p>
                        </div>
                    </div>
                    {/* main chat */}
                    <div className="col-md-8 main__chat">
                        <p>main chat box</p>
                        <div className="box__chat">
                            qwe
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}