import React, { useEffect, useState } from 'react';
import caretdown from '../../../../assets/icons/caret_down.png';
import { Settings } from '../SetupDepartmentModal/type';
import { departmentData } from '../SetupDepartmentModal/data';
import { Link, useParams } from 'react-router';
import axios from 'axios';
import { Subject, SubjectGroupList } from './type';
import { log } from 'console';
import { subjects } from '../SubjectList/subjectListConfig';

const API_URL = process.env.REACT_APP_API_URL;

const SubjectSetup: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [settings, setSettings] = useState<Settings>(departmentData);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [subjectGroups, setSubjectGroups] = useState<SubjectGroupList[]>([]);
  const [subjectGroupId, setSubjectGroupId] = useState<Subject[] | null>(null);
  useEffect(() => {
    if (id) {
      axios.get(`${API_URL}/subjects/${id}`)
        .then((response) => {
          setSubject(response.data.data)
          setSubjectGroupId(response.data.data.subjectGroup)
        })
        .catch((error) => console.error('Error fetching department data:', error));
    }
  }, [id]);
  useEffect(() => {
    console.log(subjects);
    console.log(subjectGroups);
    console.log(subjectGroupId);
  })
  useEffect(() => {
    axios.get(`${API_URL}/subject-groups`)
      .then((response) => setSubjectGroups(response.data.data))
      .catch((error) => console.error('Error fetching subject groups:', error));
  }, []);



  return (
    <div className="w-full max-w-[884px] mx-auto p-[20px_64px_40px] bg-background-white rounded-xl shadow-md">
      <h2 className="text-[28px] font-bold text-center text-black-text mb-4">Thiết lập môn học</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="w-1/3 font-medium text-black-text">Tổ - Bộ môn:</label>
          <div className="relative w-2/3">
            <select
              name="departments"
              value={subject?.subjectGroup?.id ?? ""}
              className="w-full p-2 pr-10 border border-background-gray rounded-md bg-white text-black-text appearance-none"
            >
              <option value="" disabled>Chọn tổ - bộ môn</option>
              {subjectGroups.map((group) => (
                <option
                  key={group.id}
                  value={group.id}
                  selected={subjectGroupId?.some((subject) => subject.id === group.id)}
                >
                  {group.name}
                </option>
              ))}
            </select>

            <img src={caretdown} alt="caret down" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-1/3 font-medium text-black-text">Tên môn học:</label>
          <input
            type="text"
            name="subjects"
            value={subject ? subject.name : "Chưa có dữ liệu"}
            onChange={(e) => {
              const updatedSubjects = [...settings.subjects];
              updatedSubjects[0] = e.target.value;
              setSettings((prev) => ({ ...prev, subjects: updatedSubjects }));
            }}
            className="w-2/3 p-2 border border-background-gray rounded-md bg-white text-black-text"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-1/3 font-medium text-black-text">Mã môn:</label>
          <input type="text" name="code" value={subject ? subject.code : "Chưa có dữ liệu"} disabled className="w-2/3 p-2 border-none bg-transparent text-black-text" />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-1/3 font-medium text-black-text">Loại môn học:</label>
          <div className="relative w-2/3">
            <select
              name="type"
              value={settings.type}
              className="w-full p-2 pr-10 border border-background-gray rounded-md bg-white text-black-text appearance-none"
            >
              {settings.subjectTypes.map((type) => (
                <option key={type} value={type} className="text-black-text">
                  {type}
                </option>
              ))}
            </select>
            <img src={caretdown} alt="caret down" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
          </div>
        </div>

        <hr className="my-6 border-background-gray" />

        <div>
          <h3 className="font-bold text-orange-text mb-2">Số tiết/Học kì</h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-4 w-1/2">
              <label className="w-1/3 font-medium text-black-text">Học kì 1:</label>
              <input
                type="number"
                name="semester1"
                value={subject ? subject.hoursSemester1 : "Chưa có dữ liệu"}
                className="w-[170px] h-[40px] p-2 border border-background-gray rounded-md bg-white text-black-text"
              />
            </div>
            <div className="flex items-center gap-4 w-1/2">
              <label className="w-1/3 font-medium text-black-text">Học kì 2:</label>
              <input
                type="number"
                name="semester2"
                value={subject ? subject.hoursSemester2 : "Chưa có dữ liệu"}
                className="w-[170px] h-[40px] p-2 border border-background-gray rounded-md bg-white text-black-text"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <Link to="/leadership/section-list">
            <button className="w-[160px] h-[52px] bg-[#F2F2F2] text-black-text font-bold rounded-md">Huỷ</button>
          </Link>

          <button className="w-[160px] h-[52px] bg-background-orange-1 text-while-text font-bold rounded-md">Lưu</button>
        </div>
      </div>
    </div>
  );
};

export default SubjectSetup;
