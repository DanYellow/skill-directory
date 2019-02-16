import faker from 'faker';

const skills = [
    'Docker',
    'React',
    'html',
    'css',
    'php',
    'Laravel',
    'Lumen',
    'electron',
    'Objective-c',
    'Android',
    'Swift',
    'Java',
    'Python',
    'Machine Learning',
    'UX',
    'Javascript',
    'React-router',
    'Circuit breaker',
    'Webpack',
    'Continuous Integration',
    'C++',
    'git',
    'bash',
    'linux',
    'css grid',
    'jenkins',
    'QA Automation',
    'es next',
    'C#',
    'Go',
    'Concurrency',
];

const getMeRandomElements = function(sourceArray, neededElements) {
    var result = [];
    for (var i = 0; i < neededElements; i++) {
        result.push(
            sourceArray[Math.floor(Math.random() * sourceArray.length)]
        );
    }
    return result;
};

const mock = Array.from({ length: 54 }, (_, id) => ({
    id: id,
    image: faker.image.avatar(),
    lastName: faker.name.lastName(),
    firstName: faker.name.firstName(),
    skills: [...new Set(getMeRandomElements(skills, 3))],
}));

export default {
    getExperts: skillName =>
        new Promise(resolve => {
            const results = mock.filter(item => {
                return item.skills.some(e => {
                    const lower = e.toLowerCase();
                    return lower.includes(skillName.toLowerCase());
                });
            });

            resolve(results);
        }),
};
