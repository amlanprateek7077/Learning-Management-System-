import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import Assignments from "../Components/Assignments";
import Announcement from "../Components/Announcement";
import PostAssignments from "../Components/PostAssignments";
import ShowAssignments from "../Components/ShowAssignments";
import BranchMessages from "../Components/BranchMessages";
import axios from "axios"
import { toast } from "react-toastify";
import "../CSS/dashboard.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass } from "@fortawesome/free-solid-svg-icons";

export default () => {
    const state = useLocation().state;

    const isTeacher = state.isTeacher;
    const user = state.user;

    const [currentState, setCurrentState] = useState("announcement");
    const [announcements, setAnnouncements] = useState(null)
    const [branchData, setBranchData] = useState(null)
    const [currentAssignment, setCurrentAssignment] = useState(null)

    const [sidebarActive, setSidebarActive] = useState(false);

    useEffect(() => {
        //fetch the branch according to the student or teacher
        axios.get(`getBranchDetails?branch=${user.branch}`)
            .then(res => {
                const { status, message } = res.data;
                if (status) setBranchData(message)
                else toast("Something went wrong")
            })
            .catch(err => {
                toast("Network connection error")
                console.error(`Retrieving branch data : ${err}`)
            })
    }, [user])

    useEffect(() => {
        axios.get("getAnnouncements")
            .then(res => {
                const { status, message } = res.data;
                if (status) setAnnouncements(message)
                else toast("Something went wrongfd")
            })
            .catch(err => {
                toast("Network connection error")
                console.error(`Retrieving announcement data : ${err}`)
            })
    }, [])

    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive);
    };

    if (announcements && branchData) {

        return (
            <div className={`dashboard-container ${sidebarActive ? "sidebar-active" : ""}`}>
                <div className="hamburger-menu">
                    <button className="hamburger-button" onClick={toggleSidebar}>
                        <FontAwesomeIcon icon={faCompass} spin />
                    </button>
                </div>
                <div className="dashboard-sidebar">
                    {isTeacher ? (
                        <>
                            <p>Teacher Id: <span>{user.teacherId}</span></p>
                            <p>Teacher Name: <span>{user.teacherName}</span></p>
                        </>
                    ) : (
                        <>
                            <p>Student Id: <span>{user.studentId}</span></p>
                            <p>Student Name: <span>{user.studentName}</span></p>
                            <p>Assignment Completed: <span>{user.totalAssignmentCompleted}/{branchData.assignments.length}</span></p>
                        </>
                    )}
                    <p>Branch Name : <span>{user.branch}</span></p>
                    <Assignments
                        assignments={branchData.assignments}
                        setCurrentState={() => setCurrentState("showassignment")}
                        setCurrentAssignment={setCurrentAssignment}
                    />
                    {isTeacher && (
                        <button onClick={() => setCurrentState("postassignment")} className={currentState === "postassignment" && `active-button`}>Post Assignment</button>
                    )}
                    <button onClick={() => setCurrentState("branchmessages")} className={currentState === "branchmessages" && `active-button`}>Messages</button>
                    <button onClick={() => setCurrentState("announcement")} className={currentState === "announcement" && `active-button`}>Announcements</button>
                </div>
                <div className="dashboard-content">
                    {currentState === "announcement" && (
                        <Announcement isTeacher={isTeacher} data={user} announcements={announcements} />
                    )}
                    {currentState === "postassignment" && (
                        <PostAssignments teacherData={user} branchName={branchData.branchName} />
                    )}
                    {currentState === "showassignment" && (
                        <ShowAssignments isTeacher={isTeacher} assignmentData={currentAssignment} userData={user} />
                    )}
                    {currentState === "branchmessages" && (
                        <BranchMessages
                            isTeacher={isTeacher}
                            teacherData={user}
                            branchMessages={branchData.messages}
                        />
                    )}
                </div>
            </div>
        )
    } else {
        return (
            <p style={{ textAlign: "center" }}>Loading...</p>
        )
    }
}