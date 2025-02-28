import React from 'react';
import Input from '../../../components/Input';

function FamilyForm() {
  return (
    <div>
      <div className="w-full flex justify-between">
        <div className="w-[30%] max-w-[30%]">
          <div className="w-full flex items-center mb-3 justify-between">
            <p className="w-[118px]">Họ tên cha</p>
            <Input className="max-h-[40px] min-w-[200px]" placeholder="Họ tên cha" />
          </div>
          <div className="w-full flex items-center mb-3 justify-between">
            <p className="w-[118px]">Họ tên mẹ</p>
            <Input className="max-h-[40px] min-w-[200px]" placeholder="Họ tên mẹ" />
          </div>
          <div className="w-full flex items-center mb-3 justify-between">
            <p className="w-[118px]">Người giám hộ</p>
            <Input className="max-h-[40px] min-w-[200px]" placeholder="Họ tên người giám hộ" />
          </div>
        </div>
        <div className="w-[30%] max-w-[30%]">
          <div className="w-full flex items-center mb-3 justify-between">
            <p className="w-[118px]">Năm sinh cha</p>
            <Input className="max-h-[40px]" size="sm" placeholder="Năm sinh cha" />
          </div>
          <div className="w-full flex items-center mb-3 justify-between">
            <p className="w-[118px]">Năm sinh mẹ</p>
            <Input className="max-h-[40px]" size="sm" placeholder="Năm sinh cha" />
          </div>
          <div className="w-full flex items-center mb-3 justify-between">
            <p className="">Năm sinh người giám hộ</p>
            <Input className="max-h-[40px]" size="sm" placeholder="Năm sinh cha" />
          </div>
        </div>
        <div className="w-[30%]">
          <div className="w-full flex items-center mb-3 justify-between">
            <p className="">Nghề nghiệp cha</p>
            <Input className="max-h-[40px]" size="sm" placeholder="Nghề nghiệp cha" />
          </div>
          <div className="w-full flex items-center mb-3 justify-between">
            <p className="">Nghề nghiệp cha</p>
            <Input className="max-h-[40px]" size="sm" placeholder="Nghề nghiệp mẹ" />
          </div>
          <div className="w-full flex items-center mb-3 justify-between">
            <p className="">Nghề nghiệp GH</p>
            <Input className="max-h-[40px]" size="sm" placeholder="Nghề nghiệp GH" />
          </div>
        </div>
      </div>
      <p className="font-bold text-[#CC5C00] mt-3 mb-3">Liên lạc gia đình</p>
      <div className="w-full flex justify-between">
        <div className="w-[30%]">
          <div className="w-full flex items-center mb-3 justify-between">
            <p className="">Điện thoại cha</p>
            <Input className="max-h-[40px]" size="sm" placeholder="Điện thoại cha" />
          </div>
        </div>
        <div className="w-[30%]">
          <div className="w-full flex items-center mb-3 justify-between">
            <p className="">Điện thoại mẹ</p>
            <Input className="max-h-[40px]" size="sm" placeholder="Điện thoại mẹ" />
          </div>
        </div>
        <div className="w-[30%]">
          <div className="w-full flex items-center mb-3 justify-between">
            <p className="">Điện thoại GH</p>
            <Input className="max-h-[40px]" size="sm" placeholder="Điện thoại giám hộ" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FamilyForm;
