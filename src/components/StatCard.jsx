import React from 'react';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = 'orange' }) => {
  const bgColors = {
    orange: 'bg-[#ff4700]/15',
    green:  'bg-green-500/15',
    purple: 'bg-purple-500/15',
    blue:   'bg-[#ff4700]/15',
  };

  const textColors = {
    orange: 'text-[#ff4700]',
    green:  'text-green-400',
    purple: 'text-purple-400',
    blue:   'text-[#ff4700]',
  };

  const borderColors = {
    orange: 'border-[#ff4700]/20',
    green:  'border-green-500/20',
    purple: 'border-purple-500/20',
    blue:   'border-[#ff4700]/20',
  };

  return (
    <div className={`bg-[#111] border ${borderColors[color] || 'border-white/5'} rounded-xl p-5 hover:border-opacity-50 transition-all`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-lg ${bgColors[color]} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${textColors[color]}`} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-bold ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
            <span>{trend === 'up' ? '↑' : '↓'}</span>
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">{title}</h3>
      <p className="text-3xl font-black text-white">{value}</p>
    </div>
  );
};

export default StatCard;
