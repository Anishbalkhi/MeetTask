import TaskView from "../components/tasks/TaskView";

const UserHome = () => {
    return (
        <section className="animate-fade-in">
            <TaskView userOnly={true} title="My Tasks" />
        </section>
    );
};

export default UserHome;
