import React, { Component, Fragment } from "react";

const API =
  "https://webservicessec.procaps.com.co/api/CumpleMes?mes=02&pais=COLOMBIA";
const baseURL = "https://webservicessec.procaps.com.co/api/CumpleMes?";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cumple: [],
      value: "01",
      allCumple: [],
      search: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`${baseURL}mes=${this.state.value}&pais=COLOMBIA`)
      .then(response => response.json())
      .then(data => this.setState({ cumple: data }));
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ cumple: data }));

    for (let i = 1; i <= 12; i++) {
      fetch(`${baseURL}mes=${i}&pais=COLOMBIA`)
        .then(response => response.json())
        .then(data => this.state.allCumple.push(data));
    }
  }

  render() {
    //let filterEmployee = this.props.cumple;
    const { cumple } = this.state;
    return (
      <Fragment>
        <div className="container-fluid sticky-top bg-light">
          <div className="container">
            <div className="row pb-5 pt-4">
              <div className="col">
                <h2>Consulta de Cumpleaños por Mes</h2>
              </div>
              <div className="col">
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
            </div>
          </div>
        </div>
        <div className="container pt-5">
          <div className="table-responsive">
            <table className="table">
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
                    <tr key={user.id}>
                      <td>{user.Nombre}</td>
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
