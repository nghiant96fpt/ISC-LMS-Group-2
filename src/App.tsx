import React from 'react'; 
import AddressList from './components/AddressUrlStack/Index';

function App() {
  return (
    <div className="App">
      <AddressList type={false} addressList={['Sample 1', 'Sample 2', 'Sample 3', 'Simple 4']} />
      <AddressList type={true} addressList={['Sample 1', 'Sample 2', 'Sample 3', 'Simple 4', 'Simple 5']} />
      <AddressList type={true} addressList={['Sample 1', 'Sample 2', 'Sample 3', 'Simple 4', 'Simple 5', 'Simple 6']} />
    </div>
  );
} 
import CalendarInput from './components/CalendarInput';
import Star from './components/Start';
import SubjectButton from './components/SubjectButton';

const App = () => {
  return <div className="p-4"></div>;
}; 

export default App;
