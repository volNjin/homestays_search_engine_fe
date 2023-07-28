import React, { useState } from 'react';
import './filter.css';

const Filter = ({
    min,
    max,
    setMin,
    setMax,
    queryString,
    setQueryString
}) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const dump_review = [
        {
            score: "9",
            review: "Trên cả tuyệt vời",
        },
        {
            score: "8",
            review: "Xuất sắc"
        },
        {
            score: "7",
            review: "Rất tốt"
        },
        {
            score: "6",
            review: "Hài lòng"
        }
    ];

    const dump_bed = [
        "Giường đơn",
        "Giường đôi",
        "Giường lớn",
        "Giường tầng"
    ]

    const dump_view = [
        "Vườn",
        "Thành phố",
        "Mountain",
        "River",
        "Không có cửa sổ"
    ]

    const dump_room_facilities =[
        "Vòi sen",
        "Ban công/sân hiên",
        "Không hút thuốc",
        "Cho phép hút thuốc",
        "Bể bơi riêng"
    ]
    
    const format = (inputValue) => {
        const withoutDots = inputValue.replace(/\./g, '');
        const reversedValue = withoutDots.split('').reverse().join('');
        const formattedValue = reversedValue.replace(/(\d{3})/g, '$1.').split('').reverse().join('');
        return formattedValue.startsWith('.') ? formattedValue.slice(1) : formattedValue;
    }

    const handleMin = (e) => {
        setMin(format(e.target.value));
    }

    const handleMax = (e) => {
        setMax(format(e.target.value));
    }

    const handleFilterReview = (e) => {
        const value = e.target.value;
        if (selectedOption === value) {
            setQueryString(queryString.replace(`&score=${value}`, ''));
            setSelectedOption(null);
        }
        else {
            setQueryString(queryString.replace(`&score=${selectedOption}`, ''));
            setQueryString((prev) => (prev += `&score=${value}`));
            setSelectedOption(value);
        }
    }

    const handleFilterHighlight = (e) => {
        e.target.checked
            ? setQueryString((prev) => (prev += `&highlight=${e.target.value}`))
            : setQueryString(queryString.replace(`&highlight=${e.target.value}`, ''));
    }
    return (
        <div className='filter'>
            <h2>Bộ lọc:</h2>
            <div className='filterItem'>
                <h3 className='filter h3'>Giá mỗi đêm</h3>
                <div className='filterItem price box'>
                    <div className='filterItem price searchbox'>
                        <label>Tối thiểu</label>
                        <input type='text' value={min} onChange={handleMin} />
                    </div>
                    <div className='filterItem price searchbox'>
                        <label>Tối đa</label>
                        <input type='text' value={max} onChange={handleMax} />
                    </div>
                </div>
            </div>
            <div className='filterItem'>
                <h3 className='filter h3'>Đánh giá của khách</h3>
                {dump_review.map((review, index) => (
                    <label className='filterItem review'>
                        <input
                            type='radio'
                            value={review.score}
                            checked={selectedOption === review.score}
                            onClick={(e) => handleFilterReview(e)}
                        />
                        <span>{review.score}+</span>
                        <span>{review.review}</span>
                    </label>
                ))}
            </div>
            <div className='filterItem'>
                <h3 className='filter h3'>Loại giường</h3>
                {dump_bed.map((bed, index) => (
                    <label key={bed} className='filterItem checkbox'>
                        <input
                            type="checkbox"
                            value={bed}
                            onChange={(e) => handleFilterHighlight(e)}
                        />
                        <span>{bed}</span>
                    </label>
                ))}
            </div>
            <div className='filterItem'>
                <h3 className='filter h3'>Hướng phòng</h3>
                {dump_view.map((view, index) => (
                    <label key={view} className='filterItem checkbox'>
                        <input
                            type="checkbox"
                            value={view}
                            onChange={(e) => handleFilterHighlight(e)}
                        />
                        <span>{view}</span>
                    </label>
                ))}
            </div>
            <div className='filterItem'>
                <h3 className='filter h3'>Tiện nghi phòng</h3>
                {dump_room_facilities.map((facility, index) => (
                    <label key={facility} className='filterItem checkbox'>
                        <input
                            type="checkbox"
                            value={facility}
                            onChange={(e) => handleFilterHighlight(e)}
                        />
                        <span>{facility}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};
export default Filter;