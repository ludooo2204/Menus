// import data from './plats.json';

// console.log('data from ./plats.json')
// console.log(data)
// // let listePlats;
// console.log('MENU.JS');

let repasDansSemaine = [
	'mercrediMidi',
	'mercrediSoir',
	'jeudiMidi',
	'jeudiSoir',
	'vendrediMidi',
	'vendrediSoir',
	'samediMidi',
	'samediSoir',
	'dimancheMidi',
	'dimancheSoir',
	'lundiMidi',
	'lundiSoir',
	'mardiMidi',
	'mardiSoir',
];
let plats = [];

class Plat {
	constructor(
		nom,
		noteSur20,
		ingredients,
		saison,
		dejaDansSemaine,
		dejaDansSemaineDerniere,
		dansPlatRestant,
		joursDeConservation,
		tempsDePreparation,
		extraDuWeekend,
		typeViande,
		legumesConseille,
		feculentConseille,
		nbrDeRepasPossible,
		nbrDeJourDepuisDerniereFois,
		midiSoir,
		typePlat,
	) {
		this.nom = nom;
		this.noteSur20 = noteSur20;
		this.ingredients = ingredients;
		this.saison = saison;
		this.dansPlatRestant = dansPlatRestant;
		this.dejaDansSemaine = dejaDansSemaine;
		this.dejaDansSemaineDerniere = dejaDansSemaineDerniere;
		this.joursDeConservation = joursDeConservation;
		this.tempsDePreparation = tempsDePreparation; // bareme de 1 à 5 (rapide à long)
		this.extraDuWeekend = extraDuWeekend;
		this.typeViande = typeViande;
		this.legumesConseille = legumesConseille;
		this.feculentConseille = feculentConseille;
		this.nbrDeRepasPossible = nbrDeRepasPossible;
		this.nbrDeJourDepuisDerniereFois = nbrDeJourDepuisDerniereFois;
		this.midiSoir = midiSoir;
		this.typePlat = typePlat;
	}
}

function nouveauPlat() {
	const nom = window.prompt('quel est votre nouveau plat?');
	// const noteSur20=parseInt(window.prompt('quel est votre note du plat sur 20?'))
	const ingredients = window.prompt('quel sont les ingredients ("separer par un e,")');
	const saison = prompt('y a t-il une saison particuliere pour votre plat? ');
	const joursDeConservation = parseInt(window.prompt('combien de jours se garde t il ?'));
	const tempsDePreparation = parseInt(window.prompt('Est il long a preparer ? de 1(rapide) à 5(lent) '));
	const extraDuWeekend = confirm('est ce un extra du week end? attention a la reponse oui ou non');
	const typeViande = window.prompt('quel est le type de viande ?');
	const nbrDeRepasPossible = parseInt(window.prompt('combien de repas peut on faire avec?'));
	const feculent = window.prompt('quel sont les feculents recommandés en accompagnement?');
	const legumes = window.prompt('quel sont les légumes recommandés en accompagnement?');
	const midiSoir = window.prompt('uniquement midi - uniquement le soir ?');
	const typePlat = '';
	// console.log(nom);
	const plat = new Plat(
		nom,
		'',
		ingredients,
		saison,
		'',
		'',
		'',
		joursDeConservation,
		tempsDePreparation,
		extraDuWeekend,
		typeViande,
		legumes,
		feculent,
		nbrDeRepasPossible,
		'',
		midiSoir,
		typePlat,
	);

	// ajaxPost("php/post_json_plats.php", platString, function (event) {
	// 	console.log(event);
	// });
}

let listePlats;
// let listePlats = data.plats;
let listePlatsProposés;
let plat = [];
const lireDatas = _data => {
	// console.log('_data from menus');
	// console.log(_data);
	// console.log(listePlats);
	listePlats = _data;
};
function proposeMenu(numPlatDsSemaineBloqué) {
	// console.log('proposeMenu from menu.js');
	// console.log('numPlatDsSemaineBloqué');
	// console.log(numPlatDsSemaineBloqué);
	listePlatsProposés = [];
	for (let i = 0; i < 14; i++) {
		// console.log('i ', i);
		if (numPlatDsSemaineBloqué && numPlatDsSemaineBloqué.find(ele => ele[0] == i)) {
			const nomPlatBloqué = numPlatDsSemaineBloqué.find(ele => ele[0] == i)[1];
			// console.log("nomPlatBloqué")
			// console.log(nomPlatBloqué)
			// listePlatsProposés.push(nomPlatBloqué);
			listePlatsProposés[i] = nomPlatBloqué;
			// if ()
		} else {
			let platProposé;
			if (i == 9) {
				if (listePlats) platProposé = listePlats.filter(e => e.nom_plat == 'sandwich')[0];
			} else platProposé = proposePlat(i);
			// console.log('platProposé');
			// console.log(platProposé);
			// console.log(platProposé.nom);
			// console.log('listePlatsProposés');
			// console.log(listePlatsProposés);
			if (!listePlatsProposés[i] && platProposé && platProposé.nom_plat) {
				if (platProposé.nbrDeRepasPossible == 2) {
					console.log("2 repas possibles avec")
					console.log(platProposé.nom_plat)
					listePlatsProposés[i] = platProposé.nom_plat;
					listePlatsProposés[i + 4] = platProposé.nom_plat;
				} else if (platProposé.nbrDeRepasPossible == 3) {
					console.log("3 repas possibles avec")
					console.log(platProposé.nom_plat)
					listePlatsProposés[i] = platProposé.nom_plat;
					listePlatsProposés[i + 4] = platProposé.nom_plat;
					listePlatsProposés[i + 6] = platProposé.nom_plat;
				} else {
					listePlatsProposés[i] = platProposé.nom_plat;
				}
			}
		}
	}
	// console.log("listePlatsProposés from menus")
	// console.log(listePlatsProposés)
	// console.log(listePlatsProposés.length)
	if (listePlatsProposés.length > 14) listePlatsProposés = listePlatsProposés.slice(0, 14);

	for (let i = 0; i < 14; i++) {
		if (plat[i]) plat[i].dejaDansSemaine = false;
	}
	// console.log("listePlatsProposés slicé")
	// console.log(listePlatsProposés)
	// console.log(listePlatsProposés.length)
	return listePlatsProposés;
}

function proposePlat(emplacementRepasDansSemaine) {
	// console.log("proposePlat",emplacementRepasDansSemaine)
	//soir
	if (listePlats) {
		// console.log(listePlats)
		if (emplacementRepasDansSemaine % 2 == 1) {
			plats[emplacementRepasDansSemaine] = listePlats.filter(plat => plat.midiSoir !== 'midi' && !plat.dejaDansSemaine);
			// console.log("plats[emplacementRepasDansSemaine]")
			// console.log(plats[emplacementRepasDansSemaine])
		}
		//midi
		if (emplacementRepasDansSemaine % 2 == 0) {
			plats[emplacementRepasDansSemaine] = listePlats.filter(plat => plat.midiSoir !== 'soir' && !plat.dejaDansSemaine);
			// console.log("plats[emplacementRepasDansSemaine]")
			// console.log(plats[emplacementRepasDansSemaine])
		}
		if (plats[emplacementRepasDansSemaine].length == 0) {
			console.log("C'est vide !!!!!!!!!!!!!!");
			return null;
		}
		plat[emplacementRepasDansSemaine] = getRndOfArray(plats[emplacementRepasDansSemaine]);

		plat[emplacementRepasDansSemaine].dejaDansSemaine = true;
		// console.log("plat[emplacementRepasDansSemaine]");
		// console.log("plat[emplacementRepasDansSemaine]");
		// console.log("plat[emplacementRepasDansSemaine]");
		// console.log(plat[emplacementRepasDansSemaine]);
		return plat[emplacementRepasDansSemaine];
	}
}

function getRndOfArray(array) {
	return array[Math.floor(Math.random() * array.length)];
}
export {proposePlat, proposeMenu, lireDatas};
