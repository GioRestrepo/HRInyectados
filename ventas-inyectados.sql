-- Creando la base de datos ventas_inyectados
create database ventas_inyectados;
show databases;

-- Seleccionando la BBDD ventas_inyectados
use ventas_inyectados;

-- Creando la tabla usuarios
create table usuarios (
   id int not null auto_increment,
   nombre varchar(50) not null,
   apellidos varchar(50) not null,
   email varchar(100) not null,
   password varchar(50) not null,
   primary key(id)
); 

-- Insertando datos usuarios
insert into usuarios (nombre, apellidos, email, password)
values
('Juan Alberto', 'Pérez Muñoz', 'juanalberto@gmail.com', 'JA679646'),
('José Guillermo', 'Hernández Vélez', 'joséguillermo@gmail.com', 'JH8839'),
('Luis Alfonso', 'forero Gutiérrez', 'luisalfonso@gmail.com', 'LA372919'),
('Pedro Luis', 'Espitia Pérez', 'pedroluis@gmail.com', 'PL8901989'),
('Alfonso José', 'Restrepo Torres', 'alfonsojosé@gmail.com', 'AJ841991'),
('Humberto', 'Tapia Velásquez', 'humbertotapia@gmail.com', 'H919923'),
('María Luisa', 'Cárdenas Hernández', 'maríaluisa@gmail.com', 'ML881819'),
('Luisa Fernanda', 'Gómez Hurtado', 'luisafernanda@gmail.com', 'LF919923'),
('Verónica Marcela', 'Suarez Ramírez', 'verónicamarcela@gmail.com', 'VM8192491'),
('Esperanza', 'Vélez Muñoz', 'esperanzavélez@gmail.com', 'E991910'),
('Fernanda', 'Suarez Velásquez', 'fernandasuarez@gmail.com', 'F9198313'),
('Tania Marcela', 'Torres Herrera', 'taniamarcela@gmail.com', 'TM8910101');

-- Creando la tabla clientes
create table clientes (
   id_cli int not null auto_increment primary key,
   nombre varchar(50) not null,
   apellidos varchar(50) not null,
   email varchar(100) not null,
   telefono int not null,
   documento int not null
); 

-- Insertando datos clientes
insert into clientes (nombre, apellidos, email, telefono, documento)
values
('Juan Alberto', 'Pérez Muñoz', 'juanalberto@gmail.com', 3134233511, 102780045),
('José Guillermo', 'Hernández Vélez', 'joséguillermo@gmail.com', 3172335114, 103780056),
('Luis Alfonso', 'forero Gutiérrez', 'luisalfonso@gmail.com', 3113351142, 104780077),
('Pedro Luis', 'Espitia Pérez', 'pedroluis@gmail.com', 3153511423, 105780088),
('Alfonso José', 'Restrepo Torres', 'alfonsojosé@gmail.com', 3125114233, 106780099),
('Humberto', 'Tapia Velásquez', 'humbertotapia@gmail.com', 3171142335, 107780000),
('María Luisa', 'Cárdenas Hernández', 'maríaluisa@gmail.com', 3161423351, 108780011),
('Luisa Fernanda', 'Gómez Hurtado', 'luisafernanda@gmail.com', 3237845341, 109780022),
('Verónica Marcela', 'Suarez Ramírez', 'verónicamarcela@gmail.com', 3118453417, 101780033),
('Esperanza', 'Vélez Muñoz', 'esperanzavélez@gmail.com', 3224534178, 102780044),
('Fernanda', 'Suarez Velásquez', 'fernandasuarez@gmail.com', 3135341184, 103780055),
('Tania Marcela', 'Torres Herrera', 'taniamarcela@gmail.com', 3223411745, 104780066);

-- Creando la tabla ventas
create table ventas (
   id_vent int not null auto_increment primary key,
   id_cli int not null,
   total float not null,
   foreign key (id_cli) references clientes(id_cli)
); 

-- Isertando datos ventas
insert into ventas (id_cli, total)
values
(2, 3500000),
(4, 2400000),
(6, 500000),
(8, 7000000),
(10, 1700000),
(12, 3400000),
(5, 3200000),
(5, 550000),
(1, 6400000), 
(10, 2400000),
(3, 3500000),
(4, 2400000),
(5, 500000),
(6, 7000000),
(7, 1700000),
(11, 3400000),
(4, 3200000),
(6, 550000),
(10, 6400000), 
(9, 2400000);

-- Creando la tabla productos
create table productos (
   cod_prod varchar(20) not null  primary key,
   nombre varchar(100) not null,
   valor float not null
); 

-- Insertando datos en productos
insert into productos (cod_prod, nombre, valor)
values
('501', 'Silla Conductor', 1000000),
('502', 'Silla Acompañante', 1000000),
('503', 'Silla Trasera', 1500000),
('504', 'Silla Doble', 1700000),
('505', 'Techo Cabina', 1200000),
('506', 'Palomera', 3500000),
('507', 'Cartera Puerta', 500000),
('508', 'Estructura Silla', 500000),
('509', 'División Cabina', 1500000),
('510', 'Pasamanos', 500000);

-- Creando la tabla detalle_ventas
create table detalle_ventas (
   id_vent int not null,
   cod_prod varchar(20) not null,
   fecha datetime not null,
   foreign key (id_vent) references ventas(id_vent),
   foreign key ( cod_prod) references productos( cod_prod),
   primary key (id_vent, cod_prod)
); 

-- Isertando datos detalle_ventas
insert into detalle_ventas (id_vent, cod_prod, fecha)
values
(1,'501', '2022-01-27'),
(2, '502', '2021-03-07'),
(3, '503', '2022-02-02'),
(4, '504', '2021-05-27'),
(5, '505', '2021-07-18'),
(6, '506', '2022-10-01'),
(7, '507', '2022-01-27'),
(8,'508','2021-12-07'),
(9, '509', '2022-04-11'), 
(10, '510', '2021-11-12'),
(11, '510', '2022-03-27'),
(12, '509', '2021-02-07'),
(13, '508', '2021-06-02'),
(14, '507','2022-01-27'),
(15, '506', '2021-05-18'),
(16, '505', '2022-9-01'),
(17, '504', '2021-02-27'),
(18, '503', '2021-11-07'),
(19, '502', '2022-03-11'), 
(20, '501', '2021-04-12');

-- creando la tabla bodega
create table bodega (
   id_bod int not null auto_increment primary key,
   nombre varchar(100) not null
   ); 

-- Insertando datos en bodega
insert into bodega (nombre)
values
('Bodega principal'), 
('Bodega secundaria'),
('Bodega principal'),
('Bodega principal'),
('Bodega principal'),
('Bodega principal'),
('Bodega principal'),
('Bodega secundaria'),
('Bodega secundaria'),
('Bodega secundaria');

-- creando la tabla detalle_bodega
create table detalle_bodega (
   cod_prod varchar(20) not null,
   id_bod int not null,
   cantidad int not null,
   fecha datetime not null,
   foreign key ( cod_prod) references productos( cod_prod),
   foreign key (id_bod) references bodega(id_bod),
   primary key ( cod_prod, id_bod)
); 

-- insertando datos en la tabla detalle_bodega
insert into detalle_bodega (cod_prod, id_bod, fecha, cantidad) 
values 
('501', 1, '2021-05-27', 25),
('502', 2, '2021-05-27', 34),
('503', 3, '2021-05-27', 15),
('504', 4, '2021-05-27', 32),
('505', 5, '2021-05-27', 5),
('506', 6, '2021-05-27', 45),
('507', 7, '2021-05-27', 123),
('508', 8, '2021-05-27', 125),
('509', 9, '2021-05-27', 10),
('510', 10, '2021-05-27', 95);



-- consultas
select * from usuarios;
select * from clientes;
select * from ventas;
select * from detalle_ventas;
select * from productos;
select * from bodega;
select * from detalle_bodega;

-- consultas inner join
select c.nombre, c.apellidos, v.total from ventas v inner join clientes c on c.id_cli = v.id_cli; 

select c.nombre, c.apellidos, v.total from ventas v inner join clientes c on c.id_cli = v.id_cli 
where v.total >= 3500000; 

select p.nombre, p.valor, dv.fecha, v.total from detalle_ventas dv 
inner join productos p on p.cod_prod = dv.cod_prod
inner join ventas v on v.id_vent = dv.id_vent;

select p.nombre, p.valor, dv.fecha, v.total from detalle_ventas dv 
inner join productos p on p.cod_prod = dv.cod_prod
inner join ventas v on v.id_vent = dv.id_vent
where dv.fecha >= '2021-06-02' and v.total >= 3500000;

select b.nombre, p.cod_prod, p.nombre, db.cantidad from detalle_bodega db 
inner join productos p on p.cod_prod = db.cod_prod
inner join bodega b on b.id_bod = db.id_bod;