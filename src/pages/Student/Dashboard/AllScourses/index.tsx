import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import DynamicAccordion from '../../../../components/DynamicAccordion';
import { IconChevronBigRightOrange, IconChevronBigRightWhite } from '../../../../components/Icons';
import CourseList from './ScoursesList';
import { SemesterData } from './type';

const API_URL = 'https://fivefood.shop/api/semesters/course?page=1&pageSize=1111&sortOrder=asc';

const AllCourses = () => {
  const [data, setData] = useState<SemesterData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cookies] = useCookies(['accessToken']);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = cookies.accessToken;
        if (!token) {
          throw new Error('Không tìm thấy token, vui lòng đăng nhập lại');
        }

        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Response API:', response.data);

        // Kiểm tra code và xử lý dữ liệu nếu có
        if (response.data.code === 0 && Array.isArray(response.data.data)) {
          const formattedData = response.data.data.map((item: any) => ({
            semester: item.semester,
            subjects: item.courses.map((course: any) => ({
              id: `${item.semester}-${course.subject}`, // Sử dụng semester và subject để tạo id duy nhất
              title: course.subject,
              details: {
                class: course.class,
                schedule: course.schedule,
                dateRange: course.date,
                status: course.status,
              },
            })),
          }));
          setData(formattedData);
        } else {
          // Nếu API trả về mã khác 0 hoặc dữ liệu không hợp lệ
          if (response.data.code !== 0) {
            throw new Error(response.data.message || 'Dữ liệu API không hợp lệ');
          } else {
            throw new Error('Không có dữ liệu từ API');
          }
        }
      } catch (err: any) {
        console.error('Lỗi khi gọi API:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cookies.accessToken]);

  return (
    <section>
      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p className="text-red-500">Lỗi: {error}</p>}

      {!loading && !error && (
        <DynamicAccordion
          items={data}
          getId={(item) => item.semester}
          multiple={false}
          renderHeader={(item, isOpen) => (
            <>
              {isOpen ? (
                <IconChevronBigRightWhite className="text-xs md:text-sm lg:text-base text-white" />
              ) : (
                <IconChevronBigRightOrange className="text-xs md:text-sm lg:text-base text-orange-text" />
              )}
              <span className="font-semibold text-start text-xs md:text-sm lg:text-base">{item.semester}</span>
            </>
          )}
          renderContent={(item) => <CourseList subjects={item.subjects || []} />}
        />
      )}
    </section>
  );
};

export default AllCourses;
