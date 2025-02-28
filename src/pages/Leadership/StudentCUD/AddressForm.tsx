import React from 'react';
import Input from '../../../components/Input';

function AddressForm() {
  return (
    <div className="w-full flex justify-between">
      <div className="w-[47%]">
        <div className="w-full flex items-center mb-3">
          <p className='w-[118px]'>Tỉnh/Thành phố</p>
          <Input className='max-h-[40px] min-w-[300px]' placeholder='Tỉnh/Thành phố'/>
        </div>
        <div className="w-full flex items-center mb-3">
          <p className='w-[118px]'>Quận/Huyện</p>
          <Input className='max-h-[40px] min-w-[300px]' placeholder='Quận/Huyện'/>
        </div>
        <div className="w-full flex items-center mb-3">
          <p className='w-[118px]'>Xã/Phường</p>
          <Input className='max-h-[40px] min-w-[300px]' placeholder='Xã/Phường'/>
        </div>
      </div>
      <div className="w-[47%]">
        <div className="w-full flex items-center mb-3">
          <p className='w-[118px]'>Địa chỉ</p>
          <Input className='max-h-[40px] min-w-[300px]' placeholder='Tỉnh/Thành phố'/>
        </div>
        <div className="w-full flex items-center mb-3">
          <p className='w-[118px]'>Email</p>
          <Input className='max-h-[40px] min-w-[300px]' placeholder='Quận/Huyện'/>
        </div>
        <div className="w-full flex items-center mb-3">
          <p className='w-[118px]'>Điện thoại</p>
          <Input className='max-h-[40px] min-w-[300px]' placeholder='Xã/Phường'/>
        </div>
      </div>
    </div>
  );
}

export default AddressForm;
