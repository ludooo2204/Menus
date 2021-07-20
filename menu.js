import data from './plats.json';

// console.log('plats')
// console.log(data.plats.map((e,i)=>console.log(e.nom,i)))
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

let listePlats = data.plats;
let listePlatsProposés;
let plat = [];
function proposeMenu(numPlatDsSemaineBloqué) {
	listePlatsProposés = [];
	for (let i = 0; i < 14; i++) {
		if (numPlatDsSemaineBloqué && numPlatDsSemaineBloqué.find(ele=>ele[0]==i)) {
			const nomPlatBloqué = numPlatDsSemaineBloqué.find(ele=>ele[0]==i)[1]
			listePlatsProposés.push(nomPlatBloqué);
			// for (const iterator of numPlatDsSemaineBloqué) {
			// 	console.log('iterator');
			// 	console.log(iterator);
			// 	if (iterator[0] == i) {
			// 		console.log('le repas ' + i + 'est bloqué !');
			// 		listePlatsProposés.push(iterator[1]);
			// 	}
			// }
		} else {
			listePlatsProposés.push(proposePlat(i).nom);
		}
	}
	for (let i = 0; i < 14; i++) {
		plat[i].dejaDansSemaine = false;
	}
	
	return listePlatsProposés;
}

function proposePlat(emplacementRepasDansSemaine) {
	//soir
	if (emplacementRepasDansSemaine % 2 == 1) {
		plats[emplacementRepasDansSemaine] = listePlats.filter(plat => plat.midiSoir !== 'midi' && plat.dejaDansSemaine == false);
	}
	//midi
	if (emplacementRepasDansSemaine % 2 == 0) {
		plats[emplacementRepasDansSemaine] = listePlats.filter(plat => plat.midiSoir !== 'soir' && plat.dejaDansSemaine == false);
	}
	if (plats[emplacementRepasDansSemaine].length == 0) {
		console.log("C'est vide !!!!!!!!!!!!!!");
		return null;
	}
	plat[emplacementRepasDansSemaine] = getRndOfArray(plats[emplacementRepasDansSemaine]);

	plat[emplacementRepasDansSemaine].dejaDansSemaine = true;
	return plat[emplacementRepasDansSemaine];
}

function getRndOfArray(array) {
	return array[Math.floor(Math.random() * array.length)];
}
export {proposePlat, proposeMenu};
