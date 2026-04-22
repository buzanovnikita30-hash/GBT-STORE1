export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type OrderStatus =
  | "pending"
  | "paid"
  | "activating"
  | "waiting_client"
  | "active"
  | "failed"
  | "refunded"
  | "expired";

export type UserRole = "client" | "operator" | "admin";

export type ChatSessionStatus = "open" | "closed";
export type ChatSenderType = "client" | "operator" | "ai" | "auto";
export type ReviewStatus = "pending" | "approved" | "rejected";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          username: string | null;
          telegram_id: number | null;
          telegram_username: string | null;
          role: UserRole;
          created_at: string;
          last_seen: string | null;
          notes: string | null;
          tags: string[] | null;
        };
        Insert: {
          id: string;
          email?: string | null;
          username?: string | null;
          telegram_id?: number | null;
          telegram_username?: string | null;
          role?: UserRole;
          created_at?: string;
          last_seen?: string | null;
          notes?: string | null;
          tags?: string[] | null;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          product: string;
          plan_id: string;
          plan_name: string | null;
          price: number;
          currency: string;
          payment_method: string | null;
          payment_provider: string | null;
          payment_id: string | null;
          pally_order_id: string | null;
          status: OrderStatus;
          account_email: string | null;
          token_received_at: string | null;
          activated_at: string | null;
          expires_at: string | null;
          created_at: string;
          meta: Json | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          product: string;
          plan_id: string;
          plan_name?: string | null;
          price: number;
          currency?: string;
          payment_method?: string | null;
          payment_provider?: string | null;
          payment_id?: string | null;
          pally_order_id?: string | null;
          status?: OrderStatus;
          account_email?: string | null;
          token_received_at?: string | null;
          activated_at?: string | null;
          expires_at?: string | null;
          created_at?: string;
          meta?: Json | null;
        };
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>;
      };
      chat_sessions: {
        Row: {
          id: string;
          user_id: string | null;
          type: string;
          status: ChatSessionStatus;
          first_message_at: string | null;
          last_operator_reply_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          type?: string;
          status?: ChatSessionStatus;
          first_message_at?: string | null;
          last_operator_reply_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["chat_sessions"]["Insert"]>;
      };
      chat_messages: {
        Row: {
          id: string;
          session_id: string;
          sender_id: string | null;
          sender_type: ChatSenderType;
          content: string;
          attachments: Json | null;
          is_read: boolean;
          is_auto_reply: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          sender_id?: string | null;
          sender_type: ChatSenderType;
          content: string;
          attachments?: Json | null;
          is_read?: boolean;
          is_auto_reply?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["chat_messages"]["Insert"]>;
      };
      reviews: {
        Row: {
          id: string;
          telegram_message_id: number | null;
          telegram_chat_id: number | null;
          author_name: string | null;
          author_username: string | null;
          author_avatar_url: string | null;
          content: string;
          media_urls: Json | null;
          original_url: string | null;
          telegram_date: string | null;
          status: ReviewStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          telegram_message_id?: number | null;
          telegram_chat_id?: number | null;
          author_name?: string | null;
          author_username?: string | null;
          author_avatar_url?: string | null;
          content: string;
          media_urls?: Json | null;
          original_url?: string | null;
          telegram_date?: string | null;
          status?: ReviewStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["reviews"]["Insert"]>;
      };
      site_settings: {
        Row: {
          key: string;
          value: Json;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: Json;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["site_settings"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
