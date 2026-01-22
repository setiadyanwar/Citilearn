import fs from 'fs';

// Read existing data
const rawData = fs.readFileSync('src/data.json');
const data = JSON.parse(rawData);

const categories = ['Aviation', 'Safety', 'Service', 'Technical', 'Leadership'];

// Map titles to categories
const getCategory = (title) => {
    if (title.includes('Safety') || title.includes('Emergency') || title.includes('DGR')) return 'Safety';
    if (title.includes('Service') || title.includes('Customer') || title.includes('Catering')) return 'Service';
    if (title.includes('Airbus') || title.includes('Maintenance') || title.includes('Technical')) return 'Technical';
    if (title.includes('Leadership') || title.includes('Management') || title.includes('CRM')) return 'Leadership';
    return 'Aviation'; // Default
};

data.courses = data.courses.map(course => ({
    ...course,
    category: getCategory(course.title)
}));

fs.writeFileSync('src/data.json', JSON.stringify(data, null, 4));
console.log('src/data.json updated with categories.');
