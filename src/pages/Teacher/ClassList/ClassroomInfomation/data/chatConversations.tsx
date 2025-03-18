// data/chatConversations.ts
import { ChatConversation } from "../types/chatConversation";
import { chatCategories } from "./questionCategory";
import { chatMessages } from "./chatMessages";

export const chatConversations: ChatConversation[] = [
    // Dữ liệu cũ
    {
      id: 1,
      avatar: "https://cdn-icons-png.flaticon.com/128/4727/4727424.png",
      displayName: "Nguyễn Văn A",
      status: "online",
      preview: "Chào bạn, mình có một số câu hỏi về dự án này.",
      timestamp: "2025-03-09T10:30:00Z",
      category: chatCategories[0],
      messages: chatMessages.filter((msg) => msg.conversationId === 1),
    },
    {
      id: 2,
      avatar: "https://cdn-icons-png.flaticon.com/128/4727/4727424.png",
      displayName: "Trần Thị B",
      status: "offline",
      preview: "Bạn có thể kiểm tra lại file đính kèm trong email không?",
      timestamp: "2025-03-09T09:45:00Z",
      category: chatCategories[1],
      messages: chatMessages.filter((msg) => msg.conversationId === 2),
    },
    {
      id: 3,
      avatar: "https://cdn-icons-png.flaticon.com/128/4727/4727424.png",
      displayName: "Nhóm Chat Công Nghệ",
      status: "online",
      preview: "Thông báo: Cuộc họp online sẽ bắt đầu vào 3 giờ chiều.",
      timestamp: "2025-03-08T16:20:00Z",
      category: chatCategories[3],
      messages: chatMessages.filter((msg) => msg.conversationId === 3),
    },
    {
      id: 4,
      avatar: "https://cdn-icons-png.flaticon.com/128/4727/4727424.png",
      displayName: "Hệ thống",
      status: "online",
      preview: "Cập nhật mới: Hệ thống đã được nâng cấp thành công.",
      timestamp: "2025-03-07T14:05:00Z",
      category: chatCategories[2],
      messages: chatMessages.filter((msg) => msg.conversationId === 4),
    },
    // Dữ liệu mới thêm
    {
      id: 5,
      avatar: "https://cdn-icons-png.flaticon.com/128/4727/4727424.png",
      displayName: "Lê Minh C",
      status: "away",
      preview: "Mình có một số gợi ý cho thiết kế mới.",
      timestamp: "2025-03-06T18:10:00Z",
      category: chatCategories[0],
      messages: chatMessages.filter((msg) => msg.conversationId === 5),
    },
    {
      id: 6,
      avatar: "https://cdn-icons-png.flaticon.com/128/4727/4727424.png",
      displayName: "Phạm Văn D",
      status: "offline",
      preview: "Bạn có thể gửi lại báo cáo doanh số tháng trước không?",
      timestamp: "2025-03-06T12:30:00Z",
      category: chatCategories[1],
      messages: chatMessages.filter((msg) => msg.conversationId === 6),
    },
    {
      id: 7,
      avatar: "https://cdn-icons-png.flaticon.com/128/4727/4727424.png",
      displayName: "Nhóm Dự Án X",
      status: "online",
      preview: "Mọi người đã xem tài liệu mới chưa?",
      timestamp: "2025-03-05T15:55:00Z",
      category: chatCategories[3],
      messages: chatMessages.filter((msg) => msg.conversationId === 7),
    },
    {
      id: 8,
      avatar: "https://cdn-icons-png.flaticon.com/128/4727/4727424.png",
      displayName: "Hỗ trợ kỹ thuật",
      status: "online",
      preview: "Xin chào, bạn cần hỗ trợ gì?",
      timestamp: "2025-03-04T09:20:00Z",
      category: chatCategories[2],
      messages: chatMessages.filter((msg) => msg.conversationId === 8),
    },
    {
      id: 9,
      avatar: "https://cdn-icons-png.flaticon.com/128/4727/4727424.png",
      displayName: "Nguyễn Hữu E",
      status: "away",
      preview: "Mình đang gặp lỗi khi chạy dự án, bạn có thể giúp không?",
      timestamp: "2025-03-03T20:45:00Z",
      category: chatCategories[0],
      messages: chatMessages.filter((msg) => msg.conversationId === 9),
    },
    {
      id: 10,
      avatar: "https://cdn-icons-png.flaticon.com/128/4727/4727424.png",
      displayName: "Trần Văn F",
      status: "offline",
      preview: "Cảm ơn bạn đã giúp đỡ!",
      timestamp: "2025-03-02T11:05:00Z",
      category: chatCategories[1],
      messages: chatMessages.filter((msg) => msg.conversationId === 10),
    },
  ];

