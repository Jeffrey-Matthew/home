import type { Session, User } from '@supabase/supabase-js';

export interface AuthContextType {
    session: Session | null;
    user: User | null;
    loading: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    created_at?: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    image_url: string;
    tags: string[];
    category_id: string;
    category?: Category; // Optional joined data
    link?: string;
    github_url?: string;
    featured?: boolean;
    created_at?: string;
}

export interface Skill {
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    category: 'business' | 'technical';
}
