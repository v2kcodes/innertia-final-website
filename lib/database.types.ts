export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          company: string | null
          service_interest: string | null
          message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          company?: string | null
          service_interest?: string | null
          message?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          company?: string | null
          service_interest?: string | null
          message?: string | null
          created_at?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          subscribed: boolean
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          subscribed?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          subscribed?: boolean
          created_at?: string
        }
        Relationships: []
      }
      service_inquiries: {
        Row: {
          id: string
          service_type: string
          budget_range: string | null
          timeline: string | null
          requirements: string | null
          contact_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          service_type: string
          budget_range?: string | null
          timeline?: string | null
          requirements?: string | null
          contact_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          service_type?: string
          budget_range?: string | null
          timeline?: string | null
          requirements?: string | null
          contact_id?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_inquiries_contact_id_fkey"
            columns: ["contact_id"]
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types
export type Contact = Database['public']['Tables']['contacts']['Row']
export type ContactInsert = Database['public']['Tables']['contacts']['Insert']
export type ContactUpdate = Database['public']['Tables']['contacts']['Update']

export type NewsletterSubscriber = Database['public']['Tables']['newsletter_subscribers']['Row']
export type NewsletterSubscriberInsert = Database['public']['Tables']['newsletter_subscribers']['Insert']

export type ServiceInquiry = Database['public']['Tables']['service_inquiries']['Row']
export type ServiceInquiryInsert = Database['public']['Tables']['service_inquiries']['Insert']