// Write a program to display one result card of 100 students
// with their name and percentage
// Out of 100 students, 50 has subjects - Grammer and Accounts
// and other 50 has subjects -  Grammer and Physics

// Hint : You need to calculate percentage of 100 students having different set of subjects.
//        You can assume their scores on their respective subjects.


// Write your code here
const getStudentResultCard = () => {
    let studentMap = new Map();
    let percentageMap = new Map();

    for (let studentNo = 0; studentNo < 50; studentNo = studentNo + 1) {
        let subjectMap = new Map();
        subjectMap.set('Grammer', Math.random() * 70 + 30);
        subjectMap.set('Account', Math.random() * 70 + 30);
        studentMap.set('DEPARTMENT_GA_' + studentNo, subjectMap);
    }

    for (let studentNo = 0; studentNo < 50; studentNo = studentNo + 1) {
        let subjectMap = new Map();
        subjectMap.set('Grammer', Math.random() * 70 + 30);
        subjectMap.set('Physics', Math.random() * 70 + 30);
        studentMap.set('DEPARTMENT_GP_' + studentNo, subjectMap);
    }

    let count = 0;
    let totalMarks;

    studentMap.forEach((value, key) => {
        if (count < 50) {
            totalMarks = value.get('Grammer') + value.get('Account');
        } else if(count >= 50) {
            totalMarks = value.get('Grammer') + value.get('Physics');
        }
        let percentage = Math.floor((totalMarks / 200) * 100);
        percentageMap.set(key, percentage);
    });
    return percentageMap;
};

console.log(getStudentResultCard());
