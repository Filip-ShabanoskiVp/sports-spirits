//Facebook
// 'X-RapidAPI-Key': '6fbe9e29c5msh8b63eb96d8fc212p1fd9e6jsna0c68e516fe7'
//Filip Shabanoski Vp
// 'X-RapidAPI-Key': '6f2f0430f2msh82ec4424641b7afp175579jsn096efcabd13d'
// kingTest
// 'X-RapidAPI-Key': 'cf43a19774mshd2a1b5fe9d0e2d8p14f474jsna633fbb9cb9e'
// - King Petreski
// 'X-RapidAPI-Key': '90857896f7msh0f73cc17220355bp1f423ajsnfcceb1f2c6d2'
//-Filip Shabanoski
// 'X-RapidAPI-Key': '702c5bbc4dmsha478d0e8917ce08p1c7f91jsn0b95b932a884'
// Dimovskiot
//   'X-RapidAPI-Key':'45bc330b26msh558c0765abcd1bdp1b4900jsn8021ac1feca8'

//filipcaro1998 gmail
// 'X-RapidAPI-Key':'d92b2ec520msh51a2e20cb914247p16fe7cjsn3871113d6a3e'

// filipunited1998@gmail.com
// 'X-RapidAPI-Key':'f070bb1973mshc4cf6cc418baddap1eedf8jsnd87ea93de8de'

// filipshaban@gmail.com
// 'bfa1aa5261mshab2d224480b03aep1dcc39jsn9817688d6ba2'

// filipshaban2@gmail.com
//'5b1e78ac7amshb1ee3770a6fd586p14341djsn1a687b391d62'

var leagueId = document.getElementById("leagueId").value;
var type = document.getElementById('type').value;

function showSeasonFixtures(league,season,round){
    const url = 'https://api-football-beta.p.rapidapi.com/fixtures?season='
        +season+'&round='+round+'&league='+league;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey
            ,'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
        }
    };

    fetch(url,options)
        .then(res=>{
            return res.json();
        })
        .then(data=> {
            var fbodyRef = document.getElementById('fTable').getElementsByTagName('tbody')[0];
            if(data.response.length>0){
                document.getElementById('ResultShow').style.display = "block";
                data.response.forEach(item => {
                    console.log(item);
                    var newRow = fbodyRef.insertRow();

                    var newCell1 = newRow.insertCell();
                    var newText1 = document.createTextNode(item.fixture.status.long);
                    newCell1.appendChild(newText1);

                    var newCell2 = newRow.insertCell();
                    var newText2 = document.createTextNode(item.fixture.date.substring(0,10));
                    newCell2.appendChild(newText2);

                    var newCell3 = newRow.insertCell();
                    var newText3 = document.createTextNode(item.league.name);
                    newCell3.appendChild(newText3);

                    var newCell4 = newRow.insertCell();
                    var newText4 = document.createTextNode(item.teams.home.name);
                    newCell4.appendChild(newText4);

                    var newCell5 = newRow.insertCell();

                    if(item.fixture.status.short=="NS") {
                        newCell5.innerHTML = '<a href="' + "/Football/fixture/"
                            + item.fixture.id + '/details" style="text-decoration: none;color: black">'
                            + item.fixture.date.substring(11, 16) + "</a>";
                    }else if(item.fixture.status.short=="FT" || item.fixture.status.short=="AET"
                    || item.fixture.status.short=="PEN" ){
                        console.log(item.goals.home)
                        console.log(item.goals.away);
                        newCell5.innerHTML = '<a href="' + "/Football/fixture/"
                            + item.fixture.id + '/details" style="text-decoration: none;color: black">'
                            + item.goals.home + " - " + item.goals.away + "</a>";

                    }else if(item.fixture.status.short=="1H" || item.fixture.status.short=="2H"
                        || item.fixture.status.short=="HT" || item.fixture.status.short=="ET"
                        || item.fixture.status.short=="P"){
                        newCell5.innerHTML = '<a href="' + "/Football/fixture/"
                            + item.fixture.id + '/details" style="text-decoration: none;color: red">'
                            + item.goals.home + " - " + item.goals.away + "</a>";
                    }

                    var newCell6 = newRow.insertCell();
                    var newText6 = document.createTextNode(item.teams.away.name);
                    newCell6.appendChild(newText6);

                    if(item.fixture.status.short=="1H" || item.fixture.status.short=="2H"
                        || item.fixture.status.short=="HT" || item.fixture.status.short=="ET"
                        || item.fixture.status.short=="P"){
                        var newCell7 = newRow.insertCell();
                        newCell7.innerHTML = "<span style='color: green'>" + item.fixture.status.elapsed + '"' + '</span>'
                    }
                });
            }else {
                document.getElementById('ResultShow').style.display = "none"
            }
        }).catch(error=>console.log(error));
}


function showSeasons(){
    const url = 'https://api-football-beta.p.rapidapi.com/leagues?id='+leagueId;
    var myArray = [];
    var i=0;
    const options = {
        method: 'GET',
        headers: {

            'X-RapidAPI-Key': apiKey
            ,'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
        }
    };

    fetch(url,options)
        .then(res=>{
            return res.json();
        })
        .then(data=> {

            var img = document.createElement('img');
            img.width = "100";
            img.height = "100";
            img.src = data.response[0].league.logo;
            document.getElementById("leagueLogo").appendChild(img);
            document.getElementById("leagueName").innerHTML = "<h1>"+ data.response[0].league.name +"</h1>";

            data.response.forEach(item => {
                item.seasons.reverse().forEach(season => {

                    var x = document.getElementById("season");
                    var option = document.createElement("option");

                    var year =parseInt(season.start.substring(0,4))+1
                    option.text = season.start.substring(0,4) + "/"+ year;
                    option.value = season.year;
                    myArray[i] = season.year;
                    i++;
                    x.add(option);
                })
            })
            if(myArray.length>1){

                showRounds(myArray[1],myArray[0]);

            }else {

                showRounds(myArray[0],myArray[0]);
            }
            showTeams(myArray[0],leagueId);
            LeagueTopScorers(leagueId,myArray[0]);
        })
}

function showRounds(roundSeason,currentSeason){

    const url = 'https://api-football-beta.p.rapidapi.com/fixtures/rounds?season='+roundSeason+'&league='+leagueId;

    var myArray = [];
    var i=0;

    const options = {
        method: 'GET',
        headers: {

            'X-RapidAPI-Key': apiKey
            ,'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
        }
    };

    fetch(url,options)
        .then(res=>{
            return res.json();
        })
        .then(data=> {

            let selectbody = document.getElementById("round");
            while (selectbody.hasChildNodes()){
                selectbody.removeChild(selectbody.lastChild);
            }

            data.response.forEach(item => {
                var x = document.getElementById("round");
                var option = document.createElement("option");
                option.text = item;
                option.value = item.replace(/\s/g,"%20");

                myArray[i] = item.replace(/\s/g,"%20");
                i++;

                x.add(option);
            })
            showSeasonFixtures(leagueId,currentSeason,myArray[0])
        })
}
showSeasons();

function change(){
    var season = document.getElementById("season").value;
    var round = document.getElementById("round").value;

    let tbody = document.getElementById("tBody");
    while (tbody.hasChildNodes()){
        tbody.removeChild(tbody.lastChild);
    }

    let showGroupCell = document.getElementById('showGroupCell');
    while (showGroupCell.hasChildNodes()){
        showGroupCell.removeChild(showGroupCell.lastChild);
    }

    showTeams(season,leagueId);

    showRounds(season,season);
    changeRound();


    LeagueTopScorers(leagueId,season);
}

function changeRound(){
    var season = document.getElementById("season").value;
    var round = document.getElementById("round").value;

    let tbody = document.getElementById("fBody");
    while (tbody.hasChildNodes()){
        tbody.removeChild(tbody.lastChild);
    }
    showSeasonFixtures(leagueId,season,round);
}

function showTeams(season,leagueId){

    var url = 'https://api-football-beta.p.rapidapi.com/standings?season='+season+'&league='+leagueId;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey
            ,'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
        }
    };

    fetch(url,options)
        .then(res=>{
            return res.json();
        })
        .then(data=>{

            if(data.response.length>0){

                document.getElementById('showTable').style.display = "block";
                if(data.response[0].league.standings.length>1){

                    var textNode = document.createTextNode("Group")
                    document.getElementById('showGroupCell').appendChild(textNode);
                    data.response.forEach(item=>{
                        item.league.standings.forEach(standing=>{
                            var tbodyRef = document.getElementById('table').getElementsByTagName('tbody')[1];
                            standing.forEach(s=>{


                                var newRow = tbodyRef.insertRow();

                                var newCell1 = newRow.insertCell();
                                var newText1 = document.createTextNode(s.group);
                                newCell1.appendChild(newText1);

                                var newCell2 = newRow.insertCell();
                                var newText2 = document.createTextNode(s.rank);
                                newCell2.appendChild(newText2);

                                var newCell3 = newRow.insertCell();
                                var span1 = document.createElement('span')
                                var img = document.createElement("img")
                                img.src = s.team.logo;
                                img.width="40";
                                img.height="40";
                                span1.appendChild(img)
                                var span2 = document.createElement('span');
                                var a = document.createElement('a');
                                a.href = "/Football/team/" + s.team.id;
                                a.text = s.team.name;
                                span2.appendChild(a);
                                span2.style.position= "relative";
                                span2.style.left = "15px"
                                var div = document.createElement('div');
                                div.appendChild(span1)
                                div.appendChild(span2)
                                newCell3.appendChild(div);
                                // newCell3.innerHTML='<a href="'+ "/Football/team/" + s.team.id + '">'+s.team.name+"</a>";

                                var newCell4 = newRow.insertCell();
                                var newText4 = document.createTextNode(s.all.played);
                                newCell4.appendChild(newText4);

                                var newCell5 = newRow.insertCell();
                                var newText5 = document.createTextNode(s.all.win);
                                newCell5.appendChild(newText5);

                                var newCell6 = newRow.insertCell();
                                var newText6 = document.createTextNode(s.all.draw);
                                newCell6.appendChild(newText6);


                                var newCell7 = newRow.insertCell();
                                var newText7 = document.createTextNode(s.all.lose);
                                newCell7.appendChild(newText7);

                                var newCell8 = newRow.insertCell();
                                var newText8 = document.createTextNode(s.all.goals.for);
                                newCell8.appendChild(newText8);

                                var newCell9 = newRow.insertCell();
                                var newText9 = document.createTextNode(s.all.goals.against);
                                newCell9.appendChild(newText9);

                                var newCell10 = newRow.insertCell();
                                var newText10 = document.createTextNode(s.goalsDiff);
                                newCell10.appendChild(newText10);

                                var newCell11 = newRow.insertCell();
                                var newText11 = document.createTextNode(s.points);
                                newCell11.appendChild(newText11);

                                var newCell12 = newRow.insertCell();
                                var newText12 = null;
                                if(s.form!=null) {
                                    newText12 = document.createTextNode(s.form);
                                }else {
                                    newText12 = document.createTextNode("");
                                }
                                newCell12.appendChild(newText12);


                            })
                        })
                    })
                }else {
                    data.response.forEach(item=>{
                        item.league.standings.forEach(standing=>{
                            var tbodyRef = document.getElementById('table').getElementsByTagName('tbody')[1];
                            standing.forEach(s=>{
                                var newRow = tbodyRef.insertRow();

                                var newCell1 = newRow.insertCell();
                                var newText1 = document.createTextNode("");
                                newCell1.appendChild(newText1);

                                var newCell2 = newRow.insertCell();
                                var newText2 = document.createTextNode(s.rank);
                                newCell2.appendChild(newText2);

                                var newCell3 = newRow.insertCell();
                                var span1 = document.createElement('span')
                                var img = document.createElement("img")
                                img.src = s.team.logo;
                                img.width="40";
                                img.height="40";
                                span1.appendChild(img)
                                var span2 = document.createElement('span');
                                var a = document.createElement('a');
                                a.href = "/Football/team/" + s.team.id;
                                a.text = s.team.name;
                                span2.appendChild(a);
                                span2.style.position= "relative";
                                span2.style.left = "15px"
                                var div = document.createElement('div');
                                div.appendChild(span1)
                                div.appendChild(span2)
                                newCell3.appendChild(div);
                                // newCell3.innerHTML='<a href="'+ "/Football/team/" + s.team.id + '">'+s.team.name+"</a>";

                                var newCell4 = newRow.insertCell();
                                var newText4 = document.createTextNode(s.all.played);
                                newCell4.appendChild(newText4);

                                var newCell5 = newRow.insertCell();
                                var newText5 = document.createTextNode(s.all.win);
                                newCell5.appendChild(newText5);

                                var newCell6 = newRow.insertCell();
                                var newText6 = document.createTextNode(s.all.draw);
                                newCell6.appendChild(newText6);


                                var newCell7 = newRow.insertCell();
                                var newText7 = document.createTextNode(s.all.lose);
                                newCell7.appendChild(newText7);

                                var newCell8 = newRow.insertCell();
                                var newText8 = document.createTextNode(s.all.goals.for);
                                newCell8.appendChild(newText8);

                                var newCell9 = newRow.insertCell();
                                var newText9 = document.createTextNode(s.all.goals.against);
                                newCell9.appendChild(newText9);

                                var newCell10 = newRow.insertCell();
                                var newText10 = document.createTextNode(s.goalsDiff);
                                newCell10.appendChild(newText10);

                                var newCell11 = newRow.insertCell();
                                var newText11 = document.createTextNode(s.points);
                                newCell11.appendChild(newText11);

                                var newCell12 = newRow.insertCell();
                                var newText12 = null;
                                if(s.form!=null) {
                                    newText12 = document.createTextNode(s.form);
                                }else {
                                    newText12 = document.createTextNode("");
                                }
                                newCell12.appendChild(newText12);
                            })
                        })
                    })
                }
            }else {
                document.getElementById('showTable').style.display = "none";
            }
        })
        .catch(error=>console.log(error));
}

function LeagueTopScorers(league,season) {

    const url = 'https://api-football-beta.p.rapidapi.com/players/topscorers?season=' + season + '&league=' + league;
    const options = {
        method: 'GET',
        headers: {

            'X-RapidAPI-Key': apiKey
            , 'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
        }
    };


    fetch(url, options)
        .then(res => {
            return res.json();
        })
        .then(data => {

            var tbodyRef = document.getElementById('tsTable').getElementsByTagName('tbody')[0]

            let stbody = document.getElementById("sBody");
            console.log(stbody);
            while (stbody.hasChildNodes()) {
                stbody.removeChild(stbody.lastChild);
            }

            if(data.response.length>0){

                document.getElementById('nameScorers').style.display = "block";
                document.getElementById('tableScorers').style.display = "block";

                data.response.forEach(item => {

                    var newRow = tbodyRef.insertRow();

                    var newCell1 = newRow.insertCell();
                    newCell1.innerHTML = '<img src="' + item.player.photo + '" height="25" width="25"/>'
                        + '<span style="margin-left: 10px"><b>' + item.player.name + "</b></span>";
                    item.statistics.forEach(stat => {
                        var newCell2 = newRow.insertCell();
                        newCell2.innerHTML = '<img src="' + stat.team.logo + '" height="25" width="25"/>'
                            + '<span style="margin-left: 10px"><b>' + stat.team.name + "</b></span>";


                        var newCell3 = newRow.insertCell();
                        if (stat.goals.total != null) {
                            newCell3.innerHTML = stat.goals.total;
                        } else {
                            newCell3.innerHTML = "0";
                        }

                        var newCell4 = newRow.insertCell();
                        if (stat.penalty.scored != null) {
                            newCell4.innerHTML = stat.penalty.scored;
                        } else {
                            newCell4.innerHTML = "0"
                        }

                        var newCell5 = newRow.insertCell();
                        if (stat.goals.total != null) {
                            newCell5.innerHTML = stat.goals.total;
                        } else {
                            newCell5.innerHTML = "0";
                        }

                    })
                })
            }else {
                document.getElementById('nameScorers').style.display = "none";
                document.getElementById('tableScorers').style.display = "none";
            }
        })
}