export const validator: Record<string, (value: any) => string | null> = {
  name: (value) =>
    value?.trim().length === 0 ? "Tên sản phẩm không được để trống" : null,
  description: (value) =>
    value?.trim().length < 10
      ? "Mô tả sản phẩm phải có ít nhất 10 ký tự"
      : null,
  brand: (value) =>
    value?.trim().length === 0 ? "Thương hiệu không được để trống" : null,
  origin: (value) =>
    value?.trim().length === 0 ? "Xuất xứ không được để trống" : null,
  ingredients: (value) =>
    value?.trim().length === 0 ? "Thành phần không được để trống" : null,
  unit: (value) =>
    value?.trim().length === 0 ? "Đơn vị bán không được để trống" : null,
  baseUnitPrice: (value) =>
    value <= 0 ? "Đơn giá phải lớn hơn 0" : null,
  quantity: (value) =>
    value <= 0 ? "Số lượng phải lớn hơn 0" : null,
  shippingProvider: (value) =>
    value ? null : "Vui lòng chọn đơn vị vận chuyển",
  deliveryTime: (value) =>
    value <= 0 ? "Thời gian giao hàng phải lớn hơn 0" : null,
  shippingFee: (value) =>
    value < 0 ? "Phí vận chuyển không được âm" : null,
  preOrder: (value) =>
    value !== "yes" && value !== "no" ? "Vui lòng chọn có hoặc không" : null,
  returnPolicy: (value) =>
    value?.length > 500 ? "Chính sách đổi trả quá dài (tối đa 500 ký tự)" : null,
  additionalNotes: (value) =>
    value?.length > 500 ? "Lưu ý quá dài (tối đa 500 ký tự)" : null,
};
