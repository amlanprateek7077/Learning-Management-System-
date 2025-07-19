import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import '../CSS/announcement.css'; // Import the CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default ({ isTeacher, data, announcements }) => {
    const [message, setMessage] = useState("");
    const inputRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("teacher/announce", { teacherName: data.teacherName, message })
            .then(res => {
                const { status, message } = res.data;
                if (status) {
                    inputRef.current.value = "";
                    toast("Posted");
                } else {
                    toast("Something went wrong");
                }
            })
            .catch(err => {
                toast("Network connection error");
                console.error(err);
            });
    };

    return (
        <div className="announcement-container">
            <div className="announcement-list">
                {announcements.map(announcement => (
                    isTeacher && announcement.teacherName === data.teacherName
                        ? <div key={announcement._id} className="announcement-item teacher-announcement">
                            <p className="announcement-author">You</p>
                            <p className="announcement-message">{announcement.message}</p>
                            <p className="announcement-datetime">{announcement.date_time.date} {announcement.date_time.time}</p>
                        </div>
                        : <div key={announcement._id} className="announcement-item">
                            <p className="announcement-author">{announcement.teacherName}</p>
                            <p className="announcement-message">{announcement.message}</p>
                            <p className="announcement-datetime">{announcement.date_time.date} {announcement.date_time.time}</p>
                        </div>
                ))}
            </div>
            {
                isTeacher &&
                <form className="announcement-form" onSubmit={handleSubmit}>
                    <textarea
                        className="announcement-input"
                        type="text"
                        ref={inputRef}
                        placeholder="Enter Your Message"
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button className="announcement-button">
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </form>
            }
        </div>
    );
};
