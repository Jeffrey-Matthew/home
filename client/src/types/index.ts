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
    longDescription?: string;
    tags: string[];
    category: 'business-analysis' | 'development' | 'hybrid';
    metrics?: {
        label: string;
        value: string;
    }[];
    links?: {
        github?: string;
        demo?: string;
        caseStudy?: string;
    };
    image?: string;
    featured?: boolean;
}

export interface Skill {
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    category: 'business' | 'technical';
}
