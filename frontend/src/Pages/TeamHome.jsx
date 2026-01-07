import TaskView from "../components/tasks/TaskView";

const TeamHome = () => {
    return (
        <section className="animate-fade-in">
            <TaskView userOnly={false} title="Team Tasks" />
        </section>
    );
};

export default TeamHome;
