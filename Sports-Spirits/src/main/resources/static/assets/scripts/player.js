var playerId = document.getElementById("playerId").value;


function showPlayerPersonalInfo(){

    const url = 'https://api-football-beta.p.rapidapi.com/players?season=2023&id='+playerId;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
        }
    };

    fetch(url, options).then(res=>{
        return res.json();
    }).then(data=>{
        data.response.forEach(item=>{

            document.getElementById("playerName").innerHTML = item.player.name;
            document.getElementById("fname").innerHTML = item.player.firstname;
            document.getElementById("lname").innerHTML = item.player.lastname;
            document.getElementById("nationality").innerHTML = item.player.nationality;
            document.getElementById("birth").innerHTML = item.player.birth.date;
            document.getElementById("age").innerHTML = item.player.age;
            document.getElementById("bCountry").innerHTML = item.player.birth.country;
            document.getElementById("bPlace").innerHTML = item.player.birth.place;
            document.getElementById("position").innerHTML = item.statistics[0].games.position;
            document.getElementById("height").innerHTML = item.player.height;
            document.getElementById("weight").innerHTML = item.player.weight;
            document.getElementById("playerImg").innerHTML = '<img src="'+item.player.photo+'" height="150" width="150"/>'

        })
    });
}
// showPlayerPersonalInfo();

function showPlayerTransfers(){

    const url = 'https://api-football-beta.p.rapidapi.com/transfers?player='+playerId;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
        }
    };

    fetch(url, options).then(res=>{
        return res.json();
    }).then(data=> {
        var bodyRef = document.getElementById('transfers').getElementsByTagName('tbody')[0];
        data.response.forEach(item => {

            item.transfers.forEach(transfer=>{

                var newRow = bodyRef.insertRow();

                var newCell1 = newRow.insertCell();
                var newText1 = document.createTextNode(transfer.date);
                newCell1.appendChild(newText1);

                var newCell2 = newRow.insertCell();
                newCell2.innerHTML = '<img src="'+transfer.teams.out.logo+'" height="40" width="40"/>'

                var newCell3 = newRow.insertCell();
                var newText3 = document.createTextNode(transfer.teams.out.name);
                newCell3.appendChild(newText3);

                var newCell4 = newRow.insertCell();
                newCell4.innerHTML = '<img src="'+transfer.teams.in.logo+'" height="40" width="40"/>'

                var newCell5 = newRow.insertCell();
                var newText5 = document.createTextNode(transfer.teams.in.name);
                newCell5.appendChild(newText5);

                var newCell6 = newRow.insertCell();
                var newText6 = document.createTextNode(transfer.type);
                newCell6.appendChild(newText6);

            })

        })
    })
}
// showPlayerTransfers();

function showTrophies(){

    const url = 'https://api-football-beta.p.rapidapi.com/trophies?player='+playerId;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
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

function showPlayerStatistics(){

    const url = 'https://api-football-beta.p.rapidapi.com/players?season=2022&id='+playerId;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
        }
    };

    fetch(url, options).then(res=>{
        return res.json();
    }).then(data=>{
        console.log(data);
        var bodyRef = document.getElementById('stats').getElementsByTagName('tbody')[0];
        data.response.forEach(item=>{

            console.log(data.response)

            item.statistics.forEach(stat=>{

                var newRow = bodyRef.insertRow();

                var newCell1 = newRow.insertCell();
                var newText1 = document.createTextNode(stat.league.season);
                newCell1.appendChild(newText1);

                var newCell2 = newRow.insertCell();
                var newText2 = document.createTextNode(stat.team.name);
                newCell2.appendChild(newText2);

                var newCell3 = newRow.insertCell();
                newCell3.innerHTML = '<img src="'+stat.league.logo +'" height="25" width="25"/>'

                var newCell4 = newRow.insertCell();
                var newText4 = document.createTextNode(stat.league.name);
                newCell4.appendChild(newText4);

                var newCell5 = newRow.insertCell();
                var newText5 = document.createTextNode(stat.games.minutes);
                newCell5.appendChild(newText5);


                var newCell6 = newRow.insertCell();
                var newText6 = document.createTextNode(stat.games.appearences);
                newCell6.appendChild(newText6);

                var newCell7 = newRow.insertCell();
                var newText7 = document.createTextNode(stat.goals.total);
                newCell7.appendChild(newText7);

                var newCell8 = newRow.insertCell();
                var newText8 = document.createTextNode(stat.goals.assists);
                newCell8.appendChild(newText8);


                var newCell9 = newRow.insertCell();
                var newText9 = document.createTextNode(stat.shots.total);
                newCell9.appendChild(newText9);


                var newCell0 = newRow.insertCell();
                var newText10 = document.createTextNode(stat.passes.total);
                newCell0.appendChild(newText10);


                var newCell11 = newRow.insertCell();
                var newText11 = document.createTextNode(stat.cards.yellow);
                newCell11.appendChild(newText11);


                var newCell12 = newRow.insertCell();
                var newText12 = document.createTextNode(stat.cards.red);
                newCell12.appendChild(newText12);

            })
        })
    })
}

// showPlayerStatistics();
