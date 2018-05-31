export const questions = [
  {
    id: 1,
    name: 'Câu 1',
    question:
      'Bạn có thích những sản phẩm thời trang thể thao mới và thương hiệu thời trang của Nhật được giới thiệu trong trang web này không?',
    content: [
      { type: 'radio', meta: 'Có - Tới câu 2A' },
      { type: 'radio', meta: 'Không - Tới câu 2B', step: 2 },
    ],
  },
  {
    id: 2,
    name: 'Câu 2A',
    question:
      'Nếu bạn thích, bạn thích sản phẩm nào? (Có thể trả lời nhiều đáp án - tối đa 5 sản phẩm) - Vui lòng bỏ qua nếu bạn chọn "Không" ở câu 1.',
    content: [{ type: 'text', meta: '5 Sản phẩm', step: 2 }],
  },
  {
    id: 3,
    name: 'Câu 2B',
    question:
      'Nếu bạn không thích, xin vui lòng cho biết lí do tại sao bạn thích sản phẩm đó? - Vui lòng bỏ qua nếu bạn chọn "Có" ở câu 1.',
    type: 'text',
    content: [{ type: 'text', meta: 'Lý do' }],
  },
  {
    id: 4,
    name: 'Câu 3',
    question:
      'Những sản phẩm được giới thiệu trong trang web này hiện đang được bán tại Nhật Bản, nhưng nếu bán tại Việt Nam, bạn có muốn mua không?',
    content: [
      { type: 'radio', meta: 'Có - Tới câu 4A' },
      { type: 'radio', meta: 'Không - Tới câu 4B', step: 2 },
    ],
  },
  {
    id: 5,
    name: 'Câu 4A',
    question:
      'Nếu bạn mua, xin vui lòng cho biết lí do tại sao bạn lại muốn mua sản phẩm đó? - Vui lòng bỏ qua nếu bạn chọn "Không" ở câu 3.',
    content: [{ type: 'text', meta: 'Lý do', step: 2 }],
  },
  {
    id: 6,
    name: 'Câu 4B',
    question:
      'Nếu bạn không mua, xin vui lòng cho biết lí do tại sao bạn lại không muốn mua sản phẩm đó? - Vui lòng bỏ qua nếu bạn chọn "Có" ở câu 3.',
    content: [{ type: 'text', meta: 'Lý do' }],
  },
  {
    id: 7,
    name: 'Câu 5',
    question: 'Nếu bạn mua sản phẩm đó, bạn dự định khi nào sẽ mặc nó?',
    content: [
      { type: 'radio', meta: 'Khi chơi thể thao' },
      { type: 'radio', meta: 'Khi ở trong nhà' },
      { type: 'radio', meta: 'Khi đi làm - đi học' },
      { type: 'radio-text', meta: 'Khác ()' },
    ],
  },
  {
    id: 8,
    name: 'Câu 6',
    question:
      'Khi mua quần áo thường ngày và quần áo thể thao, bạn thường chú ý đến điểm nào sau đây? (Hãy chọn 3 đáp án mà bạn cho là được chú ý nhất)',
    content: [
      { type: 'checkbox', meta: 'Giá sản phẩm' },
      { type: 'checkbox', meta: 'Tính năng' },
      { type: 'checkbox', meta: 'Thiết kế' },
      { type: 'checkbox', meta: 'Chất lượng' },
      { type: 'checkbox', meta: 'Thương hiệu (Tên, hình ảnh)' },
      { type: 'checkbox', meta: 'Nơi sản xuất' },
      { type: 'checkbox', meta: 'Đánh giá từ bạn bè và gia đình' },
      { type: 'checkbox-text', meta: 'Khác ()' },
    ],
  },
  {
    id: 9,
    name: 'Câu 7',
    question:
      'Hãy cho biết những thương hiệu thời trang thể thao và thời trang thường ngày ưa thích của bạn? Và lí do tại sao mà bạn lại thích thương hiệu thời trang đó?',
    content: [
      { type: 'radio', meta: 'Tên thương hiệu' },
      { type: 'radio', meta: 'Lý do bạn thích thương hiệu đó' },
      { type: 'radio-text', meta: 'Khác ()' },
      { type: 'radio', meta: 'Không thích thương hiệu nào cả' },
    ],
  },
  {
    id: 10,
    name: 'Câu 8',
    question:
      'Hãy cho biết bạn thường mua sản phẩm quần áo thời trang thể thao và thời trang thường ngày với giá bao nhiêu tiền 1 bộ?',
    content: [
      { type: 'radio', meta: 'Dưới 100,000 đồng' },
      { type: 'radio', meta: 'Từ 100,000 - 300,000 đồng' },
      { type: 'radio', meta: '300,000 - 500,000 đồng' },
      { type: 'radio', meta: 'Trên 500,000 đồng' },
    ],
  },
  {
    id: 11,
    name: 'Câu 9',
    question: 'Vui lòng cho biết giới tính của bạn',
    content: [
      { type: 'radio', meta: 'Nữ giới' },
      { type: 'radio', meta: 'Nam giới' },
    ],
  },
  {
    id: 12,
    name: 'Câu 10',
    question: 'Vui lòng cho biết độ tuổi của bạn',
    content: [
      { type: 'radio', meta: 'Dưới 10 tuổi' },
      { type: 'radio', meta: 'Từ 10 - 19 tuổi' },
      { type: 'radio', meta: 'Từ 20 - 29 tuổi' },
      { type: 'radio', meta: 'Từ 30 - 39 tuổi' },
      { type: 'radio', meta: 'Từ 40 - 49 tuổi' },
      { type: 'radio', meta: 'Từ 50 - 59 tuổi' },
      { type: 'radio', meta: 'Từ 60 tuổi trở lên' },
    ],
  },
  {
    id: 13,
    name: 'Câu 11',
    question: 'Vui lòng cho biết nơi mà bạn đang sống',
    content: [
      { type: 'radio', meta: 'Khu vực miền Bắc' },
      { type: 'radio', meta: 'Khu vực miền Trung' },
      { type: 'radio', meta: 'Khu vực miền Nam' },
    ],
  },
  {
    id: 14,
    name: 'Câu 12',
    question: 'Sở thích của bạn là gì?',
    content: [{ type: 'text', meta: 'Sở thích của bạn' }],
  },
  {
    id: 15,
    name: 'Câu 13',
    question:
      'Hiện tại những sản phẩm được giới thiệu trong trang web này đang dự định bán tại thị trường Việt Nam. Trường hợp bạn muốn cập nhật thông tin mới nhất từ thương hiệu thời trang thể thao và thường ngày của công ty chúng tôi, vui lòng nhập địa chỉ email của bạn vào ô bên dưới, chúng tôi sẽ gửi những thông tin về sản phẩm mới nhất cho bạn.',
    content: [
      { type: 'radio-text', meta: 'Địa chỉ email của bạn' },
      { type: 'radio', meta: 'Không có yêu cầu' },
    ],
  },
];
