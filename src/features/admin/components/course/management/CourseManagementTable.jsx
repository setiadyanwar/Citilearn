import React from 'react';
import {
    Clock,
    Edit,
    Users,
    LayoutGrid,
    List
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const CourseManagementTable = ({ courses, getCategoryColor }) => {
    return (
        <div className="border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-none">
            <Table>
                <TableHeader className="bg-slate-50 border-b border-slate-200">
                    <TableRow className="hover:bg-transparent border-none">
                        <TableHead className="w-[40%] font-semibold text-tertiary h-12 pl-6 uppercase text-3xs tracking-wider">Course info</TableHead>
                        <TableHead className="w-[15%] font-semibold text-tertiary h-12 uppercase text-3xs tracking-wider">Category</TableHead>
                        <TableHead className="w-[10%] font-semibold text-tertiary h-12 uppercase text-3xs tracking-wider">Modules</TableHead>
                        <TableHead className="w-[10%] font-semibold text-tertiary h-12 uppercase text-3xs tracking-wider">Stats</TableHead>
                        <TableHead className="w-[10%] font-semibold text-tertiary h-12 uppercase text-3xs tracking-wider">Status</TableHead>
                        <TableHead className="w-[15%] text-right font-semibold text-tertiary h-12 pr-6 uppercase text-3xs tracking-wider">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {courses.map((course) => (
                        <TableRow key={course.id} className="group hover:bg-slate-100/60 border-slate-100 transition-all duration-200 cursor-pointer">
                            <TableCell className="py-4 pl-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-20 h-14 rounded-lg overflow-hidden shrink-0 border border-slate-100 bg-slate-100 group-hover:border-slate-200 transition-all duration-300">
                                        <img
                                            src={course.thumbnail}
                                            alt={course.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-semibold text-main truncate leading-tight mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
                                        <p className="text-2xs text-secondary line-clamp-1 mb-1.5 font-medium">{course.description}</p>
                                        <div className="flex items-center gap-2">
                                            <div className="text-3xs bg-slate-50 text-secondary px-1.5 py-0.5 rounded font-semibold border border-slate-100 flex items-center gap-1">
                                                <Clock size={10} />
                                                Updated {course.lastUpdated}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className={`inline-flex px-2.5 py-1 rounded-md text-3xs font-semibold uppercase tracking-wide border ${getCategoryColor(course.category)}`}>
                                    {course.category}
                                </span>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
                                    <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md">
                                        <LayoutGrid size={14} />
                                    </div>
                                    {course.modules}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-1.5 text-xs text-secondary font-semibold">
                                        <Users size={12} className="text-tertiary" />
                                        <span>{course.enrolled}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-secondary font-semibold">
                                        <Clock size={12} className="text-tertiary" />
                                        <span>{course.duration}</span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className={`inline-flex items-center pl-1.5 pr-2.5 py-1 rounded-full text-3xs font-semibold border transition-colors uppercase tracking-wider ${course.status === 'Published'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : 'bg-slate-50 text-secondary border-slate-200'
                                    }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full mr-2 ${course.status === 'Published' ? 'bg-emerald-500' : 'bg-tertiary'
                                        }`}></span>
                                    {course.status}
                                </div>
                            </TableCell>
                            <TableCell className="text-right pr-6">
                                <div className="flex items-center justify-end gap-1">
                                    <Link to={`/admin/course/${course.id}/assign`}>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg shadow-none">
                                            <Users size={16} />
                                        </Button>
                                    </Link>
                                    <Link to={`/admin/course/${course.id}/edit?tab=curriculum`}>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg shadow-none">
                                            <List size={16} />
                                        </Button>
                                    </Link>
                                    <Link to={`/admin/course/${course.id}/edit`}>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg shadow-none">
                                            <Edit size={16} />
                                        </Button>
                                    </Link>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CourseManagementTable;
