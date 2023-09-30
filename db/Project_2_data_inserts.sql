-- Schema Projekt_2 data/test data inserts:


insert into posti (postinro, toimipaikka)
values ('93830', 'Rukatunturi'),
	   ('73310', 'Tahkovuori'),
       ('95980', 'Ylläsjärvi'),
       ('70100', 'Kuopio');
       
       
insert into asiakas (postinro, etunimi, sukunimi, lahiosoite, email, puhelinnro)
values ('70100','Marco','Hietala','Kukkokatu 5','mh@mh.com','0500505505'),
	   ('70100','DJ','Nite','Tiskijukkatie 10','nite@nite.com','0401111111'),
       ('70100','Admin', 'Admin1', 'Admintie A 1', 'village@admin.mail.com', '0407777777');


insert into authentication (login, asiakas_id, password, admin)
values ('admin', 3, 'admin1', 1),
	   ('fake_admin', 2, 'admin1', 0);


insert into alue (alue_id, nimi)
values (1, 'Ruka'),
	   (2, 'Tahko'),
       (3, 'Ylläs');


insert into mokki (alue_id, postinro, mokkinimi, katuosoite, hinta, kuvaus, henkilomaara, varustelu)
values (1, '93830', 'Mökki 1', 'Projektitie 1', 150, 'huono mökki', 4, 'hyvin suppea varustelu'),
	   (1, '93830', 'Mökki 2', 'Projektitie 2', 300, 'parempi mökki', 6, 'laajempi varustelu'),
       (1, '93830', 'Mökki 3', 'Projektitie 3', 600, 'paras mökki', 8, 'kattava varustelu'),
       
       (2, '73310', 'Mökki 1', 'Uudenalueentie 1', 150, 'huono mökki', 4, 'hyvin suppea varustelu'),
       (2, '73310', 'Mökki 2', 'Uudenalueentie 2', 300, 'parempi mökki', 6, 'laajempi varustelu'),
       (2, '73310', 'Mökki 3', 'Uudenalueentie 3', 600, 'paras mökki', 8, 'kattava varustelu'),
       
	   (3, '95980', 'Mökki 1', 'Einiinuudenalueentie 1', 150, 'huono mökki', 4, 'hyvin suppea varustelu'),
       (3, '95980', 'Mökki 2', 'Einiinuudenalueentie 2', 300, 'parempi mökki', 6, 'laajempi varustelu'),
       (3, '95980', 'Mökki 3', 'Einiinuudenalueentie 3', 600, 'paras mökki', 8, 'kattava varustelu');
       

insert into palvelu (alue_id, nimi, tyyppi, kuvaus, hinta, alv)
values (1, 'Siivous', 1, 'Mökin loppusiivous', 60, 11.61),
	   (2, 'Siivous', 1, 'Mökin loppusiivous', 60, 11.61),
       (3, 'Siivous', 1, 'Mökin loppusiivous', 60, 11.61);
       
       
insert into varaus (asiakas_asiakas_id, mokki_mokki_id, varattu_pvm, vahvistus_pvm, varattu_alkupvm, varattu_loppupvm)
values (1, 1, CURDATE(), CURDATE(), '2022-04-29', '2022-04-30'),
	   (2, 3, CURDATE(), CURDATE(), '2022-05-01', '2022-05-03');


insert into lasku (varaus_id, summa, alv, erapaiva, completed)
values (1, 150, 29.03, '2022-05-06', 1),
	   (2, 600, 116.13, '2022-05-06', 1);


insert into varauksen_palvelut (varaus_id, palvelu_palvelu_id, lkm)
values (1, 1, 1);
       
