import React from 'react';
import AddressList from '../../../components/AddressUrlStack/Index';
import Card from '../../../components/Card';

interface props {
  isUpdate?: boolean;
}
const StudentCU: React.FC<props> = ({ isUpdate }) => {
  const addressList = [
    { linkName: 'Hồ sơ học viên', link: '/leadership/all-student-profiles' },
    { linkName: 'Thêm học viên', link: '/leadership/create-student' },
  ];
  return (
    <div className='pr-10'>
      <AddressList addressList={addressList}/>
      {/* <div className='w-ful mt-3' style={{minHeight: 200}}>

      </div> */}
      <Card>
        <Card.Header>
          HEADER
        </Card.Header>
        <Card.Body>
          BODY
        </Card.Body>
        <Card.Footer variant='dark-primary'>
          FOOTER
        </Card.Footer>
      </Card>
    </div>
  );
};

export default StudentCU;
