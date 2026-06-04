import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, setDoc, doc, onSnapshot } from 'firebase/firestore';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const MenuManagement = () => {
    const [menu, setMenu] = useState({});
    const [loading, setLoading] = useState(true);
    const [editingDay, setEditingDay] = useState(null);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'weeklyMenu'), (snapshot) => {
            const menuData = {};
            snapshot.forEach(doc => {
                menuData[doc.id] = doc.data();
            });
            // Fill in missing days
            daysOfWeek.forEach(day => {
                if (!menuData[day]) {
                    menuData[day] = { breakfast: '', lunch: '', snacks: '', dinner: '' };
                }
            });
            setMenu(menuData);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleEdit = (day) => {
        setEditingDay(day);
        setEditData(menu[day] || { breakfast: '', lunch: '', snacks: '', dinner: '' });
    };

    const handleSave = async (day) => {
        try {
            await setDoc(doc(db, 'weeklyMenu', day), editData);
            setEditingDay(null);
            alert(`Menu for ${day} updated successfully!`);
        } catch (error) {
            alert('Error updating menu: ' + error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    if (loading) return <div>Loading menu...</div>;

    return (
        <div className="content-section">
            <div className="section-header">
                <h2>Weekly Menu Management</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Update the mess menu for the entire week.</p>
            </div>
            
            <div className="nutrition-details" style={{ marginTop: '2rem' }}>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>Breakfast</th>
                                <th>Lunch</th>
                                <th>Evening Snacks</th>
                                <th>Dinner</th>
                                <th style={{ textAlign: 'center' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {daysOfWeek.map(day => (
                                <tr key={day}>
                                    <td style={{ fontWeight: '700', color: 'var(--primary)' }}>{day}</td>
                                    {editingDay === day ? (
                                        <>
                                            <td><input name="breakfast" value={editData.breakfast} onChange={handleChange} className="admin-input" /></td>
                                            <td><input name="lunch" value={editData.lunch} onChange={handleChange} className="admin-input" /></td>
                                            <td><input name="snacks" value={editData.snacks} onChange={handleChange} className="admin-input" /></td>
                                            <td><input name="dinner" value={editData.dinner} onChange={handleChange} className="admin-input" /></td>
                                            <td style={{ textAlign: 'center', minWidth: '150px' }}>
                                                <button onClick={() => handleSave(day)} className="submit-btn" style={{ padding: '0.4rem 0.8rem', width: 'auto', marginRight: '5px' }}>Save</button>
                                                <button onClick={() => setEditingDay(null)} className="view-detail-btn" style={{ padding: '0.4rem 0.8rem', width: 'auto', marginTop: 0 }}>Cancel</button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{menu[day]?.breakfast || '-'}</td>
                                            <td>{menu[day]?.lunch || '-'}</td>
                                            <td>{menu[day]?.snacks || '-'}</td>
                                            <td>{menu[day]?.dinner || '-'}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <button onClick={() => handleEdit(day)} className="view-detail-btn" style={{ padding: '0.4rem 0.8rem', width: 'auto', marginTop: 0 }}>Edit</button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <style>{`
                .admin-input {
                    background: var(--bg-primary);
                    border: 1px solid var(--border);
                    color: var(--text-primary);
                    padding: 0.5rem;
                    border-radius: 4px;
                    width: 100%;
                }
                .admin-input:focus {
                    border-color: var(--primary);
                    outline: none;
                }
                .table-container {
                    overflow-x: auto;
                }
            `}</style>
        </div>
    );
};

export default MenuManagement;
