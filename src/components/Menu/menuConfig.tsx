import { MenuItem } from './type';

const eye = require('../../assets/images/people/fi_eye.png');
const book = require('../../assets/images/people/Book.png');
const edit = require('../../assets/images/people/u_file-edit-alt.png');
const vector = require('../../assets/images/people/Vector.png');
const fi_bell = require('../../assets/images/people/fi_bell.png');
const question = require('../../assets/images/people/u_comment-question.png');

const BookV1 = require('../../assets/images/people/leadership/Book.png');
const Profile = require('../../assets/images/people/leadership/Profile.png');
const VectorV1 = require('../../assets/images/people/leadership/Vector.png');
const Settings = require('../../assets/images/people/leadership/fi_settings.png');
const Manage = require('../../assets/images/people/leadership/manage.png');
export const menuConfig: Record<string, MenuItem[]> = {
  student: [
    { id: 1, title: 'Tổng quan', icon: eye, path: '', roles: ['student'] },
    {
      id: 2,
      title: 'Quản lý lớp học',
      icon: book,
      path: '',
      roles: ['student'],
      subMenu: [
        { id: 2.1, title: 'Danh sách lớp học', path: '', roles: ['student'] },
        { id: 2.2, title: 'Tham gia vào lớp học', path: '', roles: ['student'] },
      ],
    },
    {
      id: 3,
      title: 'Bài kiểm tra',
      icon: edit,
      path: '',
      roles: ['student'],
      subMenu: [
        { id: 3.1, title: 'Danh sách bài kiểm tra', path: '', roles: ['student'] },
        { id: 3.2, title: 'Bảng điểm', path: '', roles: ['student'] },
      ],
    },
    { id: 4, title: 'Lịch thi', path: '', roles: ['teacher'] },
    { id: 5, title: 'Thông báo', path: '', roles: ['teacher'] },
    { id: 6, title: 'Trợ giúp', path: '', roles: ['teacher'] },
  ],
  teacher: [
    { id: 1, title: 'Tổng quan', icon: eye, path: '', roles: ['teacher'] },
    {
      id: 2,
      title: 'Quản lý lớp học',
      icon: book,
      path: '',
      roles: ['teacher'],
      subMenu: [
        { id: 2.1, title: 'Danh sách lớp học', path: '', roles: ['teacher'] },
        { id: 2.2, title: 'Thêm buổi học mới', path: '', roles: ['teacher'] },
        { id: 2.3, title: 'Tham gia vào lớp học', path: '', roles: ['teacher'] },
      ],
    },
    {
      id: 3,
      title: 'Bài kiểm tra',
      icon: edit,
      path: '',
      roles: ['teacher'],
      subMenu: [
        { id: 3.1, title: 'Danh sách bài kiểm tra', path: '', roles: ['teacher'] },
        { id: 3.2, title: 'Thêm bài kiểm tra mới', path: '', roles: ['teacher'] },
        { id: 3.3, title: 'Nhập điểm', path: '', roles: ['teacher'] },
        { id: 3.4, title: 'Bảng điểm', path: '', roles: ['teacher'] },
      ],
    },
    { id: 4, title: 'Lịch thi', icon: vector, path: '', roles: ['teacher'] },
    { id: 5, title: 'Thông báo', icon: fi_bell, path: '', roles: ['teacher'] },
    { id: 6, title: 'Trợ giúp', icon: question, path: '', roles: ['teacher'] },
  ],
  leadership: [
    { id: 1, title: 'Tổng quan', icon: eye, path: '', roles: ['leadership'] },
    { id: 2, title: 'Khai báo dữ liệu', icon: VectorV1, path: '', roles: ['leadership'] },
    {
      id: 3,
      title: 'Hồ sơ học viên',
      icon: Profile,
      path: '',
      roles: ['leadership'],
      subMenu: [
        { id: 3.1, title: 'Tất cả hồ sơ', path: '', roles: ['leadership'] },
        { id: 3.2, title: 'Tiếp nhận chuyển trường', path: '', roles: ['leadership'] },
        { id: 3.3, title: 'Bảo lưu', path: '', roles: ['leadership'] },
      ],
    },

    {
      id: 4,
      title: 'Hồ sơ giảng viên',
      icon: Manage,
      path: '',
      roles: ['leadership'],
      subMenu: [
        { id: 4.1, title: 'Tất cả hồ sơ', path: '', roles: ['leadership'] },
        { id: 4.2, title: 'Phân công giảng dạy', path: '', roles: ['leadership'] },
      ],
    },
    { id: 5, title: 'Thi cử', icon: BookV1, path: '', roles: ['leadership'] },
    { id: 6, title: 'Cài đặt hệ thống', icon: Settings, path: '', roles: ['leadership'] },
  ],
};
