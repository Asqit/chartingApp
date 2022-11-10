/* 
+-------+------+-----------------------+
| Číslo | Typ  | Jednotka			   |			   
+---+---+------+-----------------------+
| 1 | Teplota  | Celsia				   |
| 2 | Vlhkost  | %	  				   |
| 3 | Světlo   | Lum                   |   
| 4 | Vítr     | m/s                   |    
| 5 | Tlak     | pascaly               |        
| 6 | Voda     | m3                    |  
| 7 | Plyn	   | m3					   |    
| 8 | Proud    | KW/H                  |       
+---+----------+-----------------------+
							Typy senzorů
*/

const UNIT_MAP = new Map<number, string>();

UNIT_MAP.set(1, 'c');
UNIT_MAP.set(2, '%');
UNIT_MAP.set(3, 'lum');
UNIT_MAP.set(4, 'm/s');
UNIT_MAP.set(5, 'pascal');
UNIT_MAP.set(6, 'm3');
UNIT_MAP.set(7, 'm3');
UNIT_MAP.set(8, 'KW/h');

export { UNIT_MAP };
