const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    //stores triggered events
    window.defferedPrompt = event;

    //removes the hidden class from the button
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    //implements a click event handler on the butInstall element
    const promptEvent =window.defferedPrompt;

    if(!promptEvent){
        return;
    }

    //show a prompt
    promptEvent.prompt();

    //reset the deffered prompt variable can only be used a single time
    window.deferredPrompt = null;
    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    //clears prompt
    window.defferedPrompt = null;
});
