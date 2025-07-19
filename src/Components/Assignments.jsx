// Import CSS file
import "../CSS/assignments.css";

// Define the component
const Assignments = ({ assignments, setCurrentState, setCurrentAssignment }) => {
    return (
        <div className="assignments-container">
            <select
                onChange={(e) => {
                    if (e.target.value !== "") {
                        const selectedAssignment = e.target.value;
                        const data = assignments.find(
                            (assignment) => assignment.assignment === selectedAssignment
                        );
                        setCurrentAssignment(data);
                        setCurrentState();
                    }
                }}
            >
                <option value="">Select Assignment</option>
                {assignments.map((assignment) => (
                    <option key={assignment._id} value={assignment.assignment}>
                        {assignment.assignment.substr(0, 40)}...
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Assignments;
