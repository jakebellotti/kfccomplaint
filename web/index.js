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