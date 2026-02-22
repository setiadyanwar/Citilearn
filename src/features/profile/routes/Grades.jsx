import React, { useState } from 'react';
import { Clock, BookOpen } from 'lucide-react';
import MainSearchBar from '@/features/dashboard/components/MainSearchBar';
import Pagination from '@/components/common/Pagination';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import EmptyState from '@/components/common/EmptyState';
import data from '@/data.json';
import { cn } from '@/lib/utils';

const GradesIcon = () => (
    <svg width="64" height="64" viewBox="0 0 51 54" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <circle cx="26.6416" cy="24" r="24" fill="#F9FFFC" />
        <path d="M27.1421 27.7035C27.0054 28.0439 27.0163 28.4444 27.1703 28.7741L29.3584 33.304C29.5435 33.688 29.5254 34.1672 29.3124 34.5301C29.1077 34.8994 28.7455 35.0924 28.3817 35.0293L24.0819 34.3436C23.9319 34.3181 23.7793 34.3361 23.635 34.3941L23.414 34.4914C23.3415 34.539 23.2753 34.6016 23.2205 34.6771L20.2968 38.5562C20.1508 38.7433 19.9601 38.8708 19.7503 38.9196C19.234 39.0219 18.7441 38.6079 18.6463 37.9867L17.9095 32.8177C17.8509 32.4427 17.6453 32.1257 17.3582 31.9674L13.3718 29.815C13.0383 29.6347 12.8218 29.2387 12.8164 28.7978C12.8079 28.3594 13.001 27.9517 13.3186 27.7393L17.1585 25.2432C17.4553 25.069 17.6578 24.723 17.6953 24.3268L18.1468 19.1147C18.1595 18.9975 18.1868 18.8827 18.2297 18.7767L18.2823 18.6754C18.3052 18.6073 18.3365 18.5455 18.375 18.4894L18.452 18.4109L18.5699 18.2808L18.9133 18.1296C19.2316 18.0329 19.5686 18.1358 19.8096 18.4048L22.9488 22.0133C23.1766 22.2782 23.4978 22.3902 23.807 22.3154L28.0757 21.2406C28.4362 21.1489 28.8087 21.3086 29.0411 21.6529C29.2672 22.0011 29.3058 22.4753 29.1405 22.8708L27.1421 27.7035Z" fill="url(#paint0_linear_grades)" />
        <g opacity="0.5" filter="url(#filter0_f_grades)">
            <path d="M23.3822 25.0823C21.5152 25.0823 20 26.9134 20 29.1687C20 31.4248 21.5152 33.255 23.3822 33.255C25.2525 33.255 26.7643 31.4248 26.7643 29.1687C26.7643 26.9134 25.2525 25.0823 23.3822 25.0823Z" fill="#FF3D22" />
        </g>
        <path d="M34.1951 9.30276C34.2144 9.30863 34.2335 9.31594 34.2522 9.32417C34.7602 9.54786 35.1273 10.0126 35.2939 10.5542L35.353 10.7907L35.3536 10.797L36.5257 17.2944L36.5262 17.2966C36.5839 17.6249 36.7616 17.8504 36.9529 17.9486L42.0714 20.4936L42.0705 20.4933C42.6693 20.7891 43.0483 21.4135 43.1367 22.0825L43.1503 22.2178L43.1506 22.226C43.192 22.9461 42.8885 23.644 42.3363 24.0158L42.337 24.017L37.3863 27.3768C37.1692 27.5306 37.0086 27.8202 36.9837 28.1613L36.6129 34.8072L36.6127 34.8082C36.5721 35.5228 36.1909 36.1724 35.5874 36.4516L35.5881 36.4528C34.9707 36.7551 34.241 36.5992 33.7384 36.0468L33.7386 36.0458L29.6265 31.628L29.6232 31.625C29.5622 31.5583 29.4938 31.5069 29.4207 31.471L29.3466 31.4404L29.1326 31.3754C29.1008 31.3743 29.0681 31.3766 29.0359 31.3867L29.0263 31.3899L29.0256 31.3887L23.6651 32.9499L23.6566 32.9524C23.2851 33.0525 22.8862 33.0122 22.5221 32.8235C22.5173 32.821 22.5127 32.8178 22.5079 32.8151C21.6182 32.318 21.3129 31.1437 21.6405 30.2271L21.6439 30.22L23.9173 24.1517C24.0305 23.8305 24.0023 23.4765 23.8678 23.2096L23.868 23.2087L20.9485 17.5185C20.617 16.8715 20.6333 16.0839 20.9611 15.4802C21.2811 14.883 21.8792 14.4961 22.5562 14.5698L22.5639 14.5712L28.0729 15.2526L28.0959 15.2566C28.3076 15.2935 28.5666 15.2017 28.7571 14.9338L32.3037 9.84666L32.3096 9.83728C32.4174 9.69054 32.5482 9.55751 32.7007 9.45184L32.744 9.42534L32.8357 9.37594C32.9267 9.30957 33.0239 9.25763 33.1271 9.22147L33.218 9.20026L33.3313 9.18586L33.525 9.15219C33.5969 9.13956 33.6723 9.14407 33.7447 9.16602L34.1951 9.30276Z" fill="#FFAC95" fill-opacity="0.4" stroke="url(#paint1_linear_grades)" stroke-linecap="round" stroke-linejoin="round" />
        <defs>
            <filter id="filter0_f_grades" x="0" y="5.08228" width="46.7646" height="48.1729" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur_grades" />
            </filter>
            <linearGradient id="paint0_linear_grades" x1="13.9397" y1="26.1168" x2="34.9496" y2="42.4095" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FFA78F" />
                <stop offset="1" stop-color="#F23E2C" />
            </linearGradient>
            <linearGradient id="paint1_linear_grades" x1="26.0594" y1="10.3942" x2="37.7814" y2="32.8324" gradientUnits="userSpaceOnUse">
                <stop stop-color="white" stop-opacity="0.25" />
                <stop offset="1" stop-color="white" stop-opacity="0" />
            </linearGradient>
        </defs>
    </svg>
);

const Grades = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;

    // Consistent filtering with MyLearning page
    const enrolledCourses = data.courses.filter(c => c.status !== 'Not Started');

    // Mock grades for the demo
    const mockGrades = ['A', 'B', 'AB', 'AB', 'AB', 'C'];
    const processedCourses = enrolledCourses.map((course, index) => ({
        ...course,
        grade: mockGrades[index % mockGrades.length]
    })).filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(processedCourses.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedCourses = processedCourses.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const getGradeVariant = (grade) => {
        switch (grade) {
            case 'A': return 'success';
            case 'B': return 'warning';
            case 'AB': return 'points';
            case 'C': return 'danger';
            default: return 'outline';
        }
    };

    const getGradeColorStyle = (grade) => {
        switch (grade) {
            case 'A': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'B': return 'bg-orange-50 text-orange-500 border-orange-100';
            case 'AB': return 'bg-sky-50 text-sky-500 border-sky-100';
            case 'C': return 'bg-rose-50 text-rose-500 border-rose-100';
            default: return '';
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="w-full animate-fade-in relative flex flex-col min-h-screen lg:min-h-0">
            {/* Main Content Scrollable Area */}
            <div className="px-2 sm:px-0 space-y-6 pb-20">
                {/* Standard Header Pattern */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <GradesIcon />
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-main tracking-tight">Grades</h2>
                            <p className="text-tertiary font-medium">Track your learning journey with clarity.</p>
                        </div>
                    </div>

                    <div className="w-full lg:w-96">
                        <MainSearchBar
                            searchQuery={searchQuery}
                            handleSearch={handleSearch}
                            variant="inline"
                        />
                    </div>
                </div>

                {/* Content Container using standard Card */}
                <Card padding="p-0" rounded="rounded-4xl" className="overflow-hidden border-gray-100 shadow-none bg-white">
                    <div className="divide-y divide-gray-50">
                        {paginatedCourses.length > 0 ? (
                            paginatedCourses.map((course) => (
                                <div key={course.id} className="p-6 sm:p-8 hover:bg-gray-50/50 transition-all group">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                        <div className="space-y-3">
                                            <h3 className="font-bold text-main text-xl group-hover:text-primary transition-colors line-clamp-1">{course.title}</h3>
                                            <p className="text-tertiary font-medium line-clamp-1 max-w-2xl">
                                                {course.description || 'Full course curriculum details and performance report.'}
                                            </p>
                                            <div className="flex items-center gap-4">
                                                <Badge
                                                    variant="outline"
                                                    className="bg-gray-50 border-transparent text-tertiary"
                                                    size="sm"
                                                    leftIcon={<Clock size={14} className="text-emerald-500" />}
                                                >
                                                    {course.duration || '3h 15m'}
                                                </Badge>
                                                <Badge
                                                    variant="outline"
                                                    className="bg-gray-50 border-transparent text-tertiary"
                                                    size="sm"
                                                    leftIcon={<BookOpen size={14} className="text-emerald-500" />}
                                                >
                                                    {course.modulesCount || course.modules?.length || 5} Modules
                                                </Badge>
                                            </div>
                                        </div>

                                        <Badge
                                            variant={getGradeVariant(course.grade)}
                                            size="md"
                                            className={cn("px-4 py-1.5 font-bold text-sm whitespace-nowrap border", getGradeColorStyle(course.grade))}
                                        >
                                            <span className="text-base font-black">{course.grade}</span>
                                        </Badge>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-10">
                                <EmptyState
                                    title="No Results Found"
                                    message={`We couldn't find any grades matching "${searchQuery}"`}
                                />
                            </div>
                        )}
                    </div>
                </Card>

                {/* Standard Pagination Component */}
                {totalPages > 1 && (
                    <div className="flex justify-center -mt-2">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )}
            </div>

            {/* Docker-style Sticky Average Summary */}
            <div className="sticky bottom-0 left-0 right-0 z-40 mt-auto -mx-4 lg:mx-0">
                <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 px-6 py-6 sm:px-10 flex items-center justify-between rounded-t-4xl">
                    <span className="text-xl font-bold text-main">Average</span>
                    <Badge variant="points" size="md" className="bg-sky-50 text-sky-500 border-sky-100 px-6 py-2 font-bold text-sm">
                        Grade: <span className="ml-1 text-base font-black ">AB</span>
                    </Badge>
                </div>
            </div>
        </div>
    );
};

export default Grades;
