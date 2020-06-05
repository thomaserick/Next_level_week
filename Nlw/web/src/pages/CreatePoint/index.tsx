import React, { useEffect, useState, ChangeEvent } from "react";
import "./styles.css";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Map, TileLayer, Marker } from "react-leaflet";
import axios from "axios";
import api from "../../services/api";
import { LeafletMouseEvent } from "leaflet";

//estado para Array ou Objeto
//manualmente precisa informar o tipo da variavel
interface item {
  id: number;
  title: string;
  image_url: string;
}

interface IBGEUf {
  sigla: string;
}
interface IBGECity {
  nome: string;
}

const CreatPoint = () => {
  const [items, setitems] = useState<item[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");

  useEffect(() => {
    api.get("items").then((res) => {
      setitems(res.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get<IBGEUf[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
      )
      .then((res) => {
        const ufInitials = res.data.map((uf) => uf.sigla);
        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === "0") return;

    axios
      .get<IBGECity[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((res) => {
        const cityNames = res.data.map((city) => city.nome);
        setCities(cityNames);
      });
  }, [selectedUf]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude]);
    });
  }, []);

  function handleSelecUf(e: ChangeEvent<HTMLSelectElement>) {
    const uf = e.target.value;
    setSelectedUf(uf);
  }

  function handleSelecCity(e: ChangeEvent<HTMLSelectElement>) {
    const city = e.target.value;
    setSelectedCity(city);
  }

  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" />
        <Link to="/">
          <FiArrowLeft />
          Voltar para Home
        </Link>
      </header>
      <form>
        <h1>Cadastro do ponto de Coleta</h1>
        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>
          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input type="Text" name="name" id="name"></input>
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" id="email"></input>
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input type="Text" name="whatsapp" id="whatsapp"></input>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Endereços</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={initialPosition} zoom={15} onclick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition} />
          </Map>
        </fieldset>
        <div className="field-group">
          <div className="field">
            <label htmlFor="uf">Estado (UF)</label>
            <select
              name="uf"
              id="uf"
              value={selectedUf}
              onChange={handleSelecUf}
            >
              <option value="0">Selecione uma UF</option>
              {ufs.map((uf) => (
                <option key={uf} value={uf}>
                  {uf}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="city">Cidade</label>
            <select
              name="city"
              id="city"
              value={selectedCity}
              onChange={handleSelecCity}
            >
              <option value="0">Selecione uma cidade</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais items abaixo</span>
          </legend>
          <ul className="items-grid">
            {items.map((item) => (
              <li key={item.id}>
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>
        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  );
};

export default CreatPoint;
