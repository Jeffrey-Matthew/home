import { useState, useRef } from 'react';
import type { Project } from '../../types';
import { useProjects } from '../../hooks/useProjects';
import { useCategories } from '../../hooks/useCategories';

interface ProjectFormProps {
    initialData?: Project;
    onSave: () => void;
    onCancel: () => void;
}

export const ProjectForm = ({ initialData, onSave, onCancel }: ProjectFormProps) => {
    const { addProject, updateProject, uploadImage, loading: hookLoading } = useProjects();
    const { categories, loading: categoriesLoading } = useCategories();
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState<Partial<Project>>({
        title: initialData?.title || '',
        description: initialData?.description || '',
        image_url: initialData?.image_url || '',
        tags: initialData?.tags || [],
        category_id: initialData?.category_id || (categories[0]?.id || ''),
        link: initialData?.link || '',
        github_url: initialData?.github_url || '',
        featured: initialData?.featured || false
    });

    // For tag input
    const [tagInput, setTagInput] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            if (initialData?.id) {
                await updateProject(initialData.id, formData);
            } else {
                // Ensure required fields are present for new project
                if (!formData.title || !formData.description || !formData.image_url) {
                    alert('Please fill in required fields');
                    setSubmitting(false);
                    return;
                }
                await addProject(formData as Omit<Project, 'id' | 'created_at'>);
            }
            onSave();
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                alert(`Error saving project: ${error.message}`);
            } else {
                alert('Error saving project');
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            try {
                setSubmitting(true);
                const url = await uploadImage(e.target.files[0]);
                setFormData(prev => ({ ...prev, image_url: url }));
            } catch (error) {
                console.error(error);
                alert('Error uploading image');
            } finally {
                setSubmitting(false);
            }
        }
    };

    const addTag = () => {
        if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...(prev.tags || []), tagInput.trim()]
            }));
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags?.filter(tag => tag !== tagToRemove)
        }));
    };

    const isLoading = submitting || hookLoading;

    return (
        <form onSubmit={handleSubmit} className="project-form" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <h3>{initialData ? 'Edit Project' : 'Add New Project'}</h3>

            <div className="form-group">
                <label>Title *</label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="form-control"
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)' }}
                />
            </div>

            <div className="form-group">
                <label>Description *</label>
                <textarea
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)' }}
                />
            </div>

            <div className="form-group">
                <label>Category *</label>
                <select
                    value={formData.category_id}
                    onChange={e => setFormData({ ...formData, category_id: e.target.value })}
                    required
                    disabled={categoriesLoading}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)' }}
                >
                    {categoriesLoading ? (
                        <option>Loading categories...</option>
                    ) : categories.length === 0 ? (
                        <option>No categories available</option>
                    ) : (
                        categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))
                    )}
                </select>
            </div>

            <div className="form-group">
                <label>Image *</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isLoading}
                    >
                        {formData.image_url ? 'Change Image' : 'Upload Image'}
                    </button>
                    {formData.image_url && (
                        <img src={formData.image_url} alt="Preview" style={{ height: '50px', borderRadius: '4px' }} />
                    )}
                </div>
            </div>

            <div className="form-group">
                <label>Tags</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <input
                        type="text"
                        value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                        placeholder="Add a tag..."
                        style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)' }}
                    />
                    <button type="button" className="btn btn-secondary" onClick={addTag}>Add</button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {formData.tags?.map(tag => (
                        <span key={tag} style={{ background: 'var(--primary-color)', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {tag}
                            <button type="button" onClick={() => removeTag(tag)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 0 }}>×</button>
                        </span>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label>Live Link</label>
                <input
                    type="url"
                    value={formData.link}
                    onChange={e => setFormData({ ...formData, link: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)' }}
                />
            </div>

            <div className="form-group">
                <label>GitHub URL</label>
                <input
                    type="url"
                    value={formData.github_url}
                    onChange={e => setFormData({ ...formData, github_url: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)' }}
                />
            </div>

            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                />
                <label htmlFor="featured">Featured Project</label>
            </div>

            <div className="form-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Project'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={isLoading}>
                    Cancel
                </button>
            </div>

            {/* Debug Section */}
            <div style={{ marginTop: '2rem', padding: '1rem', background: '#000', color: '#0f0', borderRadius: '4px', fontSize: '0.8rem', overflow: 'auto' }}>
                <p><strong>Debug Info:</strong></p>
                <p>Status: {submitting ? 'Submitting...' : 'Idle'}</p>
                <p>Env Checks:</p>
                <ul>
                    <li>URL Configured: {import.meta.env.VITE_SUPABASE_URL ? 'YES' : 'NO'}</li>
                    <li>Key Configured: {import.meta.env.VITE_SUPABASE_ANON_KEY ? 'YES' : 'NO'}</li>
                    <li>Email Configured: {import.meta.env.VITE_ADMIN_EMAIL ? 'YES' : 'NO'}</li>
                </ul>
                <p>Form Data Preview:</p>
                <pre>{JSON.stringify(formData, null, 2)}</pre>
            </div>
        </form>
    );
};
