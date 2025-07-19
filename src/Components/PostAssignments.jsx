import axios from "axios"
import { useRef, useState } from "react"
import { toast } from "react-toastify"
import "../CSS/postAssignments.css"

export default ({ teacherData }) => {

    const [question, setQuestion] = useState("")
    const inputRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`teacher/postAssignment/${teacherData.branch}`, { teacherName: teacherData.teacherName, assignment: question })
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
        <div className="post-assignments-container">
            <form className="post-assignments-form" onSubmit={handleSubmit}>
                <input
                    className="teacher-name-input"
                    type="text"
                    value={teacherData.teacherName}
                    disabled
                />
                <textarea
                    className="assignment-input"
                    type="text"
                    placeholder="Enter Assignment Question"
                    onChange={(e) => setQuestion(e.target.value)}
                    ref={inputRef}
                />
                <button className="post-button">POST</button>
            </form>
        </div>
    )
}