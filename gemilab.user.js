// ==UserScript==
//@name             Better GEMILAB
//@match            https://gemilab.labri.fr/page/page_user.php
//@match            https://gemilab.labri.fr/page/page_create_mission.php
//@match            https://gemilab.labri.fr/page/page_liste_mission.php
//@match            https://gemilab.labri.fr/page/page_modif_user.php
//@version          1.0
//@author           hubnern
// ==/UserScript==

let headerTable = document.querySelector("body > table:nth-child(4)");
headerTable.remove();

let buttons = document.createElement("div");
let buttonsHTML = `
<a href="page_create_mission.php?action=new">Créer une mission</a><br/>
<a href="page_liste_mission.php" title="Suivi de mes missions">Mes missions</a><br/>`;
if (unsafeWindow.location.pathname === "/page/page_user.php") {
  // sets the id to the modify data form
  document.querySelector("body > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > form:nth-child(1)").id = "the_form_id";
  buttonsHTML += `<button type="submit" form="the_form_id">Modifier mes informations</button><br/>`;
} else {
  buttonsHTML += `<a href="page_user.php">Mes informations</a><br/>`;
}
buttonsHTML += `<a href="../global/destroy_session.php?action=logout">Déconnexion</a>`;
buttons.innerHTML = buttonsHTML;
buttons.classList.add("flex");
buttons.id = "buttons";

document.querySelector("body > table:nth-child(5)").after(buttons);

let footer = document.createElement("div");
footer.innerHTML = `
<a href="help/h_page_user.php">FAQ</button>
<a href="../global/doc/Projet_GEMILAB.pdf" title="Manuel d'utilisation" target="_blank" rel="noopener noreferrer nofollow">Manuel d'Utilisation</a>
<a href="help/form_contact.php">Contacter les gestionnaires</button>
<a href="help/lawful_mention.php">Mentions Légales</a>
`;
footer.classList.add("flex");
let copyright = document.createElement("p");
copyright.innerText = "GEMILAB - © 2010-2024 LaBRI";
copyright.style.textAlign = "center";
document.body.appendChild(footer);
document.body.appendChild(copyright);


GM.addStyle(`
* {
  font-family: sans-serif !important;
}
.flex {
  display: flex;
  justify-content: space-evenly;
}
#buttons {
  margin: 1em 0;
}
#buttons a, #buttons button {
  background-color: #ddd;
  color: black;
  text-decoration: none;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 3px;
  font-size: 16px;
}
`);

if (unsafeWindow.location.pathname === "/page/page_user.php") {
  // todo chance page specific css
  let inRedSpan = document.querySelector("body > table:nth-child(8) > tbody:nth-child(1) > tr:nth-child(23) > td:nth-child(1) > span:nth-child(1)");
  inRedSpan.innerText = "en orange";
  document.querySelector("input.Bouton:nth-child(3)").value = "Modifier mes données";
  const custom_css = `
/* Infomation personnelles */
body table:nth-child(8) {
  border-collapse: collapse;
}
body table:nth-child(8) tr:nth-child(1) {
  display: none;
}
body table:nth-child(8) td {
  background-color: white;
  border: 1px solid black;
}
body table:nth-child(8) tr:nth-child(1) td:nth-child(1),
body table:nth-child(8) tr:nth-child(2) td:nth-child(1),
body table:nth-child(8) tr:nth-child(14) td:nth-child(1),
body table:nth-child(8) tr:nth-child(15) td:nth-child(1),
body table:nth-child(8) tr:nth-child(16) td:nth-child(1),
body table:nth-child(8) tr:nth-child(17) td:nth-child(1),
body table:nth-child(8) tr:nth-child(23) td:nth-child(1),
body table:nth-child(8) tr:nth-child(24) td:nth-child(1) {
  border: none;
}
/* recemment modifié en orange */
body table:nth-child(8) span[style] {
  background-color: white !important;
  color: orange;
}
`;
  GM.addStyle(custom_css);
}

