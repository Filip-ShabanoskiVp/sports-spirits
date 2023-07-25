var fixtureId = document.getElementById('fixtureId').value;

function fixtureLineup() {

    const url = 'https://api-football-beta.p.rapidapi.com/fixtures/lineups?fixture=' + fixtureId;
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
        if(data.response.length>0){

            var homeRefTable = document.getElementById('homeLineup').getElementsByTagName('tbody')[0]
            var awayRefTable = document.getElementById('awayLineup').getElementsByTagName('tbody')[0]

            var coachHomeRefTable = document.getElementById('homeLineup').getElementsByTagName('tbody')[1]
            var coachAwayRefTable = document.getElementById('awayLineup').getElementsByTagName('tbody')[1]


            var homeSubRefTable = document.getElementById('homeSubLineup').getElementsByTagName('tbody')[0]
            var awaySubRefTable = document.getElementById('awaySubLineup').getElementsByTagName('tbody')[0]


            document.getElementById('formation1').innerText = data.response[0].formation;

            var homeCoachRow = coachHomeRefTable.insertRow();


            var newHomeCoachCell1 = homeCoachRow.insertCell();


            var b1 = document.createElement('b');
            var newHomeCoachText1 = document.createTextNode("Coach:");
            b1.appendChild(newHomeCoachText1);
            newHomeCoachCell1.appendChild(b1)


            var newHomeCoachCell2 = homeCoachRow.insertCell();
            var aHomeCoach = document.createElement('a');
            aHomeCoach.style.textDecoration = "none";
            aHomeCoach.style.color = "black";
            aHomeCoach.href = "/Football/coach/" + data.response[0].coach.id;
            var newHomeCoachText2 = document.createTextNode(data.response[0].coach.name);
            aHomeCoach.appendChild(newHomeCoachText2)
            newHomeCoachCell2.appendChild(aHomeCoach);

            data.response[0].startXI.forEach(start => {
                var newRow = homeRefTable.insertRow();

                var newCell1 = newRow.insertCell();
                var newText1 = document.createTextNode(start.player.number);
                newCell1.appendChild(newText1);

                var newCell2 = newRow.insertCell();
                var a = document.createElement('a');
                a.style.textDecoration = "none";
                a.style.color = "black";
                a.href = "/Football/player/" + start.player.id;
                var newText2 = document.createTextNode(start.player.name + " ("+ start.player.pos +")");
                a.appendChild(newText2)
                newCell2.appendChild(a);

            })

            data.response[0].substitutes.forEach(sub => {

                var newRow = homeSubRefTable.insertRow();

                var newCell1 = newRow.insertCell();
                var newText1 = document.createTextNode(sub.player.number);
                newCell1.appendChild(newText1);

                var newCell2 = newRow.insertCell();
                var a = document.createElement('a');
                a.style.textDecoration = "none";
                a.style.color = "black";
                a.href = "/Football/player/" + sub.player.id;
                var newText2 = document.createTextNode(sub.player.name + " ("+ sub.player.pos +")");
                a.appendChild(newText2)
                newCell2.appendChild(a);

            })

            document.getElementById('formation2').innerText = data.response[1].formation;

            var awayCoachRow = coachAwayRefTable.insertRow();

            var newAwayCoachCell1 = awayCoachRow.insertCell();
            var b2 = document.createElement('b');
            var newAwayCoachText1 = document.createTextNode("Coach: ");
            b2.appendChild(newAwayCoachText1);
            newAwayCoachCell1.appendChild(b2)

            var newAwayCoachCell2 = awayCoachRow.insertCell();
            var aAwayCoach = document.createElement('a');
            aAwayCoach.style.textDecoration = "none";
            aAwayCoach.style.color = "black";
            aAwayCoach.href = "/Football/coach/" + data.response[1].coach.id;
            var newAwayCoachText2 = document.createTextNode(data.response[1].coach.name);
            aAwayCoach.appendChild(newAwayCoachText2)
            newAwayCoachCell2.appendChild(aAwayCoach);

            data.response[1].startXI.forEach(start => {
                var newRow = awayRefTable.insertRow();

                var newCell1 = newRow.insertCell();
                var newText1 = document.createTextNode(start.player.number);
                newCell1.appendChild(newText1);

                var newCell2 = newRow.insertCell();
                var a = document.createElement('a');
                a.style.textDecoration = "none";
                a.style.color = "black";
                a.href = "/Football/player/" + start.player.id;
                var newText2 = document.createTextNode(start.player.name + " ("+ start.player.pos +")");
                a.appendChild(newText2)
                newCell2.appendChild(a);
            })

            data.response[1].substitutes.forEach(sub => {

                var newRow = awaySubRefTable.insertRow();

                var newCell1 = newRow.insertCell();
                var newText1 = document.createTextNode(sub.player.number);
                newCell1.appendChild(newText1);

                var newCell2 = newRow.insertCell();
                var a = document.createElement('a');
                a.style.textDecoration = "none";
                a.style.color = "black";
                a.href = "/Football/player/" + sub.player.id;
                var newText2 = document.createTextNode(sub.player.name + " ("+ sub.player.pos +")");
                a.appendChild(newText2)
                newCell2.appendChild(a);

            })
        }else {
            document.getElementById('btn1').style.display = "none";
            document.getElementById('Lineup').style.display = "none";
        }
    })
}
fixtureLineup();

function matchDetailsAndMatchOfficials(){

    const url = 'https://api-football-beta.p.rapidapi.com/fixtures?id='+fixtureId;
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
        if(data.response.length>0) {


            var idAway = "";
            var idHome = "";

            var refTable = document.getElementById('refereeTable').getElementsByTagName('tbody')[0];
            data.response.forEach(item=>{

                if(item.fixture.status.short!="NS") {
                    document.getElementById('matchStatus').innerText = item.fixture.status.short;
                }else {
                    document.getElementById('matchStatus').innerText = "KO"
                }

                var aHome = document.createElement('a');
                aHome.style.textDecoration = "none";
                aHome.style.color = "black";
                aHome.href= "/Football/team/"+ item.teams.home.id;
                var imgHome = document.createElement("img");
                imgHome.src = item.teams.home.logo;
                imgHome.height = "50";
                imgHome.width = "50"
                aHome.appendChild(imgHome);

                document.getElementById('fixHomeTeamImg').appendChild(aHome);
                document.getElementById('fixHomeTeam').innerText = item.teams.home.name;

                if(item.fixture.status.short!="NS") {
                    document.getElementById('fixResult').innerText = item.goals.home + " - " + item.goals.away;
                }else {
                    document.getElementById('fixResult').innerText = item.fixture.date.substring(11, 16);
                }


                var aAway = document.createElement('a');
                aAway.style.textDecoration = "none";
                aAway.style.color = "black";
                aAway.href= "/Football/team/"+ item.teams.away.id;
                var imgAway = document.createElement("img");
                imgAway.src = item.teams.away.logo;
                imgAway.height = "50";
                imgAway.width = "50"
                aAway.appendChild(imgAway);

                document.getElementById('fixAwayTeamImg').appendChild(aAway);
                document.getElementById('fixAwayTeam').innerText = item.teams.away.name;

                if(item.fixture.status.short!="NS") {
                    document.getElementById('halfTimeResult').innerText = "(HT " + item.score.halftime.home
                        + " - " + item.score.halftime.away + ")";

                    if((item.score.extratime.home!=null && item.score.extratime.away!=null)
                        && (item.score.penalty.home!=null && item.score.penalty.away!=null)) {

                        var span1 = document.createElement('span');
                        span1.innerText = "(E " + item.score.extratime.home + " - " + item.score.extratime.away + ")";
                        var span2 = document.createElement('span');
                        span2.innerText = "(PEN "+ item.score.penalty.home + " - " + item.score.penalty.away + ")"
                        span2.style.marginLeft = "5px";
                        document.getElementById('exPen').appendChild(span1);
                        document.getElementById('exPen').appendChild(span2);

                    }else if(item.score.extratime.home!=null && item.score.extratime.away!=null) {
                        var span1 = document.createElement('span');
                        span1.innerText = "(E " + item.score.extratime.home + " - " + item.score.extratime.away + ")";
                        document.getElementById('exPen').appendChild(span1);
                    }
                }

                document.getElementById('fixDate').innerText = item.fixture.date.substring(0,10);

                document.getElementById('fixLeague').innerText = item.league.name + " ("+item.league.country+")";

                document.getElementById('fixRound').innerText = item.league.round;
                if(item.fixture.status.short=="1H" || item.fixture.status.short=="2H"
                    || item.fixture.status.short=="HT" || item.fixture.status.short=="ET"
                 || item.fixture.status.short=="P"){
                    document.getElementById('fixStartTime').innerText =
                        "KO "+ item.fixture.date.substring(11, 16) + " ("+item.fixture.status.elapsed +' ")';
                }else {
                    document.getElementById('fixStartTime').innerText = "KO "+ item.fixture.date.substring(11, 16);
                }
                document.getElementById('fixVenue').innerText = "Venue "+item.fixture.venue.name
                    + " (" + item.fixture.venue.city + ")";


                if(item.fixture.referee!=null) {
                    var newRow = refTable.insertRow();
                    var newCell1 = newRow.insertCell();
                    var textNode1 = document.createTextNode("Referee:")
                    newCell1.appendChild(textNode1);

                    var newCell2 = newRow.insertCell();
                    var textNode2 = document.createTextNode(item.fixture.referee)
                    newCell2.appendChild(textNode2);
                }else {
                    document.getElementById('btn2').style.display = "none";
                    document.getElementById('MatchOfficials').style.display = "none";
                }

                if(idAway=="" && idHome==""){
                    idHome = item.teams.home.id;
                    idAway = item.teams.away.id;
                }
            })

            getH2H(idHome,idAway);
        }
    })
}
matchDetailsAndMatchOfficials();

function fixtureStatistics(){

    const url = 'https://api-football-beta.p.rapidapi.com/fixtures/statistics?fixture='+fixtureId;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
        }
    };

    var statTableRef = document.getElementById('matchStats').getElementsByTagName('tbody')[0];

    fetch(url, options).then(res=>{
        return res.json();
    }).then(data=> {
        if(data.response.length>0) {

            var newRow = statTableRef.insertRow();
            var newCell1 = newRow.insertCell();
            var newTextNode1;
            if(data.response[0].statistics[0].value == null){
                newTextNode1 = document.createTextNode("0");
            }else {
                newTextNode1 = document.createTextNode(data.response[0].statistics[0].value);
            }
            newCell1.appendChild(newTextNode1);

            var newCell2 = newRow.insertCell();
            var newTextNode2 = document.createTextNode(data.response[0].statistics[0].type);
            newCell2.appendChild(newTextNode2);

            var newCell3 = newRow.insertCell();
            var newTextNode3;
            if(data.response[1].statistics[0].value == null){
                newTextNode3 = document.createTextNode("0");
            }else {
                newTextNode3 = document.createTextNode(data.response[1].statistics[0].value);
            }
            newCell3.appendChild(newTextNode3);

            newRow = statTableRef.insertRow();
            newCell1 = newRow.insertCell();
            newTextNode1;
            if(data.response[0].statistics[1].value == null){
                newTextNode1 = document.createTextNode("0");
            }else {
                newTextNode1 = document.createTextNode(data.response[0].statistics[1].value);
            }
            newCell1.appendChild(newTextNode1);

            newCell2 = newRow.insertCell();
            newTextNode2 = document.createTextNode(data.response[0].statistics[1].type);
            newCell2.appendChild(newTextNode2);

            newCell3 = newRow.insertCell();
            newTextNode3;
            if(data.response[1].statistics[1].value == null){
                newTextNode3 = document.createTextNode("0");
            }else {
                newTextNode3 = document.createTextNode(data.response[1].statistics[1].value);
            }
            newCell3.appendChild(newTextNode3);

            newRow = statTableRef.insertRow();
            newCell1 = newRow.insertCell();
            newTextNode1;
            if(data.response[0].statistics[2].value == null){
                newTextNode1 = document.createTextNode("0");
            }else {
                newTextNode1 = document.createTextNode(data.response[0].statistics[2].value);
            }
            newCell1.appendChild(newTextNode1);

            newCell2 = newRow.insertCell();
            newTextNode2 = document.createTextNode(data.response[0].statistics[2].type);
            newCell2.appendChild(newTextNode2);

            newCell3 = newRow.insertCell();
            newTextNode3;
            if(data.response[1].statistics[2].value == null){
                newTextNode3 = document.createTextNode("0");
            }else {
                newTextNode3 = document.createTextNode(data.response[1].statistics[2].value);
            }
            newCell3.appendChild(newTextNode3);

            newRow = statTableRef.insertRow();
            newCell1 = newRow.insertCell();
            newTextNode1;
            if(data.response[0].statistics[3].value == null){
                newTextNode1 = document.createTextNode("0");
            }else {
                newTextNode1 = document.createTextNode(data.response[0].statistics[3].value);
            }
            newCell1.appendChild(newTextNode1);

            newCell2 = newRow.insertCell();
            newTextNode2 = document.createTextNode(data.response[0].statistics[3].type);
            newCell2.appendChild(newTextNode2);

            newCell3 = newRow.insertCell();
            newTextNode3;
            if(data.response[1].statistics[3].value == null){
                newTextNode3 = document.createTextNode("0");
            }else {
                newTextNode3 = document.createTextNode(data.response[1].statistics[3].value);
            }
            newCell3.appendChild(newTextNode3);

            newRow = statTableRef.insertRow();
            newCell1 = newRow.insertCell();
            newTextNode1;
            if(data.response[0].statistics[4].value == null){
                newTextNode1 = document.createTextNode("0");
            }else {
                newTextNode1 = document.createTextNode(data.response[0].statistics[4].value);
            }
            newCell1.appendChild(newTextNode1);

            newCell2 = newRow.insertCell();
            newTextNode2 = document.createTextNode(data.response[0].statistics[4].type);
            newCell2.appendChild(newTextNode2);

            newCell3 = newRow.insertCell();
            newTextNode3;
            if(data.response[1].statistics[4].value == null){
                newTextNode3 = document.createTextNode("0");
            }else {
                newTextNode3 = document.createTextNode(data.response[1].statistics[4].value);
            }
            newCell3.appendChild(newTextNode3);

            newRow = statTableRef.insertRow();
            newCell1 = newRow.insertCell();
            newTextNode1;
            if(data.response[0].statistics[5].value == null){
                newTextNode1 = document.createTextNode("0");
            }else {
                newTextNode1 = document.createTextNode(data.response[0].statistics[5].value);
            }
            newCell1.appendChild(newTextNode1);

            newCell2 = newRow.insertCell();
            newTextNode2 = document.createTextNode(data.response[0].statistics[5].type);
            newCell2.appendChild(newTextNode2);

            newCell3 = newRow.insertCell();
            newTextNode3;
            if(data.response[1].statistics[5].value == null){
                newTextNode3 = document.createTextNode("0");
            }else {
                newTextNode3 = document.createTextNode(data.response[1].statistics[5].value);
            }
            newCell3.appendChild(newTextNode3);

            newRow = statTableRef.insertRow();
            newCell1 = newRow.insertCell();
            newTextNode1;
            if(data.response[0].statistics[6].value == null){
                newTextNode1 = document.createTextNode("0");
            }else {
                newTextNode1 = document.createTextNode(data.response[0].statistics[6].value);
            }
            newCell1.appendChild(newTextNode1);

            newCell2 = newRow.insertCell();
            newTextNode2 = document.createTextNode(data.response[0].statistics[6].type);
            newCell2.appendChild(newTextNode2);

            newCell3 = newRow.insertCell();
            newTextNode3;
            if(data.response[1].statistics[6].value == null){
                newTextNode3 = document.createTextNode("0");
            }else {
                newTextNode3 = document.createTextNode(data.response[1].statistics[6].value);
            }
            newCell3.appendChild(newTextNode3);

            newRow = statTableRef.insertRow();
            newCell1 = newRow.insertCell();
            newTextNode1;
            if(data.response[0].statistics[7].value == null){
                newTextNode1 = document.createTextNode("0");
            }else {
                newTextNode1 = document.createTextNode(data.response[0].statistics[7].value);
            }
            newCell1.appendChild(newTextNode1);

            newCell2 = newRow.insertCell();
            newTextNode2 = document.createTextNode(data.response[0].statistics[7].type);
            newCell2.appendChild(newTextNode2);

            newCell3 = newRow.insertCell();
            newTextNode3;
            if(data.response[1].statistics[7].value == null){
                newTextNode3 = document.createTextNode("0");
            }else {
                newTextNode3 = document.createTextNode(data.response[1].statistics[7].value);
            }
            newCell3.appendChild(newTextNode3);


            newRow = statTableRef.insertRow();
            newCell1 = newRow.insertCell();
            newTextNode1;
            if(data.response[0].statistics[8].value == null){
                newTextNode1 = document.createTextNode("0");
            }else {
                newTextNode1 = document.createTextNode(data.response[0].statistics[8].value);
            }
            newCell1.appendChild(newTextNode1);

            newCell2 = newRow.insertCell();
            newTextNode2 = document.createTextNode(data.response[0].statistics[8].type);
            newCell2.appendChild(newTextNode2);

            newCell3 = newRow.insertCell();
            newTextNode3;
            if(data.response[1].statistics[8].value == null){
                newTextNode3 = document.createTextNode("0");
            }else {
                newTextNode3 = document.createTextNode(data.response[1].statistics[8].value);
            }
            newCell3.appendChild(newTextNode3);

            newRow = statTableRef.insertRow();
            newCell1 = newRow.insertCell();
            newTextNode1;
            if(data.response[0].statistics[9].value == null){
                newTextNode1 = document.createTextNode("0");
            }else {
                newTextNode1 = document.createTextNode(data.response[0].statistics[9].value);
            }
            newCell1.appendChild(newTextNode1);

            newCell2 = newRow.insertCell();
            newTextNode2 = document.createTextNode(data.response[0].statistics[9].type);
            newCell2.appendChild(newTextNode2);

            newCell3 = newRow.insertCell();
            newTextNode3;
            if(data.response[1].statistics[9].value == null){
                newTextNode3 = document.createTextNode("0");
            }else {
                newTextNode3 = document.createTextNode(data.response[1].statistics[9].value);
            }
            newCell3.appendChild(newTextNode3);

            newRow = statTableRef.insertRow();
            newCell1 = newRow.insertCell();
            newTextNode1;
            if(data.response[0].statistics[1].value == null){
                newTextNode1 = document.createTextNode("0");
            }else {
                newTextNode1 = document.createTextNode(data.response[0].statistics[10].value);
            }
            newCell1.appendChild(newTextNode1);

            newCell2 = newRow.insertCell();
            newTextNode2 = document.createTextNode(data.response[0].statistics[10].type);
            newCell2.appendChild(newTextNode2);

            newCell3 = newRow.insertCell();
            newTextNode3;
            if(data.response[1].statistics[10].value == null){
                newTextNode3 = document.createTextNode("0");
            }else {
                newTextNode3 = document.createTextNode(data.response[1].statistics[10].value);
            }
            newCell3.appendChild(newTextNode3);

            newRow = statTableRef.insertRow();
            newCell1 = newRow.insertCell();
            newTextNode1;
            if(data.response[0].statistics[11].value == null){
                newTextNode1 = document.createTextNode("0");
            }else {
                newTextNode1 = document.createTextNode(data.response[0].statistics[11].value);
            }
            newCell1.appendChild(newTextNode1);

            newCell2 = newRow.insertCell();
            newTextNode2 = document.createTextNode(data.response[0].statistics[11].type);
            newCell2.appendChild(newTextNode2);

            newCell3 = newRow.insertCell();
            newTextNode3;
            if(data.response[1].statistics[11].value == null){
                newTextNode3 = document.createTextNode("0");
            }else {
                newTextNode3 = document.createTextNode(data.response[1].statistics[11].value);
            }
            newCell3.appendChild(newTextNode3);

            newRow = statTableRef.insertRow();
            newCell1 = newRow.insertCell();
            newTextNode1;
            if(data.response[0].statistics[12].value == null){
                newTextNode1 = document.createTextNode("0");
            }else {
                newTextNode1 = document.createTextNode(data.response[0].statistics[12].value);
            }
            newCell1.appendChild(newTextNode1);

            newCell2 = newRow.insertCell();
            newTextNode2 = document.createTextNode(data.response[0].statistics[12].type);
            newCell2.appendChild(newTextNode2);

            newCell3 = newRow.insertCell();
            newTextNode3;
            if(data.response[1].statistics[12].value == null){
                newTextNode3 = document.createTextNode("0");
            }else {
                newTextNode3 = document.createTextNode(data.response[1].statistics[12].value);
            }
            newCell3.appendChild(newTextNode3);

            newRow = statTableRef.insertRow();
            newCell1 = newRow.insertCell();
            newTextNode1;
            if(data.response[0].statistics[13].value == null){
                newTextNode1 = document.createTextNode("0");
            }else {
                newTextNode1 = document.createTextNode(data.response[0].statistics[13].value);
            }
            newCell1.appendChild(newTextNode1);

            newCell2 = newRow.insertCell();
            newTextNode2 = document.createTextNode(data.response[0].statistics[13].type);
            newCell2.appendChild(newTextNode2);

            newCell3 = newRow.insertCell();
            newTextNode3;
            if(data.response[1].statistics[13].value == null){
                newTextNode3 = document.createTextNode("0");
            }else {
                newTextNode3 = document.createTextNode(data.response[1].statistics[13].value);
            }
            newCell3.appendChild(newTextNode3);

            newRow = statTableRef.insertRow();
            newCell1 = newRow.insertCell();
            newTextNode1;
            if(data.response[0].statistics[14].value == null){
                newTextNode1 = document.createTextNode("0");
            }else {
                newTextNode1 = document.createTextNode(data.response[0].statistics[14].value);
            }
            newCell1.appendChild(newTextNode1);

            newCell2 = newRow.insertCell();
            newTextNode2 = document.createTextNode(data.response[0].statistics[14].type);
            newCell2.appendChild(newTextNode2);

            newCell3 = newRow.insertCell();
            newTextNode3;
            if(data.response[1].statistics[14].value == null){
                newTextNode3 = document.createTextNode("0");
            }else {
                newTextNode3 = document.createTextNode(data.response[1].statistics[14].value);
            }
            newCell3.appendChild(newTextNode3);;

            newRow = statTableRef.insertRow();
            newCell1 = newRow.insertCell();
            newTextNode1;
            if(data.response[0].statistics[15].value == null){
                newTextNode1 = document.createTextNode("0");
            }else {
                newTextNode1 = document.createTextNode(data.response[0].statistics[15].value);
            }
            newCell1.appendChild(newTextNode1);

            newCell2 = newRow.insertCell();
            newTextNode2 = document.createTextNode(data.response[0].statistics[15].type);
            newCell2.appendChild(newTextNode2);

            newCell3 = newRow.insertCell();
            newTextNode3;
            if(data.response[1].statistics[15].value == null){
                newTextNode3 = document.createTextNode("0");
            }else {
                newTextNode3 = document.createTextNode(data.response[1].statistics[15].value);
            }
            newCell3.appendChild(newTextNode3);

            newRow = statTableRef.insertRow();
            newCell1 = newRow.insertCell();
            newTextNode1;
            if(data.response[0].statistics[16].value == null){
                newTextNode1 = document.createTextNode("0");
            }else {
                newTextNode1 = document.createTextNode(data.response[0].statistics[16].value);
            }
            newCell1.appendChild(newTextNode1);

            newCell2 = newRow.insertCell();
            newTextNode2 = document.createTextNode(data.response[0].statistics[16].type);
            newCell2.appendChild(newTextNode2);

            newCell3 = newRow.insertCell();
            newTextNode3;
            if(data.response[1].statistics[16].value == null){
                newTextNode3 = document.createTextNode("0");
            }else {
                newTextNode3 = document.createTextNode(data.response[1].statistics[16].value);
            }
            newCell3.appendChild(newTextNode3);
        }else {
            document.getElementById('Statistics').style.display = "none";
            document.getElementById('btn3').style.display = "none";
        }
    })
}

fixtureStatistics();

function getH2H(idHome, idAway){

    const url = 'https://api-football-beta.p.rapidapi.com/fixtures/headtohead?h2h='
        +idHome+'-'+idAway+'&status=ft';
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

        if(data.response.length>0) {


            var refTable = document.getElementById('h2hTable').getElementsByTagName('tbody')[0];
            data.response.forEach(item=>{

                var newRow = refTable.insertRow();
                var newCell1 = newRow.insertCell();
                var newTextNode1 = document.createTextNode(item.fixture.date.substring(0,10))
                newCell1.appendChild(newTextNode1);

                var newCell2 = newRow.insertCell();
                var newTextNode2 = document.createTextNode(item.league.name)
                newCell2.appendChild(newTextNode2);

                var newCell3 = newRow.insertCell();
                var img = document.createElement('img');
                img.height = "25";
                img.width = "25"
                img.src = item.teams.home.logo;
                newCell3.appendChild(img);

                var newCell4 = newRow.insertCell();
                var a = document.createElement('a');
                a.style.textDecoration = "none";
                a.style.color = "black";
                a.href = "/Football/team/"+ item.teams.home.id
                var newTextNode4 = document.createTextNode(item.teams.home.name)
                a.appendChild(newTextNode4)
                newCell4.appendChild(a);

                var newCell5 = newRow.insertCell();
                a = document.createElement('a');
                a.style.textDecoration = "none";
                a.style.color = "black";
                a.href = "/Football/fixture/"+item.fixture.id+"/details";
                var newTextNode5 = document.createTextNode(item.goals.home + " - " + item.goals.away)
                a.appendChild(newTextNode5)
                newCell5.appendChild(a);

                var newCell6 = newRow.insertCell();
                img = document.createElement('img');
                img.height = "25";
                img.width = "25"
                img.src = item.teams.away.logo;
                newCell6.appendChild(img);

                var newCell7 = newRow.insertCell();
                a = document.createElement('a');
                a.style.textDecoration = "none";
                a.style.color = "black";
                a.href = "/Football/team/"+ item.teams.away.id
                var newTextNode7 = document.createTextNode(item.teams.away.name)
                a.appendChild(newTextNode7)
                newCell7.appendChild(a);

            })
        }else {
            document.getElementById('btn4').style.display = "none";
            document.getElementById('h2h').style.display = "none";
        }
    })
}

function playersFixtureStats(){
    const url = 'https://api-football-beta.p.rapidapi.com/fixtures/players?fixture='+fixtureId;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6fbe9e29c5msh8b63eb96d8fc212p1fd9e6jsna0c68e516fe7',
            'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
        }
    };

    fetch(url, options).then(res=>{
        return res.json();
    }).then(data=>{

        if(data.response.length>0){


            var refHomeGkTable = document.getElementById('homePlayerFixStats')
                .getElementsByTagName('tbody')[0];
            var refHomeOthersTable = document.getElementById('homePlayerFixStats')
                .getElementsByTagName('tbody')[1];

            var refAwayGkTable = document.getElementById('awayPlayerFixStats')
                .getElementsByTagName('tbody')[0];


            var refAwayOthersTable = document.getElementById('awayPlayerFixStats')
                .getElementsByTagName('tbody')[1];

            data.response[0].players.forEach(player=>{
                player.statistics.forEach(stat=>{
                    if(stat.games.position=="G") {
                        var newRow = refHomeGkTable.insertRow();

                        var newCell1 = newRow.insertCell();
                        var newTextNode1 = document.createTextNode(player.player.name);
                        newCell1.appendChild(newTextNode1);

                        var newCell2 = newRow.insertCell();
                        var newTextNode2 = document.createTextNode(stat.games.position);
                        newCell2.appendChild(newTextNode2);

                        var newCell3 = newRow.insertCell();
                        if (stat.games.minutes == null) {
                            var newTextNode3 = document.createTextNode("0");
                            newCell3.appendChild(newTextNode3)
                        } else {
                            var newTextNode3 = document.createTextNode(stat.games.minutes);
                            newCell3.appendChild(newTextNode3)
                        }
                        var newCell4 = newRow.insertCell();
                        if (stat.goals.saves == null) {
                            var newTextNode4 = document.createTextNode("0");
                            newCell4.appendChild(newTextNode4)

                        } else {
                            var newTextNode4 = document.createTextNode(stat.goals.saves);
                            newCell4.appendChild(newTextNode4)
                        }

                        var newCell5 = newRow.insertCell();
                        var newTextNode5 = document.createTextNode(stat.goals.conceded);
                        newCell5.appendChild(newTextNode5);

                        var newCell6 = newRow.insertCell();
                        if (stat.goals.total == null) {
                            newTextNode6 = document.createTextNode("0");
                            newCell6.appendChild(newTextNode6);
                        } else {
                            var newTextNode5 = document.createTextNode(stat.goals.conceded);
                            newCell5.appendChild(newTextNode5);
                        }
                        var newCell7 = newRow.insertCell();
                        if (stat.passes.total == null) {
                            newTextNode7 = document.createTextNode("0");
                            newCell7.appendChild(newTextNode7);
                        } else {
                            newTextNode7 = document.createTextNode(stat.passes.total);
                            newCell7.appendChild(newTextNode7);
                        }

                        var newCell8 = newRow.insertCell();
                        var newTextNode8 = document.createTextNode(stat.cards.yellow);
                        newCell8.appendChild(newTextNode8);

                        var newCell9 = newRow.insertCell();
                        var newTextNode9 = document.createTextNode(stat.cards.red);
                        newCell9.appendChild(newTextNode9);

                        var newCell10 = newRow.insertCell();
                        if (stat.games.rating == null) {
                            var newTextNode10 = document.createTextNode("Never played");
                            newCell10.appendChild(newTextNode10);
                        } else {
                            var newTextNode10 = document.createTextNode(stat.games.rating);
                            newCell10.appendChild(newTextNode10);
                        }
                        var newCell11 = newRow.insertCell();
                        var newTextNode11 = document.createTextNode("");
                        newCell11.appendChild(newTextNode11)
                    }else {

                        var newRow = refHomeOthersTable.insertRow();

                        var newCell1 = newRow.insertCell();
                        var newTextNode1 = document.createTextNode(player.player.name);
                        newCell1.appendChild(newTextNode1);

                        var newCell2 = newRow.insertCell();
                        var newTextNode2 = document.createTextNode(stat.games.position);
                        newCell2.appendChild(newTextNode2);

                        var newCell3 = newRow.insertCell();
                        if (stat.games.minutes==null){
                            var newTextNode3 = document.createTextNode("0");
                            newCell3.appendChild(newTextNode3)
                        }else {
                            var newTextNode3 = document.createTextNode(stat.games.minutes);
                            newCell3.appendChild(newTextNode3)
                        }

                        var newCell4 = newRow.insertCell();
                        if(stat.shots.total==null){
                            var newTextNode4 = document.createTextNode("0");
                            newCell4.appendChild(newTextNode4)
                        }else {
                            var newTextNode4 = document.createTextNode(stat.shots.total);
                            newCell4.appendChild(newTextNode4)
                        }

                        var newCell5 = newRow.insertCell();
                        if (stat.shots.on==null){
                            var newTextNode5 = document.createTextNode(0);
                            newCell5.appendChild(newTextNode5);
                        }else {
                            var newTextNode5 = document.createTextNode(stat.shots.on);
                            newCell5.appendChild(newTextNode5);
                        }

                        var newCell6 = newRow.insertCell();
                        if (stat.goals.total == null) {
                            newTextNode6 = document.createTextNode("0");
                            newCell6.appendChild(newTextNode6);
                        } else {
                            var newTextNode6 = document.createTextNode(stat.goals.total);
                            newCell6.appendChild(newTextNode6);
                        }

                        var newCell7 = newRow.insertCell();
                        if(stat.goals.assists==null){
                            newTextNode7 = document.createTextNode("0");
                            newCell7.appendChild(newTextNode7);
                        }else {
                            newTextNode7 = document.createTextNode(stat.goals.assists);
                            newCell7.appendChild(newTextNode7);
                        }

                        var newCell8 = newRow.insertCell();
                        if (stat.passes.total == null) {
                            newTextNode8 = document.createTextNode("0");
                            newCell8.appendChild(newTextNode8);
                        } else {
                            newTextNode8 = document.createTextNode(stat.passes.total);
                            newCell8.appendChild(newTextNode8);
                        }

                        var newCell9 = newRow.insertCell();
                        var newTextNode9 = document.createTextNode(stat.cards.yellow);
                        newCell9.appendChild(newTextNode9);

                        var newCell10 = newRow.insertCell();
                        var newTextNode10 = document.createTextNode(stat.cards.red);
                        newCell10.appendChild(newTextNode10);

                        var newCell11 = newRow.insertCell();
                        if (stat.games.rating == null) {
                            var newTextNode11 = document.createTextNode("Never played");
                            newCell11.appendChild(newTextNode11);
                        } else {
                            var newTextNode11 = document.createTextNode(stat.games.rating);
                            newCell11.appendChild(newTextNode11);
                        }
                    }
                })
            })
            data.response[1].players.forEach(player=>{
                player.statistics.forEach(stat=>{
                    if(stat.games.position=="G") {
                        var newRow = refAwayGkTable.insertRow();

                        var newCell1 = newRow.insertCell();
                        var newTextNode1 = document.createTextNode(player.player.name);
                        newCell1.appendChild(newTextNode1);

                        var newCell2 = newRow.insertCell();
                        var newTextNode2 = document.createTextNode(stat.games.position);
                        newCell2.appendChild(newTextNode2);

                        var newCell3 = newRow.insertCell();
                        if (stat.games.minutes == null) {
                            var newTextNode3 = document.createTextNode("0");
                            newCell3.appendChild(newTextNode3)
                        } else {
                            var newTextNode3 = document.createTextNode(stat.games.minutes);
                            newCell3.appendChild(newTextNode3)
                        }
                        var newCell4 = newRow.insertCell();
                        if (stat.goals.saves == null) {
                            var newTextNode4 = document.createTextNode("0");
                            newCell4.appendChild(newTextNode4)

                        } else {
                            var newTextNode4 = document.createTextNode(stat.goals.saves);
                            newCell4.appendChild(newTextNode4)
                        }

                        var newCell5 = newRow.insertCell();
                        var newTextNode5 = document.createTextNode(stat.goals.conceded);
                        newCell5.appendChild(newTextNode5);

                        var newCell6 = newRow.insertCell();
                        if (stat.goals.total == null) {
                            newTextNode6 = document.createTextNode("0");
                            newCell6.appendChild(newTextNode6);
                        } else {
                            var newTextNode5 = document.createTextNode(stat.goals.conceded);
                            newCell5.appendChild(newTextNode5);
                        }
                        var newCell7 = newRow.insertCell();
                        if (stat.passes.total == null) {
                            newTextNode7 = document.createTextNode("0");
                            newCell7.appendChild(newTextNode7);
                        } else {
                            newTextNode7 = document.createTextNode(stat.passes.total);
                            newCell7.appendChild(newTextNode7);
                        }

                        var newCell8 = newRow.insertCell();
                        var newTextNode8 = document.createTextNode(stat.cards.yellow);
                        newCell8.appendChild(newTextNode8);

                        var newCell9 = newRow.insertCell();
                        var newTextNode9 = document.createTextNode(stat.cards.red);
                        newCell9.appendChild(newTextNode9);

                        var newCell10 = newRow.insertCell();
                        if (stat.games.rating == null) {
                            var newTextNode10 = document.createTextNode("Never played");
                            newCell10.appendChild(newTextNode10);
                        } else {
                            var newTextNode10 = document.createTextNode(stat.games.rating);
                            newCell10.appendChild(newTextNode10);
                        }
                        var newCell11 = newRow.insertCell();
                        var newTextNode11 = document.createTextNode("");
                        newCell11.appendChild(newTextNode11)
                    }else {

                        var newRow = refAwayOthersTable.insertRow();

                        var newCell1 = newRow.insertCell();
                        var newTextNode1 = document.createTextNode(player.player.name);
                        newCell1.appendChild(newTextNode1);

                        var newCell2 = newRow.insertCell();
                        var newTextNode2 = document.createTextNode(stat.games.position);
                        newCell2.appendChild(newTextNode2);

                        var newCell3 = newRow.insertCell();
                        if (stat.games.minutes==null){
                            var newTextNode3 = document.createTextNode("0");
                            newCell3.appendChild(newTextNode3)
                        }else {
                            var newTextNode3 = document.createTextNode(stat.games.minutes);
                            newCell3.appendChild(newTextNode3)
                        }

                        var newCell4 = newRow.insertCell();
                        if(stat.shots.total==null){
                            var newTextNode4 = document.createTextNode("0");
                            newCell4.appendChild(newTextNode4)
                        }else {
                            var newTextNode4 = document.createTextNode(stat.shots.total);
                            newCell4.appendChild(newTextNode4)
                        }

                        var newCell5 = newRow.insertCell();
                        if (stat.shots.on==null){
                            var newTextNode5 = document.createTextNode(0);
                            newCell5.appendChild(newTextNode5);
                        }else {
                            var newTextNode5 = document.createTextNode(stat.shots.on);
                            newCell5.appendChild(newTextNode5);
                        }

                        var newCell6 = newRow.insertCell();
                        if (stat.goals.total == null) {
                            newTextNode6 = document.createTextNode("0");
                            newCell6.appendChild(newTextNode6);
                        } else {
                            var newTextNode6 = document.createTextNode(stat.goals.total);
                            newCell6.appendChild(newTextNode6);
                        }

                        var newCell7 = newRow.insertCell();
                        if(stat.goals.assists==null){
                            newTextNode7 = document.createTextNode("0");
                            newCell7.appendChild(newTextNode7);
                        }else {
                            newTextNode7 = document.createTextNode(stat.goals.assists);
                            newCell7.appendChild(newTextNode7);
                        }

                        var newCell8 = newRow.insertCell();
                        if (stat.passes.total == null) {
                            newTextNode8 = document.createTextNode("0");
                            newCell8.appendChild(newTextNode8);
                        } else {
                            newTextNode8 = document.createTextNode(stat.passes.total);
                            newCell8.appendChild(newTextNode8);
                        }

                        var newCell9 = newRow.insertCell();
                        var newTextNode9 = document.createTextNode(stat.cards.yellow);
                        newCell9.appendChild(newTextNode9);

                        var newCell10 = newRow.insertCell();
                        var newTextNode10 = document.createTextNode(stat.cards.red);
                        newCell10.appendChild(newTextNode10);

                        var newCell11 = newRow.insertCell();
                        if (stat.games.rating == null) {
                            var newTextNode11 = document.createTextNode("Never played");
                            newCell11.appendChild(newTextNode11);
                        } else {
                            var newTextNode11 = document.createTextNode(stat.games.rating);
                            newCell11.appendChild(newTextNode11);
                        }
                    }
                })
            })
        }else {
            document.getElementById('btn5').style.display = "none";
            document.getElementById('playerStatistics').style.display = "none";
        }
    })
}
playersFixtureStats();

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function openTab2(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent2");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks2");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active2", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active2";
}