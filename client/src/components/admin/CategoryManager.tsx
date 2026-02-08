import { useState } from 'react';
import { useCategories } from '../../hooks/useCategories';
import type { Category } from '../../types';
import './CategoryManager.css';

export const CategoryManager = () => {
    const { categories, loading, error, addCategory, updateCategory, deleteCategory } = useCategories();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ name: '', slug: '', description: '' });

    const handleStartAdd = () => {
        setFormData({ name: '', slug: '', description: '' });
        setIsAdding(true);
        setEditingId(null);
    };

    const handleStartEdit = (category: Category) => {
        setFormData({
            name: category.name,
            slug: category.slug,
            description: category.description || '',
        });
        setEditingId(category.id);
        setIsAdding(false);
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditingId(null);
        setFormData({ name: '', slug: '', description: '' });
    };

    const handleSave = async () => {
        try {
            if (!formData.name.trim() || !formData.slug.trim()) {
                alert('Name and slug are required');
                return;
            }

            if (editingId) {
                await updateCategory(editingId, formData.name, formData.slug, formData.description);
            } else {
                await addCategory(formData.name, formData.slug, formData.description);
            }

            handleCancel();
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to save category');
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (window.confirm(`Are you sure you want to delete "${name}"? This will fail if any projects use this category.`)) {
            try {
                await deleteCategory(id);
            } catch (err) {
                alert(err instanceof Error ? err.message : 'Failed to delete category');
            }
        }
    };

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
    };

    const handleNameChange = (name: string) => {
        setFormData(prev => ({
            ...prev,
            name,
            slug: editingId ? prev.slug : generateSlug(name), // Auto-generate slug only when adding
        }));
    };

    if (loading) {
        return <div className="category-manager"><p>Loading categories...</p></div>;
    }

    return (
        <div className="category-manager">
            <div className="category-header">
                <h3>📁 Manage Categories</h3>
                {!isAdding && !editingId && (
                    <button className="btn btn-primary btn-sm" onClick={handleStartAdd}>
                        + Add Category
                    </button>
                )}
            </div>

            {error && <div className="error-message">{error}</div>}

            {(isAdding || editingId) && (
                <div className="category-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Name *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleNameChange(e.target.value)}
                                placeholder="e.g., Business Analysis"
                            />
                        </div>
                        <div className="form-group">
                            <label>Slug *</label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                placeholder="e.g., business-analysis"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Optional description of this category"
                            rows={2}
                        />
                    </div>
                    <div className="form-actions">
                        <button className="btn btn-primary" onClick={handleSave}>
                            {editingId ? 'Update' : 'Create'}
                        </button>
                        <button className="btn btn-secondary" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <div className="categories-list">
                {categories.length === 0 ? (
                    <p className="empty-state">No categories yet. Add one to get started!</p>
                ) : (
                    categories.map((category) => (
                        <div key={category.id} className="category-item">
                            <div className="category-info">
                                <h4>{category.name}</h4>
                                <span className="category-slug">{category.slug}</span>
                                {category.description && <p className="category-description">{category.description}</p>}
                            </div>
                            <div className="category-actions">
                                <button
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => handleStartEdit(category)}
                                    disabled={editingId !== null || isAdding}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-secondary btn-sm btn-danger"
                                    onClick={() => handleDelete(category.id, category.name)}
                                    disabled={editingId !== null || isAdding}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
