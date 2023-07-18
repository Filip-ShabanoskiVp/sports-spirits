var teamId = document.getElementById("teamId").value;

function showTeam(){
    const url = 'https://api-football-beta.p.rapidapi.com/teams?id='+teamId;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '90857896f7msh0f73cc17220355bp1f423ajsnfcceb1f2c6d2',
            'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
        }
    };

    fetch(url,options)
        .then(res=>{
            return res.json();
        })
        .then(data=> {
            data.response.forEach(item => {
                document.getElementById("teamImg").innerHTML = "<img src='"+item.team.logo+"'>"
                document.getElementById("teamName").innerHTML = item.team.name;
                document.getElementById("teamCode").innerHTML =  item.team.code;
                document.getElementById("teamCountry").innerHTML = item.team.country
                document.getElementById("teamFounded").innerHTML = item.team.founded;



                document.getElementById("vanueImg").innerHTML =
                    "<img src='"+item.venue.image+"' height='200' width='200'>"
                document.getElementById("vanueName").innerHTML = item.venue.name;
                document.getElementById("vanueCity").innerHTML =  item.venue.city;
                document.getElementById("vanueAddress").innerHTML = item.venue.address;
                document.getElementById("vanueSurface").innerHTML = item.venue.surface;
                document.getElementById("vanueCapacity").innerHTML = item.venue.capacity;
            })
        })
}
// showTeam()
function showTeamSquad() {

    const url = 'https://api-football-beta.p.rapidapi.com/players?season=2023&team=' + teamId;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '90857896f7msh0f73cc17220355bp1f423ajsnfcceb1f2c6d2',
            'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
        }
    };

    fetch(url, options).then(res => {
        return res.json();

    }).then(data => {
        var tbodyRef1 = document.getElementById('squad').getElementsByTagName('tbody')[1];
        var tbodyRef2 = document.getElementById('squad').getElementsByTagName('tbody')[3];
        var tbodyRef3 = document.getElementById('squad').getElementsByTagName('tbody')[5];
        var tbodyRef4 = document.getElementById('squad').getElementsByTagName('tbody')[7];

        var leagueIdArray = [];
        var i = 0;
        console.log(data);
        data.response.forEach(item => {
            item.statistics.forEach(stat => {


                var newRow,newCell1,newCell2;

                leagueIdArray[i] = {id: stat.league.id};
                i++;

                if (stat.games.position == "Goalkeeper" && item.player.name!=null) {

                    newRow = tbodyRef1.insertRow();

                    newCell1 = newRow.insertCell();
                    newCell1.innerHTML = "<img src='"+item.player.photo+"' height='50' width='50'/>"

                    newCell2 = newRow.insertCell();
                    newCell2.innerHTML= '<a href="'+ "/Football/player/"
                        + item.player.id + '" style="text-decoration: none;color: black">'
                        + item.player.name + "</a>";

                } else if (stat.games.position == "Defender"  && item.player.name!=null) {


                    newRow = tbodyRef2.insertRow();

                    newCell1 = newRow.insertCell();

                    newCell1.innerHTML = "<img src='"+item.player.photo+"' height='50' width='50'/>"

                    newCell2 = newRow.insertCell();
                    newCell2.innerHTML= '<a href="'+ "/Football/player/"
                        + item.player.id + '" style="text-decoration: none;color: black">'
                        + item.player.name + "</a>";


                } else if (stat.games.position == "Midfielder"  && item.player.name!=null) {

                    newRow = tbodyRef3.insertRow();

                    newCell1 = newRow.insertCell();
                    newCell1.innerHTML = "<img src='"+item.player.photo+"' height='50' width='50'/>"

                    newCell2 = newRow.insertCell();
                    newCell2.innerHTML= '<a href="'+ "/Football/player/"
                        + item.player.id + '" style="text-decoration: none;color: black">'
                        + item.player.name + "</a>";

                } else if (stat.games.position == "Attacker"  && item.player.name!=null) {

                    newRow = tbodyRef4.insertRow();

                    newCell1 = newRow.insertCell();
                    newCell1.innerHTML = "<img src='"+item.player.photo+"' height='50' width='50'/>"

                    newCell2 = newRow.insertCell();
                    newCell2.innerHTML= '<a href="'+ "/Football/player/"
                        + item.player.id + '" style="text-decoration: none;color: black">'
                        + item.player.name + "</a>";

                }
            })
        })
        var navTeamDetails = document.createElement('a');
        var textNode = document.createTextNode("Table");
        navTeamDetails.setAttribute("href","/Football/league/"+ leagueIdArray[0].id +"/League")
        navTeamDetails.className = "nav-link";
        navTeamDetails.appendChild(textNode);
        document.getElementById('leagueTable').appendChild(navTeamDetails);


    })
}
// showTeamSquad();

function showCoach(){
    const url = 'https://api-football-beta.p.rapidapi.com/coachs?team='+teamId;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '90857896f7msh0f73cc17220355bp1f423ajsnfcceb1f2c6d2',
            'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
        }
    };

    fetch(url, options).then(res=>{
        return res.json();
    }).then(data=>{
        var array = [];
        var i=0;
        data.response.forEach(item=>{
            item.career.forEach(career=>{

                if(career.end==null && career.team.id==teamId){
                    array[i] = {"id": item.id ,"name": item.name, "img" : item.photo };
                    i++;
                }
            })
        })
        console.log(array[0]);

        var tbodyRef1 = document.getElementById('squad').getElementsByTagName('tbody')[10];

        newRow = tbodyRef1.insertRow();

        newCell1 = newRow.insertCell();
        newCell1.innerHTML = "<img src='"+array[0].img +"' height='50' width='50'/>"

        newCell2 = newRow.insertCell();
        newCell2.innerHTML= '<a href="'+ "/Football/coach/"
            + array[0].id + '" style="text-decoration: none;color: black">'
            + array[0].name + "</a>";

    })
}
// showCoach();