import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import type { Project } from '../types';
import { useError } from '../context/ErrorContext';

export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const { showError } = useError();

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProjects(data || []);
        } catch (err) {
            if (err instanceof Error) {
                showError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const addProject = async (project: Omit<Project, 'id' | 'created_at'>) => {
        const { data, error } = await supabase
            .from('projects')
            .insert([project])
            .select()
            .single();

        if (error) throw error;
        setProjects([data, ...projects]);
        return data;
    };

    const updateProject = async (id: string, updates: Partial<Project>) => {
        const { data, error } = await supabase
            .from('projects')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        setProjects(projects.map(p => p.id === id ? data : p));
        return data;
    };

    const deleteProject = async (id: string) => {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) throw error;
        setProjects(projects.filter(p => p.id !== id));
    };

    const uploadImage = async (file: File) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('portfolio-images')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
            .from('portfolio-images')
            .getPublicUrl(filePath);

        return data.publicUrl;
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return {
        projects,
        loading,
        addProject,
        updateProject,
        deleteProject,
        uploadImage,
        refresh: fetchProjects
    };
};
