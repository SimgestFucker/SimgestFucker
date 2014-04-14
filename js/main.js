var data = {
	"p1" : {
		"marketing":{
			"prix_vente" : {
				"espagne": 0.0,
				"france": 0.0,
				"suisse":0.0,
			},
			"communication":{
				"espagne": 0.0,
				"france": 0.0,
				"suisse":0.0,
			},
			"representants":{
				"espagne": 0,
				"france": 0,
				"suisse":0
			},
			"commissions":{
				"espagne": 0,
				"france": 0,
				"suisse":0
			}
		},
		"production":{
			"production":0,
			"achat":0,
			"vente":0,
			"salaire":0,
			"embauche":0,
			"licenciement":0,
			"formation":0,
			"recherche":0
		},
		"finance":{
			"emprunt":0,
			"capital":0,
			"benefice":0
		},
		"etude":0,
		"prevision":{
			"ventes":{
				"espagne": 0,
				"france": 0,
				"suisse":0
			},
			"demission":0
		}
	}
};

var resultat = {
	"p1": {
		"charges":{
			"matiere":0,
			"personnel":0,
			"heure":0,
			"represetant":0,
			"autre":0,
			"stockage":0,
			"maintenance":0,
			"recherche":0,
			"financier":0,
			"communication":0,
			"dotation":0,
			"etude":0,
			"total":0
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

function input(data){
	data.p1.marketing.prix_vente.espagne = parseInt($("input[name='data[p1][marketing][prix_vente][espagne]']").val());
	data.p1.marketing.prix_vente.france = parseInt($("input[name='data[p1][marketing][prix_vente][france]']").val());
	data.p1.marketing.prix_vente.suisse = parseInt($("input[name='data[p1][marketing][prix_vente][suisse]']").val());
	data.p1.marketing.communication.espagne = parseInt($("input[name='data[p1][marketing][communication][espagne]']").val());
	data.p1.marketing.communication.france = parseInt($("input[name='data[p1][marketing][communication][france]']").val());
	data.p1.marketing.communication.suisse = parseInt($("input[name='data[p1][marketing][communication][suisse]']").val());
	data.p1.marketing.representants.espagne = parseInt($("input[name='data[p1][marketing][representants][espagne]']").val());
	data.p1.marketing.representants.france = parseInt($("input[name='data[p1][marketing][representants][france]']").val());
	data.p1.marketing.representants.suisse = parseInt($("input[name='data[p1][marketing][representants][suisse]']").val());
	data.p1.marketing.commissions.espagne = parseInt($("input[name='data[p1][marketing][commissions][espagne]']").val());
	data.p1.marketing.commissions.france = parseInt($("input[name='data[p1][marketing][commissions][france]']").val());
	data.p1.marketing.commissions.suisse = parseInt($("input[name='data[p1][marketing][commissions][suisse]']").val());
	data.p1.production.production = parseInt($("input[name='data[p1][production][production]']").val());
	data.p1.production.achat = parseInt($("input[name='data[p1][production][achat]']").val());
	data.p1.production.vente = parseInt($("input[name='data[p1][production][vente]']").val());
	data.p1.production.salaire = parseInt($("input[name='data[p1][production][salaire]']").val());
	data.p1.production.embauche = parseInt($("input[name='data[p1][production][embauche]']").val());
	data.p1.production.licenciement = parseInt($("input[name='data[p1][production][licenciement]']").val());
	data.p1.production.formation = parseInt($("input[name='data[p1][production][formation]']").val());
	data.p1.production.recherche = parseInt($("input[name='data[p1][production][recherche]']").val());
	data.p1.finance.emprunt = parseInt($("input[name='data[p1][finance][emprunt]']").val());
	data.p1.finance.capital = parseInt($("input[name='data[p1][finance][capital]']").val());
	data.p1.finance.benefice = parseInt($("input[name='data[p1][finance][benefice]']").val());
	data.p1.etude = parseInt($("input[name='data[p1][etude]']").val());
	data.p1.prevision.demission = parseInt($("input[name='data[p1][prevision][demission]']").val());
	data.p1.prevision.ventes.espagne = parseInt($("input[name='data[p1][prevision][ventes][espagne]']").val());
	data.p1.prevision.ventes.france = parseInt($("input[name='data[p1][prevision][ventes][france]']").val());
	data.p1.prevision.ventes.suisse = parseInt($("input[name='data[p1][prevision][ventes][suisse]']").val());
}

function calcul(resultat,data,parametres){
	var total_vente = data.p1.prevision.ventes.espagne + data.p1.prevision.ventes.suisse + data.p1.prevision.ventes.france;
	var total_representant =  data.p1.marketing.representants.espagne + data.p1.marketing.representants.suisse + data.p1.marketing.representants.france;
	var ca_espagne = data.p1.prevision.ventes.espagne * data.p1.marketing.prix_vente.espagne;
	var ca_france = data.p1.prevision.ventes.france * data.p1.marketing.prix_vente.france;
	var ca_suisse = data.p1.prevision.ventes.suisse * data.p1.marketing.prix_vente.suisse;
	var ca = ca_espagne + ca_france + ca_suisse;
	var nb_machine = (data.p1.production.achat + parametres.p1.nombre_machine);
	var nb_personnel = parametres.p1.nombre_personnel + data.p1.production.embauche - data.p1.production.licenciement - data.p1.prevision.demission;
	
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
	/* A changer en P2 */
	resultat.p1.charges.financier = 0.07 * data.p1.finance.emprunt;
	resultat.p1.charges.publicite = data.p1.marketing.communication.espagne + data.p1.marketing.communication.suisse + data.p1.marketing.communication.france;
	resultat.p1.charges.etude = data.p1.etude + data.p1.production.embauche * data.p1.production.salaire * 0.1 + data.p1.production.licenciement * data.p1.production.salaire * 0.7;
	
	var cout_production = (resultat.p1.charges.matiere + resultat.p1.charges.personnel + resultat.p1.charges.heure + resultat.p1.charges.maintenance + resultat.p1.charges.dotation)/data.p1.production.production;
	var stock_final = data.p1.production.production - total_vente;
	resultat.p1.charges.stockage = parametres.p1.stock * parametres.p1.cout_production + stock_final*cout_production;
} 
function maj(resultat){
	$("input[name='resultat[p1][charges][matiere]']").val(resultat.p1.charges.matiere);
	$("input[name='resultat[p1][charges][personnel]']").val(resultat.p1.charges.personnel);
	$("input[name='resultat[p1][charges][heure]']").val(resultat.p1.charges.heure);
	$("input[name='resultat[p1][charges][representant]']").val(resultat.p1.charges.representant);
	$("input[name='resultat[p1][charges][autre]']").val(resultat.p1.charges.autre);
	$("input[name='resultat[p1][charges][stockage]']").val(resultat.p1.charges.stockage);
	$("input[name='resultat[p1][charges][maintenance]']").val(resultat.p1.charges.maintenance);
	$("input[name='resultat[p1][charges][recherche]']").val(resultat.p1.charges.recherche);
	$("input[name='resultat[p1][charges][financier]']").val(resultat.p1.charges.financier);
	$("input[name='resultat[p1][charges][communication]']").val(resultat.p1.charges.communication);
	$("input[name='resultat[p1][charges][dotation]']").val(resultat.p1.charges.dotation);
	$("input[name='resultat[p1][charges][etude]']").val(resultat.p1.charges.etude);
	$("input[name='resultat[p1][charges][total]']").val(resultat.p1.charges.total);
}

$("#refresh").click(function(e){
	e.preventDefault();
	input(data);
	calcul(resultat,data,parametres);
	maj(resultat);
});
