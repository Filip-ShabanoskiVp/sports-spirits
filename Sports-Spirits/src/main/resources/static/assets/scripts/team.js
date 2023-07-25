var teamId = document.getElementById("teamId").value;

function showTeam(){
    const url = 'https://api-football-beta.p.rapidapi.com/teams?id='+teamId;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
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

                if(item.team.name!=item.team.country){
                    var a = document.createElement('a');
                    var textNode = document.createTextNode("Transfers");
                    a.setAttribute("href", "/Football/team/" + teamId + "/transfers")
                    a.className = "nav-link";
                    a.appendChild(textNode);
                    document.getElementById('transfersLink').appendChild(a);
                }
            })
        })
}
showTeam()

function showTeamSquad(season) {

    const url = 'https://api-football-beta.p.rapidapi.com/players?season='+season+'&team=' + teamId;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
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

        for (var i =0; i< data.response.length; i++){
            leagueIdArray[i] = data.response[i].statistics[0].league.id;
        }

        data.response.forEach(item => {

                var newRow,newCell1,newCell2;

                if (item.statistics[0].games.position == "Goalkeeper" && item.player.name!=null) {

                    newRow = tbodyRef1.insertRow();

                    newCell1 = newRow.insertCell();
                    newCell1.innerHTML = "<img src='"+item.player.photo+"' height='50' width='50'/>"

                    newCell2 = newRow.insertCell();
                    newCell2.innerHTML= '<a href="'+ "/Football/player/"
                        + item.player.id + '" style="text-decoration: none;color: black">'
                        + item.player.name + "</a>";

                } else if (item.statistics[0].games.position == "Defender"  && item.player.name!=null) {

                    newRow = tbodyRef2.insertRow();

                    newCell1 = newRow.insertCell();

                    newCell1.innerHTML = "<img src='"+item.player.photo+"' height='50' width='50'/>"

                    newCell2 = newRow.insertCell();
                    newCell2.innerHTML= '<a href="'+ "/Football/player/"
                        + item.player.id + '" style="text-decoration: none;color: black">'
                        + item.player.name + "</a>";


                } else if (item.statistics[0].games.position == "Midfielder"  && item.player.name!=null) {

                    newRow = tbodyRef3.insertRow();

                    newCell1 = newRow.insertCell();
                    newCell1.innerHTML = "<img src='"+item.player.photo+"' height='50' width='50'/>"

                    newCell2 = newRow.insertCell();
                    newCell2.innerHTML= '<a href="'+ "/Football/player/"
                        + item.player.id + '" style="text-decoration: none;color: black">'
                        + item.player.name + "</a>";

                } else if (item.statistics[0].games.position == "Attacker"  && item.player.name!=null) {


                    newRow = tbodyRef4.insertRow();

                    newCell1 = newRow.insertCell();
                    newCell1.innerHTML = "<img src='"+item.player.photo+"' height='50' width='50'/>"

                    newCell2 = newRow.insertCell();
                    newCell2.innerHTML= '<a href="'+ "/Football/player/"
                        + item.player.id + '" style="text-decoration: none;color: black">'
                        + item.player.name + "</a>";

                }
        })
        if(data.response.length>0) {
            var navTeamDetails = document.createElement('a');
            var textNode = document.createTextNode("Table");
            navTeamDetails.setAttribute("href", "/Football/league/" + leagueIdArray[0] + "/League")
            navTeamDetails.className = "nav-link";
            navTeamDetails.appendChild(textNode);
            document.getElementById('leagueTable').appendChild(navTeamDetails);
        }
    })
}

function showCoach(){
    const url = 'https://api-football-beta.p.rapidapi.com/coachs?team='+teamId;
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
showCoach();

function showTeamSquadSeasons(){
    var seasons = ["2023","2022","2021","2020","2019","2018","2017","2016","2015","2014","2013","2012","2011",
        "2010"]

    for (var i=0; i< seasons.length; i++){
        var x = document.getElementById("seasonSquad");
        var option = document.createElement("option");
        var year =parseInt(seasons[i])+1;
        option.text = seasons[i] + "/"+ year;
        option.value = seasons[i];
        x.add(option);
    }
    showTeamSquad(seasons[0]);
}
showTeamSquadSeasons();

function changeSquadSeason(){
    var season = document.getElementById("seasonSquad").value;
    let gkBody = document.getElementById("gk");
    let dBody = document.getElementById("d");
    let mBody = document.getElementById("m");
    let fBody = document.getElementById("f");

    let leagueTable = document.getElementById("leagueTable");

    while (gkBody.hasChildNodes()){
        gkBody.removeChild(gkBody.lastChild);
    }
    while (dBody.hasChildNodes()){
        dBody.removeChild(dBody.lastChild);
    }

    while (mBody.hasChildNodes()){
        mBody.removeChild(mBody.lastChild);
    }

    while (fBody.hasChildNodes()){
        fBody.removeChild(fBody.lastChild);
    }

    while (leagueTable.hasChildNodes()){
        leagueTable.removeChild(leagueTable.lastChild);
    }

    showTeamSquad(season);
}