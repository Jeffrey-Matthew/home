import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import type { Category } from '../types';

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch all categories
    const fetchCategories = async () => {
        try {
            setLoading(true);
            setError(null);

            const { data, error: fetchError } = await supabase
                .from('categories')
                .select('*')
                .order('name', { ascending: true });

            if (fetchError) throw fetchError;

            setCategories(data || []);
        } catch (err) {
            console.error('Error fetching categories:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch categories');
        } finally {
            setLoading(false);
        }
    };

    // Add new category
    const addCategory = async (name: string, slug: string, description?: string) => {
        try {
            setError(null);

            const { data, error: insertError } = await supabase
                .from('categories')
                .insert([{ name, slug, description }])
                .select()
                .single();

            if (insertError) throw insertError;

            setCategories(prev => [...prev, data].sort((a, b) => a.name.localeCompare(b.name)));
            return data;
        } catch (err) {
            console.error('Error adding category:', err);
            setError(err instanceof Error ? err.message : 'Failed to add category');
            throw err;
        }
    };

    // Update existing category
    const updateCategory = async (id: string, name: string, slug: string, description?: string) => {
        try {
            setError(null);

            const { data, error: updateError } = await supabase
                .from('categories')
                .update({ name, slug, description })
                .eq('id', id)
                .select()
                .single();

            if (updateError) throw updateError;

            setCategories(prev =>
                prev.map(cat => (cat.id === id ? data : cat)).sort((a, b) => a.name.localeCompare(b.name))
            );
            return data;
        } catch (err) {
            console.error('Error updating category:', err);
            setError(err instanceof Error ? err.message : 'Failed to update category');
            throw err;
        }
    };

    // Delete category (with validation)
    const deleteCategory = async (id: string) => {
        try {
            setError(null);

            // Check if category is in use
            const { count, error: countError } = await supabase
                .from('projects')
                .select('*', { count: 'exact', head: true })
                .eq('category_id', id);

            if (countError) throw countError;

            if (count && count > 0) {
                throw new Error(`Cannot delete category: ${count} project(s) are using this category`);
            }

            const { error: deleteError } = await supabase
                .from('categories')
                .delete()
                .eq('id', id);

            if (deleteError) throw deleteError;

            setCategories(prev => prev.filter(cat => cat.id !== id));
        } catch (err) {
            console.error('Error deleting category:', err);
            setError(err instanceof Error ? err.message : 'Failed to delete category');
            throw err;
        }
    };

    // Fetch categories on mount
    useEffect(() => {
        fetchCategories();
    }, []);

    return {
        categories,
        loading,
        error,
        fetchCategories,
        addCategory,
        updateCategory,
        deleteCategory,
    };
};
