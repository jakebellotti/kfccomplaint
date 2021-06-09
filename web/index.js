let newWindowDialog = document.getElementById("new-window-dialog");

function hideOpenLinkDialog() {
    newWindowDialog.style.display = "none";
}

function showOpenLinkDialog(link) {
    newWindowDialog.style.display = "flex";

    let newWindowLinkButton = document.getElementById("new-window-link-button");
    newWindowLinkButton.onclick = function () {
        window.open(link, "_blank");
        hideOpenLinkDialog();
    };

    let sameWindowLinkButton = document.getElementById("same-window-link-button");
    sameWindowLinkButton.onclick = function () {
        window.open(link, "_self");
        hideOpenLinkDialog();
    };
}

function openLink(url) {
    //TODO window that asks if you want top o
    showOpenLinkDialog(url);

    // window.open(url, "_blank");
}

//GES: 5/18/2021 - 6/5/2021

function calculateGESPeriod() {
    let startWeek = moment("20/04/2021", "DD/MM/YYYY");

    while (true) {
        let endWeek = moment(startWeek).add(27, "days");

        let todayMoment = moment().startOf("day");
        let withinRange = MomentAPI.momentIsBetweenRange(todayMoment, startWeek, endWeek);

        console.log(`${startWeek.format("DD/MM/YYYY")} - ${endWeek.format("DD/MM/YYYY")}`);

        if (withinRange) {
            document.getElementById("ges-reporting-start").innerHTML = startWeek.format("DD/MM/YYYY");
            document.getElementById("ges-reporting-end").innerHTML = endWeek.format("DD/MM/YYYY");

            let daysLeft = endWeek.diff(todayMoment, "days");
            let expectedResponses = (30 - daysLeft);

            document.getElementById("ges-period-days-remaining").innerText = `${daysLeft} days left`;
            document.getElementById("ges-expected-responses").innerText = expectedResponses;
            break;
        }

        startWeek = startWeek.add(28, "days");
    }
}

//TODO do testing
function calculateYumPeriod() {
    let weekStartDate = moment("31/05/2021", "DD/MM/YYYY");
    let weekEndDate = moment(weekStartDate).add(6, "days");
    //TODO update years, reset after period 13

    let startPeriod = 2;
    let startWeek = 1;
    while (true) {
        let todayMoment = moment().startOf("day");
        let withinRange = MomentAPI.momentIsBetweenRange(todayMoment, weekStartDate, weekEndDate);

        if (withinRange) {
            document.getElementById("period-display").innerText = startPeriod;
            document.getElementById("period-week-display").innerText = startWeek;
            break;
        }
        startWeek = (startWeek + 1);

        if (startWeek === 5) {
            startWeek = 1;
            startPeriod = startPeriod + 1;
        }
        weekStartDate = weekStartDate.add(7, "days");
        weekEndDate = moment(weekStartDate).add(6, "days");
    }
}

// <div className="scheduled-orders-div">
//     <div className="scheduled-order-div">
//         <p className="scheduled-order-label">Tip Top (Bread) : in 2 hours</p>
//         <div className="scheduled-order-progress-bar"></div>
//     </div>
//     <div className="scheduled-order-div">
//         <p className="scheduled-order-label">Tip Top (Bread) : in 2 hours</p>
//         <div className="scheduled-order-progress-bar"></div>
//     </div>
// </div>

function createScheduledOrderDiv(order) {
    let cutoffProgressBarData = order.getCutoffProgressBarData();
    let percentage = (100 / cutoffProgressBarData.totalSteps) * cutoffProgressBarData.currentSteps;
    let cutOffPassed = (percentage === 100);


    let outerDiv = document.createElement("div");
    outerDiv.classList.add("scheduled-order-div");

    let label = document.createElement("p");
    label.classList.add("scheduled-order-label");
    //TODO if deadline missed
    label.innerText = `${order.order.name} : ${order.getTimeDifferenceString()}`;

    let progressBar = document.createElement("div");
    progressBar.classList.add("scheduled-order-progress-bar");
    if (cutOffPassed) {
        progressBar.classList.add("scheduled-order-progress-bar-missed");
    }
    progressBar.style.width = `${percentage}%`;

    outerDiv.appendChild(label);
    outerDiv.appendChild(progressBar);
    return outerDiv;
}

function updateScheduledOrders() {
    let soDiv = document.querySelector(".scheduled-orders-div");
    soDiv.innerHTML = "";

    let scheduledOrders = ScheduledOrders.getTimesForTodaysOrders();

    for (const order of scheduledOrders) {
        let scheduledOrderDisplayDiv = createScheduledOrderDiv(order);
        soDiv.appendChild(scheduledOrderDisplayDiv);
    }
}

updateScheduledOrders();

//Update every 10 seconds
setInterval(updateScheduledOrders, (1000 * 10));

calculateYumPeriod();
calculateGESPeriod();