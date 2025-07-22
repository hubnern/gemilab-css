// ==UserScript==
// @name         Better Gemilab
// @namespace    https://hubnern.github.io/
// @version      1.1
// @description  try to take over the world!
// @author       hubnern
// @match        https://gemilab.labri.fr/*
// @grant        unsafeWindow
// @grant        GM_addStyle
// @grant        GM_log
// ==/UserScript==

(function() {
    'use strict';
    GM_log("Better Gemilab Loading");

    // change the title to less words
    document.title = "GEMILAB";

    // Remove Header
    let header_old = document.querySelector("body > table:nth-of-type(1)");
    header_old.remove();
    // Bring back the header
    let buttons = document.createElement("div");
    let buttons_html = `
        <a href="page_create_mission.php?action=new">Créer une mission</a>
        <a href="page_liste_mission.php" title="Suivi de mes missions">Mes missions</a>`;
    if (unsafeWindow.location.pathname === "/page/page_user.php") {
        // set the id to the modify information form so we can acccess it via a button
        // get the id of the user
        document.querySelector("body > table:nth-of-type(2) form:nth-of-type(1)").id = "the_form_id";
        buttons_html += `<button type="submit" form="the_form_id">Modifier mes informations</button>`;
        //GM_log(document.querySelector("body > table:nth-of-type(2) form:nth-of-type(1) input:nth-of-type(2)").value);
        //buttons_html += `<a href="page_modif_user.php?action=modif&id_user=${user_id}">Modifier mes informations</a>`;
    } else {
        buttons_html += `<a href="page_user.php">Mes informations</a>`;
    }

    buttons_html += `<a href="../global/destroy_session.php?action=logout">Déconnexion</a>`;
    buttons.innerHTML = buttons_html;
    buttons.id = "buttons";
    // add the buttons after the title
    document.querySelector("body > table:nth-of-type(1)").after(buttons);

    //let's remove the greeter
    document.querySelector("body > table:nth-of-type(1) tr:nth-of-type(2)").remove();

    // add back the footer (that was in the header)
    let footer = document.createElement("div");
    footer.innerHTML = `
        <a href="help/h_page_user.php">FAQ</button>
        <a href="../global/doc/Projet_GEMILAB.pdf" title="Manuel d'utilisation" target="_blank" rel="noopener noreferrer nofollow">Manuel d'Utilisation</a>
        <a href="help/form_contact.php">Contacter les gestionnaires</a>
        <a href="help/lawful_mention.php">Mentions Légales</a>`;
    footer.id = "footer";
    document.body.appendChild(footer);
    // add back the copyright notice
    let copyright = document.createElement("p");
    let copyright_content = header_old.querySelector("td:nth-of-type(5) span:last-of-type").textContent.trim();
    copyright.innerText = copyright_content;
    copyright.style.textAlign = "center";
    document.body.appendChild(copyright);

    // header/footer css
    GM_addStyle(`
        * {
          font-family: sans-serif !important;
        }
        .flex {
          display: flex;
          justify-content: space-evenly;
        }
        #buttons, #footer, #ublinks {
          display: flex;
          justify-content: space-evenly;
          margin: 2em 0;
        }
        #buttons a, #buttons button, #exportcsv {
          background-color: #ddd;
          color: black;
          text-decoration: none;
          border: 2px solid gray;
          border-radius: 0.25em;
          padding: 0.5em;
          font-size: 1em;
          text-align: center;
        }
        #buttons a:hover, #buttons button:hover, #exportcsv:hover {
            box-shadow: 0 0 5px 0 gray;
        }
        h1 { text-align: center; }
        @media (max-width: 1200px) {
            .flex { display: initial; }
        }
        @media (max-width: 700px) {
            #buttons, #footer, #ublinks {
                flex-direction: column;
                width: fit-content;
                margin: 2em auto;
            }
            #buttons a, #buttons button {
                margin-top: 0.5em;
            }
        }
        `);

    // per page modification
    if (unsafeWindow.location.pathname === "/page/page_user.php") {
        document.title = "Mes informations | GEMILAB";

        // hide the old table (we can't remove it or else the header button will not work)
        let table_old = document.querySelector("table:nth-of-type(2)");
        table_old.style.display = "none";

        // get value of each fields in the table
        let values = {
            "login": "", "firstname": "", "name": "", "address": "", "postalcode": "", "cedex": "",
            "town": "", "country": "", "phone": "", "mobile": "", "email": "", "rank": "",
            "nationality": "", "dt_birth": "", "birthplace": "", "subscriter": "", "passport": "",
            "rib_receive": "", "dt_rib": "", "admin_organization": "", "admin_address": "",
            "admin_postalcode": "", "admin_cedex": "", "admin_town": "", "admin_country": "",
            "admin_phone": ""
        };
        for (const id in values) {
            values[id] = document.querySelector(`#${id}`).textContent.trim();
        }

        // replace by ours
        let html_content = `
        <div id="personnal">
        <h2>Informations Personnelles</h2>
        <div class="flexin">
        <div><h3>Login</h3><p>${values.login}</p></div>
        <div><h3>Prénom Nom</h3><p>${values.firstname} ${values.name}</p></div>
        </div>
        <hr/>
        <h3>Addresse</h3><p>${values.address}</p>
        <p>${values.postalcode} ${values.cedex} ${values.town}, ${values.country}</p>
        <hr/>
        <div class="flexin">
        <div><h3>Téléphone</h3><p>${values.phone}</p></div>
        <div><h3>Portable</h3><p>${values.mobile}</p></div>
        </div>
        <h3>Nationalité</h3><p>${values.nationality}</p>
        <div class="flexin">
        <div><h3>Date de Naissance</h3><p>${values.dt_birth}</p></div>
        <div><h3>Lieu</h3><p>${values.birthplace}</p></div>
        </div>
        <hr/>
        <div class="flexin">
        <div><h3>Abonnement (Train ou Avion)</h3><p>${values.subscriter}</p></div>
        <div><h3>Passeport</h3><p>${values.passport}</p></div>
        </div>
        <div class="flexin">
        <div><h3>RIB transmis</h3><p>${values.rib_receive}</p></div>
        <div><h3>Date d'actualisation du RIB</h3><p>${values.dt_rib}</p></div>
        </div>
        <em>Si vous n'avez pas encore communiqué de RIB ou si vous changez de coordonnées bancaires, merci de nous transmettre un RIB récent pour vos remboursements.</em>
        </div>

        <div id="administrative">
        <h2>Informations Administratives</h2>
        <div class="flexin">
        <div><h3>E-mail</h3><p>${values.email}</p></div>
        <div><h3>Grade</h3><p>${values.rank}</p></div>
        </div>
        <hr/>
        <h3>Organisme</h3><p>${values.admin_organization}</p>
        <hr/>
        <h3>Adresse administrative</h3><p>${values.admin_address}</p>
        <p>${values.admin_postalcode} ${values.admin_cedex} ${values.admin_town}, ${values.admin_country}</p>
        <hr/>
        <h3>Téléphone Bureau</h3><p>${values.admin_phone}</p>
        </div>
        `;
        let informations = document.createElement("div");
        informations.classList.add("flex");
        informations.innerHTML = html_content;
        informations.id = "informations";
        table_old.after(informations);
        GM_addStyle(`
h2 {
    margin-bottom: 1.5em;
}
#informations {
    margin-bottom: 4em;
}
#personnal {
    width: 40%;
}
#administrative {
    width: 30%;
}
.flexin {
    display: flex;
    justify-content: left;
}
.flexin div {
    width: 50%;
}

@media (max-width: 1200px) {
    #personnal, #administrative {
        width: 90%;
        margin: auto;
    }
}
        `);
    } else if (unsafeWindow.location.pathname === "/page/page_create_mission.php" || unsafeWindow.location.pathname === "/page/page_show_mission.php") {
        // remove the h1 table
        let h1_table = document.querySelector("table:nth-of-type(2)");
        h1_table.remove();
        // add back the ub links
        let ub_links = document.createElement("div");
        ub_links.innerHTML = `
        <a href="https://voyages.u-bordeaux.fr/voyageur">Marché de l'Université de Bordeaux</a>
        <a href="https://personnels.u-bordeaux.fr/Metiers/Achats/Marches-fournitures-et-services/Billetterie-voyages-2014-119/La-politique-voyage-de-l-universite">Politique voyage de l'Université de Bordeaux</button>`;
        ub_links.id = "ublinks";
        footer.before(ub_links);

        // TODO later, there's a lot of javascript to undersand and know what's happening

        //GM_addStyle(`
        //`);
    } else if (unsafeWindow.location.pathname === "/page/page_modif_user.php") {
        document.title = "Modifier mes informations | GEMILAB";
    } else if (unsafeWindow.location.pathname === "/page/page_liste_mission.php") {
        document.title = "Mes missions | GEMILAB";
        // remove the filter buttons and the empty row after
        document.querySelector("form:nth-of-type(1) table:nth-of-type(1) tr:nth-of-type(2)").remove();
        document.querySelector("form:nth-of-type(1) table:nth-of-type(1) tr:nth-of-type(2)").remove();
        // replace the filter text and h2
        document.querySelector("div:nth-of-type(2)").remove();
        let title = document.createElement("h1");
        title.textContent = "Suivi de mes missions";
        buttons.after(title);
        // let's filter by year and status dynamicaly
        let body = document.querySelector("#follow_mission > tbody");
        let year_filter = document.querySelector("#selection_year");
        let status_filter = document.querySelector("#selection_statut");
        let year_input = document.querySelector("input[name=sel_year]");
        let status_input = document.querySelector("input[name=sel_statut]");
        function filter_status() {
            let status = status_filter.value;
            status_input.value = status;
            for (let tr of body.querySelectorAll("tr")) {
                let status_td = tr.querySelector("td:nth-of-type(9) b");
                if (status.length === 0 || status_td.textContent.trim().endsWith(status)) {
                    tr.style.display = "";
                } else {
                    tr.style.display = "none";
                }
            }
        }
        function filter_year() {
            let year = year_filter.value;
            year_input.value = year;
            for (let tr of body.querySelectorAll("tr")) {
                let year_td = tr.querySelector("td:nth-of-type(5)");
                if (year.length === 0 || year_td.textContent.trim().endsWith(year)) {
                    tr.style.display = "";
                } else {
                    tr.style.display = "none";
                }
            }
        }
        status_filter.addEventListener("change", filter_status);
        year_filter.addEventListener("change", filter_year);
        // hide the "export missions" table and replace by a button
        let export_table = document.querySelector("table:nth-of-type(3)");
        export_table.style.display = "none";
        export_table.querySelector("form").id = "exportform";
        let button = document.createElement("div");
        button.classList.add("flex");
//        button.type = "submit";
//        button.setAttribute("form", "exportform");
//        button.textContent = "Export CSV";
//        button.id = "exportcsv";
        button.innerHTML = `<button type="submit" form="exportform" id="exportcsv">Export CSV</button>`;
        export_table.after(button);
        //buttons_html += `<button type="submit" form="the_form_id">Modifier mes informations</button>`;

    }
    if (unsafeWindow.location.pathname === "/page/page_create_mission.php") {
        document.title = "Nouvelle mission | GEMILAB";
        // add back the h1
        let h1 = document.createElement("h1");
        h1.textContent = "Ajout d'une nouvelle mission";
        buttons.after(h1);

    } else if (unsafeWindow.location.pathname === "/page/page_show_mission.php") {
        document.title = "Visualisation de mission | GEMILAB";
        // add back the h1
        let h1 = document.createElement("h1");
        h1.textContent = "Visualisation d'une mission";
        buttons.after(h1);
    }
    GM_log("Better Gemilab Loaded");


















})();

