import React from 'react';

const QuizOption = ({ option, idx, isSelected, onClick }) => {
    return (
        <button
            onClick={() => onClick(idx)}
            className={`
                w-full flex items-center gap-4 p-2 rounded-2xl text-left transition-all border
                ${isSelected
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'bg-transparent border-transparent hover:bg-slate-50 text-secondary dark:text-slate-400'}
            `}
        >
            <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 transition-all
                ${isSelected ? 'bg-primary text-white' : 'bg-gray-50 dark:bg-slate-800 text-tertiary'}
            `}>
                {String.fromCharCode(65 + idx)}
            </div>
            <span className="text-sm font-medium">{option}</span>
        </button>
    );
};

export default QuizOption;
