import AllScourses from './AllScourses';
import StudentAchievementChart from './chart';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-wrap lg:flex-nowrap gap-6 justify-center">
      <div className="w-full lg:w-auto">
        <StudentAchievementChart />
      </div>
      <div className="w-full lg:w-1/2">
        <AllScourses />
      </div>
    </div>
  );
};

export default Dashboard;
