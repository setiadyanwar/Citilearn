import React from 'react';
import Card from '@/components/common/Card';

const QuizRules = ({ title, questionCount, passingScore = 75, durationMinutes = 5, retryWaitMinutes = 1 }) => {
    return (
        <div>
            <h3 className="text-2xl font-bold text-main dark:text-white mb-4">
                Aturan
            </h3>
            <div className="text-main dark:text-slate-300 space-y-4 leading-relaxed text-base">
                <p>
                    Ujian ini bertujuan untuk menguji pengetahuan Anda tentang materi <strong>{title}</strong>.
                </p>
                <p>
                    Terdapat <strong>{questionCount} pertanyaan</strong> yang harus dikerjakan dalam kuis ini. Beberapa ketentuannya sebagai berikut:
                </p>
                <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                        <span>Syarat nilai kelulusan : <strong>{passingScore}%</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                        <span>Durasi ujian : <strong>{durationMinutes} menit</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                        <span>
                            Apabila tidak memenuhi syarat kelulusan, maka Anda harus menunggu selama <strong>{retryWaitMinutes} menit</strong> untuk mengulang pengerjaan kuis kembali.
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default QuizRules;
