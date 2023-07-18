function showLiveScores(){
    const url = 'https://api-football-beta.p.rapidapi.com/fixtures?live=all';
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
            var liveBodyRef = document.getElementById('live').getElementsByTagName('tbody')[0]
            data.response.forEach(item => {

                var newRow = liveBodyRef.insertRow();

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
                        + item.fixture.id + '/details" style="text-decoration: none;color: red">'
                        + item.fixture.date.substring(11, 16) + "</a>";
                }else {
                    newCell5.innerHTML = '<a href="' + "/Football/fixture/"
                        + item.fixture.id + '/details" style="text-decoration: none;color: red">'
                        + item.goals.home + " - " + item.goals.away + "</a>";
                }

                var newCell6 = newRow.insertCell();
                var newText6 = document.createTextNode(item.teams.away.name);
                newCell6.appendChild(newText6);

                var newCell7 = newRow.insertCell();
                newCell7.innerHTML = "<span style='color: green'>" + item.fixture.status.elapsed + "</span>"

            });
        }).catch(error=>console.log(error));
}
// showLiveScores();