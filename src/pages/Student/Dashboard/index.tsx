import StudentAchievementChart from './chart';

const Dashboard: React.FC = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-center text-black-text">Tổng quan</h1>
      <StudentAchievementChart />
    </>
  );
};

export default Dashboard;
