function headerPageSelectChanged(select) {
    //TODO get the url, load the page
    window.location.href = select.value;
}

//TODO add modal window overlay


class ModalOverlay {

    static showModalWindow(windowText) {
        let modalBackground = document.createElement("div");
        modalBackground.classList.add("modal-window-background");
        //TODO add the text
        let modalWindowText = document.createElement("p");
        modalWindowText.classList.add("modal-window-text");
        modalWindowText.innerText = windowText;

        modalBackground.appendChild(modalWindowText);
        document.body.appendChild(modalBackground);
    }

    static hideModalWindow() {
        for (const element of document.querySelectorAll(".modal-window-background")) {
            document.body.removeChild(element);
        }
    }

}

//TODO add event listeners for header