
export class CombosController {
  constructor({ combosModel }) {
    this.combosModel = combosModel;
  }

  
  departamentosList = async (req, res) => {
    const depto =  await this.combosModel.obtenerDepartamento()
        res.json({
          result: 1,
          message: "Listado Departamentos",
          data: depto,
        })
  };

  comLinguistList = async (req, res) => {
    const comLing =  await this.combosModel.obtenerComunidadLinguistica()
    res.json({
      result: 1,
      message: "Listado Comunidad Linguistica",
      data: comLing,
    })
  };

  puebloPertList = async (req, res) => {
    const puebloPert =  await this.combosModel.obtenerPuebloPertenencia()
    res.json({
      result: 1,
      message: "Listado Pueblos Pertenencia",
      data: puebloPert,
    })
  };

  sexoList = async (req, res) => {
    const sexo =  await this.combosModel.obtenerSexo()
    res.json({
      result: 1,
      message: "Listado Sexo",
      data: sexo,
    })
  };

  estCivilList = async (req, res) => {
    const estCivil =  await this.combosModel.obtenerEstadoCivil()
    res.json({
      result: 1,
      message: "Listado EstadosCivil",
      data: estCivil,
    })
  };
  municipiosList = async (req, res) => {
    const {IdDepartamento}= req.body
    const municipios =  await this.combosModel.obtenerMunicipiosPorDepartamentoId(IdDepartamento)
    res.json({
      result: 1,
      message: "Listado Municipios",
      data: municipios,
    })
  };

}
