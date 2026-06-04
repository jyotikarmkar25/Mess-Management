import React from 'react';

const nutritionData = {
    stats: [
        { label: 'Average Daily Calories', value: '2,400 kcal', icon: 'fa-fire' },
        { label: 'Daily Protein', value: '85g', icon: 'fa-dumbbell' },
        { label: 'Dietary Status', value: 'Balanced', icon: 'fa-chart-pie' }
    ],
    breakdown: [
        { nutrient: 'Carbohydrates', amount: '320g', dailyValue: '65%' },
        { nutrient: 'Proteins', amount: '85g', dailyValue: '20%' },
        { nutrient: 'Fats', amount: '55g', dailyValue: '15%' }
    ]
};

const NutritionDashboard = () => {
    return (
        <div id="nutrition" className="content-section active">
            <div className="section-header" style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem' }}>System Health & Metrics</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Monitor dietary intake throughput and nutritional latency metrics.</p>
            </div>
            
            <div className="nutrition-grid">
                {nutritionData.stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                        <div className="stat-label-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase' }}>
                            <i className={`fas ${stat.icon}`} style={{ fontSize: '0.8rem' }}></i>
                            {stat.label}
                        </div>
                        <div className="stat-value" style={{ fontSize: '1.5rem', fontWeight: '600', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                            {stat.value}
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="nutrition-details">
                <div className="table-header-row" style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)', fontSize: '0.8rem', fontWeight: '600' }}>
                    Nutritional Breakdown Artifact
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Nutrient Component</th>
                                <th>Quantity (g)</th>
                                <th>% Threshold</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nutritionData.breakdown.map((row, index) => (
                                <tr key={index}>
                                    <td style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{row.nutrient}</td>
                                    <td>{row.amount}</td>
                                    <td style={{ color: 'var(--primary)', fontWeight: '700' }}>{row.dailyValue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default NutritionDashboard;