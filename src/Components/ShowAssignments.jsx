import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import "../CSS/showAssignments.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export default ({ isTeacher, assignmentData, userData }) => {

    const inputRef = useRef()

    const [message, setMessage] = useState("")
    const [pdf, setPdf] = useState(null);

    const [studentAssignment, setStudentAssignment] = useState(null)

    const handleAssignmentPost = (pdfFileName) => {
        axios.post(`student/postAssignment/${userData.branch}`, {
            assignment: assignmentData.assignment,
            studentName: userData.studentName,
            studentId: userData.studentId,
            message: message,
            pdf: pdfFileName,
        })
            .then(res => {
                const { status, message } = res.data;
                if (status) {
                    toast("Posted")
                    inputRef.current.value = ""
                } else {
                    toast("Couldn't be posted")
                }
            })
            .catch(err => {
                console.error(err)
                toast("Network connection error")
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = new FormData()
        form.append("pdf", pdf)
        axios.post("uploadPdf", form, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(res => {
                if (res.data !== null) {
                    handleAssignmentPost(res.data)
                } else {
                    toast("Image Uploading Problem")
                }
            })
            .catch(err => {
                console.error(err)
                toast("Network connection error")
            })
    }

    useEffect(() => {
        if (!isTeacher) {
            axios.get(`student/checkStudentAssignment?branch=${userData.branch}&stdId=${userData.studentId}&assignment=${assignmentData.assignment}`)
                .then(res => {
                    if (res.data.status) {
                        setStudentAssignment(res.data.message)
                    } else {
                        setStudentAssignment(null)
                    }
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }, [assignmentData])

    const removeAssignment = (stdId) => {
        axios.delete(`student/removeAssignment?stdId=${stdId}&branch=${userData.branch}&assignment=${assignmentData.assignment}`)
            .then(res => toast(res.data.message))
            .catch(err => {
                console.error(err)
                toast("Network connection error")
            })
    }

    return (
        // the upper section
        <div className="show-assignments-container">
            <div className="assignment-details">
                <h2>Assignment Details</h2>
                <p>Teacher Name: {assignmentData.teacherName}</p>
                <p>Date: {assignmentData.date_time.date}</p>
                <p>Time: {assignmentData.date_time.time}</p>
                <p>Question: {assignmentData.assignment}</p>
            </div>
            <div className="assignment-form">
                {isTeacher ? (
                    <div className="studentList-wrapper">
                        {assignmentData.studentList.map((list) => (
                            <div key={list._id} className="studentlist-container">
                                <p>Student ID: {list.studentId}</p>
                                <p>Student Name: {list.studentName}</p>
                                <p>Answer: {list.message}</p>
                                <p>Date: {list.date_time.date}</p>
                                <p>Time: {list.date_time.time}</p>
                                <a
                                    href={`http://localhost:8000/pdf/${list.pdf}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {list.pdf}
                                </a>
                            </div>
                        ))}
                    </div>
                ) : (
                    studentAssignment
                        ? <div>
                            {
                                <div key={studentAssignment._id} className="studentlist-container">
                                    <p>Student ID: {studentAssignment.studentId}</p>
                                    <p>Student Name: {studentAssignment.studentName}</p>
                                    <p>Answer: {studentAssignment.message}</p>
                                    <p>Date: {studentAssignment.date_time.date}</p>
                                    <p>Time: {studentAssignment.date_time.time}</p>
                                    <p>
                                        <a
                                            href={`http://localhost:8000/pdf/${studentAssignment.pdf}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {studentAssignment.pdf}
                                        </a>
                                    </p>
                                    <button onClick={() => removeAssignment(studentAssignment.studentId)}>Remove</button>
                                </div>
                            }
                        </div>
                        : <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                disabled
                                value={userData.studentName}
                                placeholder="Your Name"
                            />
                            <input
                                type="text"
                                disabled
                                value={userData.studentId}
                                placeholder="Your ID"
                            />
                            <textarea
                                placeholder="Type Your Explanation"
                                onChange={(e) => setMessage(e.target.value)}
                                ref={inputRef}
                                required
                                className="student-assignment-textarea"
                            ></textarea>
                            <label htmlFor="pdf" className="student-assignment-label">Upload PDF
                                <FontAwesomeIcon icon={faUpload} style={{ marginLeft: "10px" }} />
                            </label>
                            <input
                                type="file"
                                id="pdf"
                                onChange={(e) => {setPdf(e.target.files[0]);toast("Pdf Posted Successfully")}}
                            />
                            <div className="btn" style={{ width: "100%", justifyContent: "center", display: "flex" }}>
                                <button>POST</button>
                            </div>
                        </form>
                )}
            </div>
        </div>
    )
}