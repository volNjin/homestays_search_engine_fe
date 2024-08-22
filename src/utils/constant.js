const labelKeyword = {
  location: "Vị trí",
  facility: "Tiện nghi",
  host: "Chủ nhà",
  noise: "Yên tĩnh",
  cleanliness: "Độ sạch sẽ",
};

const sentimentKeyword = {
  positive: "Tích cực",
  neutral: "Trung bình",
  negative: "Tiêu cực",
};
const dump_review = [
  {
    rating: "9",
    review: "Trên cả tuyệt vời",
  },
  {
    rating: "8",
    review: "Xuất sắc",
  },
  {
    rating: "7",
    review: "Rất tốt",
  },
  {
    rating: "6",
    review: "Hài lòng",
  },
];

const dump_bed = ["Giường đơn", "Giường đôi", "Giường lớn", "Giường tầng"];

const dump_view = [
  "Vườn",
  "Thành phố",
  "Mountain",
  "River",
  "Không có cửa sổ",
];

const dump_room_facilities = [
  "Vòi sen",
  "Ban công/sân hiên",
  "Không hút thuốc",
  "Cho phép hút thuốc",
  "Bể bơi riêng",
];
export {labelKeyword, sentimentKeyword, dump_bed, dump_review, dump_room_facilities, dump_view}