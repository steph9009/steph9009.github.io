document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const themeToggleButton = document.getElementById('theme-toggle');
    const backToTopButton = document.getElementById('back-to-top');
    const langToggleEN = document.getElementById('language-toggle-en');
    const langToggleIT = document.getElementById('language-toggle-it');
    const contactRevealButtons = document.querySelectorAll('.contact-reveal');

    // --- 0. Text Translations ---
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
    // Dati di contatto "nascosti"
    const hiddenContacts = {
        email: 'm' + 'y' + 's' + 't' + 'e' + 'f' + 'a' + 'n' + 'o' + '@' + 'g' + 'm' + 'a' + 'i' + 'l' + '.' + 'c' + 'o' + 'm',
        phone: '(+39) ' + '393' + '245' + '4455'
    };


    // --- 1. Theme Management ---
    let currentTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            if (themeToggleButton) themeToggleButton.textContent = '☀️'; // Sun for dark mode (to switch to light)
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
            if (themeToggleButton) themeToggleButton.textContent = '🌙'; // Moon for light mode (to switch to dark)
        }
    }

    function toggleTheme() {
        currentTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
    }

    // Initial theme setup
    if (currentTheme) {
        applyTheme(currentTheme);
    } else if (prefersDarkScheme.matches) {
        applyTheme('dark'); // System preference for dark
        currentTheme = 'dark';
    } else {
        applyTheme('dark'); // Default to dark as requested, if no system pref for dark or no localStorage
        currentTheme = 'dark';
    }
     // If no theme was set by localStorage, but system prefers light, switch to light
    if (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: light)').matches) {
        applyTheme('light');
        currentTheme = 'light';
    }


    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }

    // Listen for system theme changes if no manual override
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) { // Only if user hasn't manually set a theme
            currentTheme = e.matches ? 'dark' : 'light';
            applyTheme(currentTheme);
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
    }

    // --- 3. Multilingual Functionality ---
    let currentLanguage = localStorage.getItem('language') || 'en'; // Default to English

    function setLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem('language', lang);

        document.documentElement.lang = lang; // Update lang attribute of <html>

        const elementsToTranslate = document.querySelectorAll('[data-lang-key]');
        elementsToTranslate.forEach(el => {
            const key = el.dataset.langKey;
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // Update aria-labels separately if they use different keys or need special handling
        document.querySelectorAll('[data-lang-key-aria-label]').forEach(el => {
            const key = el.dataset.langKeyAriaLabel;
            if (translations[lang] && translations[lang][key]) {
                el.setAttribute('aria-label', translations[lang][key]);
            }
        });
        
        // Update contact button texts based on their current state
        contactRevealButtons.forEach(button => {
            const type = button.dataset.contactType;
            const placeholderId = `contact-placeholder-${type}`;
            const placeholder = document.getElementById(placeholderId);
            const isVisible = placeholder && placeholder.classList.contains('visible');

            if (isVisible) {
                button.textContent = translations[lang][button.dataset.langKeyHide];
            } else {
                button.textContent = translations[lang][button.dataset.langKeyShow];
            }
        });


        // Update active class for language buttons
        if (langToggleEN && langToggleIT) {
            langToggleEN.classList.toggle('active', lang === 'en');
            langToggleIT.classList.toggle('active', lang === 'it');
        }
    }

    if (langToggleEN) {
        langToggleEN.addEventListener('click', () => setLanguage('en'));
    }
    if (langToggleIT) {
        langToggleIT.addEventListener('click', () => setLanguage('it'));
    }
    // Initial language setup
    setLanguage(currentLanguage);


    // --- 4. Contact Info Enhancements ---
    contactRevealButtons.forEach(button => {
        // Set initial text based on current language
        button.textContent = translations[currentLanguage][button.dataset.langKeyShow];

        button.addEventListener('click', function() {
            const type = this.dataset.contactType;
            const contactValue = hiddenContacts[type];
            const placeholderId = `contact-placeholder-${type}`;
            const placeholder = document.getElementById(placeholderId);

            if (!placeholder) return;

            const isVisible = placeholder.classList.toggle('visible');

            if (isVisible) {
                this.textContent = translations[currentLanguage][this.dataset.langKeyHide];
                let label = (type === 'email') ? translations[currentLanguage].emailLabel : translations[currentLanguage].phoneLabel;
                placeholder.textContent = `${label}: ${contactValue}`;
                placeholder.style.cursor = 'pointer';
                placeholder.title = `Copy ${type}`; // Verrà tradotto se necessario

                placeholder.onclick = function() {
                    navigator.clipboard.writeText(contactValue).then(() => {
                        const originalText = placeholder.textContent;
                        placeholder.textContent = `${label}: ${contactValue} (${translations[currentLanguage].copiedLabel})`;
                        setTimeout(() => {
                            placeholder.textContent = originalText;
                        }, 2000);
                    }).catch(err => {
                        console.error(`Error copying ${type}: `, err);
                        placeholder.textContent = `${label}: ${contactValue} (Error copying)`;
                    });
                };
                // Make visible with content
                placeholder.style.display = 'inline-block';

            } else {
                this.textContent = translations[currentLanguage][this.dataset.langKeyShow];
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
    }
});
