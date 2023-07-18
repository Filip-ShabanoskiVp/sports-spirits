var coachId = document.getElementById("coachId").value;

function showCoachesInfo(){

    const url = 'https://api-football-beta.p.rapidapi.com/coachs?id='+coachId;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '90857896f7msh0f73cc17220355bp1f423ajsnfcceb1f2c6d2',
            'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
        }
    };

    fetch(url, options).then(res=>{
        return res.json();
    }).then(data=> {

        data.response.forEach(item => {

            document.getElementById("coachName").innerHTML = item.name;
            document.getElementById("fname").innerHTML = item.firstname;
            document.getElementById("lname").innerHTML = item.lastname;
            document.getElementById("nationality").innerHTML = item.nationality;
            document.getElementById("birth").innerHTML = item.birth.date;
            document.getElementById("age").innerHTML = item.age;
            document.getElementById("bCountry").innerHTML = item.birth.country;
            document.getElementById("bPlace").innerHTML = item.birth.place;

            document.getElementById("coachImg").innerHTML = '<img src="' + item.photo + '" height="150" width="150"/>'

        })
    })
}
// showCoachesInfo();

function showCoachCareer(){
    console.log(coachId);
    const url = 'https://api-football-beta.p.rapidapi.com/coachs?id='+coachId;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '90857896f7msh0f73cc17220355bp1f423ajsnfcceb1f2c6d2',
            'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
        }
    };

    fetch(url, options).then(res=>{
        return res.json();
    }).then(data=> {
        var bodyRef = document.getElementById('career').getElementsByTagName('tbody')[0];
        data.response.forEach(item => {

            item.career.forEach(career=>{

                var newRow = bodyRef.insertRow();

                var newCell1 = newRow.insertCell();
                newCell1.innerHTML = '<img src="'+career.team.logo+'" height="40" width="40"/>'

                var newCell2 = newRow.insertCell();
                var newText2 = document.createTextNode(career.team.name);
                newCell2.appendChild(newText2);


                var newCell3 = newRow.insertCell();
                var newText3 = document.createTextNode(career.start);
                newCell3.appendChild(newText3);

                var newCell4 = newRow.insertCell();
                var newText4 = document.createTextNode(career.end);
                newCell4.appendChild(newText4);

            })

        })
    })
}

// showCoachCareer();

function showTrophies(){

    const url = 'https://api-football-beta.p.rapidapi.com/trophies?coach='+coachId;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '90857896f7msh0f73cc17220355bp1f423ajsnfcceb1f2c6d2',
            'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
        }
    };

    fetch(url, options).then(res=>{
        return res.json();
    }).then(data=> {
        var bodyRef = document.getElementById('trophies').getElementsByTagName('tbody')[0];
        data.response.forEach(item => {
            var newRow = bodyRef.insertRow();

            var newCell1 = newRow.insertCell();
            var newText1 = document.createTextNode(item.league);
            newCell1.appendChild(newText1);

            var newCell2 = newRow.insertCell();
            var newText2 = document.createTextNode(item.country);
            newCell2.appendChild(newText2);

            var newCell3 = newRow.insertCell();
            var newText3 = document.createTextNode(item.season);
            newCell3.appendChild(newText3);

            var newCell4 = newRow.insertCell();
            var newText4 = document.createTextNode(item.place);
            newCell4.appendChild(newText4);
        })
    })

}
// showTrophies();
