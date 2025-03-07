import React, { useState } from 'react';
import Tab from './Tab';
import AddressList from '../../../../components/AddressUrlStack/Index';
import ChatCart from './ChatCart';
import './teacherQA.css';
import TopicCard from './TopicCard';
const addressList = [
  { link: '', linkName: 'Thông tin lớp học' },
  { link: '', linkName: 'Toán đại số' },
  { link: '', linkName: 'Hỏi đáp' },
];
const TeacherQA: React.FC = () => {
  const [tabId, setTabId] = useState(0);
  const [cartIndexChoose, setCartIndexChoose] = useState(0);
  const handleClickChangeTopic = () => {
    alert('Đổi topic');
  };
  const handleClickChangeTabChat = () => {
    alert('Đổi tab chat mới');
  };

  const [tabChat, setTabChat] = useState([
    {
      name: 'Nguyễn Ngọc Ngạn',
      message: 'Alo alo 1234 nghe hong???',
      time: '13:14',
      avatar:
        'https://cdn.colombia.com/sdi/2022/11/25/avatar-the-way-of-water-seria-la-pelicula-mas-cara-dela-historia-luego-de-que-se-filtrara-su-presupusto-1091233.jpg',
      seen: 13,
      active: true,
    },
    {
      name: 'Hiền Mai',
      message: 'Hỏi gì hỏi lẹ đi má :)',
      time: '10:14',
      avatar:
        'https://cdn.colombia.com/sdi/2022/11/25/avatar-the-way-of-water-seria-la-pelicula-mas-cara-dela-historia-luego-de-que-se-filtrara-su-presupusto-1091233.jpg',
      seen: 22,
      active: true,
    },
    {
      name: 'Lor',
      message: 'Hỏi gì hỏi lẹ đi má :)',
      time: 'T6',
      avatar:
        'https://cdn.colombia.com/sdi/2022/11/25/avatar-the-way-of-water-seria-la-pelicula-mas-cara-dela-historia-luego-de-que-se-filtrara-su-presupusto-1091233.jpg',
      seen: 10,
      active: true,
    },
    {
      name: 'Binz',
      message: 'Hỏi gì hỏi lẹ đi má :)',
      time: 'T5',
      avatar:
        'https://cdn.colombia.com/sdi/2022/11/25/avatar-the-way-of-water-seria-la-pelicula-mas-cara-dela-historia-luego-de-que-se-filtrara-su-presupusto-1091233.jpg',
      seen: 20,
      active: true,
    },
    {
      name: 'Lê Đan',
      message: 'Hỏi gì hỏi lẹ đi má :)',
      time: 'T4',
      avatar:
        'https://cdn.colombia.com/sdi/2022/11/25/avatar-the-way-of-water-seria-la-pelicula-mas-cara-dela-historia-luego-de-que-se-filtrara-su-presupusto-1091233.jpg',
      seen: 22,
      active: true,
    },
  ]);

  const [topics, setTopic] = useState([
    {
      title: 'Tại sao nước biển lại mặn',
      content: 'Thảo luận xem vì sao? Thích thì mặn hong thích thì mặn :)) Sed lobortis purus dui.',
      comments: 9,
      views: 9,
      createdDate: '15 th2',
    },
    {
      title: 'Tại sao nước biển lại mặn',
      content: 'Thảo luận xem vì sao? Thích thì mặn hong thích thì mặn :)) Sed lobortis purus dui.',
      comments: 9,
      views: 9,
      createdDate: '15 th2',
    },
    {
      title: 'Tại sao nước biển lại mặn',
      content: 'Thảo luận xem vì sao? Thích thì mặn hong thích thì mặn :)) Sed lobortis purus dui.',
      comments: 9,
      views: 9,
      createdDate: '15 th2',
    },
  ]);
  return (
    <>
      <AddressList addressList={addressList} />
      <div className="mt-3 bg-gray-100 p-1 pl-3 pr-3 inline-block" style={{ borderRadius: '50px' }}>
        <div className="bg-gray-100 text-gray-500 pr-3 font-bold   rounded-lg inline-block" style={{ borderRadius: '50px' }}>
          Thông tin lớp học
        </div>
        <div className="bg-black text-white p-1 font-bold pl-7 pr-7 rounded-lg inline-block" style={{ borderRadius: '50px' }}>
          Hỏi và đáp
        </div>
      </div>
      <div className="mt-7 mb-5">
        <Tab handleChangTab={setTabId} tag={1} tabId={0} title={'Tất cả câu hỏi'} TabChoose={tabId} />
        <Tab handleChangTab={setTabId} tag={2} tabId={1} title={'Đã trả lời'} TabChoose={tabId} />
        <Tab handleChangTab={setTabId} tag={3} tabId={2} title={'Gần đây nhất'} TabChoose={tabId} />
        <Tab handleChangTab={setTabId} tag={55} tabId={3} title={'Topics'} TabChoose={tabId} />
      </div>
      <div className="flex flex-col md:flex-row w-full">
        {/* div trái */}
        <div className="w-full md:w-2/6 bg-white text-white  rounded-lg">
          <div className="w-full  p-3  ">
            {/* Ô tìm kiếm */}
            <div className="relative flex items-center w-full rounded-[30px] border border-gray-300 bg-gray-200 p-1 mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ms-3">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4ZM2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11Z"
                  fill="#C5C5C5"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.9429 15.9433C16.3334 15.5528 16.9666 15.5528 17.3571 15.9433L21.7071 20.2933C22.0976 20.6838 22.0976 21.317 21.7071 21.7075C21.3166 22.098 20.6834 22.098 20.2929 21.7075L15.9429 17.3575C15.5524 16.967 15.5524 16.3338 15.9429 15.9433Z"
                  fill="#C5C5C5"
                />
              </svg>
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="w-full h-[30px] pl-2 pr-4 rounded-[30px] border-none focus:outline-none focus:ring-0 italic bg-gray-200"
              />
            </div>

            <div className="max-h-[330px] p-2  rounded-lg overflow-y-auto space-y-2  scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {tabId < 3 &&
                tabChat.map((chat, index) => (
                  <ChatCart cardIndexChoose={cartIndexChoose} handleClick={handleClickChangeTabChat} cardData={chat} index={index} />
                ))}
              {tabId === 3 &&
                topics.map((v, index) => {
                  return <TopicCard cardData={v} cardIndexChoose={cartIndexChoose} handleClick={handleClickChangeTopic} index={index} />;
                })}
            </div>
          </div>
        </div>
        {/* div phải  */}
        <div className="w-full md:w-4/6 bg-white ml-2 text-white p-4">Div Phải</div>
        {/* hết */}
      </div>
    </>
  );
};

export default TeacherQA;
