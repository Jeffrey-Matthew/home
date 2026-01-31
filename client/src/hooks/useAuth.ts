import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useError } from '../context/ErrorContext';
import type { Session, User } from '@supabase/supabase-js';

export const useAuth = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const { showError } = useError();

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });
            if (error) throw error;
        } catch (error) {
            if (error instanceof Error) {
                showError(error.message);
            } else {
                showError('An unknown error occurred');
            }
        }
    };

    const logout = async () => {
        await supabase.auth.signOut();
    };

    return { session, user, loading, login, logout };
};
