document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM completamente caricato e analizzato.");

    const body = document.body;
    const themeToggleButton = document.getElementById('theme-toggle');
    const backToTopButton = document.getElementById('back-to-top');
    const langToggleEN = document.getElementById('language-toggle-en');
    const langToggleIT = document.getElementById('language-toggle-it');
    const contactRevealButtons = document.querySelectorAll('.contact-reveal'); // NodeList, può essere vuota

    console.log("Elementi base selezionati:", { body, themeToggleButton, backToTopButton, langToggleEN, langToggleIT, contactRevealButtons });

    // --- 0. Text Translations & Hidden Contacts ---
    const translations = {
        en: {
            pageTitle: "Stefano Siani - DFIR & Cybersecurity",
            toggleThemeLabel: "Toggle theme",
            backToTopLabel: "Back to top",
            headerName: "Stefano Siani",
            headerSubtitle: "Digital Forensics & Incident Response (DFIR) Expert | Cybersecurity Specialist",
            contactTitle: "Contact",
            contactLinkedIn: "LinkedIn",
            contactGitHub: "GitHub",
            contactWebsite: "Website",
            contactTelegram: "Telegram",
            showEmail: "Show Email",
            hideEmail: "Hide Email",
            showPhone: "Show Phone",
            hidePhone: "Hide Phone",
            emailLabel: "Email",
            phoneLabel: "Phone",
            copiedLabel: "Copied!",
            errorCopyingLabel: "Error copying",
            expertiseTitle: "Key Expertise",
            expertise1: "Digital Forensics (Mobile, Computer & Network)",
            expertise2: "Incident Response & Malware Analysis",
            expertise3: "Cybersecurity Audits (ISO 27001, GDPR)",
            expertise4: "Vulnerability Assessment & Penetration Testing (VAPT)",
            expertise5: "Network & System Hardening",
            expertise6: "OS Internals & Artifacts (Windows, macOS, Linux)",
            experienceTitle: "Work Experience",
            experience1Title: "Digital Forensics Expert",
            experience1Company: "BIT4LAW S.r.l. (Bologna, IT)",
            experience1Date: "March 2021 – Present",
            experience2Title: "IT Manager",
            experience2Company: "HelicamPro S.r.l. (Grassobbio, IT)",
            experience2Date: "August 2016 – August 2017",
            educationTitle: "Education & Certifications",
            education1Title: "GIAC Advanced Smartphone Forensics (GASF)",
            education1Institution: "SANS Institute",
            education1Date: "Valid until April 2029",
            education2Title: "Bachelor's Degree in Security of Computer Systems and Networks",
            education2Institution: "University of Milan",
            education2Date: "February 2021",
            programmingTitle: "Programming & Scripting",
            programmingSkills: "Python, JavaScript, C/C++, Go, Bash",
            footerRights: "All rights reserved.",
            footerPrivacy: "This page does not use cookies and respects your privacy."
        },
        it: {
            pageTitle: "Stefano Siani - DFIR & Cybersecurity",
            toggleThemeLabel: "Cambia tema",
            backToTopLabel: "Torna su",
            headerName: "Stefano Siani",
            headerSubtitle: "Esperto in Digital Forensics & Incident Response (DFIR) | Specialista Cybersecurity",
            contactTitle: "Contatti",
            contactLinkedIn: "LinkedIn",
            contactGitHub: "GitHub",
            contactWebsite: "Sito Web",
            contactTelegram: "Telegram",
            showEmail: "Mostra Email",
            hideEmail: "Nascondi Email",
            showPhone: "Mostra Telefono",
            hidePhone: "Nascondi Telefono",
            emailLabel: "Email",
            phoneLabel: "Tel",
            copiedLabel: "Copiato!",
            errorCopyingLabel: "Errore copia",
            expertiseTitle: "Expertise Chiave",
            expertise1: "Digital Forensics (Mobile, Computer & Network)",
            expertise2: "Incident Response & Analisi Malware",
            expertise3: "Audit Cybersecurity (ISO 27001, GDPR)",
            expertise4: "Vulnerability Assessment & Penetration Testing (VAPT)",
            expertise5: "Hardening di Reti & Sistemi",
            expertise6: "Internals OS & Artefatti Digitali (Windows, macOS, Linux)",
            experienceTitle: "Esperienza Professionale",
            experience1Title: "Esperto Digital Forensics",
            experience1Company: "BIT4LAW S.r.l. (Bologna, IT)",
            experience1Date: "Marzo 2021 – Attuale",
            experience2Title: "IT Manager",
            experience2Company: "HelicamPro S.r.l. (Grassobbio, IT)",
            experience2Date: "Agosto 2016 – Agosto 2017",
            educationTitle: "Istruzione e Certificazioni",
            education1Title: "GIAC Advanced Smartphone Forensics (GASF)",
            education1Institution: "SANS Institute",
            education1Date: "Valida fino a Aprile 2029",
            education2Title: "Laurea Triennale in Sicurezza dei Sistemi e delle Reti Informatiche",
            education2Institution: "Università degli Studi di Milano",
            education2Date: "Febbraio 2021",
            programmingTitle: "Programmazione & Scripting",
            programmingSkills: "Python, JavaScript, C/C++, Go, Bash",
            footerRights: "Tutti i diritti riservati.",
            footerPrivacy: "Questa pagina non utilizza cookie e rispetta la tua privacy."
        }
    };
    const hiddenContacts = {
        email: 'm' + 'y' + 's' + 't' + 'e' + 'f' + 'a' + 'n' + 'o' + '@' + 'g' + 'm' + 'a' + 'i' + 'l' + '.' + 'c' + 'o' + 'm',
        phone: '(+39) ' + '393' + '245' + '4455'
    };

    // --- 1. Theme Management ---
    let currentSystemTheme = 'dark'; // Default if not detectable
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        currentSystemTheme = 'light';
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        currentSystemTheme = 'dark';
    }

    let activeTheme = localStorage.getItem('theme') || currentSystemTheme;
    console.log("Tema iniziale determinato:", activeTheme, "(localStorage:", localStorage.getItem('theme'), ", system:", currentSystemTheme, ")");


    function applyTheme(theme) {
        console.log("Applicazione tema:", theme);
        if (!body) { console.error("Body element not found!"); return; }
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            if (themeToggleButton) themeToggleButton.textContent = '☀️';
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
            if (themeToggleButton) themeToggleButton.textContent = '🌙';
        }
        activeTheme = theme; // Aggiorna la variabile globale
    }

    function toggleTheme() {
        const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
        console.log("Toggle tema a:", newTheme);
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    applyTheme(activeTheme); // Applica il tema iniziale

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    } else {
        console.warn("Pulsante toggle tema non trovato.");
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) { // Solo se l'utente non ha scelto manualmente
            console.log("Preferenza di sistema per il tema cambiata.");
            currentSystemTheme = e.matches ? 'dark' : 'light';
            applyTheme(currentSystemTheme);
        }
    });
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
             console.log("Preferenza di sistema per il tema cambiata.");
            currentSystemTheme = e.matches ? 'light' : 'dark';
            applyTheme(currentSystemTheme);
        }
    });


    // --- 2. Back to Top Button ---
    function scrollFunction() {
        if (backToTopButton) {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                backToTopButton.style.display = "block";
            } else {
                backToTopButton.style.display = "none";
            }
        }
    }
    window.onscroll = scrollFunction;

    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    } else {
        console.warn("Pulsante 'Back to Top' non trovato.");
    }

    // --- 3. Multilingual Functionality ---
    let currentLanguage = localStorage.getItem('language') || 'en';
    console.log("Lingua iniziale determinata:", currentLanguage);

    function getTranslation(lang, key, fallbackKey = null) {
        if (translations[lang] && translations[lang][key]) {
            return translations[lang][key];
        }
        if (fallbackKey && translations[lang] && translations[lang][fallbackKey]) {
            // Fallback per chiavi comuni tipo show/hide se la specifica non esiste
            return translations[lang][fallbackKey];
        }
        console.warn(`Traduzione mancante per chiave: ${key} in lingua: ${lang}`);
        return key; // Ritorna la chiave stessa se non trova nulla
    }


    function setLanguage(lang) {
        console.log("Impostazione lingua a:", lang);
        currentLanguage = lang;
        localStorage.setItem('language', lang);
        if (document.documentElement) document.documentElement.lang = lang;

        document.querySelectorAll('[data-lang-key]').forEach(el => {
            el.textContent = getTranslation(lang, el.dataset.langKey);
        });

        document.querySelectorAll('[data-lang-key-aria-label]').forEach(el => {
            el.setAttribute('aria-label', getTranslation(lang, el.dataset.langKeyAriaLabel));
        });

        contactRevealButtons.forEach(button => {
            const type = button.dataset.contactType;
            const placeholderId = `contact-placeholder-${type}`;
            const placeholder = document.getElementById(placeholderId);
            const isVisible = placeholder && placeholder.classList.contains('visible');
            
            button.textContent = getTranslation(lang, isVisible ? button.dataset.langKeyHide : button.dataset.langKeyShow);
            // Aggiorna anche aria-label del bottone di contatto se necessario e se ha un suo data-lang-key-aria-label
        });

        if (langToggleEN && langToggleIT) {
            langToggleEN.classList.toggle('active', lang === 'en');
            langToggleIT.classList.toggle('active', lang === 'it');
        }
        console.log("Lingua impostata:", currentLanguage);
    }

    if (langToggleEN) {
        langToggleEN.addEventListener('click', () => setLanguage('en'));
    } else { console.warn("Pulsante lingua EN non trovato."); }

    if (langToggleIT) {
        langToggleIT.addEventListener('click', () => setLanguage('it'));
    } else { console.warn("Pulsante lingua IT non trovato."); }
    
    setLanguage(currentLanguage); // Imposta la lingua all'avvio


    // --- 4. Contact Info Enhancements ---
    contactRevealButtons.forEach(button => {
        // Il testo iniziale è già impostato da setLanguage
        button.addEventListener('click', function() {
            const type = this.dataset.contactType;
            const contactValue = hiddenContacts[type];
            const placeholderId = `contact-placeholder-${type}`;
            const placeholder = document.getElementById(placeholderId);

            if (!placeholder || !contactValue) {
                console.error("Placeholder o contactValue mancante per tipo:", type);
                return;
            }

            const isNowVisible = placeholder.classList.toggle('visible');
            this.textContent = getTranslation(currentLanguage, isNowVisible ? this.dataset.langKeyHide : this.dataset.langKeyShow);

            if (isNowVisible) {
                const label = getTranslation(currentLanguage, type === 'email' ? 'emailLabel' : 'phoneLabel');
                placeholder.textContent = `${label}: ${contactValue}`;
                placeholder.style.cursor = 'pointer';
                placeholder.title = `Copy ${type}`; // Potrebbe essere tradotto con un'altra data-key

                placeholder.onclick = function() {
                    navigator.clipboard.writeText(contactValue).then(() => {
                        const originalText = placeholder.textContent;
                        placeholder.textContent = `${label}: ${contactValue} (${getTranslation(currentLanguage, 'copiedLabel')})`;
                        setTimeout(() => {
                            placeholder.textContent = originalText; // Ripristina solo se ancora visibile
                             if(placeholder.classList.contains('visible')) {
                                placeholder.textContent = `${label}: ${contactValue}`;
                             }
                        }, 2000);
                    }).catch(err => {
                        console.error(`Errore nel copiare ${type}: `, err);
                        placeholder.textContent = `${label}: ${contactValue} (${getTranslation(currentLanguage, 'errorCopyingLabel')})`;
                    });
                };
                placeholder.style.display = 'inline-block';
            } else {
                placeholder.textContent = '';
                placeholder.style.display = 'none';
                placeholder.onclick = null;
            }
        });
    });


    // --- Footer Current Year ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    } else {
        console.warn("Elemento per l'anno corrente non trovato.");
    }

    console.log("Setup script completato.");
});
