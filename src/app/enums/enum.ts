
export enum RoleTitle {
  'Admin' = -1,
  'Quản lý cục bộ', LocalManager = 1,
  'Quản lý dịch vụ', ServiceManager = 2,
  'Quản lý tour', TourManager = 3,
  'Quản lý tour booking', TourBookingManager = 4,
  'Hướng dẫn viên', TourGuide = 5,
  'Hỗ trợ viên', Supporter = 6
}


// export enum StatusBooking {
//   'Đã thanh toán',
//   'Chưa thanh toán',
// }

export enum StatusCalled {
  true = 'Đã gọi',
  false = 'Chưa gọi',
}

export enum StatusCar {
  'Xe đang trống' = 0,
  'Xe đã có tour' = 1,
  'Xe đang đầy' = 2
}

export enum StatusApprove {
  'Đợi phê duyệt' = 0,
  'Phê duyệt' = 1,
  'Từ chối phê duyệt' = 2,
  'Hủy phê duyệt' = 3
};

export enum StatusPayment {
  'Tiền mặt' = 1,
  'Chuyển khoản' = 2,
  'Paypal' = 3,
  'Vnpay' = 4
};

export enum TypeAction{
  insert = "Thêm mới",
  delete = "Xóa",
  update = "Chỉnh sửa",
  restore = "Khôi phục"
}
export enum ClassContent{
  tour = "Tour",
  tourBooking = "TourBooking",
  hotel = "Hotel",
  place  ="Place",
  restaurant ="Restaurant"
}
export enum StatusBooking
{
    "Đã huỷ và đang chờ hoàn tiền" = -2, // Pending warning
    "Đã hoàn tiền" = -1, // Refunded success

    "Đã đặt tour nhưng chưa thanh toán" = 1, // Paying waning
    "Đã đặt tour và có đặt cọc" = 2, // Deposit waning

    "Đã thanh toán hết" = 3, //  Paid info
    "Hủy tour" = 4, // Cancel danger
    "Tour đã hoàn thành" = 5, // Finished success

}

export enum StatusNotification
{
  Success = "Success",
  Error = "Error",
  Warning = "Warning",
  Info = "Info",
  Block = "Block",
  Validation = "Validation"
}

export enum RouteNotification{
  Tour = 'list-tour',
  Restaurant = 'list-restaurant',
  Place = 'list-place',
  Promotion = 'list-promotion',
  Hotel = 'list-hotel',
  TourBooking = 'list-tourBooking'
  // Schedule = 'list-tourBooking'
}

export enum TitleNotification{
  'Phê duyệt Tour' = 0,
  'Phê duyệt Khách sạn' = 1,
  'Phê duyệt Địa điểm' = 2,
  'Phê duyệt Nhà hàng' = 3,
  'Phê duyệt Khuyến mãi' = 4,
  'Đã đặt Tour' = 6,
}

export enum TypeNotification{
  Tour = 0,
  Hotel = 1,
  Place = 2,
  Restaurant = 3,
  Promotion = 4,
  // Schedule = 5,
  TourBooking = 6
}
