import React, { useState } from 'react';
import AllStudentProfilesHeader from './header';
import TableAllStudentProfiles from './table';
import RewardProfiles from './RewardProfiles';
import DisciplineProfiles from './DisciplineProfiles';

const AllStudentProfiles: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="student-retention">
        <AllStudentProfilesHeader onTabChange={handleTabChange} />
        <div className="content">
          {activeTab === 'all' && <TableAllStudentProfiles title="Danh sách học viên" />}
          {activeTab === 'reward' && <RewardProfiles />}
          {activeTab === 'discipline' && <DisciplineProfiles />}
        </div>
      </div>
    </>
  );
};

export default AllStudentProfiles;