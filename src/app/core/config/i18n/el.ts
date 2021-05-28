export const locale = {
  lang: 'el',
  data: {
    /**
     * GENERAL TRANSLATION (Γενικές Μεταφράσεις)
     */
    TRANSLATOR: {
      SELECT: 'Επιλογή γλώσσας',
    },
    HEADER: {
      MESSAGE: 'Καλώς ήρθες'
    },
    GENERAL: {
      FROM: 'από',
      TO: 'εώς'
    },


    /**
     * MENU TRANSLATION (Μετάφραση Περιεχομένου)
     */
    MENU: {
      /* USER MENU (Μενού Χρήστη)*/
      SETTINGS: 'Λογαριασμός',
      HISTORY: 'Ιστορικό',

      /* MEMBER MENU (Μενού Μέλους)*/
      WALLET: 'Πορτοφόλι',
      DISCOVER: 'Ανακάλυψε',
      SUPPORT: 'Υποστήριξε',
      OFFERS: 'Προσφορές',

      /* PARTNER MENU (Μενού Συνεργάτη)*/
      NEW: 'new',
      ACTIONS: 'Actions',
      PAGES: 'Pages',
      FEATURES: 'Features',
      APPS: 'Apps',
      DASHBOARD: 'Dashboard',
      HOME: 'Πίνακας Ελέγχου',
      CAMPAIGNS: 'Καμπάνιες',
      EVENTS: 'Εκδηλώσεις',
      POSTS: 'Αναρτήσεις',
      COMMUNITY: 'Κοινότητα',
      //OFFERS: 'Προσφορές',

      /* ADMIN MENU (Μενού Διαχειριστή)*/
      PARTNERS: 'Συνεργάτες',
      MEMBERS: 'Μέλη',
      CONTENT: 'Περιεχόμενο',
      SECTORS: 'Τομείς Δραστηριότητας'
    },


    /**
     * AUTH TRANSLATION (Μετάφραση Auth)
     */
    AUTH: {
      MESSAGES: {
        WELCOME_TITLE: 'Καλώς ήρθες',
        WELCOME_SUBTITLE: 'Έλα στην παρέα του synergatika.gr για να στηρίξεις τα συνεργατικά καταστήματα και να κερδίσεις εκπτώσεις και προσφορές!',
        HAVE_ACCOUNT: 'Έχεις ήδη Λογαριασμό;',
        NOT_HAVE_ACCOUNT: 'Ακόμα δεν έχεις Λογαριασμό;',
        ALREADY_VALIDATED: 'Έχεις ήδη επαληθεύσει το email σου;',
        ALREADY_RESTORATION: 'Έχεις ήδη επαναφέρει τον κωδικό πρόσβασης;',
        ALREADY_UPDATED: 'Έχεις ήδη αλλάξει το password σου;',
        PARTNER_ACCOUNT: 'Θες να εγγραφείς ως Συνεργάτης;'
      },
      GENERAL: {
        OR: 'Ή',
        SUBMIT_BUTTON: 'Υποβολή',
        BACK_BUTTON: 'Πίσω',
        FORGOT_BUTTON: 'Ανάκτηση Κωδικού',
        PRIVACY: 'Privacy',
        LEGAL: 'Νομικά',
        CONTACT: 'Επικοινωνία',
        AS_PARTNER: 'ως Συνεργάτης'
      },
      LOGIN: {
        TITLE: 'Σύνδεση',
        BUTTON: 'Είσοδος',
        EMAIL_NEEDS_VERIFICATION: 'Παρακαλώ, επιβεβαιώστε τη διεύθυνση ηλεκτρονικού ταχυδρομείου\nΑκολουθείστε το σύνδεσμο που θα βρείτε στο εμαιλ σας.',
        PASSWORD_NEEDS_UPDATE: 'Παρακαλώ, ανανεώστε τον κωδικό πρόσβασης',
        ACCOUNT_NEEDS_ACTIVATION: 'Ο Λογαριασμός έχει τεθεί σε κατάσταση \'Μη Ενεργή\'.\nΕπικοινωνήστε με τον Διαχειριστή.'
      },
      LOGOUT: {
        BUTTON: 'Αποσύνδεση'
      },
      REGISTER: {
        TITLE: 'Έλα κι εσύ!',
        BUTTON: 'Εγγραφή',
        DESC: 'Εισάγεται τα προσωπικά σας στοιχεία ώστε να δημιυργήσετε λογαριασμό',
        SUCCESS: 'Ο λογαρισμός σας δημιουργήθηκε επιτυχώς. Θα λάβετε ένα μήνυμσ στη διεύθυνση ηλεκτρονικού ταχυδρομείου που δηλώσατε ώστε να επαληθευτεί ο λαγαρισμός σας',
      },
      TERMS: {
        A: 'Συμφωνώ με τους',
        B: 'Όρους Χρήσης'
      },
      VERIFY_EMAIL: {
        TITLE: 'Επαλήθευση Email',
        TITLE_ASK: 'Δεν έχετε επαληθευσει το Email σας;',
        SUCCESS_SEND: 'Θα λάβετε ένα email! Ακολουθήστε το σύνδεσμο για να επαληθευσετε το λογαρισμό σας!',
        SUCCESS_CHECK: 'Επιτυχής επαλήθευση Email!\nΣυνδεθείτε και ανακαλύψτε την Κοινότητα του Synergatika.gr'
      },
      VERIFY_PASSWORD: {
        TITLE: 'Ανανέωση Κωδικού Πρόσβασης',
        SUCCESS: 'Ο Κωδικός Πρόσβασης ανανεώθηκε επιτυχώς!\nΣυνδεθείτε και ανακαλύψτε την Κοινότητα του Synergatika.gr',
      },
      FORGOT_PASSWORD: {
        TITLE_ASK: 'Απώλεια Kωδικού Πρόσβασης;',
        DESC: 'Εισάγετε το email σας για να επαναφέρετε τον κωδικό σας',
        SUCCESS_SEND: 'Θα λάβετε ένα μήνυμα ηλεκτρονικού ταχυδρομείου. Ακολουθείστε τις οδηγίες ώστε να ανακτήσετε τον Κωδικό Πρόσβασης',
        SUCCESS_CHECK: 'Μπορείτε να προχωρήσετε στη ανάκτηση',
        SUCCESS_UPDATE: 'Ο Κωδικός Πρόσβασης έχει αλλάξει!',
      }
    },


    /**
     * FORMS & FIELDS TRANSLATION (Μετάφραση Φορμών & Πεδίων)
     */
    FIELDS: {
      STATS: 'Στατιστικά',
      PROFILE: {
        EMAIL: {
          TITLE: 'Διεύθυνση E-mail',
          PLACEHOLDER: 'E-mail',
          DESC: ''
        },
        PASSWORD: {
          TITLE: 'Κωδικός Πρόσβασης',
          PLACEHOLDER: 'Password',
          DESC: ''
        },
        CURRENT_PASSWORD: {
          TITLE: 'Τρέχων Κωδικός Πρόσβασης',
          PLACEHOLDER: 'Password',
          DESC: 'Παρακαλώ εισάγετε τον τρέχων κωδικό πρόσβασης'
        },
        NEW_PASSWORD: {
          TITLE: 'Νέος Κωδικός Πρόσβασης',
          PLACEHOLDER: 'Password',
          DESC: 'Παρακαλώ εισάγετε έναν νέο κωδικό πρόσβασης'
        },
        CONFIRM_PASSWORD: {
          TITLE: 'Επιβεβαίωση Κωδικού Πρόσβασης',
          PLACEHOLDER: 'Password',
          DESC: 'Παρακαλώ επιβεβαιώστε τον κωδικό σας'
        },
        MEMBER_NAME: {
          TITLE: 'Όνομα/Ψευδώνυμο',
          PLACEHOLDER: 'Όνομα/Ψευδώνυμο',
          DESC: 'Παρακαλώ, εισάγετε το όνομα σας'
        },
        MEMBER_IMAGE: {
          TITLE: 'Άβαταρ',
          ACTION: 'Επιλογή Αρχείου'
        },
        PARTNER_NAME: {
          TITLE: 'Επωνυμία Εταιρίας',
          PLACEHOLDER: 'Επωνυμία',
          DESC: 'Παρακαλώ, εισάγετε την επωνυμία της εταιρία σας'
        },
        PARTNER_IMAGE: {
          TITLE: 'Λογότυπο ή Φωτογραφία',
          ACTION: 'Επιλογή Αρχείου'
        },
        SUBTITLE: {
          TITLE: 'Περίληψη',
          PLACEHOLDER: 'Περίληψη',
          DESC: 'Παρακαλώ, εισάγετε μια περίληψη για την εταιρία σας'
        },
        DESCRIPTION: {
          TITLE: 'Περιγραφή',
          PLACEHOLDER: 'Περιγραφή',
          DESC: 'Παρακαλώ, εισάγετε μια περιγραφή για την εταιρία σας'
        },
        SECTOR: {
          TITLE: 'Τομέας',
          PLACEHOLDER: '',
          DESC: 'Παρακαλώ, επιλέξτε τν τομέα στο οποίο δραστηριοποιείται η εταιρία σας'
        },
        TIMETABLE: {
          TITLE: 'Ωράριο',
          PLACEHOLDER: 'Ωράριο',
          DESC: 'Παρακαλώ, εισάγετε το ωράριο λειτουργίας της εταιρίας σας'
        },
        PHONE: {
          TITLE: 'Τηλέφωνο',
          PLACEHOLDER: 'Τηλέφωνο',
          DESC: 'Παρακαλώ, εισάγετε το τηλέφωνο της εταιρίας σας'
        },
        // WEBSITE: {
        //   TITLE: 'Ιστοσελίδα (προαιρετικά)',
        //   PLACEHOLDER: 'Ιστοσελίδα',
        //   DESC: 'Παρακαλώ, εισάγετε το το URI της ιστοσελίδας σας'
        // },
        ADDRESS: {
          TITLE: 'Διεύθυνση',
          PLACEHOLDER: 'Διεύθυνση',
          DESC: 'Παρακαλώ, εισάγετε διεύθυνση'
        },
        POSTCODE: {
          TITLE: 'Ταχυδρομικός Κώδικας',
          PLACEHOLDER: 'Ταχυδρομικός Κώδικας',
          DESC: 'Παρακαλώ, εισάγετε ταχυδρομικό κώδικα'
        },
        CITY: {
          TITLE: 'Πόλη',
          PLACEHOLDER: 'Πόλη',
          DESC: 'Παρακαλώ, εισάγετε πόλη'
        },
        LAT: {
          TITLE: 'Συντεταγμένες (Γεωγραφικό Πλάτος)',
          PLACEHOLDER: 'Γεωγραφικό Πλάτος',
          DESC: 'Παρακαλώ, εισάγετε Γεωγραφικό Πλάτος'
        },
        LONG: {
          TITLE: 'Συντεταγμένες (Γεωγραφικό Μήκος)',
          PLACEHOLDER: 'Γεωγραφικό Μήκος',
          DESC: 'Παρακαλώ, εισάγετε Γεωγραφικό Μήκος'
        },
        PAYMENT: {
          DESC: 'IBAN/Link ή άλλες πληροφορίες για τον τραπεζικό σας λογαριασμό'
        },
        CONTACT: {
          DESC: 'Link της σελίδας ή του προφίλ σας'
        },
        DEACTIVATION_REASON: {
          TITLE: '',
          PLACEHOLDER: 'Αν θέλετε μπορείτε να μας πείτε το λόγο που επιθυμείτε την απενεργοποίηση του λογαριασμού σας (προεραιτικό)',
          DESC: ''
        },
        SUBSECTIONS: {
          BASIC: 'Βασικές Πληροφορίες',
          ADDRESS: 'Διεύθυνση',
          CONTACT: 'Πληροφορίες Επικοινωνίας',
          PAYMENTS: 'Στοιχεία Πληρωμών',
          COMMUNICATION: 'Στοιχεία Επικοινωνίας',
        },
        SECTOR_CHOICES: {
          _: 'Άλλο',
          A: 'Υπηρεσίες B2B και άλλα αγαθά και υπηρεσίες',
          B: 'Αναλώσιμα',
          C: 'Αναλώσιμα (Τεχνολογία)',
          D: 'Εκπαίδευση',
          E: 'Τρόφιμα',
          F: 'Ξενοδοχεία, καφέ και εστιατόρια',
          G: 'Αναψυχή και Πολιτισμός'
        },
        PAYMENT_CHOICES: {
          A: 'Εθνική Τράπεζα',
          B: 'Τράπεζα Πειραιώς',
          C: 'Eurobank Ergasias',
          D: 'Alpha Bank',
          E: 'PayPal',
          F: 'PayPal.Me',
          _G: 'Εξόφληση στο Κατάστημα',
          _H: 'Όλες οι Μέθοδοι Πληρωμής'
        },
        CONTACT_CHOICES: {
          // A: 'Telephone',
          B: 'Ιστοσελίδα',
          C: 'Facebook',
          D: 'Twitter',
          E: 'Instagram',
          F: 'Youtube',
        },
      },
      TABS:{
        VIEW:'Προβολή',
        EDIT:'Επεξεργασία',
        MANAGE:'Διαχείριση'
      },
      OFFER: {
        DISPLAY: 'Στοιχεία Προσφοράς',
        TITLE: {
          TITLE: 'Τίτλος',
          PLACEHOLDER: 'Τίτλος Προσφοράς',
          DESC: ''
        },
        IMAGE: {
          TITLE: 'Εικόνα',
          ACTION: 'Επιλογή Αρχείου'
        },
        SUBTITLE: {
          TITLE: 'Υπότιτλος',
          PLACEHOLDER: 'Υπότιτλος Προσφοράς',
          DESC: 'Δύο τρείς λέξεις που να συνοψίζουν την προσφορά μαζί με τον τίτλο'
        },
        DESCRIPTION: {
          TITLE: 'Περιγραφή',
          PLACEHOLDER: 'Περιγραφή Προσφοράς',
          DESC: 'Ένα κείμενο που να λέει ακριβώς τι δίνει η προσφορά'
        },
        INSTRUCTIONS: {
          TITLE: 'Οδηγίες Απόκτησης',
          PLACEHOLDER: 'Οδηγίες Απόκτησης Προσφοράς',
          DESC: 'Οδηγίες για το πως μπορεί κάποιος/α να πάρει τη προσφορά (πχ να έρθει στο μαγαζί, να πάρει τηλέφωνο)'
        },
        QUANTITATIVE: 'Με τη χρήση πόντων;',
        COST: {
          TITLE: 'Κόστος Προσφοράς (σε πόντους)',
          PLACEHOLDER: 'Πόντοι',
          DESC: 'Παρακαλώ, εισάγετε το κόστος της προσφοράς σε πόντους'
        },
        EXPIRATION: {
          TITLE: 'Ημερομηνία Λήξης',
          PLACEHOLDER: 'Ημερομηνία',
          DESC: ''
        },
      },
      POST: {
        TITLE: {
          TITLE: 'Τίτλος Ανάρτησης',
          PLACEHOLDER: 'Τίτλος',
          DESC: 'Παρακαλώ, εισάγετε τον τίτλο της ανάρτησης'
        },
        IMAGE: {
          TITLE: 'Εικόνα',
          ACTION: 'Επιλογή Αρχείου'
        },
        SUBTITLE: {
          TITLE: 'Περίληψη Ανάρτησης',
          PLACEHOLDER: 'Περίληψη',
          DESC: 'Παρακαλώ, εισάγετε την περίληψη της ανάρτησης.'
        },
        CONTENT: {
          TITLE: 'Περιεχόμενο Ανάρτησης',
          PLACEHOLDER: 'Περιεχόμενο',
          DESC: 'Παρακαλώ, εισάγετε το περιεχόμενο της ανάρτησης.'
        },
        ACCESS: {
          TITLE: 'Πρόσβαση',
          PLACEHOLDER: 'Πρόσβαση',
          DESC: 'Παρακαλώ, επιλέξτε σε ποιούς θα είναι ορατή η ανάρτηση'
        },
        ACCESS_CHOICES: {
          A: 'Σε όλους',
          B: 'Στα εγγεγραμμένα μέλη',
          C: 'Μόνο στα συνεργατικά εγχειρήματα'
        },
      },
      EVENT: {
        TITLE: {
          TITLE: 'Τίτλος Εκδήλωσης',
          PLACEHOLDER: 'Τίτλος',
          DESC: 'Παρακαλώ, εισάγετε τον τίτλο της εκδήλωσης'
        },
        IMAGE: {
          TITLE: 'Εικόνα Εκδήλωσης',
          ACTION: 'Επιλογή Αρχείου'
        },
        SUBTITLE: {
          TITLE: 'Περίληψη Εκδήλωσης',
          PLACEHOLDER: 'Περίληψη',
          DESC: 'Παρακαλώ, εισάγετε την περίληψη της εκδήλωσης.'
        },
        DESCRIPTION: {
          TITLE: 'Περιγραφή Ανάρτησης',
          PLACEHOLDER: 'Περιγραφή',
          DESC: 'Παρακαλώ, εισάγετε την περιγραφή της εκδήλωσης.'
        },
        DATE: {
          TITLE: 'Ημερομηνία',
          PLACEHOLDER: 'Ημερομηνία',
          DESC: 'Παρακαλώ, επιλέξτε την ημερομηνία της εκδήλωσης.'
        },
        TIME: {
          TITLE: 'Ώρα',
          PLACEHOLDER: 'Ώρα',
          DESC: 'Παρακαλώ, επιλέξτε την ώρα της εκδήλωσης.'
        },
        LOCATION: {
          TITLE: 'Τοποθεσία Εκδήλωσης',
          PLACEHOLDER: 'Τοποθεσία',
          DESC: 'Παρακαλώ, εισάγετε την τοποθεσία της εκδήλωσης.'
        },
        ACCESS: {
          TITLE: 'Πρόσβαση',
          PLACEHOLDER: 'Πρόσβαση',
          DESC: 'Παρακαλώ, επιλέξτε σε ποιούς θα είναι ορατή η εκδήλωση'
        },
        ACCESS_CHOICES: {
          A: 'Σε όλους',
          B: 'Στα εγγεγραμμένα μέλη',
          C: 'Μόνο στα συνεργατικά εγχειρήματα'
        },
      },
      MICROCREDIT_CAMPAIGN: {
        DISPLAY: 'Στοιχεία Καμπάνιας',
        TITLE: {
          TITLE: 'Τίτλος',
          PLACEHOLDER: 'Τίτλος Καμπάνιας',
          DESC: ''
        },
        IMAGE: {
          TITLE: 'Εικόνα',
          ACTION: 'Επιλογή Αρχείου'
        },
        SUBTITLE: {
          TITLE: 'Περίληψη',
          PLACEHOLDER: 'Περίληψη Καμπάνιας',
          DESC: 'Ένα σύντομο κείμενο που να συνοψίζει την καμπάνια'
        },
        TERMS: {
          TITLE: 'Αντάλλαγμα συμμετοχής',
          PLACEHOLDER: 'Αντάλλαγμα συμμετοχής στην καμπάνια',
          DESC: 'Περιγράψτε τι ακριβώς θα λάβουν οι υποστηρικτές της καμπάνιας και υπό ποιούς όρους'
        },
        DESCRIPTION: {
          TITLE: 'Περιεχόμενο',
          PLACEHOLDER: 'Περιεχόμενο Καμπάνιας',
          DESC: 'Περιγράψτε αναλυτικά για ποιο λόγο γίνεται αυτή η καμπάνια'
        },
        CATEGORY: {
          TITLE: 'Κατηγορία',
          PLACEHOLDER: '',
          DESC: 'Μια περιγραφική κατηγορία του τι θα λάβουν οι υποστηρικές της καμπάνιας (π.χ. τρόφιμα)'
        },
        MIN_ALLOWED_PRICE: {
          TITLE: 'Τιμή (€)',
          PLACEHOLDER: '',
          DESC: 'Η τιμή συμμετοχής στη καμπάνια.'
        },
        MIN_ALLOWED: {
          TITLE: 'Κάτω Όριο Συμμετοχής (€)',
          PLACEHOLDER: '10',
          DESC: 'Το ελάχιστο που πρέπει να δώσει κάποιος για να συμμετέχει'
        },
        MAX_ALLOWED: {
          TITLE: 'Ανώ Όριο Συμμετοχής (€)',
          PLACEHOLDER: '100',
          DESC: 'Το μέγιστο που μπορεί να δώσει κάποιος που θέλει να συμμετέχει'
        },
        STEP: {
          TITLE: 'Τιμή Μονάδος - Προαιρετικό (€)',
          PLACEHOLDER: '10',
          DESC: 'Αν αυτό που προπωλείτε είναι σε τιμολογήμενη μονάδα βάλτε την τιμή της (πχ Πακέτο Καφέ των 10)'
        },
        MAX_AMOUNT: {
          TITLE: 'Ανώ Όριο Πωλήσεων (€)',
          PLACEHOLDER: '',
          DESC: 'Συνολικό πόσο που μπορείτε να αντλήσετε από αυτή τη καμπάνια. Να έχετε στο νου σας ότι θα πρέπει να μπορείτε να ανταποκριθείτε στις ανάγκες προπώλησης.'
        },
        ACCESS: {
          TITLE: 'Ορατότητα Καμπάνιας',
          PLACEHOLDER: '',
          DESC: 'Επιλέξτε σε ποιούς θα είναι ορατή η Καμπάνια'
        },
        ACCESS_CHOICES: {
          A: 'Δημόσια',
          B: 'Στα εγγεγραμμένα μέλη',
          C: 'Μόνο στα συνεργατικά εγχειρήματα'
        },
        SUPPORT_STARTS: {
          TITLE: 'Ημερομηνία Έναρξης Συμμετοχής',
          PLACEHOLDER: 'Ημερομηνία Έναρξης Συμμετοχής',
          DESC: 'Η μέρα που αρχίζετε να δέχεστε συμμετοχές στην καμπάνια'
        },
        SUPPORT_ENDS: {
          TITLE: 'Ημερομηνία Τέλους Συμμετοχής',
          PLACEHOLDER: 'Ημερομηνία Τέλους Συμμετοχής',
          DESC: 'Η μέρα που σταματάτε να δέχεστε συμμετοχές στην καμπάνια'
        },
        REDEEM_STARTS: {
          TITLE: 'Ημερομηνία Έναρξης Εξαργύρωσης',
          PLACEHOLDER: 'Έναρξη Εξαργύρωσης',
          DESC: 'Η μέρα που οι υποστηρικτές μπορούν να αρχίσουν να εξαργυρώνουν το αντάλλαγμα συμμετοχής'
        },
        REDEEM_ENDS: {
          TITLE: 'Ημερομηνία Λήξης Εξαργύρωσης',
          PLACEHOLDER: 'Λήξη Εξαργύρωσης',
          DESC: 'Η μέρα πέρα απο την οποία οι υποστηρικτές δεν θα μπορούν να εξαργυρώνουν το αντάλλαγμα συμμετοχής'
        },
        QUANTITATIVE: 'Μπορεί να επιλέξει ο υποστηρικής ποσό ;',
        SUBMIT_DRAFT: 'Αποθήκευση ως Πρόχειρο',
        SUBMIT_CAMPAIGN: 'Δημοσίευση Καμπάνιας',
        SUBSECTIONS: {
          BASIC: 'Βασικές Πληροφορίες',
          TERMS: 'Αντάλλαγμα Συμμετοχής και Πρόσβαση',
          FINANCIAL: 'Οικονομικά Στοιχεία',
          DATES: 'Στοιχεία Ημερομηνιών'
        }
      },
      CONTENT: {
        NAME: {
          TITLE: 'Όνομα Περιεχομένου',
          PLACEHOLDER: 'Όνομα',
          DESC: 'Παρακαλώ εισάγετε το όνομα του Περιεχομένου'
        },
        EL_TITLE: {
          TITLE: 'Τίτλος στα ελληνικά',
          PLACEHOLDER: 'Ελληνικά',
          DESC: 'Παρακαλώ εισάγετε ελληνικό Τίτλο'
        },
        EN_TITLE: {
          TITLE: 'Τίτλος στα αγγλικά',
          PLACEHOLDER: 'Αγγλικά',
          DESC: 'Παρακαλώ εισάγετε αγγλικό Τίτλο'
        },
        EL_CONTENT: {
          TITLE: 'Περιεχόμενο στα ελληνικά',
          PLACEHOLDER: 'Ελληνικά',
          DESC: 'Παρακαλώ εισάγετε ελληνικό Περιεχόμενο'
        },
        EN_CONTENT: {
          TITLE: 'Περιεχόμενο στα αγγλικά',
          PLACEHOLDER: 'Αγγλικά',
          DESC: 'Παρακαλώ εισάγετε αγγλικό Περιεχόμενο'
        },
      }
    },

    FORM: {
      BUTTONS: {
        SUBMIT: 'Υποβολή',
        PREVIOUS: 'Πίσω',
        NEXT_STEP: 'Επόμενο',
        SAVE: 'Αποθήκευση',
        INSERT: 'Προσθήκη',
        REMOVE: 'Αφαίρεση'
      },
      VALIDATION: {
        REQUIRED_FIELD: 'Υποχρεωτικό Πεδίο.',
        MIN_LENGTH_FIELD: 'Ελάχιστος Αριθμός Χαρακτήρων Πεδίου:',
        MAX_LENGTH_FIELD: 'Μέγιστος Αριθμός Χαρακτήρων Πεδίου:',
        INVALID_FIELD: 'Το Πεδίο δεν είναι Έγκυρο.',
        MIN_VALUE_FIELD: 'Ελάχιστη τιμή Πεδίου:',
        MAX_VALUE_FIELD: 'Μέγιστη τιμή Πεδίου:',
        REQUIRED_ONE: 'Απαιτείται η συμπλήρωση τουλάχιστον ένος πεδίου.',
        PASSWORD_CONFIRMATION: 'Ο Κωδικός πρόσβασης δεν επαληθεύτηκε',
        AGREEMENT_REQUIRED: 'Χρειάζεται να αποδεκτείτε τους όρους χρήσσης',
        IMAGE_SIZE: 'Το μέγεθος του αρχείου δεν μπορει να υπερβαίνει τα ',
        IMAGES_NUMBER: 'Ο αριθμός των εικόνων δεν μπορεί να είναι μεγαλύτερος απο ',
        CAMPAIGN_DATES: {
          SUPPORTSTARTSTOSUPPORTENDS: 'Η ημερομηνία Έναρξης της Προσφοράς δεν μπορεί να είναι μεταγενέστερη της ημερομηνίας Λήξης',
          SUPPORTSTARTSTOREDEEMSTARTS: 'Η ημερομηνία Έναρξης της Προσφοράς δεν μπορεί να είναι μεταγενέστερη της Ημερομηνία Εξαργύρωσης',
          REDEEMSTARTSTOREDEEMENDS: 'Η ημερομηνία Έναρξης της Εξαργύρωσης δεν μπορεί να είναι μεταγενέστερη της Ημερομηνίας Λήξης',
          SUPPORTENDSTOREDEEMENDS: 'Η ημερομηνίας Λήξης της Προσφοράς δεν μπορεί να είναι μεταγενέστερη της ημερομηνίας Λήξης της Εξαργύρωσης',
        },
        CAMPAIGN_AMOUNTS: {
          NOTQUANTITATIVEMAXAMOUNTMINALLOWED: 'Το Άνω Όριο Πωλήσεων δεν μπορεί να είναι μικρότερο από την Τιμή',
          QUANTITATIVEMINALLOWEDMAXALLOWED: 'Το Άνω Όριο ανα Χρήστη δεν μπορεί να είναι μικρότερο από το Κάτω Όριο Χρήστη.',
          QUANTITATIVESTEPAMOUNTMAXALLOWED: 'Το Άνω Όριο ανα Χρήστη δεν μπορεί να είναι μικρότερο από την Τιμή Βήματος.',
          QUANTITATIVEMAXALLOWEDMAXAMOUNT: 'Το Άνω Όριο Πωλήσεων δεν μπορεί να είναι μικρότερο από Άνω Όριο ανα Χρήστη',
        }
      },
    },


    /**
     * MESSAGES TRANSLATION (Μετάφραση Μηνυμάτων)
     */
    MESSAGE: {
      SUCCESS: {
        /* Common Messages (Κοινά Μηνύματα) */
        TITLE: 'All good!',
        PASSWORD_UPDATED: 'Ο Κωδικός Πρόσβασης ανανεώθηκε επιτυχώς!',
        PROFILE_UPDATED: 'Οι προσωπικές πληροφορίες ανανεώθηκαν επιτυχώς!',
        ACCOUNT_DEACTIVATED: 'Ο Λογαρισμός σας απερνεργοποιήθηκε επιτυχώς',
        INVITATION_SEND: 'H πρόσκληση απεστάλει επιτυχώς',

        /* Partner Messages (Μηνύματα Συνεργάτη) */
        OFFER_CREATED: 'Η προσφορά δημιουργήθηκε επιτυχώς!',
        OFFER_UPDATED: 'Η προσφορά ανανεώθηκε επιτυχώς!',
        OFFER_DELETED: 'Η προσφορά διεγράφη επιτυχώς!',
        POST_CREATED: 'Το άρθρο δημιουργήθηκε επιτυχώς!',
        POST_UPDATED: 'Το άρθρο ανανεώθηκε επιτυχώς!',
        POST_DELETED: 'Το άρθρο διεγράφη επιτυχώς!',
        EVENT_CREATED: 'Η εκδήλωση δημιουργήθηκε επιτυχώς!',
        EVENT_UPDATED: 'Η εκδήλωση ανανεώθηκε επιτυχώς!',
        EVENT_DELETED: 'Η εκδήλωση διεγράφη επιτυχώς!',
        CAMPAIGN_CREATED: 'Η καμπάνια δημιουργήθηκε επιτυχώς!',
        CAMPAIGN_PUBLISHED: 'Η καμπάνια δημοσιεύθηκε επιτυχώς!',
        CAMPAIGN_UPDATED: 'Η καμπάνια ανανεώθηκε επιτυχώς!',
        CAMPAIGN_DELETED: 'Η καμπάνια διεγράφη επιτυχώς!',

        /* Admin Messages (Μηνύματα Διαχειριστή) */
        MEMBER_CREATED: 'A new Member has been successfully created!',
        PARTNER_CREATED: 'A new Partner has been successfully created!',
        USER_ACTIVATED: 'Η Κατάσταση του Χρήστη άλλαξε σε \'Ενεργή\'',
        USER_DEACTIVATED: 'Η Κατάσταση του Χρήστη άλλαξε σε \'Ανενεργή\'',
        CONTENT_CREATED: 'Το περιεχόμενο δημιουργήθηκε επιτυχώς!',
        CONTENT_UPDATED: 'Το περιεχόμενο ανανεώθηκε επιτυχώς!',
      },
      ERROR: {
        TITLE: 'Something went wrong!',
      },
      CANCEL: {
        TITLE: 'Η διαδικασία Ακυρώθηκε!',
      }
    },

    /* Typical HTTP Errors (Τυπικά Μηνύματα Λάθους HTTP) */
    HTTP_ERRORS: {
      UNAUTHORIZED: 'Δεν έχετε την εξουσιοδότηση να προχωρήσετε',
      BAD_REQUEST: 'Κάποιες παράμετροι λέιπουν',
      FORBIDDEN: 'Για κάποιο λόγο δεν μπορείτε να έχετε πρόσβαση σε αυτή την ενέργεια',
      NOT_FOUND: 'Η υπηρεσία δεν μπορεί να επεξεργαστεί την αίτηση σας',
      UNPROCESSABLE_ENTITY: 'Κάποιες απο τις υπηρεσίες του διακομιστή ίσως αντιμετωπίζουν πρόβλημα',
      SERVER: 'Ο διακομιστής δεν είναι προσβάσιμος'
    },

    /* HTTP 404 Errors (Μηνύματα Λάθους HTTP 404) */
    NOT_FOUND_ERRORS: {
      NOT_ENOUGH_POINTS: 'Δεν υπάρχουν αρκετοί πόντοι για να προχωρήσετε',
      OFFER_EXPIRED: 'Η ημερομηνία λήξης της προσφοράς έχει παρέλθει',

      CAMPAIGN_PUBLISHED: 'Η Καμπάνια έχει ήδη δημοσιευτεί',
      CAMPAIGN_NOT_PUBLISHED: 'Η Καμπάνια δεν έχει δημοσιευτεί ακόμα',
      CAMPAIGN_NOT_STARTED: 'Η περίοδος υποστήριξης δεν έχει ξεκινήσει',
      CAMPAIGN_EXPIRED: 'Η περίοδος υποστήριξης έχει παρέλθει',
      PAYMENT_METHODS_REQUIRED: 'Πρέπει να δηλώσετε μεθόδους Πληρωμής! Δήλωση μέσω του Profile',

      OVER_TOTAL_MAX: 'Το συνολικό ποσό υποστήριξης δεν μπορεί να υπερβαίνει το μέγιστο όριο της Καμπάνιας',
      OVER_MAX_AMOUNT: 'Το ποσό δεν μπορεί να υπερβαίνει το μέγιστο όριο',
      UNDER_MIN_AMOUNT: 'Το πόσο δεν μπορεί να είναι μικρότερο από το ελάχιστο όριο',
      ZERO_AMOUNT: 'Το ποσό δεν μπορεί να είναι μικρότερο ή ίσο του μηδενός',
      METHOD_INAVAILABLE: 'Η μέθοδος πληρωμής που επιλέξατε δεν είναι διαθέσιμη',

      SUPPORT_NOT_PAID: 'Η υποστήριξη δεν έχει εξοφληθεί',
      NOT_ENOUGH_TOKENS: 'Δεν υπάρχουν αρκετά κουπόνια για να προχωρήσετε',

      TOKENS_REDEEMED: 'Κάποια από τα κουπόνια έχουν ήδη εξαργυρωθεί',
      CAMPAIGN_REDEEM_STARTED: 'Η περίοδος εξαργύρωσης έχει ήδη ξεκινήσει',
      CAMPAIGN_REDEEM_NOT_STARTED: 'Η περίοδος εξαργύρωσης δεν έχει ξεκινήσει ακόμα',
      CAMPAIGN_REDEEM_ENDED: 'Η περίοδος εξαργύρωσης έχει παρέλθει',

      /**
       * AUTHENTICATION - Not Found (404)
       */
      MEMBER_NOT_EXISTS: 'Δεν υπάρχει χρήστης με το συγκεκριμένο αναγνωριστικό',
      USER_EXISTS: 'Υπάρχει ήδη χρήστης με τα στοιχεία που δόθηκαν',
      USER_DEACTIVATED: 'Ο χρήστης δεν είναι ενεργός',
      USER_HAS_CARD: 'Έχει ήδη συνδεθεί μια κάρτα με τον συγκεκριμένο λογαριασμό χρήστη',
      USER_HAS_EMAIL: 'Έχει ήδη συνδεθεί μια διεύθυνση ηλεκτρονικου ταχυδρομείου με το συγκεκριμένο λογαριασμό',
      WRONG_IDENTIFIER: 'Το αναγνωριστικό θα πρέπει να είναι σε μορφή email ή κάρτας',
      WRONG_CREDENTIALS: 'Δεν βρέθηκε χρήστης με τα στοιχεία που δόθηκαν',
      WRONG_TOKEN: 'O σύνδεσμος είναι λανθασμένος ή έχει λήξει.'
    },


    /**
     * COMMON-PAGES TRANSLATION (Μετάφραση Κοινών Σελίδων)
     */
    HISTORY: {
      SUBMENU: {
        LOYALTY: 'Loyalty Συναλλαγές',
        MICROCREDIT: 'Microcredit Συναλλαγές'
      },
      BASKET: 'Καλάθι',
      TRANSACTIONS: 'Πρόσφατες Συναλλαγές',
      RECEIPT: 'Απόδειξη',
      OFFER: 'Προσφορά',
      CAMPAIGN: 'Καμπάνια',
      SUPPORT: 'ID Πληρωμής',
      POINTS: 'Πόντοι',
      TOKENS: 'Κουπόνια',
      PARTNER: 'Συνεργάτης',
      MEMBER: 'Σε',
      PAID: 'Επιβεβαίωση Πληρωμής',
      UNPAID: 'Ανάκληση Πληρωμής',
    },
    SETTINGS: {
      SUBMENU: {
        PERSONAL_INFORMATION: 'Προσωπικές Πληροφορίες',
        CHANGE_PASSWORD: 'Αλλαγή Κωδικού Πρόσβασης',
        ACCOUNT_SETTINGS: 'Πληροφορίες Λογαριασμού',
        INVITATION: 'Αποστολή Πρόσκλησης',
        PAYMENTS: 'Στοιχεία Πληρωμών'
      },
      ACCOUNT: 'Λογαριασμός',
      PERSONAL_INFO: 'Ανανέωσε τα στοιχεία σου',
      CHANGE_PASSWORD: 'Αλλαγή Κωδικού Πρόσβασης',
      DEACTIVATE: 'Απενεργοποίηση Λογαριασμού',
      DEACTIVATE_CONFRIRM: 'Είστε σίγουρος/η ότι θέλετε να απενεργοποιήσετε το λογαρισμό σας',
      INVITATION: 'Συμπλήρωσε την ηλεκτρονική διεύθυνση του φίλου σου και έμεις θα του αποστείλουμε πρόσκληση',
      CANCEL: 'Ακύρωση',
    },


    /**
     * ITEMS - OFFER, POST, EVENT, CAMPAIGN - TRANSLATION (Μετάφραση Ειδών - Προσφορά, Ανάρτηση, Εκδήλωση, Καμπάνια - )
     */
    OFFER: {
      TITLE: 'ΠΡΟΣΦΟΡΑ',
      PLURAL: 'Προσφορές',
      ALL: 'Όλες οι Προσφορές',
      CREATE: 'Προσθήκη Προσφοράς',
      CREATE_SUB: 'Δημιούργησε μια νέα Προσφορά',
      EDIT: 'Επεξεργασία Προσφοράς',
      DELETE: 'Διαγραφή',
      DELETE_CONFIRM: 'Είστε σίγουρος ό,τι θέλετε να διαγράψετε την προσφορά',
      CANCEL: 'Ακύρωση',
      STATUS: {
        EXPIRED: 'Έχει Λήξει'
      }
    },
    POST: {
      TITLE: 'ΑΝΑΡΤΗΣΗ',
      PLURAL: 'Αναρτήσεις',
      CREATE: 'Προσθήκη Ανάρτησης',
      CREATE_SUB: 'Δημιούργησε μια νέα Ανάρτηση',
      EDIT: 'Επεξεργασία Ανάρτησης',
      DELETE: 'Διαγραφή Ανάρτησης',
      DELETE_CONFIRM: 'Είστε σίγουρος ό,τι θέλετε να διαγράψετε την ανάρτηση',
      CANCEL: 'Ακύρωση'
    },
    EVENT: {
      TITLE: 'ΕΚΔΗΛΩΣΗ',
      PLURAL: 'Εκδηλώσεις',
      CREATE: 'Προσθήκη Εκδήλωσης',
      CREATE_SUB: 'Δημιούργησε μια νέα Εκδήλωση',
      EDIT: 'Επεξεργασία Εκδήλωσης',
      DELETE: 'Διαγραφή Εκδήλωσης',
      DELETE_CONFIRM: 'Είστε σίγουρος ό,τι θέλετε να διαγράψετε την εκδήλωση',
      CANCEL: 'Ακύρωση'
    },
    POST_EVENT: {
      PLURAL: 'Αναρτήσεις & Εκδηλώσεις',
      ALL: 'Όλες οι Αναρτήσεις & οι Εκδηλώσεις',
    },
    CAMPAIGN: {
      TITLE: 'ΚΑΜΠΑΝΙΑ',
      PLURAL: 'Καμπάνιες',
      ALL: 'Όλες οι Καμπάνιες',
      CREATE: 'Προσθήκη Καμπάνιας',
      CREATE_SUB: 'Δημιούργησε μια νέα Καμπάνια',
      EDIT: 'Επεξεργασία Προσχεδίου Καμπάνιας',
      DELETE: 'Διαγραφή Καμπάνιας',
      DELETE_CONFIRM: 'Είστε σίγουρος ό,τι θέλετε να διαγράψετε την καμπάνια',
      PUBLISH: 'Δημοσίευση Καμπάνιας',
      PUBLISH_CONFIRM_A: 'Είστε σίγουρος ό,τι θέλετε να δημοσιεύσετε την καμπάνια',
      PUBLISH_CONFIRM_B: 'Μέτα τη δημοσίευση δεν θα είναι διαθέσιμη η επεξεργασία της',
      DRAFT: 'πρόχειρο',
      CANCEL: 'Ακύρωση',

      SUPPORT_PERIOD: 'Περίοδος Υποστήριξης',
      SUPPORT_PERIOD_SUB: 'Αυτή είναι η περίοδος που μπορείτε να προπληρώσετε τα προϊόντα που επιθυμείτε',
      REDEEM_PERIOD: 'Περίοδος εξαργύρωσης',
      REDEEM_PERIOD_SUB: 'Αυτή είναι η περίοδος που μπορείτε να εξαργυρώσετε τα προϊόντα για τα οποία έχετε προπληρώσει',
      PRICE: 'Τιμή',
      PRICE_PER_ITEM: 'Τιμή ανα ποσότητα',
      PLEDGE: 'Στήριξε',
      PLEDGE_DISABLE: 'Δεν μπορείται να προσθέσετε μια "Υποστήριξη" εκτός της περιόδου υποστήριξης',
      REDEEM_DISABLE: 'Δεν μπορείτε να εξαργυρώσετε μια "Υπόσχεση" εκτός της περιόδου εξαργύρωσης',
      PARTNER: 'Πληροφοριες Συνεργατη',
      TERMS: 'Τι παίρνω;',
      STATUS: {
        DRAFT: 'Πρόχειρη',
        EXPECTED: 'αναμένεται',
        EXPIRED: 'Έχει Λήξει',
        REDEEM_TO: 'Εξαργύρωση εώς'
      }
    },
    SUPPORT: {
      REMAINING: 'Απομενουν',
      PAYMENT_METHOD: 'Μέθοδος Πληρωμής',
      PAYMENT_DETAILS: 'Λεπτομέριες',
      CHANGE_STATUS_TOOLTIP: 'Δεν μπορείτε να ακυρώσετε μια πληρωμή εν μέσω περίοδου εξαργύρωσης',
      PAYMENT: {
        STORE: 'Στο Κατάστημα',
        BANK: 'Τραπεζική Κατάθεση'
      },
      STATUS: {
        CONFIRMED: 'Επιβεβαιωμένη',
        CONFIRMED_TOOLTIP: 'Η πληρωμή έχει επιβεβαιωθεί',
        PENDING: 'Eκκρεμής',
        PENDING_TOOLTIP: 'Η πληρωμή δεν έχει επιβεβαιωθεί ακόμα',
        COMPLETED: 'Ολοκληρωμένη',
        COMPLETED_TOOLTIP: 'Έχει εξαργυρωθεί στο σύνολο της'
      },
      FILTER: {
        TEXT: {
          TITLE: 'Αναζήτηση με...',
          PLACEHOLDER: 'ID Πληρωμής'
        },
        SELECT: {
          TITLE: 'Μέθοδος Πληρωμής'
        },
        DATE: {
          TITLE: 'Ημερομηνία'
        }
      },
      ARRAY: {
        PAYMENT_ID: 'ID Πληρωμής',
        METHOD: 'Μέθοδος Πληρωμής',
        INITIAL_TOKENS: 'Αρχικά Κουπόνια',
        REMAINING_TOKENS: 'Εναπομείναντα Κουπόνια',
        DATE: 'Ημερομηνία Καταχώρησης',
        STATUS: 'Κατάσταση Πληρωμής'
      }
    },

    /**
     * CONTENT TRANSLATION (Μετάφραση Στατικού Περιεχομένου)
     */
    CONTENT: {
      PLURAL: 'Περιεχόμενο',
      CREATE: 'Προσθήκη Περιεχομένου',
      CREATE_SUB: 'Δημιούργησε ένα νέο περιεχόμενο',
      EDIT: 'Επεξεργασία Περιεχομένου',
    },

    /**
     * USERS TRANSLATION (Μετάφραση Χρηστών)
     */
    USER: {
      PLURAL: 'Χρήστες',
      ACTIVATE: 'Επανεργοποίηση',
      DEACTIVATE: 'Απενεργοποίηση',
      ACTIVATE_DISABLE: 'Ο Χρήστης είναι ενεργοποιημένος',
      DEACTIVATE_DISABLE: 'Ο Χρήστης είναι απενεργοποιημένος',
      PARTNER: {
        PLURAL: 'Συνεργάτες',
        ALL: 'Όλοι οι Συνεργάτες',
        CREATE: 'Προσθήκη Συνεργάτη',
        CREATE_SUB: 'Δημιούργησε έναν νέο συνεργάτη της κοινότητας',
      },
      MEMBER: {
        CREATE: 'Προσθήκη Μέλους',
        CREATE_SUB: 'Δημιούργησε ένα νέο μέλος της κοινότητας'
      },
      FILTER: {
        TITLE: 'Αναζήτηση με...',
        PARTNER_PLACEHOLDER: 'ID Χρήστη, Διεύθυνση Ηλεκτρονικού Ταχυδρομείου, Όνομα',
        MEMBER_PLACEHOLDER: 'ID Χρήστη, Διεύθυνση Ηλεκτρονικού Ταχυδρομείου, Αριθμό Κάρτας'
      },
      ARRAY: {
        USER_ID: 'ID Χρήστη',
        EMAIL: 'Διευθύνση Ηλεκτρονικού Ταχυδρομείου',
        NAME: 'Όνομα',
        CARD: 'Αριθμός Κάρτας',
        DATE: 'Ημερομηνία Εγγραφής',
        STATUS: 'Κατάσταση'
      }
    },


    /**
     * MEMBER-PAGES TRANSLATION (Μετάφραση Σελίδων Μέλους)
     */
    MEMBER: {
      DASHBOARD: {
        QR_CODE: 'Ο QR Κωδικός σου',
        WALLET_TITLE: 'Το πορτοφόλι μου',
        WALLET_SUBTITLE: 'σε όλο το δίκτυο',
      },
      WIZARD: {
        NEXT_STEP: 'Επόμενο Βήμα',
        CLOSE: 'Κλείσιμο',

        SUB_AMOUNT: {
          PLEDGE: 'Yποσχέσου τη στήριξη σου',
          AMOUNT: 'Πόσο',
          PAYMENT: 'Μέθοδος Πληρωμής'
        },
        SUB_FINAL: {
          AMOUNT: 'Ποσό Συναλλαγής',
          PAYMENT: 'Μέθοδος Πληρωμής',
          PAYMENT_ID: 'ID Πληρωμής',
          INSTRUCTIONS: 'Οδηγίες'
        }
      }
    },


    /**
     * PARTNERS-PAGES TRANSLATION (Μετάφραση Σελίδων Συνεργάτη)
     */
    PARTNER: {
      DASHBOARD: {
        TITLE: 'Συναλλαγές',
        DESCRIPTION: 'Εδώ μπορείτε να κάνετε άμεσα όλες τις συναλλαγές που χρειάζονται στο κατάστημα για πίστωση και εξαργύρωση πόντων',
        STATISTICS: {
          TITLE: 'Στατιστικά Loyalty',
          DESCRIPTION: 'Εδώ μπορείτε να δείτε και να εξάγεται στατιστικά σχετικά με την υπηρεσία loyalty. Πόσες πωλήσεις κάνατε και πόση έκπτωση δώσατε',
        },
        NEWS: 'Νέα απο την Κοινότητα',
        REDEEM: 'Εξαργύρωση',
        SUPPORT: 'Υποστήριξη'
      },
      WIZARD: {
        NEXT_STEP: 'Επόμενο Βήμα',
        PREVIOUS_STEP: 'Προηγούμενο Βήμα',
        CLOSE: 'Κλείσιμο',
        LOYALTY_TITLE: 'Συναλλαγή με Loyalty',
        BACK_TO_SCANNER: 'Επιλογή Σάρωσης',
        COMPLETE: 'Ολοκλήρωση Συναλλαγής',
        STEPS: {
          INDENTIFY: "Ταυτοποίηση",
          EMAIL: "E-mail",
          AMOUNT: "Ποσό",
          DISCOUNT: "Έκπτωση",
          FINAL: "Τέλος",
          OFFER: "Εξαργύρωση",
          MICROCREDIT: "Εξαργύρωση",
        },
        SCAN_FORM: {
          HEADING: 'Σάρωση QR Αναγνωριστικού',
          ALT_PROMPT: 'Ταυτοποίηση με E-mail ή αριθμό κάρτας',
        },
        SUB_IDENTIFIER_FORM: {
          HEADING: 'Ταυτοποίηση με E-mail ή αριθμό κάρτας',
          TITLE: 'E-mail/Αριθμός',
          HINT: 'Eισάγετε E-mail ή άριθμό κάρτας.'
        },
        SUB_EMAIL_FORM: {
          HEADING: 'E-mail πελάτη',
          HINT: '',
        },
        SUB_AMOUNT_SCAN: {
          HEADING: 'Σάρωση QR Απόδειξης',
          ALT_PROMPT: 'Εισάγετε το Ποσό της Συναλλαγής',
        },
        SUB_AMOUNT_FORM: {
          HEADING: 'Ποσό Συναλλαγής',
          TITLE: 'Ποσό',
          HINT: '',
          PAID: 'Εξοφλήθηκε η συναλλαγή;'
        },
        SUB_DISCOUNT_FORM: {
          HEADING: 'Ποσό Συναλλαγής',
          TITLE: 'Υπάρχει έκπτωση',
          CTA: 'Τσεκάρετε για να εξαργύρωση'
        },
        SUB_FINAL_STEP: {
          AMOUNT: 'Ποσό Συναλλαγής (€)',
          DISCOUNT_AMOUNT: 'Ποσό Έκπτωσης (€)',
          POINTS_TO_REDEEM: 'Πόντοι χρησιμοποιήθηκαν',
          POINTS_REMAINING: 'Νέο Υπόλοιπο Πόντων',
          POINTS_ADDED: 'Πόντοι που Προστέθηκαν',
          QUANTITY: 'Ποσότητα',
          TOKENS_BEFORE: 'Υπόλοιπο',
          TOKENS_REDEEMED: 'Χρησιμοποιήθηκαν',
          TOKENS_REMAINING: 'Νέο Υπόλοιπο',
          PAYMENT_ID: 'Αναγνωριστικό Πληρωμής',
          USER_CAN: 'Ο Χρήστης έχει δικαίωμα έκπτωσης'
        },
        SUB_OFFER_FORM: {
          HEADING_MAIN: 'Λεπτομέρειες Συναλλαγής',
          OFFER: 'Προσφορά',
          OFFER_ID: 'ID Προσφοράς',
          SUB_HEADING: 'Πόντοι',
          COST: 'Aπαιτούμενοι',
          POINTS: 'Διαθέσιμοι',
          FORM_TITLE: 'Ποσότητα',
          FORM_HINT: 'Βάλτε πόσα πακέτας προσφοράς θα δώσετε',
          ALERT: 'Δεν επαρκούν οι πόντοι. Αδυναμία ολοκλήρωσης της συναλλαγής.',
        },
        SUB_MICROCREDIT_FORM: {
          HEADING_MAIN: 'Λεπτομέρειες Συναλλαγής',
          CAMPAIGN: 'Microcredit Καμπάνια',
          CAMPAIGN_ID: 'ID Καμπάνιας',
          HEADING_2: 'Πόντοι',
          SUB_HEADING: 'Συμμετοχές',
          SUB_HEADING_2: 'Κουπόνια',
          SUB_HEADING_3: 'Ιστορικό',
          SUPPORT_ID: 'Ταυτότητα Συναλλαγής',
          INITIAL: 'Αρχικά',
          REDEEMED: 'Χρησιμοποιήθηκαν',
          REMAINING: 'Μένουν',
          FORM_TITLE: 'Εξαργύρωση τώρα',
          FORM_HINT: 'Εισάγετε την αξία κουπονιών που θέλετε να εξαργυρώσετε τώρα.',
          ALERT: 'Δεν υπάρχουν συναλλαγές. Αδυναμία ολοκλήρωσης της συναλλαγής.',
        }
      },
      EXPLORE: {
        DESCRIPTION: 'Εδώ μπορείτε να βρείτε όλα τα μέλης της κοινότητας μας και να μάθετε τα νέα τους!'
      },
    },


    /**
     * WIZARD(STEPPER) MESSAGES TRANSLATION (Μετάφραση Μηνυμάτων Stepper)
     */
    WIZARD_MESSAGES: {
      ERROR: 'Κάτι πήγε λάθος',
      ERROR_TRANSACTION: 'Η συναλλαγή απέτυχε',

      ERROR_REGISTRATION: 'Πρόβλημα κατα την εγγραφή',
      ERROR_LINK_EMAIL: 'Πρόβλημα κατα τη διάρκεια σύνδεσης του email',
      ERROR_LINK_CARD: 'Πρόβλημα κατά τη διάρκεια σύνδεσης της κάρτας',
      EMAIL_HAS_CARD: 'Μια κάρτα είναι ήδη συνδεδεμένη με το λογαριασμό χρήστη',
      TWO_ACCOUNTS: 'Η Κάρτα και το Email που εισάγατε ανήκουν σε διαφορετικούς λογαρισμούς',

      ERROR_EARN_POINTS: '',
      ERROR_REDEEM_POINTS: '',
      ERROR_REDEEM_OFFER: '',
      ERROR_EARN_TOKENS: '',
      ERROR_REDEEM_TOKENS: '',

      NOT_ENOUGH_POINTS: 'Δεν γίνεται να προχωρήσετε <br> Δεν υπάρχουν αρκετοί Πόντοι',
      NOT_ENOUGH_TOKENS: 'Δεν γίνεται να προχωρήσετε <br> Δεν υπάρχουν αρκετά Κουπόνια',

      NEW_EMAIL: 'Ένα νέο email ανιχνεύθηκε',
      NEW_CARD: '<b>Νέα Κάρτα ανιχεύθηκε</b><br>Εισάγετε E-mail για σύνδεση',
      EXISTING_CARD: '<b>Καταχωρημένη Κάρτα</b><br>Εισάγετε E-mail για σύνδεση',

      EMAIL_WILL_LINK: 'Το e-mail θα συνδεθεί με την κάρτα',
      CARD_WILL_LINK: 'Η Kάρτα θα συνδεθεί με τον λογαριασμό χρήστη',
      NO_EMAIL_WILL_LINK: 'Δεν εισάγατε email για τη σύνδεσηç\nΗ διαδικασία θα προχωρήσει με ανώνυμη χρήση κάρτας',

      USER_CREATED: 'Ένας νέος χρήστης δημιουργήθηκε',
      USER_CREATED_CARD: 'Ένας νεός χρήστης δημιουργήθηκε (μόνο κάρτα)',
      USER_CREATED_EMAIL: 'Ένας νεός χρήστης δημιουργήθηκε (μόνο email)',
      LINK_EMAIL: 'Μία διεύθυνση ηλεκτρονικου ταχυδρομείου συνδέθηκε στο λογαριασμό χρήστη',
      LINK_CARD: 'Μια κάρτα συνδέθηκε στο λογαριάσμο χρήστη',

      SUCCESS_TRANSACTION: 'Η συναλλαγή πραγματοποιήθηκε επιτυχώς',
    },

    /**
     * STATISTICS TRANSLATION (Μετάφραση Στατιστικών)
     */
    STATISTICS: {
      LOYALTY_EARN: 'Πωλήσεις',
      LOYALTY_REDEEM: 'Εκπτώσεις',
      OFFER_REDEEM: 'Εξαργυρώσεις προσφοράς',
      MICROCREDIT_EARN: 'Συμμετοχές στην Καμπάνια',
      MICROCREDIT_REDEEM: 'Εξαργυρώσεις συμμετοχών',

      MICROCREDIT_GENERAL: 'Γενική Εικόνα',
      PAID_TO_EARNED: 'Πληρωμένες προς Συνολικές Συμμετοχές',
      REDEEMED_TO_PAID: 'Εξαργυρωμένες προς Πληρωμένες Συμμετοχές',
      REMAINING_TO_PAID: 'Εναπομείνασες προς Πληρωμένες Συμμετοχές',

      AMOUNT: 'Ποσό',
      USERS: 'Χρήστες',
      TRANSACTIONS: 'Συναλλαγές',
      QUANTITY: 'Ποσότητα',
      TOTAL: 'Σύνολο',
      EXPORT: 'Εξαγωγή Αρχείου .csv',
      CLEAR_FILTER: 'X'
    }
  },
};


/**
 * ADMIN-PAGES TRANSLATION (Μετάφραση Σελίδων Διαχειριστή)
 */



        // COMMUNITY: {
        //     TITLE: 'ΚΟΙΝΟΤΗΤΑ',
        //     SUBTITLE: 'Αυτοί είμαστε!',
        //     DESC: 'Ο ένας καλύτερος από τον άλλο!'
        // },
        // BALANCE: {
        //     TITLE: 'ΠΟΝΤΟΙ',
        //     SUBTITLE: 'όλο το δίκτυο',
        // },
        // QR: {
        //     TITLE: 'Αυτό είναι το QR code σας',
        // },

        // PAGES: {
        //     COMMUNITY: {
        //         OUR_COMMUNITY: 'Η Κοινότητά μας!',
        //         CURRENT_OFFERS: 'Τρέχουσες Προσφορές!',
        //         LATEST_POSTS: 'Πρόσφατες Δημοσιεύσεις!',
        //         MEMBER_SINCE: 'Μέλος από:',
        //         OFFER_DESCRIPTION: 'Περιγραφή Προσφοράς',
        //         SINCE: 'Από',
        //         UNTIL: 'Eώς',
        //         POINTS_REQUIRED: 'Πόντοι που απαιτούνται',
        //         POINTS: 'Πόντοι:',
        //         EXPIRATION: 'Hμερομηνία Λήξης:',
        //         POST: 'Ανάρτηση',
        //         EVENT: 'Εκδήλωση',
        //     }
        // },
