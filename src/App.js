import React, {useState,useEffect} from 'react';
import './Global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import api from './services/Api';
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

// Componente - Funcão que retorna HTML
// Estado - Informação mantida pelo component, lembrar de Imutabilidade
// Propriedade - Informações que um componente pai passa para um component filho


function App() {

  const [devs, setDevs] = useState([]);


  

  useEffect(()=>{
    async function loadDevs(){
      const response = await api.get('/devs')
      setDevs(response.data);
    }

    loadDevs();
  }, [])

  async function handleAddDev(data){

    const response = await api.post('/devs',data);
    setDevs([...devs, response.data]);

  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}></DevForm>
      </aside>
      <main>
        <ul>
          {devs.map(dev => {
            return (
              <DevItem key={dev._id} dev={dev}></DevItem>
            )

          })}
          
        </ul>
      </main>
    </div>
  );
}

export default App;
