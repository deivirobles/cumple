import React, { Component, Fragment } from "react";

const API =
  "https://webservicessec.procaps.com.co/api/CumpleMes?mes=01&pais=COLOMBIA";
const baseURL = "https://webservicessec.procaps.com.co/api/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cumple: [],
      value: "01",
      busquedaCumple: [],
      busqueda: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`${baseURL}CumpleMes?mes=${this.state.value}&pais=COLOMBIA`)
      .then(response => response.json())
      .then(data => this.setState({ cumple: data }));
    const tableBirdthday = document.getElementById("tablaMes");
    if (tableBirdthday.style.display === "none") {
      tableBirdthday.style.display = "table";
    }
  }

  handleSearchInput(event) {
    this.setState({ busqueda: event.target.value });
  }

  handleSearch(event) {
    event.preventDefault();
    fetch(`${baseURL}CumpleNombre?nombre=${this.state.busqueda}&pais=COLOMBIA`)
      .then(response => response.json())
      .then(data => this.setState({ busquedaCumple: data }));
    const tableBirdthday = document.getElementById("tablaMes");
    if (tableBirdthday.style.display !== "none") {
      tableBirdthday.style.display = "none";
    }
    document.getElementById("inputSearch").value = "";
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ cumple: data }));
  }

  render() {
    //let filterEmployee = this.props.cumple;
    const { cumple } = this.state;
    const { busquedaCumple } = this.state;
    return (
      <Fragment>
        <div className="container-fluid sticky-top bg-light">
          <div className="container">
            <div className="row pb-5 pt-4">
              <div className="col-4">
                <h2>Consulta de Cumpleaños por mes</h2>
              </div>
              <div className="col-3">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label>
                      Seleccione el mes
                      <select
                        className="form-control"
                        value={this.state.value}
                        onChange={this.handleChange}
                      >
                        <option value="01">Enero</option>
                        <option value="02">Febrero</option>
                        <option value="03">Marzo</option>
                        <option value="04">Abril</option>
                        <option value="05">Mayo</option>
                        <option value="06">Junio</option>
                        <option value="07">Julio</option>
                        <option value="08">Agosto</option>
                        <option value="09">Septiembre</option>
                        <option value="10">Octubre</option>
                        <option value="11">Noviembre</option>
                        <option value="12">Diciembre</option>
                      </select>
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Consultar
                  </button>
                </form>
              </div>
              <div className="col-5">
                <form onSubmit={this.handleSearch}>
                  <div className="form-group">
                    <label for="exampleFormControlTextarea1">
                      Buscar por Nombre o Apellido
                    </label>
                    <br />
                    <input
                      className="form-control"
                      type="text"
                      id="inputSearch"
                      placeholder="Escriba aqui..."
                      onChange={this.handleSearchInput}
                      required
                    />
                    <br />
                    <button type="submit" className="btn btn-danger">
                      Buscar por Nombre
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="container pt-5">
          <div className="table-responsive">
            <table className="table" id="tablaMes">
              <thead>
                <tr>
                  <th>Nombre Completo</th>
                  <th>Día</th>
                  <th>Área</th>
                  <th>Sede</th>
                </tr>
              </thead>
              <tbody>
                {cumple.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{user.Nombre}</td>
                      <td>{user.Dia}</td>
                      <td>{user.Departamento}</td>
                      <td>{user.Sede}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <table className="table" id="tablaConsulta">
              <thead>
                <tr>
                  <th>Nombre Completo</th>
                  <th>Mes</th>
                  <th>Día</th>
                  <th>Área</th>
                  <th>Sede</th>
                </tr>
              </thead>
              <tbody>
                {busquedaCumple.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{user.Nombre}</td>
                      <td>{user.Mes}</td>
                      <td>{user.Dia}</td>
                      <td>{user.Departamento}</td>
                      <td>{user.Sede}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
