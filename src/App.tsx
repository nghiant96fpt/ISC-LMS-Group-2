import React from 'react';
import CalendarInput from './components/CalendarInput';
import Star from './components/Start';
import SubjectButton from './components/SubjectButton';

const App = () => {
  return (
    <div className="p-4">
      <Star isSelected />
      <SubjectButton title="Nộp ngay" backgroundColor="blue" textColor="white" />
      <SubjectButton title="Subject md" backgroundColor="blue" textColor="white" size="medium" />
      <SubjectButton title="Subject large" backgroundColor="blue" textColor="white" size="large" iconPosition="right" iconName="XCircleBlue" />
      <SubjectButton title="Subject medium" backgroundColor="blue" textColor="white" size="medium" iconPosition="right" iconName="XCircleBlue" />

      <CalendarInput />
    </div>
  );
};

export default App;
