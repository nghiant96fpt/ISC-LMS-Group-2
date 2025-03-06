import { useState } from 'react';
import './style.scss';
import Button from '../../../../../components/Button';

const AddForm = () => {
  const [selectedOption, setSelectedOption] = useState('nienche');

  return (
    <div className="education-form">
      <h2 className="title">Thiết lập Bậc đào tạo</h2>
      <div className="form-group">
        <label>Trình độ đào tạo:</label>
        <input className="TDDT" type="text" placeholder="Trung học cơ sở" />
      </div>
      <div className="form-group">
        <label>Hình thức đào tạo:</label>
        <input className="HTDT" type="text" placeholder="Tư nhân" />
      </div>
      <div className="form-group">
        <label>
          <div className="checkbox-group">
            <input type="checkbox" checked={selectedOption === 'nienche'} onChange={() => setSelectedOption('nienche')} />
            <label>Niên chế</label>
          </div>
        </label>
        {selectedOption === 'nienche' && (
          <div className="extra-fields">
            <input type="number" placeholder="" /> Năm
            <input type="number" placeholder="" /> Học kỳ/Năm
          </div>
        )}
      </div>
      <div className="box-Text">
        <p>Đào tạo theo niên chế là đào tạo theo đơn vị năm học</p>
        <p>Mỗi chương trình đào tạo của một ngành, nghề được thể hiện trong một số tháng hoặc năm nhất định</p>
        <p>Mỗi năm học thường được tổ chức thành hai học kỳ</p>
      </div>

      <div className="form-group">
        <label>
          <div className="checkbox-group">
            <input type="checkbox" checked={selectedOption === 'tinchi'} onChange={() => setSelectedOption('tinchi')} />
            <label>Tín chỉ</label>
          </div>
        </label>

        {selectedOption === 'tinchi' && (
          <div className="extra-fields">
            <input type="number" placeholder="" /> Năm
            <input type="number" placeholder="" /> Học phần bắt buộc
            <input type="number" placeholder="" /> Học phần tự chọn
          </div>
        )}
      </div>

      <div className="form-group">
        <label>Ghi chú:</label>
        <textarea placeholder="Nhập ghi chú..."></textarea>
      </div>

      <div className="form-group">
        <label>
          <div className="checkbox-group">
            <input type="checkbox" />
            <label>Kích hoạt</label>
          </div>
        </label>
      </div>

      <div className="actions">
        <Button size="big" type="submit" className="secondary">
          Hủy
        </Button>
        <Button size="big" type="submit" className="primary">
          Lưu
        </Button>
      </div>
    </div>
  );
};

export default AddForm;
