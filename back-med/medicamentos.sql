--
-- PostgreSQL database dump
--

\restrict unSoytf0dTVWbBV0exgh60r2lzF8AJ9MbjeCrKVXx96vW37lFhMzmTh4GJeW6Yo

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

-- Started on 2025-11-17 18:28:42

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 878 (class 1247 OID 24577)
-- Name: opt_intensidad; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.opt_intensidad AS ENUM (
    'leve',
    'moderado',
    'severo'
);


ALTER TYPE public.opt_intensidad OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 228 (class 1259 OID 16431)
-- Name: alertas_medicas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alertas_medicas (
    id_alerta integer NOT NULL,
    id_medicamento integer NOT NULL,
    hora_programada timestamp without time zone
);


ALTER TABLE public.alertas_medicas OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16430)
-- Name: alertas_medicas_id_alerta_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.alertas_medicas_id_alerta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.alertas_medicas_id_alerta_seq OWNER TO postgres;

--
-- TOC entry 5067 (class 0 OID 0)
-- Dependencies: 227
-- Name: alertas_medicas_id_alerta_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.alertas_medicas_id_alerta_seq OWNED BY public.alertas_medicas.id_alerta;


--
-- TOC entry 224 (class 1259 OID 16409)
-- Name: familiares; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.familiares (
    id_familiar integer NOT NULL,
    id_usuario_cuidador integer NOT NULL,
    nombre character varying(255),
    apellido character varying(255),
    parentesco character varying(255),
    fecha_nacimiento date,
    documento_identidad character varying(255),
    info_emergencia_tipo_sangre character varying(255),
    info_emergencia_alergias text,
    info_emergencia_condiciones text
);


ALTER TABLE public.familiares OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16408)
-- Name: familiares_id_familiar_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.familiares_id_familiar_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.familiares_id_familiar_seq OWNER TO postgres;

--
-- TOC entry 5068 (class 0 OID 0)
-- Dependencies: 223
-- Name: familiares_id_familiar_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.familiares_id_familiar_seq OWNED BY public.familiares.id_familiar;


--
-- TOC entry 226 (class 1259 OID 16420)
-- Name: medicamentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.medicamentos (
    id_medicamento integer NOT NULL,
    id_familiar integer NOT NULL,
    nombre_medicamento character varying(255),
    dosis character varying(255),
    frecuencia character varying(255),
    duracion_tratamiento character varying(255),
    fecha_registro timestamp without time zone
);


ALTER TABLE public.medicamentos OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16419)
-- Name: medicamentos_id_medicamento_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.medicamentos_id_medicamento_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.medicamentos_id_medicamento_seq OWNER TO postgres;

--
-- TOC entry 5069 (class 0 OID 0)
-- Dependencies: 225
-- Name: medicamentos_id_medicamento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.medicamentos_id_medicamento_seq OWNED BY public.medicamentos.id_medicamento;


--
-- TOC entry 222 (class 1259 OID 16401)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id_rol integer NOT NULL,
    nombre_rol character varying(255)
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16400)
-- Name: roles_id_rol_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_rol_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_rol_seq OWNER TO postgres;

--
-- TOC entry 5070 (class 0 OID 0)
-- Dependencies: 221
-- Name: roles_id_rol_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_rol_seq OWNED BY public.roles.id_rol;


--
-- TOC entry 230 (class 1259 OID 24584)
-- Name: sintomas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sintomas (
    id_sintoma integer NOT NULL,
    id_familiar integer,
    tipo_sintoma character varying(255),
    intensidad public.opt_intensidad DEFAULT 'leve'::public.opt_intensidad,
    fecha_inicio timestamp without time zone,
    comentarios text
);


ALTER TABLE public.sintomas OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 24583)
-- Name: sintomas_id_sintoma_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sintomas_id_sintoma_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sintomas_id_sintoma_seq OWNER TO postgres;

--
-- TOC entry 5071 (class 0 OID 0)
-- Dependencies: 229
-- Name: sintomas_id_sintoma_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sintomas_id_sintoma_seq OWNED BY public.sintomas.id_sintoma;


--
-- TOC entry 220 (class 1259 OID 16390)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    id_rol integer NOT NULL,
    nombre character varying(255),
    correo character varying(255),
    password_hash character varying(255),
    contacto_emergencia_nombre character varying(255),
    contacto_emergencia_telefono character varying(255)
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16389)
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_usuario_seq OWNER TO postgres;

--
-- TOC entry 5072 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;


--
-- TOC entry 4888 (class 2604 OID 16434)
-- Name: alertas_medicas id_alerta; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alertas_medicas ALTER COLUMN id_alerta SET DEFAULT nextval('public.alertas_medicas_id_alerta_seq'::regclass);


--
-- TOC entry 4886 (class 2604 OID 16412)
-- Name: familiares id_familiar; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.familiares ALTER COLUMN id_familiar SET DEFAULT nextval('public.familiares_id_familiar_seq'::regclass);


--
-- TOC entry 4887 (class 2604 OID 16423)
-- Name: medicamentos id_medicamento; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medicamentos ALTER COLUMN id_medicamento SET DEFAULT nextval('public.medicamentos_id_medicamento_seq'::regclass);


--
-- TOC entry 4885 (class 2604 OID 16404)
-- Name: roles id_rol; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id_rol SET DEFAULT nextval('public.roles_id_rol_seq'::regclass);


--
-- TOC entry 4889 (class 2604 OID 24587)
-- Name: sintomas id_sintoma; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sintomas ALTER COLUMN id_sintoma SET DEFAULT nextval('public.sintomas_id_sintoma_seq'::regclass);


--
-- TOC entry 4884 (class 2604 OID 16393)
-- Name: usuarios id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);


--
-- TOC entry 5059 (class 0 OID 16431)
-- Dependencies: 228
-- Data for Name: alertas_medicas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alertas_medicas (id_alerta, id_medicamento, hora_programada) FROM stdin;
\.


--
-- TOC entry 5055 (class 0 OID 16409)
-- Dependencies: 224
-- Data for Name: familiares; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.familiares (id_familiar, id_usuario_cuidador, nombre, apellido, parentesco, fecha_nacimiento, documento_identidad, info_emergencia_tipo_sangre, info_emergencia_alergias, info_emergencia_condiciones) FROM stdin;
2	0	BBB	AAA	CCC	2025-11-13	222	\N	\N	\N
3	0	Martin Viz	Lopez Bueno	Abuelo Materno	1986-10-20	00044411	\N	\N	\N
\.


--
-- TOC entry 5057 (class 0 OID 16420)
-- Dependencies: 226
-- Data for Name: medicamentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.medicamentos (id_medicamento, id_familiar, nombre_medicamento, dosis, frecuencia, duracion_tratamiento, fecha_registro) FROM stdin;
1	2	hibuprofeno bb	10	12	30 dias	2025-11-17 17:45:37.421
\.


--
-- TOC entry 5053 (class 0 OID 16401)
-- Dependencies: 222
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id_rol, nombre_rol) FROM stdin;
\.


--
-- TOC entry 5061 (class 0 OID 24584)
-- Dependencies: 230
-- Data for Name: sintomas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sintomas (id_sintoma, id_familiar, tipo_sintoma, intensidad, fecha_inicio, comentarios) FROM stdin;
1	3	Dolor de cabeza muy fuerte	severo	2025-11-16 00:00:00	test 2222
\.


--
-- TOC entry 5051 (class 0 OID 16390)
-- Dependencies: 220
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id_usuario, id_rol, nombre, correo, password_hash, contacto_emergencia_nombre, contacto_emergencia_telefono) FROM stdin;
\.


--
-- TOC entry 5073 (class 0 OID 0)
-- Dependencies: 227
-- Name: alertas_medicas_id_alerta_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.alertas_medicas_id_alerta_seq', 1, false);


--
-- TOC entry 5074 (class 0 OID 0)
-- Dependencies: 223
-- Name: familiares_id_familiar_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.familiares_id_familiar_seq', 4, true);


--
-- TOC entry 5075 (class 0 OID 0)
-- Dependencies: 225
-- Name: medicamentos_id_medicamento_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.medicamentos_id_medicamento_seq', 2, true);


--
-- TOC entry 5076 (class 0 OID 0)
-- Dependencies: 221
-- Name: roles_id_rol_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_rol_seq', 1, false);


--
-- TOC entry 5077 (class 0 OID 0)
-- Dependencies: 229
-- Name: sintomas_id_sintoma_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sintomas_id_sintoma_seq', 2, true);


--
-- TOC entry 5078 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_usuario_seq', 1, false);


--
-- TOC entry 4900 (class 2606 OID 16438)
-- Name: alertas_medicas alertas_medicas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alertas_medicas
    ADD CONSTRAINT alertas_medicas_pkey PRIMARY KEY (id_alerta);


--
-- TOC entry 4896 (class 2606 OID 16418)
-- Name: familiares familiares_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.familiares
    ADD CONSTRAINT familiares_pkey PRIMARY KEY (id_familiar);


--
-- TOC entry 4898 (class 2606 OID 16429)
-- Name: medicamentos medicamentos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medicamentos
    ADD CONSTRAINT medicamentos_pkey PRIMARY KEY (id_medicamento);


--
-- TOC entry 4894 (class 2606 OID 16407)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id_rol);


--
-- TOC entry 4902 (class 2606 OID 24593)
-- Name: sintomas sintomas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sintomas
    ADD CONSTRAINT sintomas_pkey PRIMARY KEY (id_sintoma);


--
-- TOC entry 4892 (class 2606 OID 16399)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);


-- Completed on 2025-11-17 18:28:42

--
-- PostgreSQL database dump complete
--

\unrestrict unSoytf0dTVWbBV0exgh60r2lzF8AJ9MbjeCrKVXx96vW37lFhMzmTh4GJeW6Yo

