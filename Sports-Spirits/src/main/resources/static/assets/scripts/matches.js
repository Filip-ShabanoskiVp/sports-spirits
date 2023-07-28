var teamId = document.getElementById('teamId').value;

var matchPlay = document.getElementById('matchPlay').value;


function Schedules(){
    if(matchPlay=="schedules"){
        const url = 'https://api-football-beta.p.rapidapi.com/fixtures?season=2023&team='+teamId;
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
            var schedulesBodyRef = document.getElementById('schedulesTable').getElementsByTagName('tbody')[0]
            data.response.forEach(item=>{
                if(item.fixture.status.short != "FT" && item.fixture.status.short != "AET"
                && item.fixture.status.short != "PEN"){

                    var newRow = schedulesBodyRef.insertRow();

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

                    if(item.fixture.status.short=="NS" || item.fixture.status.short=="TBD") {
                        newCell5.innerHTML = '<a href="' + "/Football/fixture/"
                            + item.fixture.id + '/details" style="text-decoration: none;color: black">'
                            + item.fixture.date.substring(11, 16) + "</a>";
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

                    if(item.fixture.status.short!="NS" && item.fixture.status.short!="TBD"){
                        var newCell7 = newRow.insertCell();
                        newCell7.innerHTML = "<span style='color: green'>" + item.fixture.status.elapsed + '"' + "</span>"
                    }if(item.fixture.status.short=="1H" || item.fixture.status.short=="2H"
                        || item.fixture.status.short=="HT" || item.fixture.status.short=="ET"
                        || item.fixture.status.short=="P"){
                        var newCell7 = newRow.insertCell();
                        var newText7 = document.createTextNode("");
                        newCell7.appendChild(newText7);
                    }
                }
            })
        })
    }
}
Schedules();

function results(season){

    if(matchPlay=="results"){
        const url = 'https://api-football-beta.p.rapidapi.com/fixtures?team='+teamId+'&season='+season;
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
            var resultsBodyRef = document.getElementById('resultsTable').getElementsByTagName('tbody')[0]
            data.response.forEach(item=>{
                if(item.fixture.status.short == "FT" || item.fixture.status.short == "AET"
                || item.fixture.status.short == "PEN"){

                    var newRow = resultsBodyRef.insertRow();

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

                    if(item.teams.home.winner==true){
                        var b = document.createElement('b');
                        var newText4 = document.createTextNode(item.teams.home.name);
                        b.appendChild(newText4)
                        newCell4.appendChild(b);
                    }else {
                        var newText4 = document.createTextNode(item.teams.home.name);
                        newCell4.appendChild(newText4);
                    }


                    var newCell5 = newRow.insertCell();

                    newCell5.innerHTML = '<a href="' + "/Football/fixture/"
                        + item.fixture.id + '/details" style="text-decoration: none;color: black">'
                        + item.goals.home + " - " + item.goals.away + "</a>";

                    var newCell6 = newRow.insertCell();


                    if(item.teams.away.winner==true){

                        var b = document.createElement('b');
                        var newText6 = document.createTextNode(item.teams.away.name);
                        b.appendChild(newText6)
                        newCell6.appendChild(b);
                    }else {
                        var newText6 = document.createTextNode(item.teams.away.name);
                        newCell6.appendChild(newText6);
                    }

                    if(item.teams.home.winner==null && item.teams.away.winner==null){
                        var newCell7 = newRow.insertCell();
                        var div = document.createElement('div');
                        div.className = "bg-warning";
                        span = document.createElement('span');
                        span.style.position = "relative";
                        span.style.left = "5px";
                        span.className = "text-white";
                        var newText7 = document.createTextNode("D");
                        span.appendChild(newText7);
                        div.appendChild(span);
                        newCell7.appendChild(div);
                    }else {
                        if(item.teams.home.id==teamId){
                            if(item.teams.home.winner==true){
                                var newCell7 = newRow.insertCell();
                                var div = document.createElement('div');
                                div.className = "bg-success";
                                span = document.createElement('span');
                                span.style.position = "relative";
                                span.style.left = "5px";
                                span.className = "text-white";
                                var newText7 = document.createTextNode('W');
                                span.appendChild(newText7);
                                div.appendChild(span);
                                newCell7.appendChild(div);
                            }else {
                                var newCell7 = newRow.insertCell();
                                var div = document.createElement('div');
                                div.className = "bg-danger";
                                span = document.createElement('span');
                                span.style.position = "relative";
                                span.style.left = "5px";
                                span.className = "text-white";
                                var newText7 = document.createTextNode('L');
                                span.appendChild(newText7);
                                div.appendChild(span);
                                newCell7.appendChild(div);
                            }

                        }else if(item.teams.away.id==teamId){

                            if(item.teams.away.winner==true){
                                var newCell7 = newRow.insertCell();
                                var div = document.createElement('div');
                                div.className = "bg-success";
                                span = document.createElement('span');
                                span.style.position = "relative";
                                span.style.left = "5px";
                                span.className = "text-white";
                                var newText7 = document.createTextNode('W');
                                span.appendChild(newText7);
                                div.appendChild(span);
                                newCell7.appendChild(div);
                            }else {
                                var newCell7 = newRow.insertCell();
                                var div = document.createElement('div');
                                div.className = "bg-danger";
                                span = document.createElement('span');
                                span.style.position = "relative";
                                span.style.left = "5px";
                                span.className = "text-white";
                                var newText7 = document.createTextNode('L');
                                span.appendChild(newText7);
                                div.appendChild(span);
                                newCell7.appendChild(div);
                            }
                        }
                    }
                }
            })
        })
    }
}


function showTeamSeasons(){
    var seasons = ["2023","2022","2021","2020","2019","2018","2017","2016","2015","2014","2013","2012","2011",
        "2010"]
    if(matchPlay=="results"){
        for (var i=0; i< seasons.length; i++){
            var x = document.getElementById("season");
            var option = document.createElement("option");
            var year =parseInt(seasons[i])+1;
            option.text = seasons[i] + "/"+ year;
            option.value = seasons[i];
            x.add(option);
        }
        results(seasons[0]);
    }
}
showTeamSeasons();



function changeSeason(){
    var season = document.getElementById("season").value;
    let resBody = document.getElementById("resBody");
    while (resBody.hasChildNodes()){
        resBody.removeChild(resBody.lastChild);
    }
    results(season);
}
