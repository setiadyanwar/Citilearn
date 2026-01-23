import React from 'react';

const QuizOption = ({ option, idx, isSelected, onClick }) => {
    return (
        <button
            onClick={() => onClick(idx)}
            className={`
                w-full flex items-center gap-4 p-2 rounded-2xl text-left transition-all border
                ${isSelected
                    ? 'bg-[#EBF7F2] border-[#059669] text-[#059669]'
                    : 'bg-transparent border-transparent hover:bg-slate-50 text-slate-600 dark:text-slate-400'}
            `}
        >
            <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 transition-all
                ${isSelected ? 'bg-[#059669] text-white' : 'bg-[#F8FAFC] dark:bg-slate-800 text-slate-400'}
            `}>
                {String.fromCharCode(65 + idx)}
            </div>
            <span className="text-sm font-medium">{option}</span>
        </button>
    );
};

export default QuizOption;
