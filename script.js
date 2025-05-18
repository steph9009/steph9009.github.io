document.addEventListener('DOMContentLoaded', function() {
    // Aggiorna l'anno corrente nel footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const contactButtons = document.querySelectorAll('.contact-reveal');
    const contactPlaceholder = document.getElementById('contact-placeholder');

    // Dati di contatto "nascosti" (non direttamente nel DOM iniziale)
    // Sostituisci con i tuoi dati reali.
    // Questi potrebbero essere ulteriormente offuscati se lo desideri,
    // ma non essendo nel markup iniziale sono già meno esposti.
    const contacts = {
        email: 'm' + 'y' + 's' + 't' + 'e' + 'f' + 'a' + 'n' + 'o' + '@' + 'g' + 'm' + 'a' + 'i' + 'l' + '.' + 'c' + 'o' + 'm',
        phone: '(+39) ' + '393' + '245' + '4455' // Esempio di "costruzione"
    };

    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            const type = this.dataset.contactType;
            let contactValue = contacts[type];

            if (contactValue && contactPlaceholder) {
                let actionText = '';
                let fullContactInfo = '';

                if (type === 'email') {
                    fullContactInfo = `Email: ${contactValue}`;
                    actionText = ' (Clicca per copiare)';
                } else if (type === 'phone') {
                    fullContactInfo = `Tel: ${contactValue}`;
                    actionText = ' (Numero da comporre manualmente)'; // Copiare numeri di telefono può essere strano
                }

                contactPlaceholder.textContent = fullContactInfo + actionText;

                // Aggiungi la funzionalità di copia per l'email
                if (type === 'email') {
                    contactPlaceholder.style.cursor = 'pointer';
                    contactPlaceholder.title = 'Copia negli appunti';
                    contactPlaceholder.onclick = function() {
                        navigator.clipboard.writeText(contactValue).then(() => {
                            contactPlaceholder.textContent = `Email: ${contactValue} (Copiata!)`;
                            setTimeout(() => {
                                contactPlaceholder.textContent = fullContactInfo + actionText; // Ripristina testo
                            }, 2000);
                        }).catch(err => {
                            console.error('Errore nel copiare l\'email: ', err);
                            contactPlaceholder.textContent = `Email: ${contactValue} (Errore nella copia)`;
                        });
                    };
                } else {
                    contactPlaceholder.style.cursor = 'default';
                    contactPlaceholder.onclick = null; // Rimuovi handler se non è email
                }

                // Opzionale: nascondi il bottone dopo aver mostrato l'info
                // this.style.display = 'none';
            }
        });
    });
});
