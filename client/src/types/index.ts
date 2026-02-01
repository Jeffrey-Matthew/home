import type { Session, User } from '@supabase/supabase-js';

export interface AuthContextType {
    session: Session | null;
    user: User | null;
    loading: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    image_url: string;
    tags: string[];
    category: 'business' | 'development' | 'hybrid';
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
