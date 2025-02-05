import React from 'react';
import AddressList from './components/AddressUrlStack/Index';
import CalendarInput from './components/CalendarInput';
import Star from './components/Start';
import SubjectButton from './components/SubjectButton';
import { BrowserRouter } from 'react-router';
import CalendarInput from './components/CalendarInput';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AddressList
          type={false}
          addressList={[
            { linkName: 'Sample 1', link: '/samepple1' },
            { linkName: 'Sample 2', link: '/samepple2' },
          ]}
        />
        <AddressList
          type={false}
          addressList={[
            { linkName: 'Sample 1', link: '/samepple1' },
            { linkName: 'Sample 2', link: '/samepple2' },
            { linkName: 'Sample 3', link: '/samepple3' },
            { linkName: 'Sample 4', link: '/samepple4' },
            { linkName: 'Sample 5', link: '/samepple5' },
          ]}
        />
        <AddressList
          type={true}
          addressList={[
            { linkName: 'Sample 1', link: '/samepple1' },
            { linkName: 'Sample 2', link: '/samepple2' },
            { linkName: 'Sample 3', link: '/samepple3' },
            { linkName: 'Sample 4', link: '/samepple4' },
            { linkName: 'Sample 5', link: '/samepple5' },
            { linkName: 'Sample 6', link: '/samepple6' },
          ]}
        />
        <AddressList
          type={false}
          addressList={[
            { linkName: 'Sample 1', link: '/samepple1' },
            { linkName: 'Sample 2', link: '/samepple2' },
            { linkName: 'Sample 3', link: '/samepple3' },
            { linkName: 'Sample 4', link: '/samepple4' },
            { linkName: 'Sample 5', link: '/samepple5' },
            { linkName: 'Sample 6', link: '/samepple6' },
          ]}
        />
      </div>
    </BrowserRouter>
  );
}
export default App;
