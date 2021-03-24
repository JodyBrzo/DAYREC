const adminForm = $("form.record-data");
const actualShare = $("input#screenshare-misses");
const actualRecord = $("input#recording-misses");
const recordId = $("input#record-id");
const allowBettingButton = $("#allow-betting-button");
let allowBettingStatus = false;
const setBettingStatus = () => {
  allowBettingStatus = parseBoolean(allowBettingButton.attr("data-allow"));
  if (allowBettingStatus) {
    allowBettingButton.removeClass("allow-betting-button-off");
    allowBettingButton.addClass("allow-betting-button-on");
  } else {
    allowBettingButton.removeClass("allow-betting-button-on");
    allowBettingButton.addClass("allow-betting-button-off");
  }
};
adminForm.on("submit", event => {
  event.preventDefault();
  const addData = {
    actualShare: actualShare.val().trim(),
    actualRecord: actualRecord.val().trim()
  };
  // If username or password null, or user is not administrator, return
  if (!addData.actualShare || !addData.actualRecord) {
    return;
  }
  // If we have an email and password we run the loginUser function and clear the form
  recordData(addData.actualShare, addData.actualRecord);
});
//gets the data from the admin update text fields and passe it to the route to update the actual record/share
const recordData = (actualShareTotal, actualRecordTotal) => {
  fetch("/api/setActualRecordLog", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      recordId: parseInt(recordId.val(), 10),
      actualShare: actualShareTotal,
      actualRecord: actualRecordTotal
    })
  })
    .then(response => response.json())
    .then(data => {
      actualRecord.val(data.actualRecord);
      actualShare.val(data.actualShare);
    });
};
// Allow betting functionality
$("#allow-betting-button").click(() => {
  allowBettingStatus = !allowBettingStatus;
  allowBettingButton.attr("data-allow", allowBettingStatus);
  fetch("/api/allowBets", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ allowBetStatus: allowBettingStatus })
  }).then(response => {
    response.json().then(data => {
      console.log(data);
      allowBettingButton.blur();
      setBettingStatus();
    });
  });
});
// Apply all user payouts
$("#assign-payouts-button").click(() => {
  allowBettingStatus = !allowBettingStatus;
  allowBettingButton.attr("data-allow", allowBettingStatus);
  fetch("/api/assignUserPayouts", {
    method: "GET"
  }).then(response => {
    response.json().then(data => {
      console.log(data);
    });
  });
});
const parseBoolean = booleanText => {
  const text = new String(booleanText);
  const bool = (() => {
    switch (false) {
      case text.toLowerCase() !== "true":
        return true;
      case text.toLowerCase() !== "false":
        return false;
    }
  })();
  if (typeof bool === "boolean") {
    return bool;
  }
  return void 0;
};
setBettingStatus();
