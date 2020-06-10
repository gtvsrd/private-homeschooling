module.exports = {
    age(timestamp) {
        const today = new Date();
        const birthDate = new Date(timestamp);

        //2020 - 1999 = 21
        let age = today.getFullYear() - birthDate.getFullYear();

        const month = today.getMonth() - birthDate.getMonth();

        if (month < 0 || month == 0 && today.getDate() < birthDate.getDate) {
            age = age - 1;
        } 

        return age;
    },

    date(timestamp) {
        const date = new Date(timestamp);

        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}-${month}-${year}`
        }
    },

    graduation: function(grade) {
        if(grade == "Ensino Médio Completo") {
            grade = "Médio";
        } else if(grade == "Ensino Superior Completo") {
            grade = "Superior";
        } else {
            grade = grade;
        }
        return grade;
    },

    grade: function(schoolYear) {
        if(schoolYear > 4) {
            for(let i = 5; i < 10; i++) {
                if(schoolYear == i) {
                    schoolYear = `${i}º Ano do Ensino Fundamental`;
                    return schoolYear;
                }
            }
        } else {
            for(let i = 1; i < 4; i++) {
                if(schoolYear == i) {
                    schoolYear = `${i}º Ano do Ensino Médio`;
                    return schoolYear;
                }
            }
        }
    }
}