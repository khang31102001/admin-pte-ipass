export type InboxStatus =
  | "NEW"          // tin mới
  | "READ"         // đã xem
  | "PROCESSING"   // đang xử lý
  | "DONE"         // đã xử lý xong
  | "SPAM";        // spam / không hợp lệ



export interface InboxMessage {
  id: number;

  fullName: string;
  phone?: string | null;
  email?: string | null;
  targetPteScore?: string | null;
  message?: string | null;
  status: InboxStatus;


  // tracking (marketing)
  sourcePage?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;

  createdAt: string; 
  updatedAt: string; 
}

// =======================
// Outbound Contact (Liên hệ đi)
// =======================
export interface OutboundContact {
  id: number;
  inboxMessageId: number;
  channel: string;         
  to: string;                   
  subject?: string | null;      
  content: string;              
  provider?: string;
  deliveryStatus?: "PENDING" | "SENT" | "FAILED";
  errorMessage?: string | null;
  createdAt: string;
  createdBy: string;          
}
