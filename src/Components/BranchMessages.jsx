import axios from "axios"
import { useRef, useState } from "react"
import { toast } from "react-toastify"
import "../CSS/branchMessage.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default ({ isTeacher, teacherData, branchMessages }) => {
    const [message, setMessage] = useState("")
    const inputRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`teacher/postMessage/${teacherData.branch}`, { teacherName: teacherData.teacherName, message })
            .then(res => {
                const { status, message } = res.data;
                if (status) {
                    inputRef.current.value = ""
                    toast("Posted")
                } else {
                    toast("Something went wrongF")
                }
            })
            .catch(err => {
                toast("Network connection error")
                console.error(err)
            })
    }

    return (
        <>
            {
                branchMessages.length > 0
                    ? <div className="branch-messages-container">
                        {branchMessages.map(msg => (
                            isTeacher && teacherData.teacherName === msg.teacherName
                                ? <div key={msg._id} className="message-item teacher-message">
                                    <p className="message-author">You</p>
                                    <p className="message-content">{msg.message}</p>
                                    <p className="message-datetime">{msg.date_time.date} {msg.date_time.time}</p>
                                </div>
                                : <div key={msg._id} className="message-item">
                                    <p className="message-author">{msg.teacherName}</p>
                                    <p className="message-content">{msg.message}</p>
                                    <p className="message-datetime">{msg.date_time.date} {msg.date_time.time}</p>
                                </div>
                        ))}

                    </div>
                    : <p style={{ textAlign: "center", fontFamily: "Verdana" }}>No Messages!!!</p>
            }
            {
                isTeacher &&
                <form className="message-form" onSubmit={handleSubmit}>
                    <textarea
                        className="message-input"
                        type="text"
                        ref={inputRef}
                        placeholder="Type Your Message"
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button className="message-button">
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </form>
            }
        </>
    )
}