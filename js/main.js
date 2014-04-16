var data = {
	p1 : {
		marketing:{
			prix_vente : {
				espagne: ko.observable(0.0),
				france: ko.observable(0.0),
				suisse: ko.observable(0.0),
			},
			communication:{
				espagne: ko.observable(0.0),
				france: ko.observable(0.0),
				suisse: ko.observable(0.0),
			},
			representants:{
				espagne: ko.observable(0),
				france: ko.observable(0),
				suisse:ko.observable(0)
			},
			commissions:{
				espagne: ko.observable(0),
				france: ko.observable(0),
				suisse:ko.observable(0)
			}
		},
		production:{
			production:ko.observable(0),
			achat:ko.observable(0),
			vente:ko.observable(0),
			salaire:ko.observable(0),
			embauche:ko.observable(0),
			licenciement:ko.observable(0),
			formation:ko.observable(0),
			recherche:ko.observable(0)
		},
		finance:{
			emprunt:ko.observable(0),
			capital:ko.observable(0),
			benefice:ko.observable(0)
		},
		etude:ko.observable(0),
		prevision:{
			ventes:{
				espagne: ko.observable(0),
				france: ko.observable(0),
				suisse:ko.observable(0)
			},
			demission:ko.observable(0),
			rendement:ko.observable(0)
		}
	}
};

var calcul = {
	p1: {
		total_vente: ko.dependentObservable(function(){
			return data.p1.prevision.ventes.espagne() + data.p1.prevision.ventes.suisse() + data.p1.prevision.ventes.france();
		}),
		total_representant: ko.dependentObservable(function(){
			return data.p1.marketing.representants.espagne() + data.p1.marketing.representants.suisse() + data.p1.marketing.representants.france();
		}),
		ca_espagne : ko.dependentObservable(function(){
			return data.p1.prevision.ventes.espagne() * data.p1.marketing.prix_vente.espagne();
		}),
		ca_france : ko.dependentObservable(function(){
			return data.p1.prevision.ventes.france() * data.p1.marketing.prix_vente.france();
		}),
		ca_suisse : ko.dependentObservable(function(){
			return data.p1.prevision.ventes.suisse() * data.p1.marketing.prix_vente.suisse();
		}),
		ca : ko.dependentObservable(function(){
			return p1.ca_espagne() + calcul.p1.ca_france() + calcul.p1.ca_suisse();
		}),
		nb_machine : ko.dependentObservable(function(){
			return (data.p1.production.achat() + parametres.p1.nombre_machine);
		}),
		nb_personnel : ko.dependentObservable(function(){
			return parametres.p1.nombre_personnel + data.p1.production.embauche() - data.p1.production.licenciement() - data.p1.prevision.demission();
		}),
		rapport_l_k : ko.dependentObservable(function(){
			return calcul.p1.nb_personnel()/(calcul.p1.nb_machine()*10);
		}),
		nb_usine_pleine : ko.dependentObservable(function(){
			return Math.floor(calcul.p1.nb_machine() / 10);
		}),
		nb_machine_usine_non_pleine : ko.dependentObservable(function(){
			return calcul.p1.nb_machine() % 10;
		}),
		production_possible : ko.dependentObservable(function(){
			return calcul.p1.nb_usine_pleine() * 125 + production_usine[calcul.p1.nb_machine_usine_non_pleine()];
		}),
		cout_production :  ko.dependentObservable(function(){
			return (resultat.p1.charges.matiere() + resultat.p1.charges.personnel() + resultat.p1.charges.heure() + resultat.p1.charges.maintenance() + resultat.p1.charges.dotation())/data.p1.production.production();
		}),
		stock_final :  ko.dependentObservable(function(){
			return data.p1.production.production - total_vente;
		})
	}
}

var resultat = {
	p1: {
		charges:{
			matiere: ko.dependentObservable(function(){
				return parametres.p1.cout_matiere * calcul.p1.total_vente();
			}),
			personnel:  ko.dependentObservable(function(){
				return calcul.p1.nb_personnel() * data.p1.production.salaire();
			}),
			represetant: ko.dependentObservable(function(){
				return (data.p1.production.salaire() * calcul.p1.total_representant()) + 
					(data.p1.marketing.commissions.espagne() * calcul.p1.ca_espagne()) +
					(data.p1.marketing.commissions.france() * calcul.p1.ca_france()) +
					(data.p1.marketing.commissions.suisse() * calcul.p1.ca_suisse());
			})
		}
	}
}


var parametres = {
	"p1":{
		"cout_matiere":6,
		"nombre_personnel":0,
		"stock":0,
		"cout_production":0,
		"nombre_machine":0,
		"prix_machine":200
	}
}

var viewModel = {
    data: data,
	calcul: calcul,
	resultat: resultat
};

ko.applyBindings(viewModel);

production_usine = new Array();
production_usine[0] = 0;
production_usine[1] = 0;
production_usine[2] = 0;
production_usine[3] = 0;
production_usine[4] = 0;
production_usine[5] = 50;
production_usine[6] = 63;
production_usine[7] = 77;
production_usine[8] = 92;
production_usine[9] = 108;
/*
function calcul(resultat,data,parametres){
	var total_vente = data.p1.prevision.ventes.espagne + data.p1.prevision.ventes.suisse + data.p1.prevision.ventes.france;
	var total_representant =  data.p1.marketing.representants.espagne + data.p1.marketing.representants.suisse + data.p1.marketing.representants.france;
	var ca_espagne = data.p1.prevision.ventes.espagne * data.p1.marketing.prix_vente.espagne;
	var ca_france = data.p1.prevision.ventes.france * data.p1.marketing.prix_vente.france;
	var ca_suisse = data.p1.prevision.ventes.suisse * data.p1.marketing.prix_vente.suisse;
	var ca = ca_espagne + ca_france + ca_suisse;
	var nb_machine = (data.p1.production.achat + parametres.p1.nombre_machine);
	var nb_personnel = parametres.p1.nombre_personnel + data.p1.production.embauche - data.p1.production.licenciement - data.p1.prevision.demission;
	var rapport_l_k = nb_personnel/(nb_machine*10);
	var nb_usine_pleine = Math.floor(nb_machine / 10);
	var nb_machine_usine_non_pleine = nb_machine % 10;
	var production_possible = nb_usine_pleine * 125 + production_usine[nb_machine_usine_non_pleine];
	
	resultat.p1.charges.matiere = parametres.p1.cout_matiere * total_vente;
	resultat.p1.charges.personnel = nb_personnel * data.p1.production.salaire;
	resultat.p1.charges.representant = (data.p1.production.salaire * total_representant) + 
		(data.p1.marketing.commissions.espagne * ca_espagne) +
		(data.p1.marketing.commissions.france * ca_france) +
		(data.p1.marketing.commissions.suisse * ca_suisse);
	resultat.p1.charges.autre = 0.05 * (ca);
	resultat.p1.charges.maintenance = nb_machine * 30 + data.p1.production.formation;
	resultat.p1.charges.recherche = data.p1.production.recherche;
	resultat.p1.charges.dotation = nb_machine * parametres.p1.prix_machine * 0.1;
	/* A changer en P2 
	resultat.p1.charges.financier = 0.07 * data.p1.finance.emprunt;
	resultat.p1.charges.publicite = data.p1.marketing.communication.espagne + data.p1.marketing.communication.suisse + data.p1.marketing.communication.france;
	resultat.p1.charges.etude = data.p1.etude + data.p1.production.embauche * data.p1.production.salaire * 0.1 + data.p1.production.licenciement * data.p1.production.salaire * 0.7;
	
	var cout_production = (resultat.p1.charges.matiere + resultat.p1.charges.personnel + resultat.p1.charges.heure + resultat.p1.charges.maintenance + resultat.p1.charges.dotation)/data.p1.production.production;
	var stock_final = data.p1.production.production - total_vente;
	resultat.p1.charges.stockage = parametres.p1.stock * parametres.p1.cout_production + stock_final*cout_production;
	
	resultat.p1.charges.total = resultat.p1.charges.matiere +
		resultat.p1.charges.personnel +
		resultat.p1.charges.representant +
		resultat.p1.charges.autre +
		resultat.p1.charges.maintenance + 
		resultat.p1.charges.recherche +
		resultat.p1.charges.dotation +
		resultat.p1.charges.financier +
		resultat.p1.charges.publicite +
		resultat.p1.charges.etude +
		resultat.p1.charges.stockage;
} 
$("#refresh").click(function(e){
	e.preventDefault();
	input(data);
	calcul(resultat,data,parametres);
	maj(resultat);
});

*/