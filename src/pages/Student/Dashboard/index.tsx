import AllScourses from './AllScourses';
import StudentAchievementChart from './chart';

const Dashboard: React.FC = () => {
  return (
    // <>
    //   <StudentAchievementChart />
    //   <AllScourses />
    // </>
    <div className="flex gap-6 justify-center">
      <div className="">
        <StudentAchievementChart />
      </div>
      <div className="w-1/2">
        <AllScourses />
      </div>
    </div>
  );
};

export default Dashboard;
