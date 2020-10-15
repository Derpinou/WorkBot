module.exports = class Eleve {
    constructor(session, data) {
        this.type = "Élève";
        // Default values
        this.session = session;
        this.id = data.id;
        this.prenom = data.prenom;
        this.nom = data.nom;
        this.sexe = data.sexe;
        this.classe = data.classe
            ? data.classe.libelle
            : data.profile.classe.libelle;
    }
    // Fetch du cahier de texte de l'élève
    async fetchCahierDeTexte() {
        return new Promise(async resolve => {
            const data = await this.session.request(
                "https://api.ecoledirecte.com/v3/Eleves/" +
                this.id +
                "/cahierdetexte.awp?verbe=get&"
            );
            this.cahierDeTexte = [];
            Object.keys(data.data).forEach(day => {
                this.cahierDeTexte.push({
                    day,
                    devoirs: data.data[day]
                });
            });
            resolve(this.cahierDeTexte);
        });
    }
    // Fetch du cahier de texte de l'élève en fonction d'une date précise
    /**
     * Gets the users data
     * @param {string} date
     * @returns data
     */
    async fetchDataCahierDeTexte(date) {
        const data = await this.session.request(
            "https://api.ecoledirecte.com/v3/Eleves/" +
            this.id +
            "/cahierdetexte/"+date+".awp?verbe=get&"
        );
        return data.data;
    }

};
