$(document).ready(() => {
  // Getting references to our form and inputs
  const placeBetForm = $("form.bet");
  const recordingInput = $("#recording-guess");
  const screenshareInput = $("#screenshare-guess");

  const chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };

  // When the form is submitted, we validate there's an email and password entered
  placeBetForm.on("submit", event => {
    event.preventDefault();
    const betData = {
      guessRecording: recordingInput.val().trim(),
      guessShare: screenshareInput.val().trim()
    };
    if (!betData.guessRecording || !betData.guessShare) {
      return;
    }
    // If we have an email and password we run the loginUser function and clear the form
    placeBet(betData.guessRecording, betData.guessShare);
    recordingInput.val("");
    screenshareInput.val("");
  });
  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function placeBet(record, screenshare) {
    $.post("/api/bet", {
      guessRecord: record,
      guessShare: screenshare
    })
      .then(response => {
        window.location.replace("/members");
        // If there's an error, log the error
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  fetch("/api/allUserBets", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data) {
        if (data.length > 0) {
          $("#show-no-histoical-data").hide();
          $("#historical-data-chart").show();
          renderChart(data);
        } else {
          $("#show-no-histoical-data").show();
          $("#historical-data-chart").hide();
        }
      }
    });

  const renderChart = data => {
    const color = Chart.helpers.color;

    const dates = data.map(bet => {
      return bet.createdAt;
    });

    const guessRecords = data.map(bet => {
      return bet.guessRecord;
    });

    const guessShares = data.map(bet => {
      return bet.guessShare;
    });

    let barChartData = {
        labels: dates,
        datasets: [{
            label: 'Guess Shared',
            backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
            borderColor: chartColors.red,
            borderWidth: 1,
            data: guessShares
        }, {
            label: 'Guess Record',
            backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
            borderColor: chartColors.blue,
            borderWidth: 1,
            data: guessRecords
        }]
    };

    const ctx = document.getElementById('historical-data').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Historical Data'
            }
        }
    });
  }
});
